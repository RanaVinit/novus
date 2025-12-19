import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { optimizeImageUrl, generateSrcSet } from "../lib/imageOptimizer";

function BigFeaturedCard({ blog }) {
  const navigate = useNavigate();

  if (!blog) return null;

  const postId = blog.id || blog._id;
  const image = blog.image || "/placeholder.jpg";
  const optimizedImage = optimizeImageUrl(image, 600, 65);
  const srcSet = generateSrcSet(image, true);

  return (
    <div
      className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      onClick={() => postId && navigate(`/blog/${postId}`)}
      role="article"
    >
      <div className="aspect-16/10 bg-gray-100 overflow-hidden">
        <img
          src={optimizedImage}
          srcSet={srcSet}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
          alt={blog.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          width="600"
          height="375"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold leading-snug mb-3 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {blog.description}
        </p>
        <span className="text-xs text-gray-500">{blog.author?.name}</span>
      </div>
    </div>
  );
}

export default memo(BigFeaturedCard);