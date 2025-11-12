import BlogCard from "./BlogCard";

function Feed({ blogs }) {
  console.log(blogs);
  return (
    <div className="grid gap-17 justify-items-center" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
      {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          title={blog.title}
          author={blog.author}
          content={blog.content}
        />
      ))}
    </div>
  );
}

export default Feed;