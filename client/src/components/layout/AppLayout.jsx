import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
    return (
        <div className="h-screen bg-gray-100">
            <Navbar />

            <div className="flex h-[calc(100vh-64px)]">
                <Sidebar />

                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}