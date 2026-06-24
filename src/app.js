import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

import errorHandler from "./middleware/error.middleware.js";
import documentRoutes from "./routes/document.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);

app.use(errorHandler);

export default app;