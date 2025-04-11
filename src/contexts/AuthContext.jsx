import React, { createContext, useState, useContext, useEffect } from "react";
import questionsAnswers from "../data/questionsAnswers.json";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const authStatus = localStorage.getItem("isAuthenticated");
		if (authStatus === "true") {
			setIsAuthenticated(true);
		}
	}, []);

	const login = (username, password) => {
		if (username === "user" && password === "123456") {
			localStorage.setItem("isAuthenticated", "true");
			setIsAuthenticated(true);
			return true;
		}
		return false;
	};

	const logout = () => {
		localStorage.removeItem("isAuthenticated");
		setIsAuthenticated(false);
	};

	const getAnswer = (question) => {
		const qaPair = questionsAnswers.questionsAnswers.find(
			(qa) => qa.question.toLowerCase() === question.toLowerCase()
		);
		return qaPair ? qaPair.answer : "Sorry, I don't know the answer to that question.";
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout, getAnswer }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
