import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FORCE load .env from Backend folder
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import authRoutes from "./Routes/auth.route.js";
import userRoutes from "./Routes/users.route.js";
import chatRoutes from "./Routes/chat.route.js";
import { connectDB } from "./lib/database.js";

const app = express();
const PORT = process.env.PORT || 5001;
const ___dirname=path.resolve();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(___dirname,"../Frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(___dirname,"../Frontend","dist","index.html"));

  })
}

app.get("/api/health", (_, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  connectDB();
  console.log(`server running at http://localhost:${PORT}`);
});
