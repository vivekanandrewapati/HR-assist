import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({
    children,
    allowedRoles,
}) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (
        allowedRoles &&
        !allowedRoles.includes(user?.role)
    ) {
        return user?.role === "hr_admin" ? (
            <Navigate to="/dashboard" replace />
        ) : (
            <Navigate to="/chat" replace />
        );
    }

    return children;
}