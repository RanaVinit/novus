import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import "./config/dbConnection.js";
import authRoutes from "./routes/auth.js";
import articleRoutes from "./routes/article.js";
import userRoutes from "./routes/user.js";
import subscriberRoutes from "./routes/subscribe.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

app.use(compression());
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://novus-gamma.vercel.app"],
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/subscribe", subscriberRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});