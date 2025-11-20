import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { Upload } from "lucide-react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Blog:", { title, desc });

    alert("Blog created");
    setTitle("");
    setDesc("");
  };

  return (
    <div className="pt-24">
      <Navbar showPublish={true} hideNav={true} />

      {/* <h1 className="text-center text-3xl font-semibold mb-10">
        Create a New Blog
      </h1> */}

      {/* Form */}
      <form
        id="createBlogForm"
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto flex flex-col gap-6 mt-6.5"
      >
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-medium p-2 outline-none border-b border-gray-300 focus:border-black transition w-full"
        />

        {/* Description */}
        <textarea
          placeholder="Tell your Story..."
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="p-2 outline-none border-b border-gray-300 focus:border-black transition w-full h-36 resize-none"
        ></textarea>

        {/* Upload Image Button */}
        <div className="flex justify-start">
          <div className="relative group inline-block">
            <Upload
              className="w-8 h-8 text-gray-700 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            />

            <span
              className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 text-xs 
                  bg-black text-white rounded shadow
                  opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 
                  transition-all duration-150"
            >
              Upload Image
            </span>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
