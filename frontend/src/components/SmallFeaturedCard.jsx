import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { optimizeImageUrl, generateSrcSet } from "../lib/imageOptimizer";
import { getFallbackForCategory } from "../lib/fallbackImages";

function SmallFeaturedCard({ article }) {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  if (!article) return null;

  const postId = article.id;
  const image = article.image || "";

  const optimizedImage = optimizeImageUrl(image, 256, 60);
  const srcSet = generateSrcSet(image, false);

  return (
    <div
      className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex gap-4 p-4"
      onClick={() => postId && navigate(`/article/${postId}`)}
      role="article"
    >
      <img
        src={imgError ? getFallbackForCategory(article.category) : optimizedImage}
        srcSet={imgError ? undefined : srcSet}
        sizes="(max-width: 640px) 128px, 256px"
        alt={article.title}
        loading="lazy"
        decoding="async"
        onError={() => setImgError(true)}
        className="w-32 h-24 object-cover rounded-xl shrink-0"
        width="128"
        height="96"
      />

      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="text-base font-semibold leading-snug mb-1.5 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-auto">
          {article.content}
        </p>
        <span className="text-xs text-gray-400 truncate">{article.author?.name}</span>
      </div>
    </div>
  );
}

export default memo(SmallFeaturedCard);
