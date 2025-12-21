import { useState } from "react";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";

export default function Landing() {
  const [authType, setAuthType] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar
        onLoginClick={() => setAuthType("login")}
        isLoggedIn={false}
        hideNav={true}
      />

      <div className="flex flex-col md:flex-row items-center justify-center grow px-8 py-12 gap-10">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            A fresh way to
            <span className="text-black block mt-1">share your stories.</span>
          </h1>

          <p className="mt-5 text-gray-600 text-lg leading-relaxed">
            Read, write, and explore thoughts that matter.
          </p>

          <button
            onClick={() => setAuthType("signup")}
            className="inline-block mt-7 bg-black text-white px-7 py-3 rounded-xl text-lg hover:bg-gray-900 transition cursor-pointer"
          >
            Start Writing
          </button>
        </div>

        <div className="w-full md:w-[450px]">
          <img
            src="https://images.unsplash.com/photo-1494173853739-c21f58b16055?w=800"
            alt="hero"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {authType && (
        <AuthModal
          type={authType}
          onClose={() => setAuthType(null)}
          switchType={(to) => setAuthType(to)}
        />
      )}
    </div>
  );
}
