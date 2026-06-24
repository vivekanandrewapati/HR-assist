import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./env.js";

export const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

// Wrapper that calls Google's native SDK with outputDimensionality: 768
// to match the Pinecone index dimensions (MRL truncation)
export const embeddings = {
    embedDocuments: (texts) =>
        Promise.all(
            texts.map(async (text) => {
                const result = await embeddingModel.embedContent({
                    content: { parts: [{ text }], role: "user" },
                    taskType: "RETRIEVAL_DOCUMENT",
                    outputDimensionality: 768,
                });
                return result.embedding.values;
            })
        ),

    embedQuery: async (text) => {
        const result = await embeddingModel.embedContent({
            content: { parts: [{ text }], role: "user" },
            taskType: "RETRIEVAL_QUERY",
            outputDimensionality: 768,
        });
        return result.embedding.values;
    },
};