import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
} catch (err) {
    console.log(err);
}