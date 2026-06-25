import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { updateDocument } from "../../api/documentApi";

export default function UpdateDocumentModal({
    document,
    open,
    onClose,
    onSuccess,
}) {
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (document) {
            setTitle(document.title);
        }
    }, [document]);

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setUpdating(true);

            const formData = new FormData();

            formData.append("title", title);

            if (selectedFile) {
                formData.append("document", selectedFile);
            }

            const response = await updateDocument(
                document._id,
                formData
            );

            toast.success(response.message);

            onSuccess();
            onClose();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update document."
            );
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-lg bg-white p-6">
                <h2 className="mb-6 text-2xl font-bold">
                    Update Document
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="mb-2 block font-medium">
                            Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            className="w-full rounded border p-2"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Replace PDF (Optional)
                        </label>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                setSelectedFile(e.target.files[0])
                            }
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded bg-gray-300 px-4 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={updating}
                            className="rounded bg-blue-600 px-4 py-2 text-white"
                        >
                            {updating
                                ? "Updating..."
                                : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}