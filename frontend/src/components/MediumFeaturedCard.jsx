import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { optimizeImageUrl, generateSrcSet } from "../lib/imageOptimizer";

function MediumFeaturedCard({ article }) {
  const navigate = useNavigate();

  if (!article) return null;

  const postId = article.id;
  const image = article.image || "";

  const optimizedImage = optimizeImageUrl(image, 500, 60);
  const srcSet = generateSrcSet(image, false);

  return (
    <div
      className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      onClick={() => postId && navigate(`/article/${postId}`)}
      role="article"
    >
      <div className="h-32 bg-gray-100 overflow-hidden">
        <img
          src={optimizedImage}
          srcSet={srcSet}
          sizes="(max-width: 768px) 100vw, 500px"
          alt={article.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          width="500"
          height="280"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold leading-snug mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {article.content}
        </p>
      </div>
    </div>
  );
}

export default memo(MediumFeaturedCard);
