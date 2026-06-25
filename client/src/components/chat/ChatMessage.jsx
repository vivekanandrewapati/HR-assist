import SourceChips from "./SourceChips";

export default function ChatMessage({
    type,
    message,
    timestamp,
    sources = [],
}) {
    const isUser = type === "user";

    return (
        <div
            className={`mb-6 flex ${isUser ? "justify-end" : "justify-start"
                }`}
        >
            <div
                className={`max-w-3xl rounded-xl px-5 py-4 shadow-sm ${isUser
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200"
                    }`}
            >
                <div className="mb-2 flex items-center justify-between gap-6">
                    <p className="text-sm font-semibold">
                        {isUser ? "You" : "HR Assist"}
                    </p>

                    {timestamp && (
                        <span
                            className={`text-xs ${isUser
                                ? "text-blue-100"
                                : "text-gray-500"
                                }`}
                        >
                            {new Date(timestamp).toLocaleString()}
                        </span>
                    )}
                </div>

                <div className="whitespace-pre-wrap break-words">
                    {message}
                </div>

                {!isUser && (
                    <SourceChips sources={sources} />
                )}
            </div>
        </div>
    );
}