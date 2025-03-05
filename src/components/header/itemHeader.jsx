import { FiMenu } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

import { useState } from "react";
import ShereModal from "../modal/ShereModal";

export const ItemHeader = () => {
	const [isGridIcon, setIsGridIcon] = useState(true);

	// Function to toggle between icons
	const toggleIcon = () => {
		setIsGridIcon(!isGridIcon);
	};

	// modal

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	return (
		<header
			className="w-full px-4 flex items-center justify-between gap-3 font-bold text-white text-xl border-b border-gray-200"
			style={{
				height: "10vh",
			}}
		>
			<div className="flex items-center gap-5 text-black">
				<IoIosArrowBack />
				<h1 className="inline text-[15px] font-semibold break-words hover:cursor-pointer">
					Tiny plastic particles are climbing up the food chain from the ground up
				</h1>
			</div>

			<div className="flex gap-3">
				<div className=" p-3 flex items-center font-semibold text-[16px] border border-gray-500 rounded-full   text-black transition duration-300">
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 1024 1024"
						className="star-icon text-lg text-primary"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
					</svg>
				</div>
				<div
					onClick={openModal}
					className=" flex gap-2 items-center px-5 py-2 font-semibold text-[16px] rounded-full bg-black transition duration-300"
				>
					<IoIosLink />
					<span className="">Shere</span>
				</div>

				<ShereModal isModalOpen={isModalOpen} closeModal={closeModal} />
			</div>
		</header>
	);
};
