import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardFooter,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, AlertTriangle } from "lucide-react";
import {
  Briefcase,
  MapPin,
  Building,
  FileText,
  ClipboardList,
  GraduationCap,
  Gift,
  Tag,
  DollarSign,
  Users,
  Globe,
} from "lucide-react";

const JobPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    jobType: "",
    location: "",
    companyName: "",
    introduction: "",
    responsibilities: "",
    qualifications: "",
    offers: "",
    jobNiche: "",
    salary: "",
    hiringMultipleCandidates: "",
    personalWebsiteTitle: "",
    personalWebsiteUrl: "",
  });

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  const cities = [
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Mumbai",
    "Delhi",
    "Noida",
    "Gurgaon",
    "Kolkata",
    "Ahmedabad",
    "Chandigarh",
    "Jaipur",
    "Kochi",
    "Trivandrum",
    "Indore",
    "Nagpur",
    "Vadodara",
    "Coimbatore",
    "Mysore",
    "Visakhapatnam",
  ];

  const { loading, error, message } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostJob = () => {
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });
    dispatch(postJob(formDataToSend));
  };

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
  }, [dispatch, error, message]);

  const isFormValid = () => {
    const requiredFields = [
      "title",
      "jobType",
      "location",
      "companyName",
      "introduction",
      "responsibilities",
      "qualifications",
      "jobNiche",
      "salary",
    ];
    return requiredFields.every((field) => formData[field]);
  };

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

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <Card className="max-w-3xl mx-auto bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Briefcase className="mr-2 h-6 w-6" />
            Post A Job
          </CardTitle>
          <CardDescription>
            Fill in the details to post a new job opportunity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                Job Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Senior React Developer"
                className="shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobType" className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                Job Type
              </Label>
              <Select
                value={formData.jobType}
                onValueChange={(value) => handleSelectChange("jobType", value)}
              >
                <SelectTrigger id="jobType">
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                Location (City)
              </Label>
              <Select
                value={formData.location}
                onValueChange={(value) => handleSelectChange("location", value)}
              >
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName" className="flex items-center">
                <Building className="mr-2 h-4 w-4" />
                Company Name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="e.g. Tech Innovations Inc."
                className="shadow-sm"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="introduction" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Company/Job Introduction
            </Label>
            <Textarea
              id="introduction"
              name="introduction"
              value={formData.introduction}
              onChange={handleInputChange}
              placeholder="Briefly describe the company and the job role"
              rows={4}
              className="shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities" className="flex items-center">
              <ClipboardList className="mr-2 h-4 w-4" />
              Responsibilities
            </Label>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleInputChange}
              placeholder="List the key responsibilities for this role"
              rows={4}
              className="shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualifications" className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4" />
              Qualifications
            </Label>
            <Textarea
              id="qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleInputChange}
              placeholder="List the required qualifications for this role"
              rows={4}
              className="shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="offers" className="flex items-center">
              <Gift className="mr-2 h-4 w-4" />
              What We Offer (Optional)
            </Label>
            <Textarea
              id="offers"
              name="offers"
              value={formData.offers}
              onChange={handleInputChange}
              placeholder="Describe the benefits and perks offered with this position"
              rows={4}
              className="shadow-sm"
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="jobNiche" className="flex items-center">
                <Tag className="mr-2 h-4 w-4" />
                Job Niche
              </Label>
              <Select
                value={formData.jobNiche}
                onValueChange={(value) => handleSelectChange("jobNiche", value)}
              >
                <SelectTrigger id="jobNiche">
                  <SelectValue placeholder="Select Job Niche" />
                </SelectTrigger>
                <SelectContent>
                  {nichesArray.map((niche) => (
                    <SelectItem key={niche} value={niche}>
                      {niche}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary" className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                Salary Range
              </Label>
              <Input
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="e.g. 50,000 - 80,000"
                className="shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="hiringMultipleCandidates"
                className="flex items-center"
              >
                <Users className="mr-2 h-4 w-4" />
                Hiring Multiple Candidates?
              </Label>
              <Select
                value={formData.hiringMultipleCandidates}
                onValueChange={(value) =>
                  handleSelectChange("hiringMultipleCandidates", value)
                }
              >
                <SelectTrigger id="hiringMultipleCandidates">
                  <SelectValue placeholder="Yes or No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="personalWebsiteTitle"
                className="flex items-center"
              >
                <Globe className="mr-2 h-4 w-4" />
                Personal Website Name (Optional)
              </Label>
              <Input
                id="personalWebsiteTitle"
                name="personalWebsiteTitle"
                value={formData.personalWebsiteTitle}
                onChange={handleInputChange}
                placeholder="e.g. Company Blog"
                className="shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="personalWebsiteUrl" className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                Personal Website Link (Optional)
              </Label>
              <Input
                id="personalWebsiteUrl"
                name="personalWebsiteUrl"
                value={formData.personalWebsiteUrl}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="shadow-sm"
              />
            </div>
          </div>

          <Button
            onClick={handlePostJob}
            disabled={loading || !isFormValid()}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Briefcase className="mr-2 h-4 w-4" />
                Post Job
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPost;
