import ChatHistory from "../models/ChatHistory.js";
import ApiError from "../errors/ApiError.js";
import ragService from "./rag.service.js";

class ChatService {
    async askQuestion(userId, question) {
        if (!question?.trim()) {
            throw new ApiError(400, "Question is required");
        }

        const result =
            await ragService.ask(question);

        const chat = await ChatHistory.create({
            user: userId,
            question,
            answer: result.answer,
        });

        return {
            ...chat.toObject(),
            sources: result.sources,
        };
    }

    async getChatHistory(userId) {
        const history = await ChatHistory.find({ user: userId })
            .sort({ createdAt: -1 });

        return history;
    }

    async deleteChatHistory(userId) {
        await ChatHistory.deleteMany({
            user: userId,
        });
    }
}

export default new ChatService();