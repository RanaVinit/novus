import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Article from "../models/Article.js";

export const login = async (req, res) => {
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
};

export const signup = async (req, res) => {
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
};

export const verifyToken = (req, res) => {
    res.status(200).json({ valid: true, user: req.user });
};

export const getDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        const articles = await Article.find({ author: req.user.userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            user,
            articles,
            totalArticles: articles.length
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
