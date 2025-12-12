import { useAuth } from "../../../context/AuthContext";
import { Bookmark, Building, Building2, Calendar, MapPin } from "lucide-react";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";

const JobCard = ({ job, onClick, onToggleSave, onApply, saved, hideApply }) => {
  const { user } = useAuth();
  const formatSalary = (min, max) => {
    const formatNumber = (num) => {
      if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
      return `$${num}`;
    };
    return `${formatNumber(min)}/m`;
  };
  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg  duration-300 group relative overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          {job.company.companyLogo ? (
            <img
              src={job?.company?.companyLogo}
              alt="Company Logo"
              className="size-14 object-cover rounded-2xl border-2 border-white/20 shadow-md shadow-slate-200"
            />
          ) : (
            <div className="size-14 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-center justify-center">
              <Building2 className="size-8 text-slate-400" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 text-base group-hover:text-blue-600 transition-colors leading-snug">
              {job?.title}
            </h3>
            <p className="text-slate-600 text-sm flex items-center gap-2 mt-1">
              <Building className="size-3" />
              {job?.company?.companyName}
            </p>
          </div>
        </div>
        {user && (
          <button
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors duration-300 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {job?.isSaved || saved ? (
                <motion.div
                  key="saved"
                  initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
                  transition={{ duration: 0.25 }}
                >
                  <Bookmark fill="#3e9392" className="size-5 text-blue-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="unsaved"
                  initial={{ opacity: 0, scale: 0.6, rotate: 90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: -90 }}
                  transition={{ duration: 0.25 }}
                >
                  <Bookmark className="size-5 text-slate-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>
      <div className="mb-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-slate-700 rounded-full ">
            <MapPin className="size-4" strokeWidth={1} />
            {job?.location}
          </span>
          <span
            className={`px-3 py-2 rounded-full font-medium ${
              job?.jobType === "Full-time"
                ? "bg-pink-100 text-pink-800"
                : job.jobType === "Part-time"
                ? "bg-yellow-100 text-yellow-800"
                : job.jobType === "Contract"
                ? "bg-purple-100 text-purple-800"
                : job.jobType === "Internship"
                ? "bg-slate-100 text-slate-800"
                : job.jobType === "Remote"
                ? "bg-orange-100 text-orange-800"
                : "bg-slate-100 text-slate-800"
            } `}
          >
            {job?.jobType}
          </span>
          <span className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
            {job?.category}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs font-medium text-slate-500 pb-4 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-4 ">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5 " strokeWidth={1} />
            {job?.createdAt
              ? moment(job?.createdAt).format("DD-MM-YYYY")
              : "N/A"}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-blue-600 font-semibold text-lg">
          {formatSalary(job?.salaryMin, job?.salaryMax)}
        </div>
        {!saved && (
          <>
            {job?.applicationStatus ? (
              <div className="text-sm text-slate-500 font-medium px-4 py-2 rounded-xl bg-slate-50 cursor-not-allowed">
                Applied
              </div>
            ) : (
              !hideApply && (
                <button
                  className="bg-blue-50 text-blue-500 text-sm px-4 py-2 rounded-xl hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 duration-200 font-semibold transition-transform hover:-translate-y-0.5 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply();
                  }}
                >
                  Apply Now
                </button>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;
