import { CommonModal } from "./CommonModal";
import { RxCross2 } from "react-icons/rx";

const AuthModal = ({ isModalOpen, closeModal }) => {
	return (
		<CommonModal isOpen={isModalOpen} onClose={closeModal}>
			<div className="flex flex-col  gap-3 justify-center items-center">
				<div className=" w-full flex gap-16  items-baseline">
					<RxCross2 onClick={closeModal} className="text-[25px] cursor-pointer" />
					<div className="flex flex-col  gap-3 justify-center items-center">
						<h2 className="text-[28px] font-semibold">Sign Up or Log In</h2>
						<p>Get started for free</p>
					</div>
				</div>

				<input
					type="text"
					id="first_name"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
					placeholder="Email Address"
					required
				/>
				<input
					type="password"
					id="first_name"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
					placeholder="Enter Your Password"
					required
				/>

				<button className="bg-black text-white w-full py-2.5 rounded-full">continew with email</button>
				<p className="text-sm text-gray-500 select-none">
					By clicking "Continue with Google / Facebook / Email" you agree to our User <u>Terms of Service</u> and <u>Privacy Policy</u>.
				</p>
			</div>
		</CommonModal>
	);
};

export default AuthModal;
