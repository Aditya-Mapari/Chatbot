import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ChatProvider } from "./contexts/ChatContext";
import { FaRobot } from "react-icons/fa6";

const MainContent = () => {
	const [isChatOpen, setIsChatOpen] = useState(false);
	const { logout } = useAuth();
	const toggleChat = () => setIsChatOpen(!isChatOpen);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
			<Navbar onLogout={logout} />
			<main className="container mx-auto p-4 min-h-[calc(100vh-8rem)] flex items-center justify-center">
				<div className="text-center space-y-6 animate-fadeIn">
					<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Welcome to AI Chat Assistant
					</h1>
					<p className="text-gray-600 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
						A simple yet powerful chatbot interface
						<span className="font-semibold text-blue-600 hover:text-purple-600 transition-colors duration-300"></span>
					</p>
					<div className="flex justify-center space-x-4">
						<div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-xl">
							<p className="text-gray-600">Click the chat button to get started!</p>
						</div>
					</div>
				</div>
			</main>
			<div className="fixed bottom-8 right-8">
				<button
					onClick={toggleChat}
					className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all"
				>
					<FaRobot size={25} />
				</button>
			</div>
			<ChatBot isOpen={isChatOpen} onClose={toggleChat} />
			<Footer />
		</div>
	);
};

const App = () => {
	return (
		<AuthProvider>
			<ChatProvider>
				<ProtectedApp />
			</ChatProvider>
		</AuthProvider>
	);
};

const ProtectedApp = () => {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? <MainContent /> : <Login />;
};

export default App;
