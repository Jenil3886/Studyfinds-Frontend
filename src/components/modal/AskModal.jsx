import { v4 as uuid } from "uuid";

import { CommonModal } from "./CommonModal";
import { RxCross2 } from "react-icons/rx";

import { IoClipboardOutline } from "react-icons/io5";
import { memo } from "react";
import { useState } from "react";
import { dispatchAction } from "../../app/store";
import { addNotification } from "../../features/notificationSlice";

const AskModal = memo(({ isAskModalOpen, selectedCache, closeAskModal }) => {
	// State to store the input value
	const [inputValue, setInputValue] = useState("");

	// Function To handel input changes
	const handleInputChange = (e) => {
		setInputValue(e.target.value); // Update the state with the new input value
	};

	// Function to handle from ubmission or "Ask" button click
	const handleAsk = () => {
		const notificationBody = {
			id: uuid(),
			type: "ask",
			title: selectedCache?.name,
			message: inputValue,
			icon: selectedCache?.img,
			timestamp: new Date(),
		};

		dispatchAction(addNotification(notificationBody));
		handleCloseModal();
	};

	// Function to close the modal and clear the input
	const handleCloseModal = () => {
		setInputValue(""); // Clear the input value
		closeAskModal(); // Close the modal
	};
	return (
		<CommonModal isOpen={isAskModalOpen} onClose={handleCloseModal}>
			<div className="flex flex-col  gap-3 justify-center items-center">
				<div className="flex items-center justify-between w-full">
					<div className="text-black font-bold text-[23px]">Ask anything</div>
					<div onClick={handleCloseModal} className="text-black cursor-pointer">
						<RxCross2 />
					</div>
				</div>

				<form className="w-full " onSubmit={(e) => e.preventDefault()}>
					<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
						Search
					</label>
					<div className="relative">
						<input
							type="text"
							id="default-search"
							className="block w-full py-3.5 ps-5 text-sm text-gray-900  rounded-md bg-gray-100 "
							placeholder="Search Profiles"
							required
							value={inputValue} // Bind the Input Value to State
							onChange={handleInputChange} // Handle Input Change
						/>
						<div className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer text-black">
							<div className=" p-2 flex items-center font-semibold text-[16px] bg-white border border-gray-300 rounded-full text-black transition duration-300">
								<IoClipboardOutline />
							</div>
						</div>
					</div>
				</form>

				<div className="flex items-center justify-end w-full">
					<span
						className="bg-black text-white text-sm font-semibold py-2 px-4 rounded-md cursor-pointer select-none"
						onClick={(handleCloseModal, handleAsk)} // Use handleAsk to log the input value
					>
						Ask
					</span>
				</div>
			</div>
		</CommonModal>
	);
});
export default AskModal;
