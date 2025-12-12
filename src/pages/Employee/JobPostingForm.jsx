import { useState, useEffect } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AlertCircle,
  MapPin,
  DollarSign,
  Briefcase,
  Users,
  Eye,
  Send,
  BriefcaseBusiness,
} from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import toast from "react-hot-toast";
import InputField from "../../components/Input/InputField";
import SelectField from "../../components/Input/SelectField";
import TextAreaField from "../../components/Input/TextAreaField";
import { validateJobForm } from "../../utils/helper";
import JobPostingPreview from "../../components/Cards/JobPostingPreview";

const JobPostingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId || null;
  const toastStyleError = {
    position: "top-right",
    duration: 5000,
    style: {
      background: "#b91c1c",
      color: "#fff",
      padding: "10px",
      borderRadius: "10px",
    },
  };

  const toastStyleSuccess = {
    position: "top-right",
    duration: 5000,
    style: {
      background: "#15803d",
      color: "#fff",
      padding: "10px",
      borderRadius: "10px",
    },
  };

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "",
    jobType: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));

    // Hapus error ketika user memasukkan input
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateJobForm(errors, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    const jobPayLoad = {
      title: formData.title,
      description: formData.description,
      requirements: formData.requirements,
      location: formData.location,
      category: formData.category,
      jobType: formData.jobType,
      salaryMin: formData.salaryMin,
      salaryMax: formData.salaryMax,
    };

    try {
      const response = jobId
        ? await axiosInstance.put(API_PATHS.JOBS.UPDATE_JOB(jobId), jobPayLoad)
        : await axiosInstance.post(API_PATHS.JOBS.POST_JOB, jobPayLoad);

      if (response.status === 200 || response.status === 201) {
        toast.success("Job posted successfully!", toastStyleSuccess);
        setFormData({
          title: "",
          location: "",
          category: "",
          jobType: "",
          description: "",
          requirements: "",
          salaryMin: "",
          salaryMax: "",
        });
        navigate("/employer-dashboard");
        return;
      } else {
        console.error("Unexpected response: ", response);
        toast.error("Something went wrong.", toastStyleError);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        console.error("API Error: ", error.response.data.message);
        toast.error(error.response.data.message, toastStyleError);
      }
      console.error("Error posting job:", error);
      toast.error("Failed to post job. Please try again.", toastStyleError);
    } finally {
      setIsSubmitting(false);
    }
  };

  validateJobForm(errors, formData);

  const isFormValid = () => {
    const validationErrors = validateJobForm(errors, formData);
    return Object.keys(validationErrors).length === 0;
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (jobId) {
        try {
          const response = await axiosInstance.get(
            API_PATHS.JOBS.GET_JOB_BY_ID(jobId)
          );
          const jobData = response.data.dataJob;
          if (jobData) {
            setFormData({
              title: jobData.title,
              location: jobData.location,
              category: jobData.category,
              jobType: jobData.jobType,
              description: jobData.description,
              requirements: jobData.requirements,
              salaryMin: jobData.salaryMin,
              salaryMax: jobData.salaryMax,
            });
          }
        } catch (error) {
          console.error("Error fetching job details: ", error);
          if (error.response) {
            console.error("API Error: ", error.response.data.message);
            toast.error(
              "Failed to fetch job details. Please try again.",
              toastStyleError
            );
          }
        }
      }
    };

    fetchJobDetails();

    return () => {};
  }, [jobId]);

  if (isPreview) {
    return (
      <div>
        <DashboardLayout activeMenu={"post-job"}>
          <JobPostingPreview formData={formData} setIsPreview={setIsPreview} />
        </DashboardLayout>
      </div>
    );
  }

  return (
    <div>
      <DashboardLayout activeMenu={"post-job"}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    {jobId ? "Update Job" : "Post a New Job"}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {jobId
                      ? "Update your job details."
                      : "Fill out the form below to post a new job."}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    disabled={!isFormValid()}
                    onClick={() => setIsPreview(true)}
                    className="group flex items-center space-x-2  text-sm font-medium text-gray-600 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 hover:shadow-none transform transition-all hover:-translate-y-0.5 duration-300 px-4 py-2 rounded-md cursor-pointer shadow-sm disabled:bg-gray-400 disabled:text-white disabled:hover:text-white disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-gray-400 disabled:hover:shadow-none disabled:hover:-translate-y-0 disabled:hover:bg-none"
                  >
                    <Eye
                      strokeWidth={1.5}
                      className="size-4 transition-transform group-hover:-traslate-x-1"
                    />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                {/* Job Title */}
                <InputField
                  label="Job Title"
                  type="text"
                  id="title"
                  placeholder="e.g Software Frontend Developer"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  error={errors.title}
                  required
                  icon={BriefcaseBusiness}
                />

                {/* Location & Remote */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row space-y-4 sm:items-end sm:space-x-4 sm:space-y-0 md:space-x-4">
                    <div className="flex-1">
                      <InputField
                        label="Location"
                        type="text"
                        id="location"
                        placeholder="e.g Jakarta, ID"
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        error={errors.location}
                        required
                        icon={MapPin}
                      />
                    </div>
                  </div>
                </div>

                {/* Category & Job Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectField
                    label="Category"
                    id="category"
                    options={CATEGORIES}
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    placeholder="Select Category"
                    error={errors.category}
                    required
                    icon={Users}
                  />
                  <SelectField
                    label="Job Type"
                    id="jobType"
                    options={JOB_TYPES}
                    value={formData.jobType}
                    onChange={(e) =>
                      handleInputChange("jobType", e.target.value)
                    }
                    placeholder="Select Category"
                    error={errors.jobType}
                    required
                    icon={Briefcase}
                  />
                </div>

                {/* Description */}
                <TextAreaField
                  label="Description"
                  id="description"
                  value={formData.description}
                  placeholder="Describe the job responsibilities, skills, and experience requirements."
                  error={errors.description}
                  required
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  helperText="Include job responsibilities, skills, and experience requirements."
                />
                {/* Requirements */}
                <TextAreaField
                  label="Requirements"
                  id="requirements"
                  value={formData.requirements}
                  placeholder="List key qualifications and experiences"
                  error={errors.requirements}
                  required
                  onChange={(e) =>
                    handleInputChange("requirements", e.target.value)
                  }
                  helperText="Include required skills, experience level, education, and other qualifications."
                />

                <div className="space-y-2">
                  <label
                    htmlFor="salaryMin"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Salary Range <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <DollarSign
                          strokeWidth={1.5}
                          className="size-5 text-gray-400"
                        />
                      </div>
                      <input
                        type="number"
                        value={formData.salaryMin}
                        onChange={(e) =>
                          handleInputChange("salaryMin", e.target.value)
                        }
                        placeholder="Min salary"
                        className="w-full pl-10 pr-3 py-2 border rounded-lg text-base border-gray-300 transition-colors duration-300  focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-20"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <DollarSign
                          strokeWidth={1.5}
                          className="size-5 text-gray-400"
                        />
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={formData.salaryMax}
                        onChange={(e) =>
                          handleInputChange("salaryMax", e.target.value)
                        }
                        placeholder="Max salary"
                        className="w-full pl-10 pr-3 py-2 border rounded-lg border-gray-300 text-base transition-colors duration-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-20"
                      />
                    </div>
                  </div>
                  {errors.salary && (
                    <div className="flex items-center space-x-1 text-sm text-red-600">
                      <AlertCircle className="size-4 text-red-500" />
                      <span className="text-sm text-red-500">
                        {errors.salary}
                      </span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isFormValid()}
                    className="w-full flex items-center justify-center px-4 py-2 bg-indigo-500 text-base font-medium hover:bg-indigo-700 text-white rounded-lg cursor-pointer transition-colors duration-300 disabled:opacity-50 focus:ring-offset-2 focus:ring focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-400 outline-none [appearance:textfield]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full size-5 border-b-2 border-white mr-2 "></div>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Send strokeWidth={1.5} className="size-5 mr-2" />
                        {jobId ? "Update" : "Submit"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default JobPostingForm;
