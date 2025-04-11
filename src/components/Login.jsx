import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { login } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (login(username, password)) {
			setError("");
		} else {
			setError("Invalid credentials");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-96">
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
				{error && <div className="mb-4 text-red-500 text-center">{error}</div>}
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
							required
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
							required
						/>
					</div>
					<button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
