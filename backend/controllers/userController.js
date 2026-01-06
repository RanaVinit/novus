import User from "../models/User.js";
import Article from "../models/Article.js";

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const articles = await Article.find({ author: userId })
            .populate("author", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            user,
            articles,
            totalArticles: articles.length
        });
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
