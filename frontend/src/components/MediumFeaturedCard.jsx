export default function MediumFeaturedCard({ blog }) {
  return (
    <div className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition flex flex-col p-4" onClick={() => window.location.href = `/blog/${blog.id}`}>
        
        <img src={blog.image} alt={blog.title} className="w-full h-24 object-cover rounded-xl"/>

        <h3 className="text-base font-semibold leading-snug mb-1.5"> {blog.title} </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-2.5"> {blog.description} </p>
        <span className="text-xs text-gray-400">{blog.author}</span>

    </div>
  );
}