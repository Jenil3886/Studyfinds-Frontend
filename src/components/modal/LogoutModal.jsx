import { CommonModal } from "./CommonModal";
import { memo } from "react";

const LogoutModal = memo(({ isLogoutModalOpen, closeLogoutModal, onLogout }) => {
	const handleCloseModal = () => {
		closeLogoutModal();
	};
	return (
		<CommonModal isOpen={isLogoutModalOpen} onClose={handleCloseModal}>
			<div className="flex flex-col  gap-3 justify-center items-center">
				<div className="flex flex-col justify-between gap-3 mb-3 w-full">
					<div className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 text-3xl leading-10 font-bold  ">Log Out?</div>
					<div className="text-black font-semiblod text-xl">Are you sure want to be logout?</div>
				</div>

				<div className="flex items-center justify-around w-full">
					<span
						className="text-lg font-semibold py-2 px-10 bg-gray-100 hover:bg-gray-200 duration-100 rounded-md cursor-pointer select-none"
						onClick={handleCloseModal}
					>
						Cancel
					</span>
					<span
						className="bg-black hover:bg-gray-800 duration-100 text-white text-lg font-semibold py-2 px-10 rounded-md cursor-pointer select-none"
						onClick={() => {
							onLogout();
						}}
					>
						Log out
					</span>
				</div>
			</div>
		</CommonModal>
	);
});
export default LogoutModal;
