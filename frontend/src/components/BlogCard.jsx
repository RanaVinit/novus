export default function BlogCard({ title, author, image, description, id }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer flex flex-col" onClick={() => window.location.href = `/blog/${id}`}>
      
      {/* Image */}
      <div className="w-full h-48 p-1">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-2xl"/>
      </div>

      {/* middle section */}
      <div className="p-5 flex flex-col gap-2">
        
        {/* Title */}
        <h2 className="text-lg font-semibold leading-snug tracking-tight">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3"> {description} </p>

        {/* last section */}
        <div className="flex justify-between items-center pt-2 text-xs text-gray-500">
          <span>{author}</span>
          <span className="hover:underline">Read more →</span>
        </div>
      </div>
    </div>
  );
}