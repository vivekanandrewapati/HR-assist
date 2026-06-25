import path from "path";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import Document from "../models/Document.js";
import { embeddings } from "../config/ai.js";
import { pineconeIndex } from "../config/pinecone.js";

class IngestionService {
    async ingestDocument(documentId) {
        console.log("INGESTION STARTED");
        const document = await Document.findById(documentId);

        if (!document) {
            throw new Error("Document not found");
        }
        console.log("Loading PDF");

        const filePath = path.join(
            "src",
            "uploads",
            "documents",
            document.storedFileName
        );

        try {
            const loader = new PDFLoader(filePath);

            const docs = await loader.load();
            console.log("Chunking Started");
            const splitter = new RecursiveCharacterTextSplitter({
                chunkSize: 800,
                chunkOverlap: 150,
            });

            const splitDocs = await splitter.splitDocuments(docs);

            if (splitDocs.length === 0) {
                throw new Error("No text content could be extracted from the document.");
            }
            console.log("Chunks Created:", splitDocs.length);
            const documentsWithMetadata = splitDocs.map(
                (chunk, index) => {
                    const cleanMetadata = { ...chunk.metadata };
                    delete cleanMetadata.loc;
                    delete cleanMetadata.pdf;

                    return {
                        ...chunk,
                        metadata: {
                            ...cleanMetadata,
                            documentId: document._id.toString(),
                            title: document.title,
                            chunkIndex: index,
                        },
                    };
                }
            );

            const docsToEmbed = documentsWithMetadata.map(d => d.pageContent);
            const vectors = await embeddings.embedDocuments(docsToEmbed);

            const pineconeRecords = documentsWithMetadata.map((chunk, index) => ({
                id: `${document._id.toString()}-${index}`,
                values: vectors[index],
                metadata: {
                    ...chunk.metadata,
                    text: chunk.pageContent, // ← required by LangChain PineconeStore to reconstruct pageContent on retrieval
                },
            }));
            console.log("Uploading To Pinecone");
            // Pinecone v8.0.0 upsert expects an object with the `records` key.
            await pineconeIndex.upsert({ records: pineconeRecords });
            console.log("Pinecone Upload Complete");
            document.status = "indexed";

            await document.save();

            return {
                success: true,
                chunks: documentsWithMetadata.length,
            };

        } catch (error) {
            console.error("INGESTION ERROR:", error);


            document.status = "failed";

            await document.save();

            throw error;
        }
    }
}

export default new IngestionService();