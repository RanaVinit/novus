function BlogCard({ title, author, image, description }) {
  return (
    // blog component
    <div className="w-[95%] mx-auto border rounded-xl p-5 flex justify-between cursor-pointer">

      {/* left section */}
      <div className="w-[85%]">
        <p className="text-xs text-gray-500 mb-2">{author}</p>

        <h4 className="font-bold text-2xl mb-2">{title}</h4>

        <p className="text-gray-600 line-clamp-3">{description}</p>
      </div>

      {/* right section [img] */}
      <img src={image} alt={title} className="w-[200px] h-[130px] rounded-lg object-cover"/>

    </div>
  );
}

export default BlogCard;