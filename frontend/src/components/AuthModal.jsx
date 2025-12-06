import { X } from "lucide-react";
import { useState } from "react";

export default function AuthModal({ type, onClose, switchType }) {
  // Local form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input updates
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simple submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert(type === "login" ? "Logged in!" : "Account created!");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {/* Card */}
      <div className="bg-white w-full max-w-sm rounded-2xl p-8 shadow-xl relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black cursor-pointer"
        >
          <X />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">
          {type === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          {type === "login"
            ? "Log in to continue writing and exploring."
            : "Sign up to start sharing your stories."}
        </p>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Name only for signup */}
          {type === "signup" && (
            <div className="flex flex-col gap-1">
              {/* <label className="text-sm text-gray-600">Name *</label> */}
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          )}

          {/* Unique username only for signup */}
          {type === "signup" && (
            <div className="flex flex-col gap-1">
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1">
            {/* <label className="text-sm text-gray-600">Email *</label> */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Pswd */}
          <div className="flex flex-col gap-1">
            {/* <label className="text-sm text-gray-600">Password *</label> */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Submit btn */}
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition mt-2"
          >
            {type === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Switch between login & signup */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {type === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => switchType("signup")}
                className="text-black font-medium hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => switchType("login")}
                className="text-black font-medium hover:underline cursor-pointer"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
