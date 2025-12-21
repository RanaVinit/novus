import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import { Upload, X } from "lucide-react";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("General");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Article created:)");
    setTitle("");
    setDesc("");
    setCategory("General");
    setImage(null);
  };

  // When user uploads an image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
  };

  return (
    <div className="pt-24">
      <Navbar showPublish={true} isLoggedIn={true} />

      <form
        id="createArticleForm"
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto flex flex-col gap-5 mt-10 px-4"
      >
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl p-2 outline-none border-b border-gray-300 focus:border-black transition"
        />

        {/* Description */}
        <textarea
          placeholder="Tell your story..."
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="outline-none border-b border-gray-300 focus:border-black transition w-full h-36 resize-none p-2"
        ></textarea>

        {/* Category dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border-b outline-none w-40 bg-transparent text-gray-700"
        >
          <option>General</option>
          <option>Technology</option>
          <option>Lifestyle</option>
          <option>Business</option>
          <option>Design</option>
        </select>

        {/* Image Upload */}
        <div className="flex flex-col gap-3">
          <label className="font-medium">Cover Image</label>

          {/* If image selected → show preview */}
          {image ? (
            <div className="relative w-full">
              <img
                src={image}
                alt="Preview"
                className="w-full h-60 object-cover rounded-md border"
              />

              {/* Remove image */}
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            // Upload Button
            <div
              onClick={() => fileInputRef.current.click()}
              className="border border-dashed border-gray-400 rounded-md h-24 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
            >
              <Upload size={24} className="text-gray-700" />
              <span className="ml-2 text-gray-600">Upload Image</span>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;