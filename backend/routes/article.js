import express from "express";
import auth from "../middleware/auth.js";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  deleteArticle, 
  updateArticle,
  upvoteArticle,
  downvoteArticle,
} from "../controllers/articleController.js";

const router = express.Router();

/**
 * @route  GET /api/articles
 * @desc   Get all articles
 * @access Private
 */
router.get("/", auth, getAllArticles);

/**
 * @route  GET /api/articles/:id
 * @desc   Get a single article by ID
 * @access Private
 */
router.get("/:id", auth, getArticleById);

/**
 * @route  POST /api/articles
 * @desc   Create a new article
 * @access Private
 */
router.post("/", auth, createArticle);

/**
 * @route  DELETE /api/articles/:id
 * @desc   Delete an article by ID
 * @access Private
 */
router.delete("/:id", auth, deleteArticle);

/**
 * @route PUT /api/articles/:id
 * @desc Update an article by ID
 * @access Private
 */
router.put("/:id", auth, updateArticle);

/**
 * @route PUT /api/articles/:id/upvote
 * @desc Upvote an article by ID
 * @access Private
 */
router.put("/:id/upvote", auth, upvoteArticle);

/**
 * @route PUT /api/articles/:id/downvote
 * @desc Downvote an article by ID
 * @access Private
 */
router.put("/:id/downvote", auth, downvoteArticle);

const articleRoutes = router;
export default articleRoutes;