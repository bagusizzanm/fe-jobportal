import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance, {
  toastStyleError,
  toastStyleSuccess,
} from "../../utils/axiosInstance";
import { toast } from "react-hot-toast";
import moment from "moment";
import {
  ChevronUp,
  Edit,
  Plus,
  Search,
  Trash,
  Trash2,
  Users,
  X,
} from "lucide-react";

const ManageJobs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 8;

  const [jobs, setJobs] = useState([]);

  const filterAndSortJobs = useMemo(() => {
    let filteredJobs = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort Jobs
    filteredJobs.sort((a, b) => {
      let fieldA = a[sortField];
      let fieldB = b[sortField];

      if (sortField === "applicants") {
        fieldA = Number(fieldA);
        fieldB = Number(fieldB);
      }

      if (sortDirection === "asc") {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });

    return filteredJobs;
  }, [jobs, searchTerm, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filterAndSortJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filterAndSortJobs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  // Toggle status of a job
  const handleStatusChange = async (jobId) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.JOBS.TOGGLE_CLOSE(jobId)
      );
      getPostedJobs(true);
      toast.success("Job status updated successfully", toastStyleSuccess);
    } catch (e) {
      console.error("Error updating job status. Please, try again later.");
      toast.error(
        "Error updating job status. Please, try again later.",
        toastStyleError
      );
    }
  };

  // delete spesific job
  const handleDeleteJob = async (jobId) => {
    try {
      await axiosInstance.delete(API_PATHS.JOBS.DELETE_JOB(jobId));
      setJobs(jobs.filter((job) => job.id !== jobId));
      toast.success("Job deleted successfully", toastStyleSuccess);
    } catch (e) {
      console.error("Error deleting job. Please, try again later.");
      toast.error(
        "Error deleting job. Please, try again later.",
        toastStyleError
      );
    }
  };
  // decide which sort icon to display based on current sort field and direction
  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return <ChevronUp className="size-4 text-gray-500" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="size-4 text-blue-600" />
    ) : (
      <ChevronUp className="size-4 text-blue-600 rotate-180" />
    );
  };

  // loading state with animation
  const LoadingRow = () => {
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="size-10 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <div className="h-8 bg-gray-200 rounded w-16"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      </td>
    </tr>;
  };
  const getPostedJobs = async () => {
    // setIsLoading(!disableLoader);
    try {
      const res = await axiosInstance.get(API_PATHS.JOBS.GET_JOBS_EMPLOYER);
      if (res.status === 200 && res.data?.length > 0) {
        const formattedJobs = res.data?.map((job) => ({
          id: job._id,
          title: job?.title,
          company: job?.company?.name,
          status: job?.isClosed ? "Closed" : "Active",
          applicants: job?.applicationCount || 0,
          datePosted: moment(job?.createdAt).format("DD-MM-YYYY"),
          logo: job?.company?.companyLogo,
        }));
        setJobs(formattedJobs);
      }
    } catch (e) {
      if (e.response) {
        console.error(e.response.data.message);
        toast.error(e.response.data.message);
      } else {
        console.error("Error posting job. Please, try again later.");
        toast.error("Error posting job. Please, try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostedJobs();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="manage-jobs">
      <section className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 ">
            <div className="flex flex-row items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Job Management
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your job postings and applications
                </p>
              </div>
              <button
                className="inline-flex items-center px-4 py-2 gap-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md text-sm hover:from-blue-700 hover:to-blue-800 transition-colors duration-300 cursor-pointer"
                onClick={() => navigate("/post-job")}
              >
                <Plus className="size-4" /> Add new Job
              </button>
            </div>
          </div>
          {/* Filters */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-6 pt-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* search */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="size-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-blue-200 focus:ring focus:ring-blue-500 outline-0 transition-all duration-300 placeholder:text-gray-400"
                />
              </div>
              {/* Status Filter */}
              <div className="sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full px-4 py-2 text-sm rounded-lg border border-blue-200 focus:ring focus:ring-blue-500 transition-all duration-300 "
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="mt-5 bg-white backdrop-blur-sm border border-white/20 rounded-md overflow-hidden">
              {filterAndSortJobs.length === 0 && !isLoading ? (
                <div className="text-center py-12">
                  <div className="size-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="size-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2 ">
                    No Job Found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter options.
                  </p>
                </div>
              ) : (
                <div className="w-[75vw] md:w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <table className="min-w-full divide-y divide-gray-200/50">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                      <tr>
                        <th
                          className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-300 min-w-[200px] sm:min-w-0"
                          onClick={() => handleSort("title")}
                        >
                          <div className="flex items-center space-x-1 ">
                            <span>Job Title</span>
                            <SortIcon filed="title" />
                          </div>
                        </th>
                        <th
                          className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-300 min-w-[120px] sm:min-w-0"
                          onClick={() => handleSort("status")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Status</span>
                            <SortIcon filed="status" />
                          </div>
                        </th>
                        <th
                          className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-300 min-w-[200px] sm:min-w-0"
                          onClick={() => handleSort("applicants")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Applicants</span>
                            <SortIcon filed="applicants" />
                          </div>
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-300 min-w-[200px] sm:min-w-0">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {isLoading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <LoadingRow key={index} />
                          ))
                        : paginatedJobs.map((job) => (
                            <tr
                              key={job.id}
                              className="hover:bg-blue-50/30 transition-all duration-200 border-b border-gray-100/60 px-6 py-4 "
                            >
                              <td className="px-6 py-4 whitespace-nowrap min-w-[200px] sm:min-w-0">
                                <div>
                                  <div className="text-sm font-semibold text-gray-900">
                                    {job.title}
                                  </div>
                                </div>
                                <div className="text-xs font-medium text-gray-500">
                                  {job.company}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap min-w-[120px] sm:min-w-0">
                                <span
                                  className={`inline-flex px-3 py-1 text-xs fontsemibold rounded-full ${
                                    job.status === "Active"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {job.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap min-w-[130px] sm:min-w-0">
                                <button
                                  className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-800 font-medium p-2 transition-colors duration-200 hover:bg-blue-50 rounded-lg cursor-pointer"
                                  onClick={() =>
                                    navigate("/applicants", {
                                      state: { jobId: job.id },
                                    })
                                  }
                                >
                                  <Users className="size-4" />
                                  {job.applicants}
                                </button>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap min-w-[200px] sm:min-w-0">
                                <div className="flex items-center justify-around">
                                  <button
                                    className="text-blue-600 hover:text-blue-800 font-medium p-2 transition-colors duration-200 hover:bg-blue-50 rounded-lg cursor-pointer"
                                    onClick={() =>
                                      navigate("/post-job", {
                                        state: { jobId: job.id },
                                      })
                                    }
                                  >
                                    <Edit className="size-4 " />
                                  </button>
                                  {job.status === "Active" ? (
                                    <button
                                      className="flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium p-2 transition-colors duration-200 hover:bg-orange-50 rounded-lg cursor-pointer"
                                      onClick={() => handleStatusChange(job.id)}
                                    >
                                      <X className="size-4 mr-1" />
                                      <span className="hidden sm:inline text-sm">
                                        Close
                                      </span>
                                    </button>
                                  ) : (
                                    <button
                                      className="flex items-center gap-2 text-green-600 hover:text-green-800 font-medium p-2 transition-colors duration-200 hover:bg-green-50 rounded-lg cursor-pointer"
                                      onClick={() => handleStatusChange(job.id)}
                                    >
                                      <Plus className="size-4 mr-1" />
                                      <span className="hidden sm:inline">
                                        Activate
                                      </span>
                                    </button>
                                  )}
                                  <button
                                    className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200 hover:bg-red-50 rounded-md cursor-pointer  gap-2"
                                    onClick={() => handleDeleteJob(job.id)}
                                  >
                                    <Trash2 className="size-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-3 flex flex-col md:flex-row items-center justify-between">
              <div className="">
                <button
                  className={`px-3 py-1 mr-2 rounded-md border border-gray-300 text-sm font-medium ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className={`px-3 py-1 rounded-md border border-gray-300 text-sm font-medium ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() =>
                    setCurrentPage(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
              {/* Result Summary */}
              <div className="my-4">
                <p className="text-sm text-gray-600">
                  Showing {paginatedJobs.length} of {filterAndSortJobs.length}{" "}
                  jobs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default ManageJobs;
