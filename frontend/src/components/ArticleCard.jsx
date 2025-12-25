import { memo, useState } from "react";
import { HandHeart, MessageCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { optimizeImageUrl, generateSrcSet } from "../lib/imageOptimizer";

function ArticleCard({ title, author, image, content, id }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);

  const authorName = typeof author === "string" ? author : author?.name;
  const safeImage = image || "/placeholder.jpg";

  const handleCardClick = () => {
    if (id) {
      navigate(`/article/${id}`);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setLikes(likes + 1);
  };

  const handleComment = (e) => {
    e.stopPropagation();
    setComments(comments + 1);
  };

  const optimizedImage = optimizeImageUrl(safeImage, 364, 60);
  const srcSet = generateSrcSet(safeImage, false);

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col h-full overflow-hidden"
      onClick={handleCardClick}
      role="article"
    >
      {/* Image Container */}
      <div className="w-full aspect-16/10 bg-gray-100 overflow-hidden">
        {safeImage && <img 
          src={optimizedImage}
          srcSet={srcSet}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={title} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          width="364"
          height="228"
        />}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        
        {/* Title & Description */}
        <div className="flex-1">
          <h3 className="text-base font-semibold leading-snug tracking-tight text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
            {content}
          </p>
        </div>

        {/* Footer: Author & Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-500">
            {authorName}
          </span>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded hover:bg-red-50 transition-colors duration-150"
              aria-label="Like this article"
            >
              <HandHeart size={16} className="text-gray-500 hover:text-red-500" />
              <span className="text-xs text-gray-600 font-medium">{likes}</span>
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