import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance, { toastStyleError } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import loadAnimation from "../../assets/lotties/loadtickanimation.json";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Calendar,
  Download,
  Eye,
  MapPin,
  Users,
} from "lucide-react";
import moment from "moment";
import StatusBadge from "../../components/StatusBadge";
import ApplicationProfilePreview from "../../components/Cards/ApplicationProfilePreview";
import { motion, AnimatePresence } from "framer-motion";

const ApplicationViewer = () => {
  const location = useLocation();
  const jobId = location.state?.jobId || null;
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const fecthApplications = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        API_PATHS.APPLICATIONS.GET_ALL_APPLICATIONS(jobId)
      );
      setApplications(res.data.apps);
      console.log(res.data.apps);
    } catch (error) {
      console.error("Error fetching applications: ", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch applications",
        toastStyleError
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fecthApplications();
    else navigate("/manage-jobs");
  }, []);

  const groupedApplications = useMemo(() => {
    const filtered = applications.filter((app) => app.job.title.toLowerCase());
    return filtered.reduce((acc, app) => {
      const jobId = app.job._id;
      if (!acc[jobId]) {
        acc[jobId] = {
          job: app.job,
          applications: [],
        };
      }
      acc[jobId].applications.push(app);
      return acc;
    }, {});
  }, [applications]);

  const handleDownloadResume = (resumeUrl) => {
    window.open(resumeUrl, "_blank");
  };

  return (
    <DashboardLayout activeMenu="manage-jobs">
      {loading && (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Lottie
              animationData={loadAnimation}
              loop={true}
              className="size-40"
            />
            <p className="text-gray-600">Loading applications...</p>
          </div>
        </div>
      )}
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4 sm:mb-0">
              <button
                onClick={() => navigate("/manage-jobs")}
                className="group flex items-center px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-md text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors duration-300 cursor-pointer"
              >
                <ArrowLeft className="mr-2 size-3" />
                <span>Back</span>
              </button>
              <h1 className="text-xl text-zinc-600 md:text-2xl font-semibold">
                Applications Overview
              </h1>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-0 pb-8">
          <div className="min-h-screen">
            {Object.keys(groupedApplications).length === 0 ? (
              // empty state
              <div className="pt-[45%] text-center">
                <Users className="size-16 mx-auto text-gray-300" />
                <h3 className="text-gray-600">No applications available.</h3>
                <p className="">No application found at the moment.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.values(groupedApplications).map(
                  ({ job, applications }) => (
                    <div
                      key={job._id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden"
                    >
                      {/* Job Header */}
                      <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <h2 className="text-lg md:text-xl font-semibold text-white">
                              {job.title}
                            </h2>
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-blue-100">
                              <div className="flex items-center gap-1">
                                <MapPin className="size-4  " />
                                <span className="text-sm">{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BriefcaseBusiness className="size-4" />
                                <span className="text-sm">{job.jobType}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">
                                  {job.category}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-2">
                            <span className="text-sm text-white font-medium">
                              {applications.length} Application
                              {applications.length !== 1 && "s"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Applications List */}
                      <div className="p-4">
                        <div className="space-y-4">
                          {applications.map((app) => (
                            <div
                              key={app._id}
                              className={`flex flex-col border border-gray-100 md:flex-row md:items-center md:justify-between p-4 rounded-md  hover:bg-gray-50 transition-colors duration-200 ${
                                selectedApplicant?._id === app._id
                                  ? "bg-gray-100"
                                  : ""
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className="flex-shrink-0">
                                  {app.applicant.avatar ? (
                                    <img
                                      src={app.applicant.avatar}
                                      alt={app.applicant.name}
                                      className="size-12 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="size-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                                      <span className="">
                                        {getInitials(app.applicant.name)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-md font-medium text-gray-900 truncate">
                                    {app.applicant.name}
                                  </h3>
                                  <p className="text-xs text-gray-500 truncate">
                                    {app.applicant.email}
                                  </p>
                                  <div className="flex items-center gap-1 mt-1 text-xs">
                                    <Calendar className="size-3 inline-block mr-1 text-gray-400" />
                                    <span className="text-xs text-gray-500">
                                      Applied on{" "}
                                      {moment(app.appliedAt).format(
                                        "DD MMMM YYYY"
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {/* Actions */}
                              <div className="flex items-center gap-3 mt-4 md:mt-0">
                                <StatusBadge status={app.status} />
                                <button
                                  className="inline-flex gap-2 items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm font-medium transition-colors duration-300 cursor-pointer"
                                  onClick={() =>
                                    handleDownloadResume(app.applicant.resume)
                                  }
                                >
                                  <Download className="size-4" />
                                  <span className="text-xs">Resume</span>
                                </button>
                                <button
                                  className="inline-flex items-center px-3 py-2 bg-slate-100 gap-2 hover:bg-slate-200 rounded-md text-slate-600 text-xs font-medium transition-colors duration-300 cursor-pointer"
                                  onClick={() => setSelectedApplicant(app)}
                                >
                                  <Eye className="size-4" />
                                  View Details
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
        {/* Profile Modal */}
        <AnimatePresence mode="wait">
          {selectedApplicant && (
            <ApplicationProfilePreview
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.3 }}
              selectedApplicant={selectedApplicant}
              setSelectedApplicant={setSelectedApplicant}
              handleDownloadResume={handleDownloadResume}
              handleClose={() => {
                setSelectedApplicant(null);
                fecthApplications();
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationViewer;
