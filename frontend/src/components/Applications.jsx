import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  FileText,
  Trash2,
  ExternalLink,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "@/store/slices/applicationSlice";
import toast from "react-hot-toast";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message, {
        duration: 2000,
      });
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  if (user && user.role === "Job Seeker") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Unauthorized Access
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 text-center">
            <AlertTriangle className="w-12 h-12 text-yellow-500" />
            <p className="text-lg font-medium">
              You are not authorized to create a new job post.
            </p>
            <p className="text-sm text-muted-foreground">
              This feature is reserved for employers. You can explore and apply
              to jobs.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Button asChild variant="outline">
              <Link to="/">Go to Home Page</Link>
            </Button>
            <Button asChild>
              <Link to="/jobs">Explore Jobs</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const handleDeleteApplication = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      dispatch(deleteApplication(id));
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <Skeleton className="h-6 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (applications && applications.length === 0) {
    return (
      <Card className="shadow-md">
        <CardContent className="pt-6 flex flex-col items-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mb-4" />
          <p className="text-center text-lg font-semibold mb-2">
            No Applications Yet
          </p>
          <p className="text-center text-gray-600">
            You haven't received any applications for your job postings yet.
            Check back later!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Applications For Your Posted Jobs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((element) => (
          <Card
            key={element._id}
            className="shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>{element.jobInfo.jobTitle}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{element.jobSeekerInfo.name}</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {element.jobSeekerInfo.email}
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {element.jobSeekerInfo.phone}
                </p>
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {element.jobSeekerInfo.address}
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    View Cover Letter
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Cover Letter</DialogTitle>
                    <DialogDescription>
                      From {element.jobSeekerInfo.name} for{" "}
                      {element.jobInfo.jobTitle}
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="mt-4 h-[200px] w-full rounded-md border p-4">
                    <p className="text-sm">
                      {element.jobSeekerInfo.coverLetter}
                    </p>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="destructive"
                onClick={() => handleDeleteApplication(element._id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <Button>
                <a
                  href={
                    element.jobSeekerInfo && element.jobSeekerInfo.resume.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Resume
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Applications;
