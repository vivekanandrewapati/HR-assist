import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    const adminLinks = [
        {
            name: "Dashboard",
            path: "/dashboard",
        },
        {
            name: "Documents",
            path: "/documents",
        },
        {
            name: "Chat",
            path: "/chat",
        },
    ];

    const employeeLinks = [
        {
            name: "Chat",
            path: "/chat",
        },
    ];

    const links =
        user?.role === "hr_admin"
            ? adminLinks
            : employeeLinks;

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
            <div className="p-4 space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `block rounded-md px-4 py-2 transition ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}