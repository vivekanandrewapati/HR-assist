import mongoose from "mongoose";

const chatHistorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        question: {
            type: String,
            required: true,
            trim: true,
        },

        answer: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const ChatHistory = mongoose.model(
    "ChatHistory",
    chatHistorySchema
);

export default ChatHistory;