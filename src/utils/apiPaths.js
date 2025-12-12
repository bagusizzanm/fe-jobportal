export const BASE_URL = "https://bejobportal.up.railway.app/api";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    GET_PROFILE: "/auth/profile",
    UPDATE_PROFILE: "/user/update-profile",
    DELETE_RESUME: "/user/resume",
  },

  DASHBOARD: {
    OVERVIEW: `/analytics/overview`,
  },

  JOBS: {
    POST_JOB: "/job",
    GET_ALL_JOBS: "/job",
    GET_JOBS_EMPLOYER: "/job/get-jobs-employer",
    GET_JOB_BY_ID: (id) => `/job/${id}`,
    UPDATE_JOB: (id) => `/job/${id}`,
    DELETE_JOB: (id) => `/job/${id}`,
    TOGGLE_CLOSE: (id) => `/job/${id}/toggle-close`,

    SAVE_JOB: (id) => `/save-jobs/${id}`,
    UNSAVE_JOB: (id) => `/save-jobs/${id}`,
    GET_SAVED_JOBS: "/save-jobs/my-job",
  },

  APPLICATIONS: {
    APPLY_JOB: (id) => `/application/${id}`,
    GET_ALL_APPLICATIONS: (id) => `/application/job/${id}`,
    UPDATE_STATUS_APPLICATION: (id) => `/application/${id}/status`,
  },

  IMAGE: {
    UPLOAD_IMAGE: "/auth/upload-image",
  },
};
