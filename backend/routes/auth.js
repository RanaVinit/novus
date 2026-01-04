import express from "express";
import auth from "../middleware/auth.js";
import {
  login,
  signup,
  verifyToken,
  getDashboard,
} from "../controllers/authController.js";

const router = express.Router();

/**
 * @route  POST /api/auth/login
 * @desc   Login user and return JWT token
 * @access Public
 */
router.post("/login", login);

/**
 * @route  POST /api/auth/signup
 * @desc   Register new user and return JWT token
 * @access Public
 */
router.post("/signup", signup);

/**
 * @route  GET /api/auth/verify-token
 * @desc   Verify JWT token
 * @access Private
 */
router.get("/verify-token", auth, verifyToken);

/**
 * @route  GET /api/auth/dashboard
 * @desc   Get user dashboard
 * @access Private
 */
router.get("/dashboard", auth, getDashboard);

export default router;