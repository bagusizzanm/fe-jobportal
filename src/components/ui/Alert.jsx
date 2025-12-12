import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export const Alert = ({ type, message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
    >
      <AlertCircle className="alert-icon" />
      <span className="alert-message">{message}</span>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </motion.div>
  );
};
