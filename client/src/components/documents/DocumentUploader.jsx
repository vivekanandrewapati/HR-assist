import { useState } from "react";
import toast from "react-hot-toast";

import { uploadDocument } from "../../api/documentApi";

export default function DocumentUploader({ onUploadSuccess }) {
    const [title, setTitle] = useState("");
    const [document, setDocument] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Title is required.");
            return;
        }

        if (!document) {
            toast.error("Please select a PDF document.");
            return;
        }

        if (document.type !== "application/pdf") {
            toast.error("Only PDF files are allowed.");
            return;
        }

        try {
            setUploading(true);

            const formData = new FormData();

            formData.append("title", title);
            formData.append("document", document);

            const response = await uploadDocument(formData);

            toast.success(response.message);

            setTitle("");
            setDocument(null);

            // Clear the file input
            e.target.reset();

            onUploadSuccess();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to upload document."
            );
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold">
                Upload Document
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="mb-2 block font-medium">
                        Title
                    </label>

                    <input
                        type="text"
                        placeholder="Leave Policy"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        PDF Document
                    </label>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                            setDocument(e.target.files[0])
                        }
                        className="w-full rounded-md border border-gray-300 p-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={uploading}
                    className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {uploading
                        ? "Uploading..."
                        : "Upload Document"}
                </button>
            </form>
        </div>
    );
}