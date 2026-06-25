import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AppLayout from "../components/layout/AppLayout";
import StatCard from "../components/dashboard/StatCard";
import { getDocuments } from "../api/documentApi";

export default function DashboardPage() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            setLoading(true);

            const response = await getDocuments();

            setDocuments(response.data || []);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to load documents"
            );
        } finally {
            setLoading(false);
        }
    };

    const totalDocuments = documents.length;

    const indexedDocuments = documents.filter(
        (doc) => doc.status === "indexed"
    ).length;

    const processingDocuments = documents.filter(
        (doc) => doc.status === "processing"
    ).length;

    const failedDocuments = documents.filter(
        (doc) => doc.status === "failed"
    ).length;

    if (loading) {
        return (
            <AppLayout>
                <p className="text-lg">Loading dashboard...</p>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Overview of uploaded HR documents.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Total Documents"
                        value={totalDocuments}
                    />

                    <StatCard
                        title="Indexed"
                        value={indexedDocuments}
                    />

                    <StatCard
                        title="Processing"
                        value={processingDocuments}
                    />

                    <StatCard
                        title="Failed"
                        value={failedDocuments}
                    />
                </div>

                <div className="rounded-lg bg-white shadow-sm border border-gray-200">
                    <div className="border-b border-gray-200 p-5">
                        <h2 className="text-xl font-semibold">
                            Recent Documents
                        </h2>
                    </div>

                    {documents.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                            No documents uploaded yet.
                        </div>
                    ) : (
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">
                                        Title
                                    </th>

                                    <th className="px-6 py-3 text-left text-sm font-semibold">
                                        Status
                                    </th>

                                    <th className="px-6 py-3 text-left text-sm font-semibold">
                                        Created
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {documents.slice(0, 5).map((document) => (
                                    <tr
                                        key={document._id}
                                        className="border-t border-gray-200"
                                    >
                                        <td className="px-6 py-4">
                                            {document.title}
                                        </td>

                                        <td className="px-6 py-4 capitalize">
                                            {document.status}
                                        </td>

                                        <td className="px-6 py-4">
                                            {new Date(
                                                document.createdAt
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}