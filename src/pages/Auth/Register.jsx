import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle,
  Eye,
  EyeOff,
  Loader,
  Lock,
  Mail,
  Upload,
  User,
  UserCheck,
} from "lucide-react";
import Lottie from "lottie-react";
import accountCreated from "../../assets/lotties/account-created.json";
import { useState } from "react";
import { Link } from "react-router-dom";
import { validateAvatar, validateForm } from "../../utils/helper";
import { ErrorForms } from "../../components/ui/ErrorForms";
import uploadImage from "../../utils/uploadImage";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    avatar: null,
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    avatarPreview: null,
    success: false,
  });

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    // Clear role error when user selects a role
    if (formState.errors.role) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, role: "" },
      }));
    }
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const error = validateAvatar(file);
      if (error) {
        setFormState((prev) => ({
          ...prev,
          errors: { ...prev.errors, avatar: error },
        }));
        return;
      }
    }
    setFormData((prev) => ({ ...prev, avatar: file }));
    // Create Preview
    if (file && file instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setFormState((prev) => ({
          ...prev,
          avatarPreview: e.target.result,
          errors: { ...prev.errors, avatar: "" },
        }));
      };
      reader.readAsDataURL(file);
    } else {
      console.log();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (formState.errors[name]) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: "" },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(setFormState, formData, true)) return; // Validate form
    setFormState((prev) => ({ ...prev, loading: true }));

    try {
      // Register API call
      let avatarUrl = "";

      // upload acatar jika ada
      if (formData.avatar) {
        const imgUploadRes = await uploadImage(formData.avatar);
        avatarUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: formData.fullname,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        avatar: avatarUrl || "",
      });

      // Jika sukses registrasi
      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        errors: {},
        message: response.data.message,
      }));

      const { token } = response.data.data;
      if (token) {
        login(response.data.data, token);

        setTimeout(() => {
          window.location.href =
            formData.role === "employer" ? "/employer-dashboard" : "/find-jobs";
        }, 4000);
      }
    } catch (error) {
      console.error("Registration error: ", error);
      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          ...prev.errors,
          submit:
            error.response?.data?.message ||
            "Registration failed. Please try again.",
        },
      }));
    }
    validateForm(setFormState, formData, true); // Validate form
  };

  if (formState.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center"
        >
          <Lottie
            animationData={accountCreated}
            loop={true}
            style={{ height: 300, width: 300 }}
            className="mx-auto"
          />
          <div className="animate-spin size-6 border-2 border-blue-500 rounded-full mx-auto mt-4 text-center mb-8"></div>
          <p className="text-sm text-gray-500 mt-2">
            Redirecting to your Dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            Create an Account
          </h2>
          <p className="text-gray-600">
            Join thousands of professionals finding their dream job!
          </p>
        </div>

        <form
          action={handleSubmit}
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-700 font-semibold">
              Full Name <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <User
                strokeWidth={1}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  formState.errors.fullname ? "text-red-500" : "text-indigo-400"
                } size-5`}
              />
              <input
                type="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border ${
                  formState.errors.fullname
                    ? "border-red-500"
                    : "border-indigo-300"
                } focus:ring-blue-500  transisition-colors duration-300`}
                placeholder="Enter your full name"
              />
            </div>
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 font-semibold">
              Email Address <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <Mail
                strokeWidth={1}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  formState.errors.email ? "text-red-500" : "text-indigo-400"
                } size-5`}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border ${
                  formState.errors.email
                    ? "border-red-500"
                    : "border-indigo-300"
                } focus:ring-blue-500 focus:border-transparent transisition-colors duration-300`}
                placeholder="Enter your email address"
              />
            </div>
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm text-gray-700 font-semibold">
              Password <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <Lock
                strokeWidth={1}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  formState.errors.password ? "text-red-500" : "text-indigo-400"
                } size-5`}
              />
              <input
                type={formState.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border ${
                  formState.errors.email
                    ? "border-red-500"
                    : "border-indigo-300"
                } focus:ring-blue-500 focus:border-transparent transisition-colors duration-300`}
                placeholder="Password at least 8 characters."
              />
              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 cursor-pointer"
                tabIndex={-1}
              >
                <motion.span
                  key={formState.showPassword ? "EyeOff" : "Eye"}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                  transition={{ duration: 0.7 }}
                >
                  {formState.showPassword ? (
                    <EyeOff color="blue" strokeWidth={1} className="size-5" />
                  ) : (
                    <Eye color="blue" strokeWidth={1} className="size-5" />
                  )}
                </motion.span>
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm text-gray-700 font-semibold"
            >
              I am a <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRoleChange("jobseeker")}
                className={`px-4 py-2 rounded-lg border text-sm font-medium focus:outline-none cursor-pointer ${
                  formData.role === "jobseeker"
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <UserCheck
                  strokeWidth={1}
                  className="size-8 mx-auto mb-2 text-blue-700"
                />
                <div className="font-medium">Job Seeker</div>
                <div className="text-xs text-gray-500">
                  Looking for opportunities
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("employer")}
                className={`px-4 py-2 rounded-lg border text-sm font-medium focus:outline-none cursor-pointer ${
                  formData.role === "employer"
                    ? "bg-indigo-50 border-indigo-300"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Building2
                  strokeWidth={1}
                  className="size-8 mx-auto mb-2 text-indigo-700"
                />
                <div className="font-medium">Employer</div>
                <div className="text-xs text-gray-500">Hiring talent</div>
              </button>
            </div>
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="block text-sm text-gray-700 font-semibold">
              Profile Picture (Optional)
            </label>
            <div className="flex items-center space-x-4">
              <div className="size-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {formState.avatarPreview ? (
                  <img
                    src={formState.avatarPreview}
                    alt="Avatar Preview"
                    className="size-full object-cover "
                  />
                ) : (
                  <User className="size-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className="cursor-pointer text-sm border border-indigo-300 rounded-lg px-4 py-2 text-gray-700 font-medium hover:bg-indigo-100 transition-colors duration-300 flex items-center justify-between space-x-2"
                >
                  <span>Choose Photo </span>
                  <Upload
                    strokeWidth={1}
                    className="size-4 ml-2 text-blue-500"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, JPEG, PNG, WEBP (Max 2MB).
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600  hover:bg-blue-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer"
          >
            {formState.loading ? (
              <>
                <Loader className="size-5 animate-spin" />
                <span className="animate-pulse">Creating Account...</span>
              </>
            ) : (
              <span className="">Register Now</span>
            )}
          </button>

          <ErrorForms
            emailError={formState.errors.email}
            passwordError={formState.errors.password}
            fullnameError={formState.errors.fullname}
            avatarError={formState.errors.avatar}
            roleError={formState.errors.role}
          />

          {/* Sign up link */}
          <div className="font-semibold text-center">
            <p className="text-sm text-gray-600">
              Already have account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline transition-transform duration-500"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
