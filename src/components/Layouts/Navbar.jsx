import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Bookmark, Briefcase } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // menutup dropdown profile saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open) setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/find-jobs" className="flex items-center space-x-2">
            <div className="size-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase className="size-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">Job Portal</span>
          </Link>
          {/* Auth */}
          <div className="flex items-center space-x-3">
            {user && (
              <button
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200 relative cursor-pointer"
                onClick={() => navigate("/saved-jobs")}
              >
                <Bookmark
                  className="size-5 text-blue-500"
                  strokeWidth={2}
                  fill="#3e9392"
                />
              </button>
            )}

            {isAuthenticated ? (
              <ProfileDropdown
                isOpen={open}
                onToggle={(e) => {
                  e.stopPropagation();
                  setOpen(!open);
                }}
                onLogout={logout}
              />
            ) : (
              <>
                <Link
                  to="/"
                  className="text-slate-600 hover:text-slate-900 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-slate-100"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
