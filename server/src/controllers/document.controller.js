import asyncHandler from "../errors/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import knowledgeService from "../services/knowledge.service.js";

export const uploadDocument = asyncHandler(async (req, res) => {
    const { title } = req.body;

    const document = await knowledgeService.uploadDocument(
        title,
        req.file
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            document,
            "Document uploaded successfully"
        )
    );
});

export const getDocuments = asyncHandler(async (req, res) => {
    const documents = await knowledgeService.getDocuments();

    return res.status(200).json(
        new ApiResponse(
            200,
            documents,
            "Documents fetched successfully"
        )
    );
});

export const getDocumentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const document = await knowledgeService.getDocumentById(id);

    return res.status(200).json(
        new ApiResponse(
            200,
            document,
            "Document fetched successfully"
        )
    );
});

export const updateDocument = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const document = await knowledgeService.updateDocument(
        id,
        title,
        req.file
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            document,
            "Document updated successfully"
        )
    );
});

export const deleteDocument = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await knowledgeService.deleteDocument(id);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Document deleted successfully"
        )
    );
});