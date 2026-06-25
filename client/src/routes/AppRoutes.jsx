import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import DocumentsPage from "../pages/DocumentsPage";
import ChatPage from "../pages/ChatPage";

import ProtectedRoute from "../components/layout/ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={["hr_admin"]}
                    >
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/documents"
                element={
                    <ProtectedRoute
                        allowedRoles={["hr_admin"]}
                    >
                        <DocumentsPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/chat"
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "hr_admin",
                            "employee",
                        ]}
                    >
                        <ChatPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}