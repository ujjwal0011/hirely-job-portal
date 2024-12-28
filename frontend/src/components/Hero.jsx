import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, UserPlus } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const JobSeekerHero = () => (
    <>
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Elevate Your Career Journey
      </motion.h1>
      <motion.h2
        className="text-xl md:text-2xl text-center mb-8 text-blue-100"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Connecting Exceptional Talent with Premier Opportunities Nationwide
      </motion.h2>
      <motion.div
        className="max-w-3xl mx-auto mb-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
          <CardContent className="p-6">
            <p className="text-center text-lg leading-relaxed">
              Explore a curated selection of career opportunities across diverse
              industries. Whether you're an experienced professional seeking new
              challenges or a recent graduate embarking on your career path, our
              platform offers tailored job matches to propel your professional
              growth. Leverage our advanced search tools and personalized
              recommendations to efficiently navigate the job market and secure
              your ideal position.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );

  const EmployerHero = () => (
    <>
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Find Your Perfect Candidate
      </motion.h1>
      <motion.h2
        className="text-xl md:text-2xl text-center mb-8 text-blue-100"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Connect with Top Talent and Build Your Dream Team
      </motion.h2>
      <motion.div
        className="max-w-3xl mx-auto mb-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
          <CardContent className="p-6">
            <p className="text-center text-lg leading-relaxed">
              Access a vast pool of qualified professionals ready to contribute
              to your organization's success. Our platform streamlines the
              hiring process, allowing you to post jobs, review applications,
              and connect with candidates efficiently. With advanced filtering
              and matching algorithms, find the right talent that aligns with
              your company's vision and requirements.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );

  const UnauthenticatedHero = () => (
    <>
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Where Talent Meets Opportunity
      </motion.h1>
      <motion.h2
        className="text-xl md:text-2xl text-center mb-8 text-blue-100"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Gateway to Career Success and Top Talent
      </motion.h2>
      <motion.div
        className="max-w-3xl mx-auto mb-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
          <CardContent className="p-6">
            <p className="text-center text-lg leading-relaxed">
              Whether you're seeking your next career move or looking to hire
              exceptional talent, our platform brings together opportunities and
              expertise. For job seekers, discover roles that match your skills
              and aspirations. For employers, connect with qualified
              professionals ready to contribute to your organization's success.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20 mt-14">
      <div className="container mx-auto px-4">
        {!isAuthenticated ? (
          <UnauthenticatedHero />
        ) : user.role === "Job Seeker" ? (
          <JobSeekerHero />
        ) : (
          <EmployerHero />
        )}

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {!isAuthenticated ? (
            <>
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-300"
                onClick={() => navigate("/register")}
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Sign Up Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-black hover:bg-white hover:text-blue-700 transition-colors duration-300"
                onClick={() => navigate("/jobs")}
              >
                Find Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </>
          ) : user.role === "Job Seeker" ? (
            <>
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-300"
                onClick={() => navigate("/jobs")}
              >
                Find Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-black hover:bg-white hover:text-blue-700 transition-colors duration-300"
                onClick={() => navigate("/dashboard?section=my-applications")}
              >
                My Applications
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-300"
                onClick={() => navigate("/dashboard?section=job-post")}
              >
                Post Job
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-black hover:bg-white hover:text-blue-700 transition-colors duration-300"
                onClick={() => navigate("/dashboard?section=my-jobs")}
              >
                My Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
