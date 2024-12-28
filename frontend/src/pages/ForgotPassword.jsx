import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearAllUserErrors, forgotPassword } from "@/store/slices/userSlice";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { message, error, otpSent, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
    }

    if (message) {
      toast.success(message, {
        duration: 2000,
      });
    }

    if (otpSent) {
      navigate(`/reset-password`);
    }

    return () => {
      dispatch(clearAllUserErrors());
    };
  }, [error, message, otpSent, dispatch, toast, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(forgotPassword({ email }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: String(error),
      });
    }
  };

  return (
    <div className="container mx-auto px-4 h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => navigate("/login")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      <div className="hidden lg:block lg:w-1/2 ">
        <img
          src="/forgot.svg"
          alt="Login Illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
