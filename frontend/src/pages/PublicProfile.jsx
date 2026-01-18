import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ArticleCard from "../components/ArticleCard";
import { User, Library } from "lucide-react";
import { useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function PublicProfile() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/users/${id}`);

                if (!res.ok) {
                    if (res.status === 404) throw new Error("User not found");
                    throw new Error("Failed to fetch user profile");
                }

                const data = await res.json();
                setUserData(data.user);

                // Normalize articles
                const normalizedArticles = data.articles.map((article) => ({
                    id: article._id,
                    title: article.title,
                    content: article.content,
                    image: article.thumbnail || "",
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

        fetchProfile();
    }, [id]);

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
                <p className="text-red-500 font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar isLoggedIn={Boolean(localStorage.getItem("token"))} />

            <main className="pt-18 max-w-6xl mx-auto px-6">
                {/* Header Section */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 mb-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                        <User size={48} className="text-gray-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{userData?.name}</h1>
                        <p className="text-gray-500">{userData?.email}</p>
                        <div className="flex items-center gap-2 mt-3 text-sm font-medium text-gray-600 bg-gray-100 inline-flex px-3 py-1 rounded-full">
                            <Library size={16} />
                            <span>{articles.length} Stories Published</span>
                        </div>
                    </div>
                </div>

                {/* content */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Published Stories</h2>

                    {articles.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article) => (
                                <ArticleCard key={article.id} {...article} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                            <p className="text-gray-500 text-lg">This user hasn't published any stories yet.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
