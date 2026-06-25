import validator from "validator";
import ApiError from "../errors/ApiError.js";

export const validateRegister = (data) => {
    if (!data) throw new ApiError(400, "Request body is required");
    const { name, email, password, role } = data;

    if (!name?.trim()) {
        throw new ApiError(400, "Name is required");
    }

    if (!email?.trim()) {
        throw new ApiError(400, "Email is required");
    }

    if (!validator.isEmail(email)) {
        throw new ApiError(400, "Please enter a valid email");
    }

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    if (password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters");
    }

    if (role && !["employee", "hr_admin"].includes(role)) {
        throw new ApiError(400, "Invalid role");
    }
};

export const validateLogin = (data) => {
    if (!data) throw new ApiError(400, "Request body is required");
    const { email, password } = data;

    if (!email?.trim()) {
        throw new ApiError(400, "Email is required");
    }

    if (!password) {
        throw new ApiError(400, "Password is required");
    }
};