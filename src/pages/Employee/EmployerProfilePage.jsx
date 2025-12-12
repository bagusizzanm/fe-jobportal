import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { Building2, Edit3, Mail } from "lucide-react";
import EditProfileDetails from "./EditProfileDetails";
import uploadImage from "../../utils/uploadImage";
import axiosInstance, {
  toastStyleError,
  toastStyleSuccess,
} from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const EmployerProfilePage = () => {
  const { user, updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name,
    email: user?.email,
    avatar: user?.avatar,
    companyName: user?.companyName,
    companyDescription: user?.companyDescription || "No description provided.",
    companyLogo: user?.companyLogo,
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        companyName: user.companyName,
        companyDescription: user.companyDescription,
        companyLogo: user.companyLogo,
      });
    }
  }, [user]);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file, type) => {
    setUploading((prev) => ({ ...prev, [type]: true }));
    try {
      const imgUploadRes = await uploadImage(file);
      const avatarUrl = (await imgUploadRes.imageUrl) || "";
      const field = type === "avatar" ? "avatar" : "companyLogo";
      handleInputChange(field, avatarUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed", toastStyleError);
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      const field = type === "avatar" ? "avatar" : "companyLogo";
      handleInputChange(field, previewUrl);
      handleImageUpload(file, type);
    }
  };

  const handleSave = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#EF4444",
      cancelButtonText: "No, cancel",
      confirmButtonText: "Yes, save it!",
    });

    if (!result.isConfirmed) return;

    setSaving(true);
    try {
      // Simulate API call to save profile data
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      if (response.status === 200) {
        toast.success(
          "Profile details updated successfully!",
          toastStyleSuccess
        );
        setProfileData({ ...formData });
        updateUser({ ...formData });
        setEditMode(false);
      }
    } catch (error) {
      toast.error("Failed to update profile details", toastStyleError);
      console.error("Save profile error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
    setEditMode(false);
  };

  if (editMode) {
    return (
      <EditProfileDetails
        formData={formData}
        handleImageChange={handleImageChange}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        saving={saving}
        uploading={uploading}
      />
    );
  }

  return (
    <DashboardLayout activeMenu="company-profile">
      <div className="min-h-screen py-6 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-t-lg flex items-center justify-between">
              <h1 className="text-lg md:text-xl font-medium text-white">
                Employer Profile
              </h1>
              <button
                className="inline-flex items-center gap-2 text-sm bg-white/10 hover:bg-opacity-30 hover:bg-blue-300/30 text-white px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer"
                onClick={() => setEditMode(true)}
              >
                <Edit3 className="size-3" />
                <span>Edit</span>
              </button>
            </div>
            {/* Profile Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* personal info */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200">
                    Personal Information
                  </h2>
                  {/* Avatar and Name */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={profileData.avatar || "https://placehold.co/600x400"}
                      alt="Avatar"
                      className="size-20 rounded-full object-cover border-2 border-blue-50"
                    />
                    <div className="">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profileData.name}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm mt-1 ">
                        <Mail className="size-3 mr-2" />
                        <span>{profileData.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company info */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200">
                    Company Information
                  </h2>
                  {/* company logo and name */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        profileData?.companyLogo ||
                        "https://placehold.co/600x400"
                      }
                      alt="Company Logo"
                      className="size-20 rounded-lg object-cover border-4 border-blue-50"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profileData.companyName}
                      </h3>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <Building2 className="size-3 mr-2" />
                        <span>Company</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Company Description */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 mb-4">
                  About Company
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-3">
                  {profileData.companyDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerProfilePage;
