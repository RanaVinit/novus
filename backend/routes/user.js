import express from "express";
import { getUserProfile } from "../controllers/userController.js";

const router = express.Router();

/**
 * @route  GET /api/users/:id
 * @desc   Get public user profile and articles
 * @access Public
 */
router.get("/:id", getUserProfile);

export default router;