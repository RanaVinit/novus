import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { optimizeImageUrl, generateSrcSet } from "../lib/imageOptimizer";

function MediumFeaturedCard({ blog }) {
  const navigate = useNavigate();

  const optimizedImage = optimizeImageUrl(blog.image, 500, 75);
  const srcSet = generateSrcSet(blog.image);

  return (
    <div
      className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      onClick={() => navigate(`/blog/${blog.id}`)}
      role="article"
    >
      <div className="aspect-video bg-gray-100 overflow-hidden">
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

      <h3 className="text-base font-semibold leading-snug mb-1.5">
        {" "}
        {blog.title}{" "}
      </h3>
      <p className="text-xs text-gray-500 line-clamp-2 mb-2.5">
        {" "}
        {blog.description}{" "}
      </p>
      <span className="text-xs text-gray-400">{blog.author}</span>
    </div>
  );
}

export default memo(MediumFeaturedCard);
