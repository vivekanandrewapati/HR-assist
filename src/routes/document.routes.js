import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
    uploadDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../controllers/document.controller.js";
const router = express.Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware("hr_admin"),
    upload.single("document"),
    uploadDocument
);
router.get(
    "/",
    authMiddleware,
    roleMiddleware("hr_admin"),
    getDocuments
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("hr_admin"),
    getDocumentById
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("hr_admin"),
    upload.single("document"),
    updateDocument
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("hr_admin"),
    deleteDocument
);
export default router;