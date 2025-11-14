import BlogCard from "./BlogCard";

function Feed({ blogs }) {
  console.log(blogs);
  return (
    <div className="grid gap-8">
      {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          title={blog.title}
          author={blog.author}
          image={blog.image}
          description={blog.description}
        />
      ))}
    </div>
  );
}

export default Feed;