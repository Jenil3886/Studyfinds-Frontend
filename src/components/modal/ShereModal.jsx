import { CommonModal } from "./CommonModal";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { FaFacebookF, FaLinkedinIn, FaRedditAlien, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosLink } from "react-icons/io";

const ShereModal = ({ isModalOpen, closeModal }) => {
	const profiles = [
		{ name: "Jenil Gajera", initials: "JG", bgColor: "#7E3794", icon: null },
		{ name: "Sanket Talaviya", initials: "SK", bgColor: "#1D1E33", icon: null },
		{ name: "Darshan Gajera", initials: "DG", bgColor: "#063971", icon: null },
		{ name: "Prince Gajera", initials: "PG", bgColor: "#6D3F5B", icon: null },
		{ name: "Parth Meghani", initials: "PM", bgColor: "#7E7B52", icon: null },
		{ name: "Milan Lagariiya", initials: "ML", bgColor: "#A18594", icon: null },
	];

	const socialProfiles = [
		{ name: "Copy Link", icon: <IoIosLink />, bgColor: "#858585" },
		{ name: "Whatsapp", icon: <FaWhatsapp />, bgColor: "#22D366" },
		{ name: "Facebook", icon: <FaFacebookF />, bgColor: "#0565FE" },
		{ name: "X", icon: <FaXTwitter />, bgColor: "#000000" },
		{ name: "Email", icon: <MdOutlineEmail />, bgColor: "#7F7F7F" },
		{ name: "LinkedinIn", icon: <FaLinkedinIn />, bgColor: "#0077B5" },
		{ name: "Reddit", icon: <FaRedditAlien />, bgColor: "#FF5700" },
	];

	return (
		<CommonModal isOpen={isModalOpen} onClose={closeModal}>
			<div className="flex flex-col  gap-3 justify-center items-center">
				<div className="flex items-center justify-between w-full">
					<div className="text-black text-[23px]">Shere</div>
					<div onClick={closeModal} className="text-black cursor-pointer">
						<RxCross2 />
					</div>
				</div>

				<form className="w-full ">
					<label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
					<div className="relative">
						<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-black">
							<CiSearch />
						</div>
						<input
							type="search"
							id="default-search"
							className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-100 "
							placeholder="Search Profiles"
							required
						/>
					</div>
				</form>

				{/* Profile Section */}
				<div className="flex w-full gap-3 py-3 border-b-2 border-gray-300">
					{profiles.map((profile, index) => (
						<div key={index} className="flex flex-col items-center">
							<span
								className="w-16 h-16 rounded-full text-white font-normal flex justify-center items-center"
								style={{ backgroundColor: profile.bgColor }}
							>
								{profile.initials || profile.icon}
							</span>
							<div className="text-black text-[12px] font-semibold">{profile.name}</div>
						</div>
					))}
				</div>

				{/* Social Media Section */}
				<div className="flex w-full gap-3">
					{socialProfiles.map((social, index) => (
						<div key={index} className="flex flex-col items-center">
							<span
								className="w-16 h-16 rounded-full text-white  font-normal flex justify-center items-center"
								style={{ backgroundColor: social.bgColor }}
							>
								<span className="text-[35px]">{social.icon}</span>
							</span>
							<div className="text-black text-[12px] font-semibold">{social.name}</div>
						</div>
					))}
				</div>
			</div>
		</CommonModal>
	);
};

export default ShereModal;
