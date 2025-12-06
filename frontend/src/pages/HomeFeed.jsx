import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CategoryTag from "../components/CategoryTag";
import BlogCard from "../components/BlogCard";
import { blogs } from "../data/blogs";
import BigFeaturedCard from "../components/BigFeaturedCard";
import SmallFeaturedCard from "../components/SmallFeaturedCard";
import MediumFeaturedCard from "@/components/MediumFeaturedCard";
import { useMemo, useState, useEffect, useRef } from "react";

export default function Home() {
  const [showFeatured, setShowFeatured] = useState(false);
  const featuredRef = useRef(null);
  const featuredBlogs = useMemo(() => blogs.slice(0, 4), []);

  // Use Intersection Observer instead of setTimeout
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowFeatured(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (featuredRef.current) {
      observer.observe(featuredRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-24">
      <Navbar isLoggedIn={true} />

      {/* Search */}
      <div className="mt-4 px-4 max-w-4xl mx-auto">
        <SearchBar />
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-3 mt-6 flex-wrap">
        {["All", "Technology", "Lifestyle", "Design", "Business", "Strategy"].map(
          (cat) => (
            <CategoryTag key={cat} label={cat} />
          )
        )}
      </div>

      {/* Feed Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 mt-10">
        {blogs.map((b, index) => (
          <BlogCard key={b.id} {...b} priority={index < 3} />
        ))}
      </div>

      {/* Featured Section */}
      <div ref={featuredRef} className="h-px" />

      {showFeatured && (
        <>
          <div className="text-center mt-20 px-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Reads
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mt-2 text-sm leading-relaxed">
              Handpicked articles curated just for you.
            </p>
          </div>

          <div className="max-w-6xl mx-auto mt-14 px-4 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <BigFeaturedCard blog={featuredBlogs[0]} />
              <div className="flex flex-col gap-6">
                <SmallFeaturedCard blog={featuredBlogs[1]} />
                <SmallFeaturedCard blog={featuredBlogs[2]} />
                <MediumFeaturedCard blog={featuredBlogs[3]} />
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}