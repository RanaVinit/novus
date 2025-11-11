function BlogCard({ title, author, content }) {
  return (
    <div className="border p-5 rounded-xl shadow-sm bg-gray-100 space-y-2 h-75 w-65 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">by {author}</p>
        <p className="text-gray-700 text-sm mt-2">{content}</p>
      </div>

      <button className="bg-black text-white text-sm px-3 py-1 rounded">
        Read More
      </button>
    </div>
  );
}

export default BlogCard;