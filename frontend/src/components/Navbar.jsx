import { SquarePen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import React, { memo } from "react";
import SearchBar from "./SearchBar";

function Navbar({
  showPublish = false,
  onLoginClick,
  isLoggedIn,
  isSubmitting = false,
}) {
  const loggedIn =
    typeof isLoggedIn === "boolean"
      ? isLoggedIn
      : Boolean(localStorage.getItem("token"));
  const handleLoginClick = () => {
    if (typeof onLoginClick === "function") onLoginClick();
  };
  const { pathname } = useLocation();
  const isHome = pathname === "/home";
  return (
    <nav className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center gap-6 fixed top-0 left-0 z-50 transition-all duration-300">

      <Link
        to={loggedIn ? "/home" : "/"}
        className="text-2xl font-hero-serif font-bold tracking-tight text-gray-900"
      >
        Novus.
      </Link>

      {/* Search */}
      {isHome && (
        <div className="basis-1/4">
          <SearchBar compact />
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
              <span className="font-medium">Write</span>
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

        {/* Avatar placeholder for logged-in users */}
        {loggedIn && !showPublish && (
          <Link to="/dashboard">
            <img
              src="https://i.pravatar.cc/40"
              className="w-9 h-9 rounded-full cursor-pointer hover:ring-2 hover:ring-gray-200 transition"
              alt="profile"
            />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default memo(Navbar);
