import { memo } from "react";
import { FaStar } from "react-icons/fa";

export const FilteredProfiles = memo(({ filteredProfiles, openUnfollowModal }) => {
	if (!Array.isArray(filteredProfiles)) {
		console.warn("filteredProfiles should be an array.");
		return null;
	}

	return filteredProfiles.map((profiles) => (
		<div
			key={`${profiles.name}-${profiles.followers}`} // Ensure unique key
			className="shadow-sm cursor-pointer border rounded-2xl p-3 phone:p-4 flex flex-col items-start justify-between text-center hover:shadow-md transition-all duration-300 ease-in-out min-h-40 overflow-hidden"
		>
			<div className="w-full flex justify-between">
				<div className="h-24 w-24">
					<img className="rounded-full" src={profiles.img} alt={profiles.name} />
				</div>

				{/* Added key to FaStar */}
				<FaStar
					key={`star-${profiles.name}`} // Add unique key for each FaStar component
					onClick={openUnfollowModal}
					className="text-primary"
				/>
			</div>
			<div className="font-semibold mt-2.5 text-xl">{profiles.name}</div>
			<div className="w-full flex justify-between">
				<div className="text-gray-600 text-sm">{profiles.followers} followers</div>
			</div>
			<div className="text-sm">is this required?</div>
		</div>
	));
});
