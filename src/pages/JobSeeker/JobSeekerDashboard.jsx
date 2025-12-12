import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Layouts/LoadingSpinner";
import axiosInstance, {
  toastStyleError,
  toastStyleSuccess,
} from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { Filter, Grid, List, Search, X } from "lucide-react";
import FilterContent from "./components/FilterContent";
import toast from "react-hot-toast";
import SearchHeader from "./components/SearchHeader";
import Navbar from "../../components/Layouts/Navbar";
import JobCard from "./components/JobCard";
import Lottie from "lottie-react";
import nodata from "../../assets/lotties/nodata.json";
import SkeletonList from "./components/SkeletonList";

const JobSeekerDashboard = () => {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Filter states
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    experience: "",
    remoteOnly: false,
  });

  // Sidebar collapse state
  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    salary: true,
    category: true,
  });

  // Fungsi untuk fetch jobs API
  const fetchJobs = async (fillterParams = {}, showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      setError(null);

      // query parameter untuk filter
      const params = new URLSearchParams();

      if (fillterParams.keyword)
        params.append("keyword", fillterParams.keyword);
      if (fillterParams.location)
        params.append("location", fillterParams.location);
      if (fillterParams.category)
        params.append("category", fillterParams.category);
      if (fillterParams.jobType)
        params.append("jobType", fillterParams.jobType);
      if (fillterParams.salaryMin)
        params.append("salaryMin", fillterParams.salaryMin);
      if (fillterParams.salaryMax)
        params.append("salaryMax", fillterParams.salaryMax);
      if (user) params.append("userId", user?._id);

      const response = await axiosInstance.get(
        `${API_PATHS.JOBS.GET_ALL_JOBS}?${params.toString()}`
      );

      const jobData = Array.isArray(response.data)
        ? response.data
        : response.data.jobs || [];

      setJobs(jobData);

      // console.log(jobData);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching jobs: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs saat komponen di-mount
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const apiFilters = {
        keyword: filters.keyword,
        location: filters.location,
        category: filters.category,
        jobType: filters.jobType,
        salaryMin: filters.salaryMin,
        salaryMax: filters.salaryMax,
      };

      // hanya mengambil data API jika ada filter
      const hasFilters = Object.values(apiFilters).some(
        (value) =>
          value !== "" &&
          value !== null &&
          value !== undefined &&
          value !== false
      );

      if (hasFilters) {
        fetchJobs(apiFilters);
      } else {
        fetchJobs({}, false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters, user]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: "",
      location: "",
      category: "",
      jobType: "",
      salaryMin: "",
      salaryMax: "",
    });
  };

  const toggleSaveJob = async (jobId, isSaved) => {
    try {
      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId ? { ...job, isSaved: !isSaved } : job
        )
      );
      if (isSaved) {
        await axiosInstance.delete(API_PATHS.JOBS.UNSAVE_JOB(jobId));
        toast.success("Job unsaved successfully", toastStyleSuccess);
      } else {
        await axiosInstance.post(API_PATHS.JOBS.SAVE_JOB(jobId));
        toast.success("Job saved successfully", toastStyleSuccess);
      }
      fetchJobs({}, false);
    } catch (error) {
      console.error("Error toggling save job:", error);
      toast.error("Error toggling save job", toastStyleError);
      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId ? { ...job, isSaved: isSaved } : job
        )
      );
    }
  };

  const applyToJob = async (jobId) => {
    try {
      if (jobId) {
        await axiosInstance.post(API_PATHS.APPLICATIONS.APPLY_JOB(jobId));
        toast.success("Applied to job successfully", toastStyleSuccess);
      }
      fetchJobs();
    } catch (error) {
      console.error("Error applying to job:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Error applying to job. Please, try again later.";
      toast.error(errorMessage, toastStyleError);
    }
  };

  const MobileFilterOverlay = () => {
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        showMobileFilters ? "" : "hidden"
      }`}
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setShowMobileFilters(false)}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-semibold text-slate-800 text-lg">Filters</h3>
          <button
            className="px-3 py-2 hover:bg-slate-100 rounded-xl transition-colors"
            onClick={() => setShowMobileFilters(false)}
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-full pb-10">
          <FilterContent
            toggleSection={toggleSection}
            clearAllFilters={clearAllFilters}
            expandedSections={expandedSections}
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>;
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-slate-50">
      <Navbar />
      <div className="min-h-screen mt-16">
        <div className="container mx-auto p-4 lg:py-8">
          {/* Search Header */}
          <SearchHeader
            filters={filters}
            handleFilterChange={handleFilterChange}
          />

          <div className="flex gap-6 lg:gap-8">
            {/* Desktop Sidebar Filter */}
            <div className="hidden lg:block w-70 flex-shrink-0">
              <div className="bg-white sticky top-20 rounded-2xl p-4 border border-slate-100">
                <h3 className="font-semibold text-slate-900 text-lg mb-4">
                  Filter Jobs
                </h3>
                <FilterContent
                  toggleSection={toggleSection}
                  clearAllFilters={clearAllFilters}
                  expandedSections={expandedSections}
                  filters={filters}
                  handleFilterChange={handleFilterChange}
                />
              </div>
            </div>

            {/* Main Content  */}
            <div className="flex-1 min-w-0">
              {/* Result Header */}

              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6 gap-4">
                <div>
                  <p className="text-slate-600 text-sm lg:text-base">
                    Showing{" "}
                    <span className="font-semibold text-slate-900">
                      {jobs.length}
                    </span>{" "}
                    jobs
                  </p>
                </div>
                <div className="flex items-center justify-between lg:justify-center gap-4">
                  {/* Mobile Filter Button */}
                  <button
                    className="lg:hidden flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 font-medium text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
                    onClick={() => setShowMobileFilters(true)}
                  >
                    <Filter className="size-4 text-slate-500" />
                    Filters
                  </button>
                  <div className="flex items-center gap-2 lg:gap-4">
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
              </div>

              {/* Job Grid */}
              {loading ? (
                <SkeletonList viewMode={viewMode} />
              ) : jobs.length === 0 ? (
                <div className="text-center py-16 lg:py-20 bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl">
                  <div className="text-slate-400 mb-4">
                    <Lottie
                      animationData={nodata}
                      loop={false}
                      style={{
                        width: "350px",
                        height: "350px",
                        margin: "0 auto",
                      }}
                    />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-slate-900 mb-3">
                    No Jobs Found
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Try adjusting your filters
                  </p>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer"
                    onClick={clearAllFilters}
                  >
                    Clear All Filters
                  </button>
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
                    {jobs.map((job) => (
                      <JobCard
                        key={job._id}
                        job={job}
                        onClick={() => navigate(`/job/${job._id}`)}
                        onToggleSave={() => toggleSaveJob(job._id, job.isSaved)}
                        onApply={() => applyToJob(job._id)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        <MobileFilterOverlay />
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
