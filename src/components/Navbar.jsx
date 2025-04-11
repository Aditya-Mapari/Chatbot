import React from "react";
import { FaRobot } from "react-icons/fa6";

const Navbar = ({ onLogout }) => {
	return (
		<nav className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
			<div className="container mx-auto px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<FaRobot size={30} color="blue" />
						<div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							ChatBot
						</div>
					</div>
					<div className="flex items-center space-x-6">
						<a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
							Home
						</a>
						<a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
							About
						</a>
						<button
							onClick={onLogout}
							className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300"
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
