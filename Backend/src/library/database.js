import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL not found in environment variables.");
    }

    console.log("Connecting to MongoDB...");
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(` MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};