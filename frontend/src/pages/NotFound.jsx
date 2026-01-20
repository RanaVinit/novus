import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ArticleCard from "@/components/ArticleCard";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function NotFound() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    useEffect(() => {
        const fetchSuggestedArticles = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/articles?limit=3&shuffle=true`);
                if (res.ok) {
                    const data = await res.json();
                    const normalized = data.articles.map((article) => ({
                        id: article._id,
                        title: article.title,
                        content: article.content,
                        image: article.thumbnail || "",
                        author: article.author,
                        category: article.category,
                        createdAt: article.createdAt,
                        upvotes: article.upvotes,
                        upvotedBy: article.upvotedBy,
                    }));
                    setArticles(normalized);
                }
            } catch (err) {
                console.error("Failed to fetch suggested articles", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestedArticles();
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white pb-20">
            <Navbar isLoggedIn={isLoggedIn} />

            <main className="pt-24 border-b border-gray-100 mb-12">
                <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="space-y-4">
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                            PAGE NOT FOUND
                        </span>

                        <div className="flex flex-col md:flex-row items-baseline gap-4">
                            <h1 className="text-8xl md:text-9xl font-hero-serif font-bold text-gray-900 leading-none">
                                404
                            </h1>
                            <div className="hidden md:block w-px h-16 bg-gray-200 self-center mx-4" />
                            <h2 className="text-3xl md:text-4xl font-hero-serif font-medium text-gray-900">
                                Out of nothing, something.
                            </h2>
                        </div>

                        <div className="pt-6">
                            <Link
                                to={isLoggedIn ? "/home" : "/"}
                                className="inline-flex items-center px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all active:scale-95 text-lg"
                            >
                                Go Back Home
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <section className="max-w-4xl mx-auto px-6">
                <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-4">
                    <h3 className="text-xl font-bold text-gray-900">Recommended for you</h3>
                    <Link to="/home" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                        See all stories
                    </Link>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="animate-pulse space-y-4">
                                <div className="aspect-16/9 bg-gray-100 rounded-2xl" />
                                <div className="h-4 bg-gray-100 rounded w-3/4" />
                                <div className="h-3 bg-gray-100 rounded w-full" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <ArticleCard key={article.id} {...article} />
                        ))}
                    </div>
                )}
            </section>

            <footer className="mt-20 py-10 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-sm">
                    <div className="flex gap-6">
                        <Link to="/" className="hover:text-black transition-colors">Novus</Link>
                        <Link to="/about" className="hover:text-black transition-colors">About</Link>
                        <Link to="/contact" className="hover:text-black transition-colors">Contact</Link>
                    </div>
                    <p>&copy; {new Date().getFullYear()} Novus. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
