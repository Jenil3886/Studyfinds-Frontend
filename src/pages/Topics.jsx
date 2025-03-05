import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { TOPICS_ITEMS } from "../data/topics";
import { CacheCard } from "../components/card/CacheCard";
import { toggleStarredCache } from "../features/starredSlice ";
import AskModal from "../components/modal/AskModal";

export const Topics = () => {
	// Redux Setup
	const dispatch = useDispatch();
	const starredCaches = useSelector((state) => state.starred.starredCaches);

	// Modal State
	const [selectedCache, setSelectedCache] = useState(null);
	const [isAskModalOpen, setIsAskModalOpen] = useState(false);

	// Toggle Starred Cache
	const starToggle = (name) => {
		dispatch(toggleStarredCache(name)); // Dispatch Redux Action
	};

	// Open Ask Modal
	const openAskModal = useCallback((cache) => {
		setSelectedCache(cache);
		setIsAskModalOpen(true);
	}, []);

	// Close Ask Modal
	const closeAskModal = useCallback(() => {
		setIsAskModalOpen(false);
		setSelectedCache(null);
	}, []);

	return (
		<div>
			<div className="grid grid-cols-4 m-4 gap-2 select-none">
				{TOPICS_ITEMS.map((cache, index) => (
					<CacheCard key={cache.name || index} cache={cache} openAskModal={openAskModal} starredCaches={starredCaches} starToggle={starToggle} />
				))}
			</div>

			{/* Ask Modal */}
			<AskModal isAskModalOpen={isAskModalOpen} closeAskModal={closeAskModal} selectedCache={selectedCache} />
		</div>
	);
};
