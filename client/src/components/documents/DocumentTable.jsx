import { deleteDocument } from "../../api/documentApi";
import toast from "react-hot-toast";

export default function DocumentTable({
    documents,
    loading,
    onRefresh,
}) {
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this document?"
        );

        if (!confirmed) return;

        try {
            const response = await deleteDocument(id);

            toast.success(response.message);

            onRefresh();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to delete document."
            );
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "indexed":
                return "bg-green-100 text-green-700";

            case "processing":
                return "bg-yellow-100 text-yellow-700";

            case "failed":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    if (loading) {
        return (
            <div className="rounded-lg bg-white p-6 shadow-sm">
                Loading documents...
            </div>
        );
    }

    if (documents.length === 0) {
        return (
            <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                No documents uploaded yet.
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-sm border border-gray-200">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-4 text-left">
                            Title
                        </th>

                        <th className="px-6 py-4 text-left">
                            Original File
                        </th>

                        <th className="px-6 py-4 text-left">
                            Status
                        </th>

                        <th className="px-6 py-4 text-left">
                            Uploaded
                        </th>

                        <th className="px-6 py-4 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {documents.map((document) => (
                        <tr
                            key={document._id}
                            className="border-t border-gray-200"
                        >
                            <td className="px-6 py-4">
                                {document.title}
                            </td>

                            <td className="px-6 py-4">
                                {document.originalFileName}
                            </td>

                            <td className="px-6 py-4">
                                <span
                                    className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                                        document.status
                                    )}`}
                                >
                                    {document.status}
                                </span>
                            </td>

                            <td className="px-6 py-4">
                                {new Date(
                                    document.createdAt
                                ).toLocaleDateString()}
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-2">
                                    <button
                                        className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                                    >
                                        View
                                    </button>

                                    <button
                                        className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(document._id)
                                        }
                                        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}