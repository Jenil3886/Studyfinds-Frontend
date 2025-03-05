import { useState } from "react";
import AskModal from "../../modal/AskModal";
import UnfollowModal from "../../modal/UnfollowModal";
import { SAVE_CACHES, SAVE_PROFILES } from "../../../data/save";
import { FilteredProfiles } from "./FilteredProfiles";
import { useCallback } from "react";
import { FilteredCaches } from "./FilteredCaches";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { HOME_ITEMS } from "../../../data";
import { Masonry } from "@mui/lab";

const SaveContant = ({ activeTab }) => {
	// modal contant

	// Ask modal

	const [isAskModalOpen, setIsAskModalOpen] = useState(false);

	const openAskModal = () => setIsAskModalOpen(true);
	const closeAskModal = () => setIsAskModalOpen(false);

	// Unfollow modal

	const [isUnfollowModalOpen, setIsUnfollowModalOpen] = useState(false);

	const openUnfollowModal = useCallback(() => setIsUnfollowModalOpen(true), [setIsUnfollowModalOpen]);
	const closeUnfollowModal = () => setIsUnfollowModalOpen(false);

	// Filter items based on activeTab

	const starredCaches = useSelector((state) => state.starred.starredCaches);

	//////////////////////////////////////////////////////////////////////////////////////
	// const activeButton = useSelector((state) => state.viewToggle);
	// const saveItemIds = useSelector((state) => state.data.saveItemIds);

	//   const saveItemIds = useMemo(() => HOME_ITEMS.filter((i) => ), [saveItemIds])
	// const saveItem = useMemo(() => {
	// 	let filteredItems = [];

	// 	for (let i = 0; i < saveItemIds.length; i++) {
	// 		for (let j = 0; j < HOME_ITEMS.length; j++) {
	// 			if (saveItemIds[i] === HOME_ITEMS[j].id) {
	// 				filteredItems.push(HOME_ITEMS[j]);
	// 			}
	// 		}
	// 	}

	// 	return filteredItems;
	// }, [saveItemIds]);

	return (
		<div className="grid grid-cols-4 m-3 gap-2 select-none">
			{/* Items */}

			{/* Caches Filter.*/}
			{/* <FilteredCaches filteredCaches={filteredCaches} openUnfollowModal={openAskModal} /> */}

			{/* Items Filter.

			{activeTab === "items" && (
				<Masonry columns={3} spacing={3}>
					{saveItem.map((item) => (
						<ItemGridCard key={item.id} item={item} />
					))}
				</Masonry>
			)} */}

			{activeTab === "caches" && <FilteredCaches filteredCaches={starredCaches} openUnfollowModal={openAskModal} />}

			{/* Profile Filter.*/}
			{/* <FilteredProfiles filteredProfiles={filteredProfiles} openUnfollowModal={openUnfollowModal} /> */}

			{/* Modals */}
			<AskModal isAskModalOpen={isAskModalOpen} closeAskModal={closeAskModal} />
			<UnfollowModal isUnfollowModalOpen={isUnfollowModalOpen} closeUnfollowModal={closeUnfollowModal} />
		</div>
	);
};

export default SaveContant;
