import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { optimizeImageUrl, generateSrcSet } from "../lib/imageOptimizer";

function MediumFeaturedCard({ blog }) {
  const navigate = useNavigate();

  const optimizedImage = optimizeImageUrl(blog.image, 500, 60);
  const srcSet = generateSrcSet(blog.image, false);

  return (
    <div
      className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      onClick={() => navigate(`/blog/${blog.id}`)}
      role="article"
    >
      <div className="h-32 bg-gray-100 overflow-hidden">
        <img
          src={optimizedImage}
          srcSet={srcSet}
          sizes="(max-width: 768px) 100vw, 500px"
          alt={blog.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          width="500"
          height="280"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold leading-snug mb-2 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {blog.description}
        </p>
      </div>
    </div>
  );
}

export default memo(MediumFeaturedCard);
