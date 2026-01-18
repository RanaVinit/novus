import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryTag from "@/components/CategoryTag";
import ArticleCard from "@/components/ArticleCard";
import BigFeaturedCard from "@/components/BigFeaturedCard";
import SmallFeaturedCard from "@/components/SmallFeaturedCard";
import MediumFeaturedCard from "@/components/MediumFeaturedCard";
import { useMemo, useState, useEffect, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const PLACEHOLDER_IMG = "";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [showFeatured, setShowFeatured] = useState(false);
  const featuredRef = useRef(null);
  const featuredArticles = useMemo(() => articles.slice(0, 4), [articles]);
  const hasFeaturedSet = featuredArticles.length >= 4;

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset pagination when filters change
  useEffect(() => {
    setSkip(0);
  }, [debouncedSearch, selectedCategory]);

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

  useEffect(() => {
    if (featuredArticles.length >= 4) {
      setShowFeatured(true);
    }
  }, [featuredArticles.length]);

  // fetch articles from backend API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");

        const queryParams = new URLSearchParams({
          skip: skip,
          limit: skip === 0 ? 13 : 9,
        });

        if (debouncedSearch) queryParams.append("search", debouncedSearch);
        if (selectedCategory && selectedCategory !== "All")
          queryParams.append("category", selectedCategory);

        // Shuffle for discovery if not searching
        if (!debouncedSearch) queryParams.append("shuffle", "true");

        const res = await fetch(`${API_BASE}/api/articles?${queryParams.toString()}`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
        });

        if (!res.ok) {
          const message =
            res.status === 401
              ? "Please log in to view articles."
              : `Failed to fetch articles (${res.status})`;
          throw new Error(message);
        }

        const data = await res.json();
        const normalized = data.articles.map((article) => ({
          id: article._id,
          title: article.title,
          content: article.content,
          image: article.thumbnail || PLACEHOLDER_IMG,
          author:
            typeof article.author === "string"
              ? { name: article.author }
              : article.author,
          category: article.category,
          createdAt: article.createdAt,
          upvotes: article.upvotes,
          upvotedBy: article.upvotedBy,
        }));

        if (skip === 0) {
          setArticles(normalized);
        } else {
          setArticles((prev) => [...prev, ...normalized]);
        }

        setHasMore(data.hasMore);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    setLoading(skip === 0);
    fetchArticles();
  }, [skip, debouncedSearch, selectedCategory]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setSkip(articles.length);
  };

  if (loading && skip === 0 && !articles.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-white via-gray-50 to-white">
        <div className="text-center">
          <svg className="w-12 h-12 animate-spin mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 text-lg">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-white via-gray-50 to-white">
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  return (
    <div className="pt-16 bg-linear-to-b from-white via-gray-50 to-white min-h-screen">
      <Navbar
        isLoggedIn={isLoggedIn}
        searchValue={searchQuery}
        onSearch={(e) => setSearchQuery(e.target.value)}
      />

      {/* Categories*/}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <div className="flex justify-center gap-2 flex-wrap mb-8">
          {[
            "All",
            "Technology",
            "Lifestyle",
            "Design",
            "Business",
            "Strategy",
          ].map((cat) => (
            <CategoryTag
              key={cat}
              label={cat}
              isActive={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </div>
      </div>

      {/* Feed Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(4).map((a, index) => (
              <ArticleCard key={a.id} {...a} priority={index < 3} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center py-8 px-4">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-10 py-3.5 bg-black text-white rounded-full font-semibold hover:bg-gray-800 active:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loadingMore ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Load More Articles"
            )}
          </button>
        </div>
      )}

      {/* Featured Section */}
      <div ref={featuredRef} className="h-px" />

      {showFeatured && hasFeaturedSet && (
        <>
          <div className="max-w-6xl mx-auto mt-8 px-4 mb-12 text-center">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Featured</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 mb-3">
              Handpicked Reads
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Stories curated to inspire and educate you
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-4 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BigFeaturedCard article={featuredArticles[0]} />
              <div className="flex flex-col gap-8">
                <SmallFeaturedCard article={featuredArticles[1]} />
                <SmallFeaturedCard article={featuredArticles[2]} />
                <MediumFeaturedCard article={featuredArticles[3]} />
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
