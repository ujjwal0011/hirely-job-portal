import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { LuMoveRight } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout, clearAllUserErrors } from "@/store/slices/userSlice";
import JobPost from "@/components/JobPost";
import MyJobs from "@/components/MyJobs";
import Applications from "@/components/Applications";
import MyApplications from "@/components/MyApplications";

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("Job Post");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const router = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const section = searchParams.get("section");

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearAllUserErrors());
    }

    if (section) {
      const formattedSection = section
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
      setComponentName(formattedSection);
    } else {
      setComponentName(
        user?.role === "Employer" ? "Job Post" : "My Applications"
      );
    }
  }, [dispatch, error, loading, isAuthenticated, router, section]);

  const renderComponent = () => {
    switch (componentName) {
      case "Job Post":
        return <JobPost />;
      case "My Jobs":
        return <MyJobs />;
      case "Applications":
        return <Applications />;
      case "My Applications":
        return <MyApplications />;
      default:
        return <JobPost />;
    }
  };

  const menuItems = [
    { name: "Job Post", role: "Employer", query: "job-post" },
    { name: "My Jobs", role: "Employer", query: "my-jobs" },
    { name: "Applications", role: "Employer", query: "applications" },
    { name: "My Applications", role: "Job Seeker", query: "my-applications" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-14">
      <div className="flex flex-col md:flex-row gap-8">
        <Sheet open={show} onOpenChange={setShow}>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden mb-4">
              <LuMoveRight className="mr-2 h-4 w-4" />
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
              <div className="flex flex-col space-y-2">
                {menuItems.map(
                  (item) =>
                    (item.role === "all" ||
                      (user && user.role === item.role)) && (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className="justify-start"
                        onClick={() => {
                          setComponentName(item.name);
                          setShow(false);
                        }}
                      >
                        {item.name}
                      </Button>
                    )
                )}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <Card className="flex-1">
          <CardContent className="p-6">{renderComponent()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
