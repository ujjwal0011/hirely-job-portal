import React from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  FaCode,
  FaGlobe,
  FaChartBar,
  FaCloud,
  FaCogs,
  FaMobileAlt,
} from "react-icons/fa";
import { useTheme } from "./ui/ThemeProvider";

const services = [
  {
    id: 1,
    service: "Software Development",
    description:
      "Innovative solutions to build, maintain, and upgrade applications.",
    icon: FaCode,
  },
  {
    id: 2,
    service: "Web Development",
    description:
      "Responsive and user-friendly websites with seamless integration.",
    icon: FaGlobe,
  },
  {
    id: 3,
    service: "Data Science",
    description:
      "Advanced analytics providing actionable insights and solutions.",
    icon: FaChartBar,
  },
  {
    id: 4,
    service: "Cloud Computing",
    description:
      "Scalable and flexible cloud solutions for efficient data management.",
    icon: FaCloud,
  },
  {
    id: 5,
    service: "DevOps",
    description:
      "Streamlined development and operations for faster deployment.",
    icon: FaCogs,
  },
  {
    id: 6,
    service: "Mobile App Development",
    description:
      "Intuitive and engaging mobile experiences for iOS and Android.",
    icon: FaMobileAlt,
  },
];

const TopNiches = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <section
      className={`py-16 px-4 ${
        isDarkTheme
          ? "bg-gradient-to-br from-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      <div className="container mx-auto">
        <motion.h2
          className={`text-center text-4xl font-bold mb-12 ${
            isDarkTheme ? "text-gray-200" : "text-gray-800"
          }`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Top Niches
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((element) => (
            <motion.div
              key={element.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * element.id }}
            >
              <Card
                className={`shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full ${
                  isDarkTheme ? "bg-gray-700" : "bg-white"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <element.icon
                      className={`text-3xl mr-4 ${
                        isDarkTheme ? "text-primary-light" : "text-primary"
                      }`}
                    />
                    <CardTitle
                      className={`text-xl font-bold ${
                        isDarkTheme ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {element.service}
                    </CardTitle>
                  </div>
                  <CardDescription
                    className={isDarkTheme ? "text-gray-400" : "text-gray-600"}
                  >
                    {element.description}
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

export default TopNiches;
