import { pineconeIndex } from "../config/pinecone.js";

class VectorService {
    async deleteDocumentVectors(documentId) {
        await pineconeIndex.deleteMany({
            filter: {
                documentId: documentId.toString(),
            },
        });
    }
}

export default new VectorService();