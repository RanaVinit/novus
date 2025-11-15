import { useParams } from "react-router-dom";
import { blogs } from "../data/blogs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogDetail() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) return <h1>Blog not found</h1>;

  return (
    <div className="pt-24">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-gray-500 mt-2">{blog.author}</p>

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full rounded-xl mt-6"
        />

        <p className="mt-6 leading-relaxed text-gray-700">
          {blog.description}
        </p>
      </div>

      <Footer />
    </div>
  );
}