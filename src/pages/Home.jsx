import { useState } from "react";
import { useSelector } from "react-redux";
import { HOME_ITEMS } from "../data";
import { Masonry } from "@mui/lab";
import { ItemGridCard } from "../components/card/Item/ItemGridCard";
import { ItemLineCard } from "../components/card/Item/ItemLineCard";
import ShereModal from "../components/modal/ShereModal";

const Home = () => {
	const likedItemIds = useSelector((state) => state.data.likedItemIds);
	const saveItemIds = useSelector((state) => state.data.saveItemIds);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const closeModal = () => setIsModalOpen(false);

	// view toggle

	const activeButton = useSelector((state) => state.viewToggle);

	return (
		<div className="h-full p-4 flex flex-col items-start gap-y-6 overflow-y-auto">
			{/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}

			{/* Grid View is there */}

			{activeButton === "grid" ? (
				<Masonry columns={3} spacing={3}>
					{HOME_ITEMS.map((item) => (
						<ItemGridCard
							key={item.id}
							item={item}
							// isStarred={false}
							isLiked={likedItemIds.includes(item.id)}
							// isStarred={saveItemIds.includes(item.id)}
							setIsModalOpen={setIsModalOpen}
						/>
					))}
				</Masonry>
			) : (
				// Menu View is heare
				<div className="w-full">
					{HOME_ITEMS.map((item) => (
						<ItemLineCard
							key={item.id}
							item={item}
							// isStarred={false}
							isLiked={likedItemIds.includes(item.id)}
							// isStarred={saveItemIds.includes(item.id)}
							setIsModalOpen={setIsModalOpen}
						/>
					))}
				</div>
			)}

			<ShereModal isModalOpen={isModalOpen} closeModal={closeModal} />
		</div>
	);
};

export default Home;
