import { useState } from "react";
import { memo } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { PiStarFourBold } from "react-icons/pi";

export const FilteredCaches = memo(({ filteredCaches, openAskModal }) => {
	if (!Array.isArray(filteredCaches)) {
		console.warn("filteredCaches should be an array.");
		return null;
	}

	// State to track starred status for each cache
	// const [starredCaches, setStarredCaches] = useState({});

	// Function to toggle star status for a specific cache
	const starToggle = (name) => {
		// Star feature to be implimented
		// setStarredCaches((prevState) => ({
		// 	...prevState,
		// 	[name]: !prevState[name], // Toggle the current cache's starred state
		// }));
	};

	return filteredCaches.map((caches) => (
		<div
			key={`${caches.name}`}
			className="shadow-sm cursor-pointer border rounded-2xl p-3 phone:p-4 flex flex-col items-start justify-between text-center hover:shadow-md transition-all duration-300 ease-in-out min-h-40 overflow-hidden"
		>
			<div className="w-full flex justify-between">
				<div className="h-16 w-16">
					<img src={caches.img} alt={caches.name} />
				</div>
				<div onClick={() => starToggle(caches.name)}>
					{false ? (
						<FaStar className="text-primary" /> // Saved Icon
					) : (
						<FaRegStar /> // Unsaved Icon
					)}
				</div>
			</div>
			<div className="font-bold text-xl">{caches.name}</div>
			<div className="w-full flex justify-between">
				<div className="text-gray-600 text-sm">{caches.count} items</div>
				<div onClick={openAskModal} className="">
					<PiStarFourBold />
				</div>
			</div>
		</div>
	));
});
