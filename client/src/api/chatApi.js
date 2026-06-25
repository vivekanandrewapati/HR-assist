import api from "./axios";

export const askQuestion = async (question) => {
    const response = await api.post("/chat", {
        question,
    });

    return response.data;
};

export const getChatHistory = async () => {
    const response = await api.get("/chat/history");

    return response.data;
};

export const deleteChatHistory = async () => {
    const response = await api.delete("/chat/history");

    return response.data;
};