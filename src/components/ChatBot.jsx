import React, { useState, useRef, useEffect } from "react";
import { useChat } from "../contexts/ChatContext";

const ChatBot = ({ isOpen, onClose }) => {
	const [input, setInput] = useState("");
	const { messages, isLoading, sendMessage } = useChat();
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const message = input.trim();
		setInput("");
		await sendMessage(message);
	};

	const MessageContent = ({ message }) => {
		return <span className="whitespace-pre-wrap">{message.content}</span>;
	};

	if (!isOpen) return null;

	return (
		<div className="fixed bottom-24 right-8 w-[400px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl animate-popup border border-gray-100 z-50">
			<div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-2xl">
				<h3 className="text-lg font-semibold">Chat Assistant</h3>
				<button onClick={onClose} className="text-white/90 hover:text-white">
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div className="h-[500px] p-4 overflow-y-auto custom-scrollbar">
				<div className="space-y-4">
					{messages.map((msg, index) => (
						<div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
							<div
								className={`rounded-2xl p-3 max-w-[90%] ${
									msg.role === "user"
										? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
										: "bg-gray-100 text-gray-800"
								}`}
							>
								<MessageContent message={msg} />
							</div>
						</div>
					))}
					{isLoading && (
						<div className="flex justify-start">
							<div className="bg-gray-100 rounded-lg p-3">Thinking...</div>
						</div>
					)}
					<div ref={messagesEndRef} />
				</div>
			</div>

			<form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
				<div className="flex gap-2">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type your message..."
						className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
						disabled={isLoading}
					/>
					<button
						type="submit"
						disabled={isLoading}
						className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50"
					>
						send
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChatBot;
