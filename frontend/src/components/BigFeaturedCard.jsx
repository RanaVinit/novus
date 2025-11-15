export default function BigFeaturedCard({ blog }) {
  return (
    <div className="cursor-pointer bg-gray-100 rounded-3xl hover:shadow-lg transition overflow-hidden" onClick={() => window.location.href = `/blog/${blog.id}`}>

      <div className="p-5 flex flex-col gap-3">
        {/* top */}
        <h2 className="text-xl font-semibold leading-snug tracking-tight"> {blog.title} </h2>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3"> {blog.description} </p>
        
        {/* middle */}
        <img src={blog.image} alt={blog.title} className="w-full h-90 object-cover rounded-3xl p-1"/>

        {/* last */}
        <div className="flex justify-between items-center text-xs text-gray-500 pt-2">
          <span>{blog.author}</span>
          <span className="hover:underline">Read More →</span>
        </div>

      </div>
    </div>
  );
}