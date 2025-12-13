import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import articleRoutes from "./routes/article.js";

// Load the environment variables from .env file.
dotenv.config();

// Initialize the express app!
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Middlewares to parse JSON data and set headers
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

// We listen on the port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});