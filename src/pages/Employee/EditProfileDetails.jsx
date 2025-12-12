import { Save, X } from "lucide-react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useEffect } from "react";

const EditProfileDetails = ({
  formData,
  handleImageChange,
  handleInputChange,
  handleSave,
  handleCancel,
  saving,
  uploading,
}) => {
  return (
    <DashboardLayout activeMenu="company-profile">
      {formData && (
        <div className="min-h-screen bg-gray-50 py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden">
              {/* header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                <h1 className="text-lg md:text-xl font-medium text-white">
                  Edit Profile
                </h1>
              </div>
              {/* Edit Form */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-800 border-b border-gray-200 ">
                      Personal Information
                    </h2>
                    {/* Avatar Upload */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={formData?.avatar}
                          alt="Avatar"
                          className="size-20 rounded-full object-cover border-3 border-gray-200 "
                        />
                        {uploading?.avatar && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                            <div className="size-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block">
                          <span className="sr-only">Choose Avatar</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "avatar")}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:transition-colors duration-300 file:cursor-pointer"
                          />
                        </label>
                      </div>
                    </div>
                    {/* Name input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200 text-slate-800"
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Enter full name"
                      />
                    </div>
                    {/* Email input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="text"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg text-slate-800 disabled:bg-slate-100 disabled:text-gray-400 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  {/* company information */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-800 border-b border-gray-200">
                      Company Information
                    </h2>

                    {/* Company Logo Upload */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={
                            formData?.companyLogo ||
                            "https://placehold.co/600x400"
                          }
                          alt="Company Logo"
                          className="size-20 rounded-lg object-cover border-3 border-gray-200 "
                        />
                        {uploading.logo && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                            <div className="size-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block">
                          <span className="sr-only">Choose Company Logo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "logo")}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 file:transition-colors duration-300 file:cursor-pointer"
                          />
                        </label>
                      </div>
                      {/* company name */}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                        className="w-full px-4 py-2 text-sm bg-slate-50 text-slate-800 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                        placeholder="Enter company name"
                      />
                    </div>
                    {/* company description */}
                    <div>
                      <label className="block text-sm font-medium text-slate-800">
                        Company Description
                      </label>
                      <textarea
                        value={formData.companyDescription}
                        onChange={(e) =>
                          handleInputChange(
                            "companyDescription",
                            e.target.value
                          )
                        }
                        rows={4}
                        className="w-full px-4 py-2 text-sm text-slate-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                        placeholder="Describe your Company..."
                      />
                    </div>
                  </div>
                </div>
                {/* action buttons */}
                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                  <button
                    className="flex items-center space-x-1 px-4 py-2 bg-slate-400 rounded-lg text-white text-sm hover:bg-slate-600 transition-colors duration-200 cursor-pointer"
                    onClick={handleCancel}
                  >
                    <X className="size-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 cursor-pointer"
                    onClick={handleSave}
                    disabled={saving || uploading.avatar || uploading.logo}
                  >
                    {saving ? (
                      <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Save className="size-4" />
                    )}
                    <span>{saving ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EditProfileDetails;
