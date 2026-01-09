import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AuthModal({ type, onClose, switchType }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = type === "login" ? "login" : "signup";
      const payload =
        type === "login"
          ? { email: formData.email, password: formData.password }
          : { name: formData.name, email: formData.email, password: formData.password };

      const res = await fetch(`${API_BASE}/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Authentication failed");

      if (data?.token) localStorage.setItem("token", data.token);
      if (data?.userId) localStorage.setItem("userId", data.userId);

      onClose?.();
      navigate("/home");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-2xl p-8 shadow-xl relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-black">
          <X />
        </button>

        <h2 className="text-3xl font-bold text-center mb-2">
          {type === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          {type === "login" ? "Log in to continue writing and exploring." : "Sign up to start sharing your stories."}
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {type === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

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

          {error && <div className="text-sm text-red-600" role="alert">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`bg-black text-white py-3 rounded-lg transition mt-2 ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-900"}`}
          >
            {loading ? "Please wait..." : type === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {type === "login" ? (
            <>
              Don’t have an account? <button onClick={() => switchType("signup")} className="text-black font-medium hover:underline">Sign Up</button>
            </>
          ) : (
            <>
              Already have an account? <button onClick={() => switchType("login")} className="text-black font-medium hover:underline">Login</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
