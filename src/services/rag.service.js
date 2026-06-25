import retrievalService from "./retrieval.service.js";
import { llm } from "../config/ai.js";

class RagService {
    async ask(question) {
        const chunks =
            await retrievalService.retrieveRelevantChunks(
                question,
                8 // retrieve more chunks for better coverage
            );

        const context = chunks
            .map((chunk) => chunk.pageContent)
            .join("\n\n");

        const prompt = `
You are a helpful HR assistant. Answer the employee's question using ONLY the context below.

Rules:
- If the context contains relevant information, provide a clear and complete answer even if it is partial or indirect.
- If the context mentions related policies (e.g., max per instance, monthly limits, annual limits), include ALL of them in your answer.
- Only say "I do not have that information in the uploaded HR documents." if the context has absolutely no relevant information about the topic.

Context:
${context}

Employee Question:
${question}

Answer:`;

        const response = await llm.invoke(prompt);

        return {
            answer: response.content,
            sources: [
                ...new Set(
                    chunks.map(
                        (chunk) => chunk.metadata.title
                    )
                ),
            ],
        };
    }
}

export default new RagService();