import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "@/store/slices/userSlice";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

function Verify() {
  const { email } = useParams();
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  const dispatch = useDispatch();
  const { loading, isAuthenticated, isVerified, error, message } = useSelector(
    (state) => state.user
  );

  const [otp, setOtp] = useState("");
  const data = {};

  if (action === "verify") {
    data.email = email;
    data.otp = otp;
  }

  const navigate = useNavigate();

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

    if (isAuthenticated && isVerified) {
      navigate("/");
    }
  }, [message, error, isVerified, isAuthenticated, navigate, toast]);

  const handleVerify = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      dispatch(verifyOtp(data));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-black">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleVerify} className="space-y-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
            Verify OTP
          </h1>

          <div className="space-y-2">
            <Label className="text-lg">
              OTP <span className="text-red-500">*</span>
            </Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </Button>
          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </form>
      </motion.div>
      <div className="hidden lg:block lg:w-1/2 ">
        <img
          src="/otp.svg"
          alt="Login Illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default Verify;
