import { motion } from "framer-motion";
import { Search, ArrowRight, Users, Building2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Hero = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: "Active Users", value: "2.4M+", icon: <Users /> },
    { label: "Company", value: "500k", icon: <Building2 /> },
    { label: "Jobs Posted", value: "150K+", icon: <TrendingUp /> },
  ];

  return (
    <section className="min-h-screen bg-white flex items-center pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight"
            >
              Find Your Dream Job or{" "}
              <span className="block bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text mt-2">
                Perfect Hire
              </span>
            </motion.h1>

            {/* Sub Heading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Connect talented professionals with innovative companies. Your
              next career move or perfect hire is just one click away.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-gradient-to-t from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-colors duration-300 shadow-lg hover:shadow-xl cursor-pointer flex items-center space-x-2"
                onClick={() => navigate("/find-jobs")}
              >
                <Search className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span className="">Find Jobs</span>
                <ArrowRight className="" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold text-lg px-8 py-4 hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex items-center space-x-2"
                onClick={() =>
                  navigate(
                    isAuthenticated && user.role === "employer"
                      ? "/employer-dashboard"
                      : "/login"
                  )
                }
              >
                Post a Job
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex flex-col items-center space-y-2 rounded-xl"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 text-blue-600">{stat.icon}</div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        {/* Subtle Background Elements */}
        <div className="absolute hidden md:block inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 xl:left-50 w-32 h-32 bg-blue-400 rounded-full blur-2xl opacity-70"></div>
          <div className="absolute bottom-20 right-10 xl:right-50 w-32 h-32 bg-purple-900 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full blur-3xl opacity-30" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
