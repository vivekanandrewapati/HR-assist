import asyncHandler from "../errors/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import authService from "../services/auth.service.js";

import {
    validateLogin,
    validateRegister,
} from "../validators/auth.validator.js";

export const register = asyncHandler(async (req, res) => {
    validateRegister(req.body);

    const user = await authService.register(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                user,
            },
            "User registered successfully"
        )
    );
});

export const login = asyncHandler(async (req, res) => {
    validateLogin(req.body);

    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Login successful"
        )
    );
});

export const getProfile = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "Profile fetched successfully"
        )
    );
});