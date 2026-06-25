import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div>
                <h1 className="text-xl font-bold text-gray-800">
                    HR Assist
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="font-medium text-gray-800">
                        {user?.name}
                    </p>

                    <p className="text-sm text-gray-500 capitalize">
                        {user?.role.replace("_", " ")}
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}