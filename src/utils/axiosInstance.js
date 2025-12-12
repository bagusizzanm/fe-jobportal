import axios from "axios";
import { BASE_URL } from "./apiPaths";
import toast from "react-hot-toast";

export const toastStyleError = {
  position: "bottom-right",
  duration: 5000,
  style: {
    background: "#FFEBEE",
    color: "red",
    padding: "10px",
    borderRadius: "10px",
  },
};
export const toastStyleSuccess = {
  position: "top-center",
  duration: 5000,
  style: {
    background: "#e6fffa",
    color: "green",
    padding: "10px",
    borderRadius: "10px",
  },
};
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.dispatchEvent(
          new CustomEvent("force-logout", {
            detail: { message: "Session expired. Please login again." },
          })
        );
        toast.error("Session expired. Please login again.", toastStyleError);
        return Promise.reject(error);
      } else if (error.response.status === 500) {
        console.error("Server error. Please, try again later.");
        toast.error("Server error. Please, try again later.", toastStyleError);
        return Promise.reject(error);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timed out. Please, try again later.");
      toast.error(
        "Request timed out. Please, try again later.",
        toastStyleError
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
