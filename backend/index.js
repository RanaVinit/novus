import express from "express";
import dotenv from "dotenv";
import "./config/dbConnection.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import articleRoutes from "./routes/article.js";
import userRoutes from "./routes/user.js";
import subscriberRoutes from "./routes/subscribe.js";

// Load the environment variables from .env file.
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://novus-gamma.vercel.app"],
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/subscribe", subscriberRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});