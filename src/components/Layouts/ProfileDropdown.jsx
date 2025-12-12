import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import defaultUser from "../../assets/user.png";

const ProfileDropdown = ({ isOpen, onToggle, onLogout }) => {
  const { user } = useAuth();

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
      >
        <img
          src={user?.avatar || defaultUser}
          alt="Profile"
          className="size-9 rounded-xl object-cover"
        />

        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.role}</p>
        </div>
        <ChevronDown
          className={`text-gray-500 size-4 ${
            isOpen ? "rotate-180" : ""
          } transition-all duration-300 `}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 text-left"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user?.companyName || user?.name}
            </p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <Link
            to={user?.companyName ? "/company-profile" : "/profile"}
            className="block px-4 py-2 mt-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-300"
          >
            View Profile
          </Link>
          <Link
            to="/"
            onClick={onLogout}
            className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-300"
          >
            Sign Out
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileDropdown;
