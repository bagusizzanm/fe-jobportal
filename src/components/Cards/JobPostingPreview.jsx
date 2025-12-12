import React from "react";
import { useAuth } from "../../context/AuthContext";
import {
  ArrowLeft,
  Building2,
  Clock,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";

const JobPostingPreview = ({ setIsPreview, formData }) => {
  const { user } = useAuth();
  const currrencies = [{ value: "usd", label: "$" }];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 backdrop-blur-sm bg-white/80 border border-white/20 rounded-2xl px-6 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Job Preview
              </h2>
            </div>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-600 bg-slate-100 hover:bg-slate-200 transition-colors duration-300 cursor-pointer"
              onClick={() => setIsPreview(false)}
            >
              <ArrowLeft className="size-4" />
              <span className="text-sm">Back</span>
            </button>
          </div>
          {/* Main Content Card */}
          <div className="">
            {/* Hero section */}
            <div className="relative bg-white px-0 pb-8 mt-8 border-b border-gray-100">
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-0">
                  <div className="flex-1">
                    <h1 className="text-lg lg:text-xl font-semibold leading-tight ">
                      {formData.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="size-4" strokeWidth={1.5} />
                        <span className="text-sm  font-medium">
                          {formData.jobType === "Remote"
                            ? "Remote"
                            : formData.location}
                        </span>
                        {formData.jobType === "Remote" && formData.location && (
                          <span className="text-sm">
                            {" "}
                            📍 {formData.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {user?.companyLogo ? (
                    <img
                      src={user.companyLogo}
                      alt="Company Logo"
                      className="size-16 md:size-20 rounded-2xl object-cover border-4 border-white/50 shadow-lg"
                    />
                  ) : (
                    <div className="size-20 bg-gray-50 border-2 border-gray-100 rounded-2xl flex items-center justify-center">
                      <Building2 className="size-8" strokeWidth={1.5} />
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 md:mt-0">
                <span className="px-4 py-2 bg-blue-50 text-sm text-blue-700 font-semibold rounded-full border border-blue-100">
                  {CATEGORIES.find(
                    (category) => category.value === formData.category
                  )?.label || "Other"}
                </span>
                <span className="px-4 py-2 bg-purple-50 text-sm text-purple-700 font-semibold rounded-full border border-purple-100">
                  {
                    JOB_TYPES.find(
                      (jobType) => jobType.value === formData.jobType
                    )?.label
                  }
                </span>
                <div className="flex items-center space-x-1 px-4 py-2 bg-gray-50 text-sm text-gray-600 font-semibold rounded-full border border-gray-100">
                  <Clock className="size-4" strokeWidth={1.5} />
                  <span>Posted Today</span>
                </div>
              </div>
            </div>

            {/* content section */}
            <div className="px-0 pb-8 space-y-8">
              {/* salary */}
              <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-6 rounded-2xl">
                <div className="absolute top-0 right-0 size-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                        <DollarSign
                          strokeWidth={1.5}
                          className="size-4 md:h-5 text-white"
                        />
                      </div>
                      <div className="">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          Compensation
                        </h3>
                        <div className="text-sm md:text-lg font-bold text-gray-900">
                          {
                            currrencies.find(
                              (curr) => curr.value === formData.currency
                            )?.label
                          }{" "}
                          {formData.salaryMin.toLocaleString()} -{" "}
                          {
                            currrencies.find(
                              (curr) => curr.value === formData.currency
                            )?.label
                          }{" "}
                          {formData.salaryMax.toLocaleString()}
                          <span className="text-xs md:text-sm text-gray-600 font-normal">
                            /per year
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-2 text-sm text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      <Users strokeWidth={1.5} className="size-4" />
                      <span className="text-xs">Competitive</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* job description */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                  <span className="text-base md:text-lg">About this Role</span>
                </h3>
                <div className="bg-gray-50 borderrounded-xl p-6">
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {formData.description}
                  </div>
                </div>
              </div>

              {/* requirements */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                  <span className="text-base md:text-lg">
                    What We're Looking For
                  </span>
                </h3>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50  rounded-xl p-6">
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {formData.requirements}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobPostingPreview;
