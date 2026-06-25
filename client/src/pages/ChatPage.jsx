import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AppLayout from "../components/layout/AppLayout";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import {
    askQuestion,
    getChatHistory,
    deleteChatHistory,
} from "../api/chatApi";

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setHistoryLoading(true);
            const response = await getChatHistory();
            setMessages(response.data || []);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to load chat history"
            );
        } finally {
            setHistoryLoading(false);
        }
    };

    const handleSend = async (question) => {
        try {
            setLoading(true);
            const response = await askQuestion(question);
            setMessages((prev) => [...prev, response.data]);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to send message"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClearHistory = async () => {
        if (!window.confirm("Are you sure you want to clear your chat history?")) {
            return;
        }
        try {
            await deleteChatHistory();
            setMessages([]);
            toast.success("Chat history cleared");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to clear chat history"
            );
        }
    };

    return (
        <AppLayout>
            <div className="flex flex-col h-full max-h-[calc(100vh-120px)] space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Chat</h1>
                        <p className="mt-2 text-gray-500">
                            Ask questions about HR policies.
                        </p>
                    </div>
                    {messages.length > 0 && (
                        <button
                            onClick={handleClearHistory}
                            className="rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 transition"
                        >
                            Clear History
                        </button>
                    )}
                </div>

                {historyLoading ? (
                    <div className="flex flex-1 items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-lg text-gray-500">Loading chat history...</p>
                    </div>
                ) : (
                    <div className="flex flex-1 flex-col overflow-hidden min-h-0">
                        <ChatWindow messages={messages} loading={loading} />
                        <div className="mt-4">
                            <ChatInput onSend={handleSend} loading={loading} />
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}