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
    const articles = await Article.find().sort({ createdAt: -1 });

    res.json(articles);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @route  GET /api/articles/:id
 * @desc   Get a single article by ID
 * @access Private
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (err) {
    res.status(500).json(err);
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


/**
 * @route  DELETE /api/articles/:id
 * @desc   Delete an article by ID
 * @access Private
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

const articleRoutes = router;
export default articleRoutes;