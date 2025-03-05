import { FaCamera } from "react-icons/fa";

export const Settings = () => {
	return (
		<>
			<form className="max-w-4xl mx-auto mt-24">
				<div className="flex flex-col gap-2">
					<div className="flex justify-center">
						<span className="font-semibold">Profile Photo</span>
					</div>
					<div className="mb-5 flex justify-center">
						<div className="w-[100px] h-[100px] relative select-none rounded-full flex justify-center items-center overflow-hidden">
							<input id="profile-image-upload" accept=".jpg,.jpeg,.png,.gif,.svg,.webp,.bmp,.ico,.avif" className="hidden" type="file" />
							<label
								htmlFor="profile-image-upload"
								aria-label="Upload Profile Image"
								className="absolute w-full h-full flex justify-center items-center z-30  hover:cursor-pointer"
							>
								<FaCamera className="text-white text-2xl" />
							</label>
							<div className="bg-black opacity-50 text-white absolute w-full h-full z-10"></div>
							<div className="bg-black opacity-50 text-white absolute w-[92%] h-[92%] rounded-full z-20"></div>
						</div>
					</div>
				</div>
				<div className="mb-5">
					<label htmlFor="name" className="block mb-2 text-[14px] font-bold  text-gray-900">
						Display Name
					</label>
					<input
						type="text"
						id="name"
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-black  "
						placeholder="Jenil Gajera"
						required
					/>
				</div>
				<div className="mb-5">
					<label htmlFor="name" className="block mb-2 text-[14px] font-bold  text-gray-900">
						Username
					</label>
					<input
						type="text"
						id="name"
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-black "
						placeholder="jenilgajera"
						required
					/>
				</div>
				<div className="mb-5">
					<label htmlFor="Bio" className="block mb-2 text-[14px] font-bold  text-gray-900">
						Bio
					</label>
					<input
						type="email"
						id="bio"
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  "
						placeholder="Enter Your Bio"
						required
					/>
				</div>
				<div className="mb-5">
					<label htmlFor="url" className="block mb-2 text-[14px] font-bold  text-gray-900">
						Website
					</label>
					<input
						type="url"
						id="website"
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  "
						placeholder="Enter Your Website"
						required
					/>
				</div>
				<div className="mb-5">
					<label htmlFor="location" className="block mb-2 text-[14px] font-bold  text-gray-900">
						Location
					</label>
					<input
						type="location"
						id="location"
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  "
						placeholder="Enter Your Location"
						required
					/>
				</div>

				<div className="flex justify-center">
					<div className="rounded-full bg-black text-white text-center p-2 w-40">save</div>
				</div>
			</form>
		</>
	);
};
