import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
    askQuestion,
    getChatHistory,
    deleteChatHistory,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    askQuestion
);

router.get(
    "/history",
    authMiddleware,
    getChatHistory
);

router.delete(
    "/history",
    authMiddleware,
    deleteChatHistory
);

export default router;