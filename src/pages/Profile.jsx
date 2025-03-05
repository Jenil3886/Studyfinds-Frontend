import { useState } from "react";
import { IoIosLink } from "react-icons/io";
import { LuDot } from "react-icons/lu";
import ShereModal from "../components/modal/ShereModal";

export const Profile = () => {
	// modal

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	return (
		<div className="flex items-center justify-between mx-10 my-6 select-none">
			<div className="flex items-center gap-9">
				<div>
					<span
						className="w-36 h-36 rounded-full text-white text-5xl font-normal flex justify-center items-center"
						style={{ backgroundColor: "#a81563" }}
					>
						JG
					</span>
				</div>
				<div className="flex flex-col justify-center items-start">
					<div className="text-4xl font-bold ">jenil gajera</div>
					<div className=" flex items-center justify-start font-semibold text-gray-500">
						<div className="">@jenilgajera </div>
						<LuDot className="text-gray-500 text-2xl" />
						<div className="">0 followors </div>
					</div>
					<div className="font-semibold text-gray-700">Joined January 2025</div>
				</div>
			</div>

			<div
				onClick={openModal}
				className=" p-3 flex items-center font-semibold text-[16px] border border-gray-500 rounded-full   text-black transition duration-300"
			>
				<IoIosLink />
			</div>

			<ShereModal isModalOpen={isModalOpen} closeModal={closeModal} />
		</div>
	);
};
