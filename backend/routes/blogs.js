import express from "express";
import auth from "../middleware/auth.js";
import Blog from "../models/Blog.js";

const router = express.Router();

// CREATE BLOG (protected)
router.post("/", auth, async (req, res) => {
  try {
    const { title, content, thumbnail, category, tags} = req.body;

    if (!title || !content || !thumbnail || !category || !tags) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("Authenticated user ID:", req.user.userId);

    const blog = await Blog.create({
      title,
      content,
      thumbnail,
      category,
      tags,
      author: req.user.userId, // comes from JWT middleware
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error creating blog" });
  }
});

const blogRoutes = router;
export default blogRoutes;