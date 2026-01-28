import { useState } from "react";
import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Github, Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const contentType = res.headers.get("content-type");
      let data = {};

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        // Handle 404 HTML page from a server
        throw new Error("Server error: Received unexpected response format.");
      }

      if (!res.ok) {
        throw new Error(data.message || `Error: ${res.status} ${res.statusText}`);
      }

      setStatus("success");
      setMessage(data.message || "Thank you for subscribing!");
      setEmail("");

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);

    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-hero-serif font-bold tracking-tight text-gray-900 block mb-6">
              Novus.
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Empowering voices, connecting minds. A platform where ideas flow freely and stories find their home.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/home" className="hover:text-black transition-colors">Home</Link></li>
              <li><Link to="/create-article" className="hover:text-black transition-colors">Write</Link></li>
              <li><Link to="/dashboard" className="hover:text-black transition-colors">Dashboard</Link></li>
              <li><Link to="/explore" className="hover:text-black transition-colors">Explore</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Topics</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Technology</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Design</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Culture</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Business</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Stay Connected</h4>
            <p className="text-gray-500 text-sm mb-4">
              Join our newsletter for the latest stories and updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={status === "loading"}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-black transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : "Subscribe"}
                </button>
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2 text-green-600 text-xs animate-fade-in">
                  <CheckCircle2 size={14} />
                  <span>{message}</span>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 text-xs animate-fade-in">
                  <AlertCircle size={14} />
                  <span>{message}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Novus. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}