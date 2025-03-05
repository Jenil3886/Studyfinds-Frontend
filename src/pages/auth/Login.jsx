import { useState } from "react";
import { Header } from "../../layout/header";
import { Footer } from "../../layout/footer";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Email:", email);
		console.log("Password:", password);
	};

	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-grow container mx-auto px-4 py-8">
				<h1 className="text-4xl font-bold mb-8">Login</h1>
				<form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
					<div className="mb-4">
						<label htmlFor="email" className="block text-gray-700 font-bold mb-2">
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="password" className="block text-gray-700 font-bold mb-2">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded"
							required
						/>
					</div>
					<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Login
					</button>
				</form>
			</main>
			<Footer />
		</div>
	);
};
