import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export const ErrorForms = ({
  emailError,
  passwordError,
  fullnameError,
  avatarError,
  roleError,
  submitError,
}) => {
  // Satukan semua error ke array
  const allErrors = [
    fullnameError,
    emailError,
    roleError,
    avatarError,
    ...(Array.isArray(passwordError)
      ? passwordError
      : passwordError
      ? [passwordError]
      : []),
  ].filter(Boolean); // hapus yang kosong

  if (allErrors.length === 0 && !submitError) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-red-100 rounded-lg p-3 mt-2"
    >
      <div className="flex items-start">
        {/* Satu icon alert di kiri */}
        <AlertCircle
          strokeWidth={1.5}
          className="size-5 text-red-500 mr-2 mt-0.5"
        />
        <div>
          {/* Pesan pembuka */}
          <p className="text-red-600 text-sm font-semibold">
            Please, fix these following errors:
          </p>
          {/* Daftar error */}
          <ul className="list-disc list-inside text-red-500 font-semibold text-sm mt-1 space-y-0.5">
            {submitError && (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-center -mb-2"
              >
                <span className="mr-3 text-[28px]">•</span> {submitError}.
              </motion.li>
            )}
            {allErrors.length > 0 && (
              <ul className="list-disc list-inside text-red-500 text-sm space-y-0.5">
                {allErrors.map((err, i) => (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    key={i}
                  >
                    {err}
                  </motion.li>
                ))}
              </ul>
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
export default ErrorForms;
