import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./Routes/auth.route.js";
import userRoutes from "./Routes/auth.route.js";
import { connectDB } from "./library/database.js";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from Backend folder (one level above src)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5001;
app.get("/api/auth/signup",(req,res)=>{
    res.send("signup page");
    })
app.get("/api/auth/login",(req,res)=>{
    res.send("log in page");
})
app.get("/api/auth/signup",(req,res)=>{
    res.send("log out page");
})

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(` Server is running at http://localhost:${PORT}`);
});