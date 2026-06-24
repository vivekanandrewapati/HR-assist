import { PineconeStore } from "@langchain/pinecone";

import { embeddings } from "../config/ai.js";
import { pineconeIndex } from "../config/pinecone.js";

class RetrievalService {
    async retrieveRelevantChunks(question, k = 4) {
        const vectorStore = await PineconeStore.fromExistingIndex(
            embeddings,
            {
                pineconeIndex,
            }
        );

        const results = await vectorStore.similaritySearch(
            question,
            k
        );

        return results;
    }
}

export default new RetrievalService();