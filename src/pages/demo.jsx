import { useState } from "react";
import { LuBookUser, LuBookLock } from "react-icons/lu";
import { PiStarFourBold } from "react-icons/pi";

export default function Demo() {
	const [publicItems, setpublicItems] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [newItem, setNewItem] = useState({ title: "", description: "" });

	const handleAddItem = (e) => {
		e.preventDefault();
		setpublicItems([...publicItems, newItem]);
		setNewItem({ title: "", description: "" });
		setShowForm(false);
	};
	return (
		<div className="bg-gray-50 min-h-screen">
			{/* Header */}
			<header className="bg-white shadow-md py-4">
				<div className="container mx-auto px-6 flex justify-between items-center">
					<div className="text-2xl font-bold text-blue-600">MyApp</div>
					<nav className="hidden md:flex space-x-6">
						<a href="#" className="hover:text-blue-600">
							Features
						</a>
						<a href="#" className="hover:text-blue-600">
							Pricing
						</a>
						<a href="#" className="hover:text-blue-600">
							Support
						</a>
					</nav>
					<div className="flex items-center space-x-4">
						<button className="text-blue-600 hover:underline">Login</button>
						<button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">Sign Up</button>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="container mx-auto px-6 py-20 text-center">
				<h1 className="text-5xl font-bold text-gray-800 mb-4">Manage Your Content Efficiently</h1>
				<p className="text-gray-600 text-xl max-w-3xl mx-auto mb-8">
					Organize and control your public and private content with our intuitive platform
				</p>
				<button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">Get Started</button>
			</section>

			{/* Cards Section */}
			<section className="container mx-auto px-6 pb-20">
				<div className="flex flex-wrap items-stretch gap-6">
					{/* public Card */}
					<div
						className="relative shadow-lg cursor-pointer border border-transparent rounded-3xl w-full max-w-[398px] p-6 phone:p-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out overflow-hidden"
						onClick={() => setShowForm(true)}
					>
						<div className="absolute top-0 right-0 m-4">
							<PiStarFourBold className="h-6 w-6 text-yellow-300 drop-shadow-md" />
						</div>

						<div className="flex flex-col items-start justify-between h-full">
							<div className="flex items-center mb-4">
								<div className="p-3 bg-white/20 rounded-full mr-4">
									<LuBookUser className="h-10 w-10 text-white drop-shadow-lg" />
								</div>
								<h3 className="font-bold text-3xl tracking-wide">public</h3>
							</div>

							<div className="flex justify-between w-full items-end">
								<div className="text-sm opacity-80">{publicItems.length} items</div>
								<button className="bg-white/20 rounded-full px-4 py-2 text-sm font-medium hover:bg-white/30 transition">View Details →</button>
							</div>
						</div>
					</div>

					{/* private Card */}
					<div className="relative shadow-lg cursor-pointer border border-transparent rounded-3xl w-full max-w-[398px] p-6 phone:p-8 bg-gradient-to-r from-green-500 to-green-700 text-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out overflow-hidden">
						<div className="absolute top-0 right-0 m-4">
							<PiStarFourBold className="h-6 w-6 text-yellow-300 drop-shadow-md" />
						</div>

						<div className="flex flex-col items-start justify-between h-full">
							<div className="flex items-center mb-4">
								<div className="p-3 bg-white/20 rounded-full mr-4">
									<LuBookLock className="h-10 w-10 text-white drop-shadow-lg" />
								</div>
								<h3 className="font-bold text-3xl tracking-wide">private</h3>
							</div>

							<div className="flex justify-between w-full items-end">
								<div className="text-sm opacity-80">0 items</div>
								<button className="bg-white/20 rounded-full px-4 py-2 text-sm font-medium hover:bg-white/30 transition">View Details →</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="container mx-auto px-6 py-20 bg-white">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-gray-800 mb-4">Key Features</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">Advanced tools to help you manage your content more effectively</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="p-6 rounded-lg shadow-md hover:shadow-lg transition">
						<div className="bg-blue-100 p-4 rounded-full w-16 h-16 mb-4 mx-auto">
							<svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
						</div>
						<h3 className="text-xl font-semibold mb-2">Easy Management</h3>
						<p className="text-gray-600">Simplify your content organization process</p>
					</div>

					<div className="p-6 rounded-lg shadow-md hover:shadow-lg transition">
						<div className="bg-green-100 p-4 rounded-full w-16 h-16 mb-4 mx-auto">
							<svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9a1 1 0 01-1-1v-.586z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold mb-2">Security</h3>
						<p className="text-gray-600">Keep your private content secure</p>
					</div>

					<div className="p-6 rounded-lg shadow-md hover:shadow-lg transition">
						<div className="bg-purple-100 p-4 rounded-full w-16 h-16 mb-4 mx-auto">
							<svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
							</svg>
						</div>
						<h3 className="text-xl font-semibold mb-2">Analytics</h3>
						<p className="text-gray-600">Track your content performance</p>
					</div>
				</div>
			</section>

			{/* dhjksdakjlfhadsjkfhdakjlfdfh */}
			{/* Add Item Form Modal */}
			{showForm && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
					<div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
						<h3 className="text-2xl font-bold mb-6 text-gray-800">Add public Item</h3>
						<form onSubmit={handleAddItem}>
							<div className="mb-4">
								<label className="block text-gray-600 mb-2">Title</label>
								<input
									type="text"
									value={newItem.title}
									onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
									className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>
							<div className="mb-6">
								<label className="block text-gray-600 mb-2">Description</label>
								<textarea
									value={newItem.description}
									onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
									className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									rows="4"
									required
								/>
							</div>
							<div className="flex justify-end space-x-4">
								<button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
									Cancel
								</button>
								<button type="submit" className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
									Add Item
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12 mt-20">
				<div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h4 className="text-lg font-semibold mb-4">About</h4>
						<p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Quick Links</h4>
						<ul className="space-y-2">
							<li>
								<a href="#" className="hover:text-blue-400">
									Home
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-blue-400">
									Features
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-blue-400">
									Pricing
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Support</h4>
						<ul className="space-y-2">
							<li>
								<a href="#" className="hover:text-blue-400">
									Documentation
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-blue-400">
									Contact Us
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-blue-400">
									FAQ
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Subscribe</h4>
						<div className="flex items-center">
							<input type="email" placeholder="Enter your email" className="p-2 bg-gray-800 rounded-l focus:outline-none" />
							<button className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700 transition">→</button>
						</div>
					</div>
				</div>
				<div className="mt-8 text-center text-gray-500">&copy; 2024 MyApp Inc. All rights reserved.</div>
			</footer>
		</div>
	);
}
