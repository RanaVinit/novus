import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { uploadImage } from "../lib/uploadImage";
import { Upload, X } from "lucide-react";

const CreateArticle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    imagePreview: null,
    imageFile: null,
    isSubmitting: false,
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double-submit while in progress
    if (formData.isSubmitting) return;
    setFormData((prev) => ({ ...prev, isSubmitting: true }));

    const token = localStorage.getItem("token");

    try {
      // Upload image first (if present) to get a URL
      let thumbnailUrl = "";
      if (formData.imageFile) {
        try {
          const uploadRes = await uploadImage(formData.imageFile);
          thumbnailUrl = uploadRes.secure_url || uploadRes.url || "";
        } catch (uploadErr) {
          console.error("Image upload failed", uploadErr);
        }
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
            category: formData.category,
            thumbnail: thumbnailUrl,
          }),
        }
      );

      if (response.ok) {
        const article = await response.json();
        navigate(`/article/${article._id}`);
        alert("Article created:)");
        setFormData({
          title: "",
          content: "",
          category: "General",
          imagePreview: null,
          imageFile: null,
          isSubmitting: false,
        });
      } else {
        console.error("Failed to create article");
      }
    } catch (error) {
      console.error("Error creating article: ", error);
      alert("Failed to create article. Please try again.");
    } finally {
      // Ensure we re-enable submission
      setFormData((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  return (
    <div className="pt-24">
      <Navbar showPublish={true} isLoggedIn={true} isSubmitting={formData.isSubmitting} />

      <form
        id="createArticleForm"
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto flex flex-col gap-5 mt-10 px-4"
      >
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          value={formData.title}
          onChange={handleChange}
          className="text-2xl p-2 outline-none border-b border-gray-300 focus:border-black transition"
        />

        {/* Content */}
        <textarea
          name="content"
          placeholder="Tell your story..."
          required
          value={formData.content}
          onChange={handleChange}
          className="outline-none border-b border-gray-300 focus:border-black transition w-full h-36 resize-none p-2"
        ></textarea>

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
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

          {formData.imagePreview ? (
            <div className="relative w-full">
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="w-full h-60 object-cover rounded-md border"
              />

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    imagePreview: null,
                    imageFile: null,
                  }))
                }
                className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current.click()}
              className="border border-dashed border-gray-400 rounded-md h-24 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
            >
              <Upload size={24} className="text-gray-700" />
              <span className="ml-2 text-gray-600">Upload Image</span>
            </div>
          )}

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
