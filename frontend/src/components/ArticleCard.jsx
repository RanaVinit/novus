import { memo, useState } from "react";
import { HandHeart, MessageCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { optimizeImageUrl, generateSrcSet } from "../lib/imageOptimizer";
import { getFallbackForCategory } from "../lib/fallbackImages";

function ArticleCard({ title, author, image, content, id, category, upvotes = 0, upvotedBy = [] }) {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("userId");
  const [likes, setLikes] = useState(upvotes);
  const [isLiked, setIsLiked] = useState(upvotedBy?.includes(currentUserId) || false);

  const authorName = typeof author === "string" ? author : author?.name;
  const safeImage = image || "";

  const handleCardClick = () => {
    if (id) {
      navigate(`/article/${id}`);
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to like articles");
      return;
    }

    const endpoint = isLiked ? "downvote" : "upvote";
    const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

    try {
      const res = await fetch(`${API_BASE}/api/articles/${id}/${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      if (res.ok) {
        const updatedArticle = await res.json();
        setLikes(updatedArticle.upvotes);
        setIsLiked(!isLiked);
      }
    } catch (err) {
      console.error("failed to update like", err);
    }
  };

  const [comments, setComments] = useState(0);

  const handleComment = (e) => {
    e.stopPropagation();
    setComments(prev => prev + 1);
  };

  const [imgError, setImgError] = useState(false);
  const optimizedImage = optimizeImageUrl(safeImage, 364, 60);
  const srcSet = generateSrcSet(safeImage, false);

  return (
    <div
      className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden border border-gray-100 hover:border-gray-200"
      onClick={handleCardClick}
      role="article"
    >
      {/* Image Container */}
      <div className="w-full aspect-16/10 bg-gray-50 overflow-hidden relative">
        <img
          src={imgError ? getFallbackForCategory(category) : optimizedImage}
          srcSet={imgError ? undefined : srcSet}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={title}
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover hover:scale-110 transition-transform duration-300 ${imgError ? 'opacity-80' : 'opacity-100'}`}
          width="364"
          height="228"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col gap-3 flex-1">

        {/* Title & Description */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-gray-900 mb-2 group-hover:text-black transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
            {content}
          </p>
        </div>

        {/* Footer: Author & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {typeof author === "object" && author?._id ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profile/${author._id}`);
                }}
                className="hover:underline hover:text-black transition-colors"
              >
                {authorName}
              </span>
            ) : (
              authorName
            )}
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg transition-colors duration-150 hover:bg-red-50`}
              aria-label="Like this article"
            >
              <HandHeart
                size={16}
                className={`transition-colors ${isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
              />
              <span className={`text-xs font-medium ${isLiked ? "text-black" : "text-gray-600"}`}>{likes}</span>
            </button>

            <button
              onClick={handleComment}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded hover:bg-blue-50 transition-colors duration-150"
              aria-label="Comment on this article"
            >
              <MessageCircle size={16} className="text-gray-500 hover:text-blue-500" />
              <span className="text-xs text-gray-600 font-medium">{comments}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default memo(ArticleCard);