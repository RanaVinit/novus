import express from "express";
import auth from "../middleware/auth.js";
import Article from "../models/Article.js";

const router = express.Router();

/**
 * @route  GET /api/articles
 * @desc   Get all articles
 * @access Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch articles" });
  }
});

/**
 * @route  POST /api/articles
 * @desc   Create a new article
 * @access Private
 */
router.post("/", auth, async (req, res) => {
  try {
    const article = new Article({
      ...req.body,
      author: req.user.userId,
    });

    await article.save();

    res.status(201).json(article);
  } catch (err) {
    res.status(400).json(err);
  }
});

const articleRoutes = router;
export default articleRoutes;