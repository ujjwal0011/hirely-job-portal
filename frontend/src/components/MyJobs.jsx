import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Info,
  CheckSquare,
  ListTodo,
  Gift,
  AlertTriangle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message, {
        duration: 2000,
      });
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch, error, message]);

  const handleDeleteJob = () => {
    if (jobToDelete) {
      dispatch(deleteJob(jobToDelete));
      setJobToDelete(null);
    }
  };

  if (user && user.role === "Job Seeker") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
              Unauthorized Access
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 text-center">
            <AlertTriangle className="w-16 h-16 text-yellow-500" />
            <p className="text-xl font-medium text-gray-900 dark:text-gray-100">
              You are not authorized to create a new job post.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400">
              This feature is reserved for employers. You can explore and apply
              to jobs.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Button asChild variant="outline" size="lg">
              <Link to="/">Go to Home Page</Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/jobs">Explore Jobs</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (myJobs && myJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Briefcase className="h-24 w-24 text-gray-400 dark:text-gray-600 mb-6" />
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
          You haven't posted any jobs yet
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Start by creating your first job posting
        </p>
        <Button
          size="lg"
          className="font-semibold"
          onClick={() => navigate("/dashboard?section=job-post")}
        >
          Post a Job
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-gray-100">
        My Job Postings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {myJobs.map((job) => (
          <Card
            key={job._id}
            className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {job.title}
              </CardTitle>
              <CardDescription className="text-lg font-medium text-gray-600 dark:text-gray-400">
                {job.companyName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary" className="text-sm font-medium">
                  {job.jobType}
                </Badge>
                <Badge variant="outline" className="text-sm font-medium">
                  {job.jobNiche}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{job.salary}</span>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="details"
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <AccordionTrigger className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Job Details
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{job.introduction}</p>
                      </div>
                      <div className="flex items-start">
                        <CheckSquare className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{job.qualifications}</p>
                      </div>
                      <div className="flex items-start">
                        <ListTodo className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{job.responsibilities}</p>
                      </div>
                      {job.offers && (
                        <div className="flex items-start">
                          <Gift className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{job.offers}</p>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-end items-center pt-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="font-medium"
                    onClick={() => setJobToDelete(job._id)}
                  >
                    Delete Job
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the job posting and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setJobToDelete(null)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteJob}>
                      Delete Job
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
