import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="hidden md:block md:text-xl font-bold text-slate-900">
              Job Portal
            </span>
          </div>
          {/* Navigation links - Hidden on mobile */}
          <nav
            className={
              isAuthenticated && user
                ? "hidden"
                : `hidden md:flex space-x-8 items-center`
            }
          >
            <a
              href=""
              onClick={() => navigate("/find-jobs")}
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              Find Jobs
            </a>
            <a
              href=""
              onClick={() =>
                isAuthenticated && user?.role === "employer"
                  ? "/employer-dashboard"
                  : "/login"
              }
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              {" "}
              For Employers
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="hidden md:block text-slate-700 font-medium text-sm">
                  {user?.name}
                </span>
                <a
                  href={
                    user?.role === "employer"
                      ? "/employer-dashboard"
                      : "/find-jobs"
                  }
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-6 text-sm font-medium rounded-md hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  {user?.role === "employer" ? "Dashboard" : "Find Jobs"}
                </a>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-slate-600 hover:text-slate-900 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-slate-50"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-6 font-medium rounded-md hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
