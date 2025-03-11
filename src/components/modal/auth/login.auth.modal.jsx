import { useState } from "react";
import { CommonModal } from "../CommonModal";
import { RxCross2 } from "react-icons/rx";

const LoginModal = ({ isModalOpen, closeModal }) => {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log("Form Data:", formData);
	};

	return (
		<CommonModal isOpen={isModalOpen} onClose={closeModal}>
			<form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-center items-center">
				<div className="w-full flex gap-40 items-baseline">
					<RxCross2 onClick={closeModal} className="text-[25px] cursor-pointer" />
					<div className="flex flex-col gap-3 justify-center items-center">
						<h2 className="text-[28px] font-semibold">Sign Up</h2>
						<p>Get started for free</p>
					</div>
				</div>
				<input
					type="text"
					id="fullName"
					name="fullName"
					value={formData.fullName}
					onChange={handleChange}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
					placeholder="Full Name"
					required
				/>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
					placeholder="Email Address"
					required
				/>
				<input
					type="password"
					id="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
					placeholder="Password"
					required
				/>
				<button type="submit" className="bg-black text-white w-full py-2.5 rounded-full">
					Continue with email
				</button>
				<p className="text-sm text-gray-500 select-none">
					By clicking "Continue with Google / Facebook / Email" you agree to our User <u>Terms of Service</u> and <u>Privacy Policy</u>.
				</p>
			</form>
		</CommonModal>
	);
};

export default LoginModal;
