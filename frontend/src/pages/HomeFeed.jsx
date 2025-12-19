import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CategoryTag from "../components/CategoryTag";
import BlogCard from "../components/BlogCard";
import BigFeaturedCard from "../components/BigFeaturedCard";
import SmallFeaturedCard from "../components/SmallFeaturedCard";
import MediumFeaturedCard from "@/components/MediumFeaturedCard";
import { useMemo, useState, useEffect, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const PLACEHOLDER_IMG = "/placeholder.jpg";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showFeatured, setShowFeatured] = useState(false);
  const featuredRef = useRef(null);
  const featuredBlogs = useMemo(() => blogs.slice(0, 4), [blogs]);
  const hasFeaturedSet = featuredBlogs.length >= 4;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowFeatured(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (featuredRef.current) {
      observer.observe(featuredRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Ensure featured section appears once data is loaded
  useEffect(() => {
    if (featuredBlogs.length >= 4) {
      setShowFeatured(true);
    }
  }, [featuredBlogs.length]);

  // fetch fetchBlogs from backend API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE}/api/articles`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          const message =
            res.status === 401
              ? "Please log in to view articles."
              : `Failed to fetch articles (${res.status})`;
          throw new Error(message);
        }

        const data = await res.json();
        const normalized = data.map((article) => ({
          id: article._id,
          _id: article._id,
          title: article.title,
          description: article.content,
          image: article.thumbnail || PLACEHOLDER_IMG,
          author:
            typeof article.author === "string"
              ? { name: article.author }
              : article.author,
          category: article.category,
          createdAt: article.createdAt,
        }));

        setBlogs(normalized);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-20">{error}</p>;
  }

  return (
    <div className="pt-24">
      <Navbar isLoggedIn={true} />

      {/* Search */}
      <div className="mt-4 px-4 max-w-4xl mx-auto">
        <SearchBar />
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-3 mt-6 flex-wrap">
        {[
          "All",
          "Technology",
          "Lifestyle",
          "Design",
          "Business",
          "Strategy",
        ].map((cat) => (
          <CategoryTag key={cat} label={cat} />
        ))}
      </div>

      {/* Feed Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 mt-10">
        {blogs.map((b, index) => (
          <BlogCard key={b._id} {...b} priority={index < 3} />
        ))}
      </div>

      {/* Featured Section */}
      <div ref={featuredRef} className="h-px" />

      {showFeatured && hasFeaturedSet && (
        <>
          <div className="text-center mt-20 px-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Reads
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mt-2 text-sm leading-relaxed">
              Handpicked articles curated just for you.
            </p>
          </div>

          <div className="max-w-6xl mx-auto mt-14 px-4 pb-5">
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
