import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import defaultUser from "../../assets/user.png";
import axiosInstance, {
  toastStyleError,
  toastStyleSuccess,
} from "../../utils/axiosInstance";
import uploadImage from "../../utils/uploadImage";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import Navbar from "../../components/Layouts/Navbar";
import { Link } from "react-router-dom";
import { Mail, Save, Trash2, User2, X } from "lucide-react";
import InputField from "../../components/Input/InputField";
import Swal from "sweetalert2";

const UserProfile = () => {
  const { user, updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || defaultUser,
    resume: user?.resume,
  });

  const [formData, setFormData] = useState({ ...profileData });
  const [uploading, setUploading] = useState({
    avatar: false,
    logo: false,
    resume: false,
  });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file, type) => {
    setUploading((prev) => ({ ...prev, [type]: true }));
    try {
      const imgUploadRes = await uploadImage(file);
      const avatarUrl = imgUploadRes.imageUrl || "";

      handleInputChange(type, avatarUrl);
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
      handleInputChange(type, previewUrl);

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
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!", toastStyleSuccess);

        setProfileData({ ...formData });
        updateUser({ ...formData });
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
  };

  const deleteResume = async () => {
    const result = await Swal.fire({
      title: "Are you sure delete this resume?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#EF4444",
      cancelButtonText: "No, cancel",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    setSaving(true);

    try {
      const response = await axiosInstance.delete(
        API_PATHS.AUTH.DELETE_RESUME,
        {
          data: { resumeUrl: user.resume },
        }
      );

      if (response.status === 200) {
        toast.success("Resume deleted successfully!", toastStyleSuccess);
        setProfileData({ ...formData, resume: "" });
        updateUser({ ...formData, resume: "" });
      }
    } catch (error) {
      toast.error("Failed to delete resume", toastStyleError);
      console.error("Delete resume error:", error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const userData = {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar,
      resume: user?.resume,
    };
    setProfileData({ ...userData });
    setFormData({ ...userData });
    return () => {};
  }, [user]);

  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen bg-slate-50 py-8 px-4 mt-16 lg:m-20">
        <div className="max-w-4xl mx-auto  bg-white overflow-hidden">
          <div className="rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-blue-500 py-4 px-12 flex justify-between items-center">
              <h1 className="text-lg font-medium text-white">Profile</h1>
            </div>
            <div className="px-12 py-8">
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative">
                    <img
                      src={formData.avatar || defaultUser}
                      alt="Avatar"
                      className="size-40 rounded-full object-cover border-2 border-slate-200"
                    />
                    {uploading?.avatar && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
                        <div className="size-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="flex items-center px-3 py-2 bg-slate-50 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-100 cursor-pointer transition-colors duration-300">
                      <span className="sr-only">Choose avatar</span>
                      <input
                        type="file"
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:transition-colors file:duration-300 file:cursor-pointer"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "avatar")}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <InputField
                    label="Full Name"
                    type="text"
                    id="title"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    icon={User2}
                  />
                </div>

                <div>
                  <InputField
                    label="Email Address"
                    type="email"
                    id="email"
                    value={formData.email}
                    disabled
                    icon={Mail}
                  />
                </div>

                {user?.resume ? (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Resume
                    </label>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm text-slate-600">
                        Link :{" "}
                        <a
                          href={user?.resume}
                          target="_blank"
                          className="text-blue-600 underline cursor-pointer"
                          rel="noreferrer"
                        >
                          {user?.resume}
                        </a>
                      </p>
                      <button
                        className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300 cursor-pointer"
                        onClick={deleteResume}
                      >
                        <Trash2 className="size-4 text-red-50" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col space-y-2 text-slate-700 mb-2">
                      <label className="block text-sm font-medium">
                        Resume{" "}
                      </label>
                      <span className="sr-only">Choose File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageChange(e, "resume");
                        }}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100 transition-colors duration-300 file:cursor-pointer"
                      />
                      <span className="text-xs text-red-400 italic">
                        Only img extension: jpg/jpeg, png, webp.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-slate-200">
                <Link
                  onClick={handleCancel}
                  to="/find-jobs"
                  className="px-3 py-2 text-sm rounded-lg bg-slate-400 hover:bg-slate-500 text-white transition-colors flex items-center gap-2"
                >
                  <X className="size-4" />
                  <span className="">Cancel</span>
                </Link>
                <button
                  className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
    </div>
  );
};

export default UserProfile;
