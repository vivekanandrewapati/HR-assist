import ApiError from "../errors/ApiError.js";

const roleMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new ApiError(403, "Forbidden");
        }

        next();
    };
};

export default roleMiddleware;