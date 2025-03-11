import { useState } from "react";
import { motion } from "framer-motion";

export const ProfileCard = ({ user }) => {
	const { avatar } = user;
	const [isHovered, setIsHovered] = useState(false);

	// ];
	return (
		<motion.li
			className="border border-gray-200 rounded-3xl p-5 flex flex-col items-center transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 cursor-pointer relative overflow-hidden"
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Glowing effect */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-br from-purple-300 to-blue-300 opacity-0"
				animate={{ opacity: isHovered ? 0.2 : 0 }}
				transition={{ duration: 0.3 }}
			/>

			{/* Avatar Section */}
			<div className="relative w-28 h-28 mb-4">
				{avatar ? (
					<img
						src={user.profileImgURL}
						alt={`${user.username}'s profile`}
						className="object-cover w-full h-full rounded-full border-4 border-white shadow-lg transform transition-transform hover:scale-105"
					/>
				) : (
					<div className="w-full h-full rounded-full flex items-center justify-center border-4 border-white shadow-lg">
						<span className="text-white text-3xl font-bold drop-shadow-md">JG</span>
					</div>
				)}
			</div>

			{/* Content Section */}
			<div className="text-center w-full">
				<h2 className="text-xl font-bold mb-1 text-gray-800">{user.username}</h2>
				<div className="flex items-center justify-center gap-4">
					<p className="text-sm text-gray-500 flex items-center justify-center gap-1 mb-2">
						<svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
							<path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" clipRule="evenodd" />
						</svg>
						{user.followers} followers
					</p>
					<p className="text-sm text-gray-500 flex items-center justify-center gap-1 mb-2">
						<svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
							<path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" clipRule="evenodd" />
						</svg>
						{user.following} following
					</p>
				</div>
				<p className="text-gray-600 text-sm mb-3 line-clamp-2">{user.bio} user Bio</p>

				<button
					className="
                     bg-gradient-to-r from-purple-500 to-blue-500
                     text-white px-4 py-2 rounded-full w-full transition-transform transform hover:scale-105 active:scale-95"
				>
					Follow
				</button>
			</div>
		</motion.li>
	);
};
