import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";

export default function ChatWindow({
    messages,
    loading,
}) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    return (
        <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <div className="flex-1 overflow-y-auto p-6">
                {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-center text-gray-500">
                        <div>
                            <h2 className="text-2xl font-semibold">
                                Welcome to HR Assist
                            </h2>

                            <p className="mt-2">
                                Ask any question about your HR
                                policies.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <div key={message.id}>
                                <ChatMessage
                                    type="user"
                                    message={message.question}
                                    timestamp={message.createdAt}
                                />

                                <ChatMessage
                                    type="assistant"
                                    message={message.answer}
                                    timestamp={message.createdAt}
                                    sources={message.sources}
                                />
                            </div>
                        ))}

                        {loading && (
                            <ChatMessage
                                type="assistant"
                                message="Thinking..."
                            />
                        )}

                        <div ref={bottomRef} />
                    </>
                )}
            </div>
        </div>
    );
}