import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <div className="w-full flex justify-between items-center px-8 py-6">
        <h1 className="text-3xl font-bold tracking-tight">Novus</h1>

        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition">
            Login
          </Link>

          <Link to="/signup" className="px-5 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-center grow px-8 py-12 gap-10">
        {/* landing page text */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            A fresh way to
            <span className="text-black block mt-1">share your stories.</span>
          </h1>

          <p className="mt-5 text-gray-600 text-lg leading-relaxed">
            Read, write, and explore thoughts that matter.
          </p>

          <Link to="/signup" className="inline-block mt-7 bg-black text-white px-7 py-3 rounded-xl text-lg hover:bg-gray-900 transition">
            Start Writing
          </Link>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-[450px]">
          <img src="https://images.unsplash.com/photo-1494173853739-c21f58b16055?w=800" alt="hero" className="w-full h-full object-cover rounded-2xl shadow-lg"/>
        </div>
      </div>
    </div>
  );
}