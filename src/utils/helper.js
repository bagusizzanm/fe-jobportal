export const validateForm = (setFormState, formData, isRegister = false) => {
  const errors = {
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };
  if (isRegister) {
    errors.fullname = !formData.fullname ? "Enter your fullname." : "";
    errors.avatar = "";
    errors.role = !formData.role ? "Select a role." : "";
  }
  // Remove empty errors
  Object.keys(errors).forEach((key) => {
    if (
      (Array.isArray(errors[key]) && errors[key].length === 0) || // hapus password array kosong
      (!Array.isArray(errors[key]) && !errors[key]) // hapus string kosong
    ) {
      delete errors[key];
    }
  });

  setFormState((prev) => ({ ...prev, errors }));
  return Object.keys(errors).length === 0;
};

export const validateJobForm = (errors, formData) => {
  errors = {};

  if (!formData.title.trim()) errors.title = "Job title is required";

  if (!formData.category.trim()) errors.category = "Category is required";

  if (!formData.jobType.trim()) errors.jobType = "Job type is required";

  if (!formData.location.trim()) errors.location = "Location is required";

  if (!formData.description.trim())
    errors.description = "Description is required";

  if (!formData.requirements.trim())
    errors.requirements = "Requirements is required";

  if (!formData.salaryMin || !formData.salaryMax) {
    errors.salaryMin = "Both Minimum and Maximum salary is required";
  } else if (parseInt(formData.salaryMin) >= parseInt(formData.salaryMax)) {
    errors.salary = "Minimum salary must be less than Maximum salary";
  }
  return errors;
};

export const validateFullname = (fullname) => {
  if (!fullname.trim()) return "Fullname is required.";
  return "";
};

export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please, enter a valid email.";
  return "";
};

export const validatePassword = (password) => {
  const errors = [];
  if (!password) errors.push("Password is required.");
  if (password && password.length < 8)
    errors.push("Password must be at least 8 characters.");
  // if (password && !/(?=.*[A-Z])/.test(password))
  //   errors.push("Password must contain at least one UPPERCASE letter.");
  if (password && !/(?=.*\d)/.test(password))
    errors.push("Password must contain at least 1 number.");
  return errors;
};

export const validateAvatar = (file) => {
  if (!file) return "";
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type))
    return "Only JPG, JPEG, PNG, and WEBP formats are allowed.";
  if (file) {
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) return "Avatar size must be less than 2MB.";
  }
  return "";
};

export const getInitial = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).join("").toUpperCase())
    .slice(0, 2);
};
