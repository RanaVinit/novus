import fs from "fs";
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

app.get("/blogs", async (req, res) => {
  try {
    const data = await fs.promises.readFile(new URL("./db.json", import.meta.url), "utf8");
    const json = JSON.parse(data);
    return res.status(200).json(json.blogs ?? json);
  } catch (err) {
    console.error("Error reading/parsing db.json:", err);
    return res.status(500).json({ error: "Failed to read db.json" });
  }
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Novus backend running on 5000"));