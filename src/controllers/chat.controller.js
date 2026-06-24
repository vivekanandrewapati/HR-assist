import asyncHandler from "../errors/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import chatService from "../services/chat.service.js";

export const askQuestion = asyncHandler(async (req, res) => {
    const { question } = req.body;

    const chat = await chatService.askQuestion(
        req.user._id,
        question
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            chat,
            "Question answered successfully"
        )
    );
});

export const getChatHistory = asyncHandler(async (req, res) => {
    const history = await chatService.getChatHistory(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            history,
            "Chat history fetched successfully"
        )
    );
});

export const deleteChatHistory = asyncHandler(async (req, res) => {
    await chatService.deleteChatHistory(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Chat history deleted successfully"
        )
    );
});