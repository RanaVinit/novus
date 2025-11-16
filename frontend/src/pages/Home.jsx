import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CategoryTag from "../components/CategoryTag";
import BlogCard from "../components/BlogCard";
import { blogs } from "../data/blogs";
import BigFeaturedCard from "../components/BigFeaturedCard";
import SmallFeaturedCard from "../components/SmallFeaturedCard";
import MediumFeaturedCard from "@/components/MediumFeaturedCard";

export default function Home() {
  return (
    <div className="pt-24"> 
      <Navbar />

      {/* Hero text */}
      <div className="text-center px-4">
        {/* <h4 className="text-sm bg-gray-100 rounded-full inline-block px-3 py-1 text-gray-700">Our Blogs</h4> */}
        
        <h1 className="text-3xl md:text-4xl font-bold leading-tight md:leading-snug tracking-tight">
          Insights and Inspiration, <br />
          Explore Our Blog
        </h1>
        
        <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto mt-3">
          Dive into expert insights, tips, and trends to elevate your journey.
        </p>

      </div>

      <SearchBar />

      {/* Categories */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        {["All", "Tasks", "Collaboration", "Productivity", "Strategies"].map(
          (cat) => (
            <CategoryTag key={cat} label={cat} />
          )
        )}
      </div>

      {/* Blog grid */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 mt-7">
        {blogs.map((b) => (
          <BlogCard key={b.id} {...b} />
        ))}
      </div>

      {/* Top Blogs Section Title */}
      <div className="text-center mt-16 px-4">
        <h2 className="text-3xl font-bold tracking-tight leading-snug">
          Dive into our top blogs
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto mt-2 text-sm md:text-base leading-relaxed">
          Discover popular articles curated to help you grow, learn, and stay inspired.
        </p>
      </div>

      {/* Featured Section */}
      <div className="max-w-6xl mx-auto mt-20 px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* left card */}
          <BigFeaturedCard blog={blogs[0]} />

          {/* right cards */}
          <div className="flex flex-col gap-6">
            <SmallFeaturedCard blog={blogs[1]} />
            <SmallFeaturedCard blog={blogs[2]} />
            <MediumFeaturedCard blog={blogs[3]} />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}