import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(" MONGODB_URI is missing in .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri); 

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(` DB Name: ${conn.connection.name}`);
    console.log(` Connection String: ${uri}`);
  } catch (error) {
    console.error(" Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
