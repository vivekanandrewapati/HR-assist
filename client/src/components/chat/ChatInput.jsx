import { useState } from "react";

export default function ChatInput({
    onSend,
    loading,
}) {
    const [question, setQuestion] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedQuestion = question.trim();

        if (!trimmedQuestion) return;

        onSend(trimmedQuestion);

        setQuestion("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 bg-white p-4"
        >
            <div className="flex gap-3">
                <textarea
                    rows={2}
                    placeholder="Ask a question about HR policies..."
                    value={question}
                    onChange={(e) =>
                        setQuestion(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-gray-100"
                />

                <button
                    type="submit"
                    disabled={loading || !question.trim()}
                    className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "..." : "Send"}
                </button>
            </div>

            <p className="mt-2 text-xs text-gray-500">
                Press Enter to send • Shift + Enter for a new line
            </p>
        </form>
    );
}