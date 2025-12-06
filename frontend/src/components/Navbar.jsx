import { SquarePen } from "lucide-react";
import { Link } from "react-router-dom";
import React, { memo } from "react";

function Navbar({
  showPublish = false,
  onLoginClick,
  isLoggedIn = false,
  hideNav = false,
}) {
  return (
    <nav className="w-full border-b bg-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 z-50">
      <Link to="/" className="text-2xl font-bold tracking-tight">
        Novus
      </Link>

      {/* Navigation menu */}
      {!showPublish && !hideNav && (
        <ul className="hidden md:flex gap-8 text-gray-700">
          <Link to="/home" className="hover:text-black">
            Home
          </Link>
          <li className="cursor-pointer hover:text-black">Blogs</li>
          <li className="cursor-pointer hover:text-black">Categories</li>
        </ul>
      )}

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Show Publish button on createblog page */}
        {showPublish ? (
          <button
            type="submit"
            form="createBlogForm"
            className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition"
          >
            Publish
          </button>
        ) : (
          isLoggedIn && (
            <Link
              to="/create-blog"
              className="flex items-center bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200 transition"
            >
              <SquarePen className="w-5 h-5 mr-2" />
              Write
            </Link>
          )
        )}

        {/* Login button for non-logged-in users */}
        {!isLoggedIn && !showPublish && (
          <button
            onClick={onLoginClick}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900 transition cursor-pointer"
          >
            Login
          </button>
        )}

        {/* Avatar placeholder for logged-in users */}
        {isLoggedIn && !showPublish && (
          <img
            src="https://i.pravatar.cc/40"
            className="w-9 h-9 rounded-full cursor-pointer"
            alt="profile"
          />
        )}
      </div>
    </nav>
  );
}

export default memo(Navbar);
