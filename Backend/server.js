import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./DB/db.connection.js";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/Auth.routes.js";
import jobRoutes from "./Routes/Job.routes.js";
import applicationRoutes from "./Routes/Application.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

(app.listen(PORT, () => {
  console.log("Server is running on port =", PORT);
}),
connectDB)();

// Middleware setup

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/auth", authRoutes);
app.use("/job", jobRoutes);
app.use("/application", applicationRoutes);
