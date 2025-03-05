import { blogPosts } from "../helper/data";
import { Footer } from "../layout/footer";
import { Header } from "../layout/header";
import { useState } from "react";

export const Home1 = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const featuredPost = blogPosts[0];

	const filteredPosts = blogPosts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-grow container mx-auto px-4 py-8">
				<section className="mb-8">
					<h1 className="text-4xl font-bold mb-4">Welcome to the Blog</h1>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-3xl font-bold mb-2">{featuredPost.title}</h2>
						<p className="text-gray-600 mb-4">{featuredPost.date}</p>
						<p className="text-gray-800">{featuredPost.summary}</p>
					</div>
				</section>
				<section className="mb-8">
					<h2 className="text-3xl font-bold mb-4">Recent Posts</h2>
					<input
						type="text"
						placeholder="Search posts..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="mb-4 p-2 border border-gray-300 rounded"
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredPosts.slice(1).map((post, index) => (
							<div key={index} className="bg-white p-6 rounded-lg shadow-md">
								<h3 className="text-2xl font-bold mb-2">{post.title}</h3>
								<p className="text-gray-600 mb-4">{post.date}</p>
								<p className="text-gray-800">{post.summary}</p>
							</div>
						))}
					</div>
				</section>
				<aside className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-2xl font-bold mb-4">Categories</h2>
					<ul className="list-disc list-inside">
						<li className="mb-2">Technology</li>
						<li className="mb-2">Lifestyle</li>
						<li className="mb-2">Travel</li>
						<li className="mb-2">Food</li>
					</ul>
					<h2 className="text-2xl font-bold mt-8 mb-4">Popular Tags</h2>
					<div className="flex flex-wrap gap-2">
						<span className="bg-blue-500 text-white px-3 py-1 rounded">#tech</span>
						<span className="bg-green-500 text-white px-3 py-1 rounded">#lifestyle</span>
						<span className="bg-red-500 text-white px-3 py-1 rounded">#travel</span>
						<span className="bg-yellow-500 text-white px-3 py-1 rounded">#food</span>
					</div>
				</aside>
			</main>
		</div>
	);
};
