// import { useCallback } from "react";

// import { useSelector } from "react-redux";
// import { useState } from "react";
// import { TOPICS_ITEMS } from "../data/topics";
// import { CacheCard } from "../components/card/CacheCard";
// import { toggleStarredCache } from "../features/starredSlice ";
// import AskModal from "../components/modal/AskModal";
// import { dispatchAction } from "../app/store";

// export const Topics = () => {
// 	// Redux Setup
// 	const starredCaches = useSelector((state) => state.starred.starredCaches);

// 	// Modal State
// 	const [selectedCache, setSelectedCache] = useState(null);
// 	const [isAskModalOpen, setIsAskModalOpen] = useState(false);

// 	// Toggle Starred Cache
// 	const starToggle = (name) => {
// 		dispatchAction(toggleStarredCache(name)); // Dispatch Redux Action
// 	};

// 	// Open Ask Modal
// 	const openAskModal = useCallback((cache) => {
// 		setSelectedCache(cache);
// 		setIsAskModalOpen(true);
// 	}, []);

// 	// Close Ask Modal
// 	const closeAskModal = useCallback(() => {
// 		setIsAskModalOpen(false);
// 		setSelectedCache(null);
// 	}, []);

// 	return (
// 		<div>
// 			<div className="grid grid-cols-4 m-4 gap-2 select-none">
// 				{TOPICS_ITEMS.map((cache, index) => (
// 					<CacheCard key={cache.name || index} cache={cache} openAskModal={openAskModal} starredCaches={starredCaches} starToggle={starToggle} />
// 				))}
// 			</div>

// 			{/* Ask Modal */}
// 			<AskModal isAskModalOpen={isAskModalOpen} closeAskModal={closeAskModal} selectedCache={selectedCache} />
// 		</div>
// 	);
// };

// =====================
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { CacheCard } from "../components/card/CacheCard";

import AskModal from "../components/modal/AskModal";
import { dispatchAction } from "../app/store";
import { toggleStarredCache } from "../features/starredSlice ";
import { apiCall } from "../api/config";

export const Topics = () => {
	const [caches, setCaches] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedCache, setSelectedCache] = useState(null);
	const [isAskModalOpen, setIsAskModalOpen] = useState(false);

	const starredCaches = useSelector((state) => state.starred.starredCaches);

	const fetchCaches = useCallback(async () => {
		try {
			const response = await apiCall("/caches", {});

			setCaches(response.data);
			setLoading(false);
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCaches();
	}, [fetchCaches]);

	const starToggle = (name) => {
		dispatchAction(toggleStarredCache(name));
		// Add API call here to update backend if needed
	};

	const openAskModal = useCallback((cache) => {
		setSelectedCache(cache);
		setIsAskModalOpen(true);
	}, []);

	const closeAskModal = useCallback(() => {
		setIsAskModalOpen(false);
		setSelectedCache(null);
	}, []);

	if (loading) {
		return (
			<div className="p-6 grid grid-cols-4 gap-4">
				{[...Array(8)].map((_, i) => (
					<SkeletonCard key={i} />
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-6 text-red-500 flex flex-col items-center">
				<svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<p className="text-lg mb-4">Error loading caches</p>
				<button onClick={fetchCaches} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<motion.div
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{caches.map((cache) => (
					<motion.div key={cache._id} variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
						<CacheCard cache={cache} openAskModal={openAskModal} starredCaches={starredCaches} starToggle={starToggle} />
					</motion.div>
				))}
			</motion.div>

			<AnimatePresence>
				{isAskModalOpen && <AskModal isAskModalOpen={isAskModalOpen} closeAskModal={closeAskModal} selectedCache={selectedCache} />}
			</AnimatePresence>
		</div>
	);
};

// Skeleton Loader Component
const SkeletonCard = () => (
	<div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
		<div className="h-40 bg-gray-200 rounded mb-4" />
		<div className="h-6 bg-gray-200 rounded mb-2" />
		<div className="h-4 bg-gray-200 rounded w-3/4" />
	</div>
);

// Animation Variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};
