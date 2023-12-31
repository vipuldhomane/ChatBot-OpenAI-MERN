import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//SetUp env file access
config();

const app = express();
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  cors({
    origin: "https://smarty-openai-chatbot.vercel.app",
    // origin: "*",

    credentials: true,
  })
);

// Middlewares
app.use(express.json());

//morgan Remove in Production
app.use(morgan("dev"));

app.use(cookieParser(process.env.COOKIE_SECRET));

//Routing
app.use("/api/v1", appRouter);

export default app;
