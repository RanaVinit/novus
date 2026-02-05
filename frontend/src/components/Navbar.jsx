import { SquarePen, LogOut, LayoutDashboard, User, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { memo, useState, useRef, useEffect } from "react";
import SearchBar from "./SearchBar";

function Navbar({
  showPublish = false,
  onLoginClick,
  isLoggedIn,
  isSubmitting = false,
  onSearch,
  searchValue,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const loggedIn =
    typeof isLoggedIn === "boolean"
      ? isLoggedIn
      : Boolean(localStorage.getItem("token"));

  const handleLoginClick = () => {
    if (typeof onLoginClick === "function") onLoginClick();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowDropdown(false);
    navigate("/");
    window.location.reload();
  };

  const { pathname } = useLocation();
  const isHome = pathname === "/home";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full border-b border-gray-100 bg-white px-6 py-3 flex items-center gap-6 fixed top-0 left-0 z-50 transition-all duration-300">

      <Link
        to={loggedIn ? "/home" : "/"}
        className="text-2xl font-hero-serif font-bold tracking-tight text-gray-900"
      >
        Novus.
      </Link>

      {/* Search */}
      {isHome && (
        <div className="w-60">
          <SearchBar compact value={searchValue} onChange={onSearch} />
        </div>
      )}

      {/* Right Side */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Show Publish button on create article page */}
        {showPublish ? (
          <button
            type="submit"
            form="createArticleForm"
            disabled={isSubmitting}
            className={`bg-green-700 text-white px-4 py-2 rounded-xl transition ${isSubmitting
              ? "opacity-60 cursor-not-allowed"
              : "hover:bg-green-800"
              }`}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        ) : (
          loggedIn && (
            <Link
              to="/create-article"
              className="inline-flex items-center gap-2 mr-4 rounded-full"
            >
              <SquarePen className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600 font-medium">Write</span>
            </Link>
          )
        )}

        {/* Login button for non-logged-in users */}
        {!loggedIn && !showPublish && (
          <button
            onClick={handleLoginClick}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900 transition cursor-pointer"
          >
            Login
          </button>
        )}

        {/* Profile Dropdown for logged-in users */}
        {loggedIn && !showPublish && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 p-0.5 rounded-full hover:bg-gray-50 transition border border-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link
                  to="/dashboard"
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default memo(Navbar);
