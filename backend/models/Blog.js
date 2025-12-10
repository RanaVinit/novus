import mongoose from "mongoose";

/**
 * Blog Schema
 * Represents an blog in the database
 * The Blog has Title, Content, thumbnail, category, Tags, Author, Upvotes, CreatedAt.
 */

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String, // URL of image
    default: "",
  },
  category: {
    type: String,
    default: "General",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [String],
  upvotes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  upvotedBy: {
    type: [String],
    default: [],
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
