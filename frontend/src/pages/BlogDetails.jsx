import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { blogs } from "../data/blogs";

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id == id);

  if (!blog) {
    return (
      <div className="pt-24 flex justify-center">
        <h1 className="text-2xl font-semibold">Blog Not Found</h1>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />

        <h1 className="text-4xl font-bold mb-3 leading-tight">{blog.title}</h1>

        <div className="flex items-center text-gray-600 text-sm mb-8">
          <span>By {blog.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>

        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
          {blog.description}
        </p>
      </div>
    </div>
  );
}