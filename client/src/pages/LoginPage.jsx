import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

import { loginUser } from "../api/authApi";


export default function LoginForm() {
    const navigate = useNavigate();
    const { isAuthenticated, login, user } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            const response = await loginUser(formData);

            const { user, token } = response.data;

            login(user, token);

            toast.success("Login successful");

            if (user.role === "hr_admin") {
                navigate("/dashboard");
            } else {
                navigate("/chat");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed"
            );
        } finally {
            setIsSubmitting(false);
        }
    };
    if (isAuthenticated) {
        return (
            <Navigate
                to={
                    user?.role === "hr_admin"
                        ? "/dashboard"
                        : "/chat"
                }
                replace
            />
        );
    }
    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded p-2"
            />

            <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded p-2"
            />

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white p-2 rounded"
            >
                {isSubmitting ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}