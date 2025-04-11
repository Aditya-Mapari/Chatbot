import React, { createContext, useContext, useState } from "react";
import questionsAnswers from "../data/questionsAnswers.json";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Helper function to normalize text by removing punctuation and converting to lowercase
	const normalizeText = (text) => {
		return text.toLowerCase().replace(/[^\w\s]/g, "").trim();
	};

	const sendMessage = async (message) => {
		setIsLoading(true);

		// Add the user's message to the chat
		setMessages((prev) => [...prev, { role: "user", content: message }]);

		// Normalize the user's input
		const normalizedMessage = normalizeText(message);

		// Step 1: Check for an exact normalized match
		let qaPair = questionsAnswers.questionsAnswers.find(
			(qa) => normalizeText(qa.question) === normalizedMessage
		);

		// Step 2: If no exact match, perform keyword-based matching
		if (!qaPair) {
			const keywords = normalizedMessage.split(" ");
			qaPair = questionsAnswers.questionsAnswers.find((qa) =>
				keywords.some((keyword) => normalizeText(qa.question).includes(keyword))
			);
		}

		// Fetch the answer based on the match
		const answer = qaPair
			? qaPair.answer
			: "Sorry, I don't know the answer to that question.";

		// Add the chatbot's response to the chat
		setMessages((prev) => [...prev, { role: "bot", content: answer }]);

		setIsLoading(false);
	};

	return (
		<ChatContext.Provider value={{ messages, isLoading, sendMessage }}>
			{children}
		</ChatContext.Provider>
	);
};

export const useChat = () => useContext(ChatContext);
