import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * @route  POST /api/auth/login
 * @desc   Login user and return JWT token
 * @access Public
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

/**
 * @route  POST /api/auth/signup
 * @desc   Register new user and return JWT token
 * @access Public
 */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      userId: newUser._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }
});

/**
 * @route  GET /api/auth/verify-token
 * @desc   Verify JWT token
 * @access Private
 */
router.get("/verify-token", auth, (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
});

/**
 * @route  GET /api/auth/dashboard
 * @desc   Get user dashboard
 * @access Private
 */
router.get("/dashboard", auth, (req, res) => {
  res.status(200).json({ message: "Dashboard", user: req.user });
});

export default router;