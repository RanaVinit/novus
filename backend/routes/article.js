import express from "express";
import Article from "../models/Article.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * @route  GET /api/articles
 * @desc   Get all articles
 * @access Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const limit = 9;
    const skip = parseInt(req.query.skip) || 0;

    const articles = await Article.find()
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Article.countDocuments();

    res.status(200).json({
      articles,
      total,
      hasMore: skip + limit < total,
    });
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
    const article = await Article.findById(req.params.id).populate(
      "author",
      "name"
    );

    if (!article) return res.status(404).json({ message: "Article not found" });

    res.status(200).json(article);
  } catch (err) {
    res.status(400).json(err);
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

/*
@route PUT /api/articles/:id
@desc Update an article by ID
@access Private
*/
router.put("/:id", auth, async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    article.title = req.body.title ?? article.title;
    article.content = req.body.content ?? article.content;
    article.thumbnail = req.body.thumbnail ?? article.thumbnail;
    article.category = req.body.category ?? article.category;
    article.tags = Array.isArray(req.body.tags) ? req.body.tags : article.tags;

    await article.save();

    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

const articleRoutes = router;
export default articleRoutes;
