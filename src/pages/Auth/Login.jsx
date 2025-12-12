import { motion } from "framer-motion";
import { LoaderCircle, Eye, EyeOff, Loader, Lock, Mail } from "lucide-react";
import Lottie from "lottie-react";
import success from "../../assets/lotties/success.json";
import { useState } from "react";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/helper";
import { ErrorForms } from "../../components/ui/ErrorForms";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    success: false,
  });

  const handleInputChange = (e) => {
    const { name, password, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formState.errors[name] || formState.errors.password) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: "", password: "" },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientErrors = {};
    const emailError = validateEmail(formData.email);
    if (emailError) clientErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) clientErrors.password = passwordError;

    setFormState((prev) => ({ ...prev, loading: true, errors: clientErrors }));

    try {
      // Login API call
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        errors: {},
        message: response.data.message,
      }));

      const { token, role } = response.data.data;

      if (token) {
        login(response.data.data, token);

        // redirect berdasaran role
        setTimeout(() => {
          window.location.href =
            role === "employer" ? "/employer-dashboard" : "/find-jobs";
        }, 3000);
      }
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          ...prev.errors,
          submit:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
        },
      }));
    }
  };

  if (formState.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl max-w-md w-full text-center"
        >
          <h2 className="text-2xl font-bold text-shadow-gray-900 mb-2">
            Welcome Back!{" "}
          </h2>
          <p className="text-gray-600">{formState.message}</p>
          <Lottie
            animationData={success}
            loop={true}
            style={{ height: 300, width: 300 }}
            className="mx-auto"
          />
          <div className="flex space-x-2 justify-center items-center mt-2">
            <LoaderCircle size={20} className="animate-spin text-indigo-600" />
            <p className="text-sm text-gray-500 ">
              Redirecting to your Dashboard...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Error Alerts */}
          <ErrorForms
            emailError={formState.errors.email}
            passwordError={formState.errors.password}
            submitError={formState.errors.submit}
          />
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-800 font-semibold">
              Email Address
            </label>
            <div className="relative">
              <Mail
                strokeWidth={1}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  formState.errors.email ? "text-red-500" : "text-blue-400"
                } size-5`}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border ${
                  formState.errors.email ? "border-red-500" : "border-blue-300"
                } focus:ring-blue-500 focus:border-transparent transisition-colors duration-300`}
                placeholder="Enter your email"
              />
            </div>
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm text-gray-800 font-semibold">
              Password
            </label>
            <div className="relative">
              <Lock
                strokeWidth={1}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  formState.errors.password ? "text-red-500" : "text-blue-400"
                } size-5`}
              />
              <input
                type={formState.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border ${
                  formState.errors.email ? "border-red-500" : "border-blue-300"
                } focus:ring-blue-500 focus:border-transparent transisition-colors duration-300`}
                placeholder="Enter your password"
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
                  key={formState.showPassword ? "eyeoff" : "eye"}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                  transition={{ duration: 0.7 }}
                >
                  {formState.showPassword ? (
                    <EyeOff strokeWidth={1} className="size-5" />
                  ) : (
                    <Eye strokeWidth={1} className="size-5" />
                  )}
                </motion.span>
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">
              Remember me
            </label>
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
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          {/* Sign up link */}
          <div className="font-semibold text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Create one here
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
