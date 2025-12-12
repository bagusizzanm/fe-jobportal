import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Layouts/Navbar";
import { useParams } from "react-router-dom";
import axiosInstance, {
  toastStyleError,
  toastStyleSuccess,
} from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Building2,
  Clock,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import moment from "moment";
import StatusBadge from "../../components/StatusBadge";

const JobDetails = () => {
  const { user } = useAuth();
  const { jobId } = useParams();

  const [jobDetails, setJobDetails] = useState({});

  const getJobDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.JOBS.GET_JOB_BY_ID(jobId),
        { params: { userId: user._id } }
      );
      setJobDetails(response.data.dataJob);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const applyToJob = async () => {
    try {
      if (jobId) {
        await axiosInstance.post(API_PATHS.APPLICATIONS.APPLY_JOB(jobId));
        toast.success("Applied to job successfully", toastStyleSuccess);
      }
      getJobDetails();
    } catch (error) {
      console.error("Error applying to job:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Error applying to job. Please, try again later.";
      toast.error(errorMessage, toastStyleError);
    }
  };

  useEffect(() => {
    if (jobId && user) {
      getJobDetails();
    }
  }, [jobId, user]);

  return (
    <div className="bg-slate-50 ">
      <Navbar />
      <div className="container mx-auto pt-24 px-6">
        {/* Main Content Card */}
        {jobDetails && (
          <div className="bg-white p-6 rounded-lg">
            <button
              className="flex items-center gap-2 px-3 py-2 mb-2 rounded-md text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors duration-300 cursor-pointer"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="size-4" />
              <span className="text-sm">Back</span>
            </button>
            {/* Hero section */}
            <div className="relative px-0 pb-8 ">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  {jobDetails.company?.companyLogo ? (
                    <img
                      src={jobDetails?.company?.companyLogo}
                      alt="Company Logo"
                      className="size-20 object-cover rounded-xl border-2 border-white/20 shadow-md shadow-slate-200"
                    />
                  ) : (
                    <div className="size-20 object-cover rounded-xl border-2 border-white/20 shadow-md shadow-slate-200 flex items-center justify-center">
                      <Building2 className="size-8 text-slate-400" />
                    </div>
                  )}

                  <div className="flex-1">
                    <h1 className="text-lg lg:text-xl font-semibold mb-2 leading-tight text-slate-900">
                      {jobDetails?.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-slate-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="size-4" />
                        <span className="text-sm font-medium">
                          {jobDetails?.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  {jobDetails?.applicationStatus ? (
                    <StatusBadge status={jobDetails?.applicationStatus} />
                  ) : (
                    <button
                      className="bg-blue-50 text-blue-500 text-sm px-4 py-2 rounded-xl hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 duration-200 font-semibold transition-all hover:-translate-y-0.5 cursor-pointer"
                      onClick={applyToJob}
                    >
                      Apply
                    </button>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 items-center">
                  <span className="px-4 py-2 bg-blue-50 text-blue-500 text-xs rounded-full font-semibold">
                    {jobDetails.category}
                  </span>
                  <span className="px-4 py-2 bg-purple-50 text-purple-500 text-xs rounded-full font-semibold">
                    {jobDetails.jobType}
                  </span>
                  <div className="flex items-center space-x-2 text-xs bg-slate-50 text-slate-700 py-2 px-4 rounded-full">
                    <Clock className="size-4" />
                    <span>
                      {jobDetails.createdAt
                        ? moment(jobDetails.createdAt).format("dd-MM-YYYY")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Content Section */}
            <div className="px-0 pb-8 space-y-8">
              <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl">
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
                        <h3 className="text-sm font-semibold text-slate-900 mb-1">
                          Compensation
                        </h3>
                        <div className="text-sm md:text-lg font-bold text-slate-900">
                          {jobDetails?.salaryMin} - {jobDetails?.salaryMax}
                          <span className="text-xs md:text-sm text-slate-600 font-normal">
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
              {/* job desc */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-slate-900 flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                  <span className="text-base md:text-lg">About this Role</span>
                </h3>
                <div className="bg-slate-50 borderrounded-xl p-6">
                  <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {jobDetails.description}
                  </div>
                </div>
              </div>
              {/* Requirements */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-slate-900 flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                  <span className="text-base md:text-lg">Requirements</span>
                </h3>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50  rounded-xl p-6">
                  <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {jobDetails.requirements}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
