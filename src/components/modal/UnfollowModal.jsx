import { CommonModal } from "./CommonModal";
import { RxCross2 } from "react-icons/rx";

import { IoClipboardOutline } from "react-icons/io5";
import { RiUserUnfollowLine } from "react-icons/ri";

const UnfollowModal = ({ isUnfollowModalOpen, closeUnfollowModal }) => {
	return (
		<CommonModal isOpen={isUnfollowModalOpen} onClose={closeUnfollowModal}>
			<div className="h-36 flex flex-col justify-evenly items-center mb-6 text-black">
				<div className="text-black cursor-pointer">
					<RiUserUnfollowLine className="text-red-500 text-5xl" />
				</div>
				<div className="text-black font-semibold text-[22px]">Are you sure want to unfollow Sam Studies?</div>
			</div>
			<div className="flex justify-center gap-4 text-black">
				<button
					onClick={closeUnfollowModal}
					type="button"
					className="border-2 border-red-500 max-phone:flex-1 w-[38%] h-12 flex justify-center items-center font-semibold rounded-md transition-all duration-300 select-none  hover:border-red-600"
				>
					Cancel
				</button>
				<button
					aria-label="Unfollow User"
					type="button"
					className="bg-red-500 text-white max-phone:flex-1 w-[38%] h-12 flex justify-center items-center font-semibold rounded-md transition-all duration-300 select-none  hover:bg-red-600"
				>
					Yes, Unfollow!
				</button>
			</div>

			{/* Profile Section */}
		</CommonModal>
	);
};

export default UnfollowModal;
