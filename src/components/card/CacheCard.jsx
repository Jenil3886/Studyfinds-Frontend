import { memo } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { PiStarFourBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { toggleStarredCache } from "../../features/starredSlice ";
import { dispatchAction } from "../../app/store";

export const CacheCard = memo(({ cache, openAskModal, starredCaches }) => {
	const isStarred = starredCaches.includes(cache.name);

	// Toggle star status using Redux

	const starToggle = () => {
		dispatchAction(toggleStarredCache(cache.name));
	};

	return (
		<Link
			key={cache.name || cache.id || Math.random()}
			className="shadow-sm cursor-pointer border rounded-2xl p-3 phone:p-4 flex flex-col items-start justify-between text-center hover:shadow-md transition-all duration-300 ease-in-out min-h-40 overflow-hidden"
		>
			<div className="w-full flex justify-between">
				<div className="h-16 w-16">
					<img src={cache.cover_img} alt={cache.title} />
				</div>
				<div onClick={starToggle}>{isStarred ? <FaStar className="text-primary" /> : <FaRegStar />}</div>
			</div>
			<div className="font-bold text-xl">{cache.title}</div>
			<div className="w-full flex justify-between">
				<div className="text-gray-600 text-sm">{cache.count} items</div>
				<div onClick={() => openAskModal(cache)} className="">
					<PiStarFourBold />
				</div>
			</div>
		</Link>
	);
});
