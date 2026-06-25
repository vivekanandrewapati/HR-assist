import Document from "../models/Document.js";
import ApiError from "../errors/ApiError.js";
import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import vectorService from "./vector.service.js";
import ingestionService from "./ingestion.service.js";


class KnowledgeService {
    async uploadDocument(title, file) {
        if (!file) {
            throw new ApiError(400, "Document file is required");
        }

        try {
            const existingDocument = await Document.findOne({ title });

            if (existingDocument) {
                throw new ApiError(
                    409,
                    "A document with this title already exists"
                );
            }


            const document = await Document.create({
                title,
                originalFileName: file.originalname,
                storedFileName: file.filename,
                mimeType: file.mimetype,
                fileSize: file.size,
                status: "processing",
            });
            console.log("calling Ingestion Service");
            await ingestionService.ingestDocument(
                document._id
            );
            console.log("Ingestion Completed from Knowledge Service");

            return await Document.findById(document._id);

        } catch (error) {

            const filePath = path.join(
                "src",
                "uploads",
                "documents",
                file.filename
            );

            await fs.unlink(filePath).catch(() => { });

            throw error;
        }
    }
    async getDocuments() {
        const documents = await Document.find(
            {},
            "title originalFileName status createdAt"
        ).sort({ createdAt: -1 });

        return documents;
    }
    async getDocumentById(id) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid document id");
        }

        const document = await Document.findById(id);

        if (!document) {
            throw new ApiError(404, "Document not found");
        }

        return document;
    }

    async updateDocument(id, title, file) {
        if (!file) {
            throw new ApiError(400, "Document file is required");
        }


        const newFilePath = path.join(
            "src",
            "uploads",
            "documents",
            file.filename
        );

        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new ApiError(400, "Invalid document id");
            }

            const existingDocument = await Document.findById(id);

            if (!existingDocument) {
                throw new ApiError(404, "Document not found");
            }

            const oldFilePath = path.join(
                "src",
                "uploads",
                "documents",
                existingDocument.storedFileName
            );

            existingDocument.title = title;
            existingDocument.originalFileName = file.originalname;
            existingDocument.storedFileName = file.filename;
            existingDocument.mimeType = file.mimetype;
            existingDocument.fileSize = file.size;
            existingDocument.status = "processing";
            const duplicate = await Document.findOne({
                title,
                _id: { $ne: id },
            });

            if (duplicate) {
                throw new ApiError(
                    409,
                    "A document with this title already exists"
                );
            }
            await vectorService.deleteDocumentVectors(
                existingDocument._id
            );
            await existingDocument.save();
            await ingestionService.ingestDocument(
                existingDocument._id
            );

            await fs.unlink(oldFilePath).catch((err) => {
                console.error("Failed to delete old document:", err.message);
            });

            return existingDocument;

        } catch (error) {

            await fs.unlink(newFilePath).catch(() => { });

            throw error;
        }
    }
    async deleteDocument(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid document id");
        }

        const document = await Document.findById(id);

        if (!document) {
            throw new ApiError(404, "Document not found");
        }
        await vectorService.deleteDocumentVectors(
            document._id
        );
        await document.deleteOne();

        const filePath = path.join(
            "src",
            "uploads",
            "documents",
            document.storedFileName
        );

        await fs.unlink(filePath).catch((err) => {
            console.error("Failed to delete file:", err.message);
        });

        return document;
    }
}

export default new KnowledgeService();