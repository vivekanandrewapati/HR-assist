import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AppLayout from "../components/layout/AppLayout";
import DocumentUploader from "../components/documents/DocumentUploader";
import DocumentTable from "../components/documents/DocumentTable";

import { getDocuments } from "../api/documentApi";

export default function DocumentsPage() {
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
                error.response?.data?.message ||
                "Failed to load documents."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Documents
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Upload and manage HR policy documents.
                    </p>
                </div>

                <DocumentUploader
                    onUploadSuccess={fetchDocuments}
                />

                <DocumentTable
                    documents={documents}
                    loading={loading}
                    onRefresh={fetchDocuments}
                />
            </div>
        </AppLayout>
    );
}