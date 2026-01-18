import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { optimizeImageUrl, generateSrcSet } from "../lib/imageOptimizer";
import { getFallbackForCategory } from "../lib/fallbackImages";

function BigFeaturedCard({ article }) {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  if (!article) return null;

  const postId = article.id;
  const image = article.image || "";
  const optimizedImage = optimizeImageUrl(image, 600, 65);
  const srcSet = generateSrcSet(image, true);

  return (
    <div
      className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      onClick={() => postId && navigate(`/article/${postId}`)}
      role="article"
    >
      <div className="aspect-16/10 bg-gray-100 overflow-hidden">
        <img
          src={imgError ? getFallbackForCategory(article.category) : optimizedImage}
          srcSet={imgError ? undefined : srcSet}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
          alt={article.title}
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          width="600"
          height="375"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold leading-snug mb-3 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {article.content}
        </p>
        <span className="text-xs text-gray-500">{article.author?.name}</span>
      </div>
    </div>
  );
}

export default memo(BigFeaturedCard);