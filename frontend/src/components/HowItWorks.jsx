import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Create an Account",
    description:
      "Sign up for a free account as a job seeker or employer. Set up your profile in minutes to start posting jobs or applying for positions.",
    icon: <LuUserPlus className="w-12 h-12" />,
  },
  {
    id: 2,
    title: "Post or Browse Jobs",
    description:
      "Employers can post detailed job descriptions, and job seekers can browse available positions using filters to find perfect matches.",
    icon: <VscTasklist className="w-12 h-12" />,
  },
  {
    id: 3,
    title: "Hire or Get Hired",
    description:
      "Employers can shortlist candidates and extend job offers. Job seekers can review and accept positions aligning with their career goals.",
    icon: <BiSolidLike className="w-12 h-12" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto">
        <motion.h2
          className="text-center text-4xl font-bold text-gray-800 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * step.id }}
            >
              <Card className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="text-primary mb-4">{step.icon}</div>
                  <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
