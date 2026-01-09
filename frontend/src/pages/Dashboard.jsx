import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ArticleCard from "@/components/ArticleCard";
import { User, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_BASE}/api/auth/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch dashboard data");
                }

                const data = await res.json();
                setUserData(data.user);

                // Normalize articles for ArticleCard
                const normalizedArticles = data.articles.map((article) => ({
                    id: article._id,
                    title: article.title,
                    content: article.content,
                    image: article.thumbnail,
                    author: data.user.name,
                    category: article.category,
                    createdAt: article.createdAt,
                    upvotes: article.upvotes,
                    upvotedBy: article.upvotedBy,
                }));
                setArticles(normalizedArticles);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 font-medium">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar isLoggedIn={true} />

            <main className="pt-18 max-w-6xl mx-auto px-6">
                {/* Header Section */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                            <User size={40} className="text-gray-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{userData?.name}</h1>
                            <p className="text-gray-500">{userData?.email}</p>
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                                <LayoutDashboard size={16} />
                                <span>{articles.length} Stories Published</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* content */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Your Stories</h2>

                    {articles.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article) => (
                                <ArticleCard key={article.id} {...article} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                            <p className="text-gray-500 text-lg mb-4">You haven't written any stories yet.</p>
                            <Link to="/create-article" className="text-black underline font-medium hover:opacity-70">
                                Start writing your first story
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
