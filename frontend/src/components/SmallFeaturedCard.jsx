import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { optimizeImageUrl, generateSrcSet } from "../lib/imageOptimizer";

function SmallFeaturedCard({ blog }) {
  const navigate = useNavigate();

  const optimizedImage = optimizeImageUrl(blog.image, 256, 60);
  const srcSet = generateSrcSet(blog.image, false);

  return (
    <div
      className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex gap-4 p-4"
      onClick={() => navigate(`/blog/${blog.id}`)}
      role="article"
    >
      <img
        src={optimizedImage}
        srcSet={srcSet}
        sizes="(max-width: 640px) 128px, 256px"
        alt={blog.title}
        loading="lazy"
        decoding="async"
        className="w-32 h-24 object-cover rounded-xl shrink-0"
        width="128"
        height="96"
      />

      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="text-base font-semibold leading-snug mb-1.5 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-auto">
          {blog.description}
        </p>
        <span className="text-xs text-gray-400 truncate">{blog.author}</span>
      </div>
    </div>
  );
}

export default memo(SmallFeaturedCard);
