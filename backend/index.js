import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

dotenv.config();


app.use(express.json());
app.use("/auth", authRoutes);
app.use(cors());

app.get("/", (req, res) => {
  res.send("Novus backend :)");
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Novus backend running on 5000"));