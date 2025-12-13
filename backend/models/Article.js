import mongoose from "mongoose";

/**
 * Article Schema
 * Represents an article in the database
 * The Article has Title, Content, thumbnail, category, Tags, Author, Upvotes, CreatedAt.
 */

const articleSchema = new mongoose.Schema({
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

const Article = mongoose.model("Article", articleSchema);

export default Article;