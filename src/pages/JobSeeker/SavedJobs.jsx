import { useEffect, useState } from "react";
import Navbar from "../../components/Layouts/Navbar";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance, {
  toastStyleError,
  toastStyleSuccess,
} from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { ArrowLeft, Bookmark, Grid, List } from "lucide-react";
import JobCard from "./components/JobCard";

const SavedJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [savedJobList, setSavedJobList] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  const getSavedJobs = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.JOBS.GET_SAVED_JOBS);
      setSavedJobList(res.data.dataSavedJobs);
    } catch (error) {
      console.error("Error fetching saved jobs: ", error);
    }
  };

  const handleUnsaveJob = async (jobId) => {
    try {
      await axiosInstance.delete(API_PATHS.JOBS.UNSAVE_JOB(jobId));
      toast.success("Job removed successfully", toastStyleSuccess);
      getSavedJobs();
    } catch (error) {
      console.error("Error unsaving job: ", error);
      toast.error("Something went wrong, please try again", toastStyleError);
    }
  };

  useEffect(() => {
    if (user) {
      getSavedJobs();
    }
  }, [user]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-slate-50">
      <Navbar />
      <div className="container mx-auto pt-22">
        {savedJobList && (
          <div className="bg-white p-6 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  className="group flex items-center space-x-2 text-sm font-medium text-slate-500 bg-white/50 cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="size-4" />
                </button>
                <h1 className="text-lg lg:text-xl text-slate-500 font-semibold">
                  Saved Jobs
                </h1>
              </div>
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="flex items-center border border-slate-200 rounded-lg p-1 bg-white">
                  <button
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="size-4" />
                  </button>
                  <button
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="size-4" />
                  </button>
                </div>
              </div>
            </div>
            {/* content section */}
            <div className="px-0 pb-0 space-y-8">
              {/* Job grid */}
              {savedJobList.length === 0 ? (
                <div className="text-center py-16 lg:py-20 bg-white/60 backdrop-blur-xl rounded-2xl border border-slate-100">
                  <div className="text-slate-300 mb-6">
                    <Bookmark className="size-16 mx-auto" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-slate-900 mb-3">
                    You haven't saved any jobs yet.
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Start saving jobs that interest you to view them later.
                  </p>
                  <Link
                    to="/find-jobs"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Browse Jobs
                  </Link>
                </div>
              ) : (
                <>
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
                        : "space-y-4 lg:space-y-6"
                    }
                  >
                    {savedJobList.map((savedJob) => (
                      <JobCard
                        key={savedJob._id}
                        job={savedJob?.job}
                        onClick={() => navigate(`/job/${savedJob?.job._id}`)}
                        onToggleSave={() => handleUnsaveJob(savedJob?.job._id)}
                        saved
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <div className="container mx-auto p-4 lg:py-8"></div>
      </div>
    </div>
  );
};

export default SavedJobs;
