import User from "../models/User.js";
import ApiError from "../errors/ApiError.js";
import asyncHandler from "../errors/asyncHandler.js";
import { verifyToken } from "../utils/jwt.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id);

    if (!user) {
        throw new ApiError(401, "User not found");
    }

    req.user = user;

    next();
});

export default authMiddleware;