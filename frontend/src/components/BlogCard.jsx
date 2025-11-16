import { useState } from "react";
import { HandHeart } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

export default function BlogCard({ title, author, image, description, id}) {
  const [likes, setlikes] = useState(0);
  const [comments, setcomments] = useState(0);

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer flex flex-col" onClick={() => window.location.href = `/blog/${id}`}>
      
      {/* Image */}
      <div className="w-full h-48 p-1">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-2xl"/>
      </div>

      {/* middle section */}
      <div className="p-5 flex flex-col gap-2 h-full">
        
        {/* first middle section */}
        <div className="flex-grow">
          {/* Title */}
          <h2 className="text-lg font-semibold leading-snug tracking-tight">
            {title}
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3"> {description} </p>
        </div>

        {/* last middle section */}
        <div className="flex justify-between items-center pt-2 text-xs text-gray-500">
          <span>{author}</span>
          <div>
            {/* Like Button */}
            <button onClick={(e) => { 
                e.stopPropagation();
                setlikes(likes + 1);
              }}
              className="inline-flex items-center gap-1 mr-2 cursor-pointer hover:text-red-500 transition">
                <HandHeart size={17} className="opacity-80" />
                {likes}
            </button>

            {/* Comment Button */}
            <button onClick={(e) => {
                e.stopPropagation();
                setcomments(comments + 1);
              }}
              className="inline-flex items-center gap-1 cursor-pointer hover:text-blue-500 transition">
              <MessageCircle size={16} className="opacity-80" />
              {comments}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}