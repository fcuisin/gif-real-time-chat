import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = process.env.ATLAS_URI;

async function connectDB() {
  try {
    await mongoose.connect(db);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
  }
}

export default connectDB;
