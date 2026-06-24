import ChatHistory from "../models/ChatHistory.js";
import ApiError from "../errors/ApiError.js";

class ChatService {
    async askQuestion(userId, question) {
        if (!question?.trim()) {
            throw new ApiError(400, "Question is required");
        }

        // Placeholder response until RAG is implemented
        const answer =
            "This feature is under development. AI-powered HR assistance will be available soon.";

        const chat = await ChatHistory.create({
            user: userId,
            question,
            answer,
        });

        return chat;
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