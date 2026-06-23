import User from "../models/User.js";
import ApiError from "../errors/ApiError.js";
import { generateToken } from "../utils/jwt.js";

class AuthService {
    async register(userData) {
        const { email } = userData;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new ApiError(409, "User already exists");
        }

        await User.create(userData);

        const createdUser = await User.findOne({ email });

        return createdUser;
    }

    async login(email, password) {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            throw new ApiError(401, "Invalid email or password");
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            throw new ApiError(401, "Invalid email or password");
        }

        const token = generateToken(user);

        user.password = undefined;

        return {
            user,
            token,
        };
    }
}

export default new AuthService();