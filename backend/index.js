import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

// Load the environment variables from .env file.
dotenv.config();

// Initialize the express app!
const app = express();
const port = process.env.PORT;


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Middlewares to parse JSON data and set headers
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// We listen on the port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});