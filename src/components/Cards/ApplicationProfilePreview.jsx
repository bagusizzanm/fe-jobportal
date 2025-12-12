import React, { use, useState } from "react";

import StatusBadge from "../StatusBadge";
import axiosInstance, {
  toastStyleError,
  toastStyleSuccess,
} from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { Download, X } from "lucide-react";
import { getInitial } from "../../utils/helper";
import { motion } from "framer-motion";
import moment from "moment";
const statusOptions = ["Applied", "Under Review", "Accepted", "Rejected"];

const ApplicationProfilePreview = ({
  selectedApplicant,
  setSelectedApplicant,
  handleDownloadResume,
  handleClose,
}) => {
  const [currentStatus, setCurrentStatus] = useState(selectedApplicant.status);
  const [loading, setLoading] = useState(false);

  const onChangeStatus = async (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    setLoading(true);

    try {
      const response = await axiosInstance.put(
        API_PATHS.APPLICATIONS.UPDATE_STATUS_APPLICATION(selectedApplicant._id),
        {
          status: newStatus,
        }
      );
      if (response.status === 200) {
        setSelectedApplicant({ ...selectedApplicant, status: newStatus });
        toast.success(
          "Application status updated successfully",
          toastStyleSuccess
        );
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      setCurrentStatus(selectedApplicant.status);
      toast.error(
        error.response?.data?.message || "Failed to update application status",
        toastStyleError
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 bg-[rgba(0,0,0,0.2)] bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-600">
            Applicant Profile
          </h3>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
            onClick={() => handleClose()}
          >
            <X className="size-4 text-gray-500" />
          </button>
        </div>
        {/* Modal content */}
        <div className="p-6">
          <div className="text-center mb-6">
            {selectedApplicant.applicant.avatar ? (
              <img
                src={selectedApplicant.applicant.avatar}
                alt={selectedApplicant.applicant.name}
                className="size-20 rounded-full object-cover mx-auto"
              />
            ) : (
              <div className="size-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-semibold text-xl">
                  {getInitial(selectedApplicant.applicant.name)}
                </span>
              </div>
            )}
            <h4 className="mt-4 text-xl font-semibold text-gray-900">
              {selectedApplicant.applicant.name}
            </h4>
            <p className="text-gray-600">{selectedApplicant.applicant.email}</p>
          </div>

          {/* Modal body */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h5 className="text-gray-700 font-medium mb-2">
                Applied Position{" "}
              </h5>
              <p className="text-gray-700 mb-4">
                {selectedApplicant.job.title}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                {selectedApplicant.job.location} •{" "}
                {selectedApplicant.job.jobType}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h5 className="">Application Details</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status: </span>
                  <StatusBadge status={currentStatus} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Applied Date:</span>
                  <span className="text-gray-800">
                    {" "}
                    {moment(selectedApplicant.appliedAt).format("DD MMMM YYYY")}
                  </span>
                </div>
              </div>
            </div>

            <button
              className="w-full inline-flex items-center text-sm justify-center px-4 py-2 gap-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
              onClick={() =>
                handleDownloadResume(selectedApplicant.applicant.resume)
              }
            >
              <Download className="size-4" />
              Resume
            </button>

            {/* Status dropdown */}
            <div>
              <label
                htmlFor=""
                className="block mb-1 text-gray-700 font-medium text-sm"
              >
                Change Application Status
              </label>
              <select
                value={currentStatus}
                onChange={onChangeStatus}
                disabled={loading}
                className="mt-1 block w-full py-2 px-3 text-slate-600 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {loading && (
                <p className="text-xs text-gray-500 mt-1">Updating status...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicationProfilePreview;
