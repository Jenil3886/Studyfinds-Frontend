import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoImageOutline } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa";
import { FcAddImage } from "react-icons/fc";
import { BsTrash } from "react-icons/bs";
import { motion } from "framer-motion";
import { CommonModal } from "./CommonModal";
import { apiCall } from "../../api/config";
import { REQ_METHODS } from "../../helper/constants";

const AddCache = ({ isOpen, onClose, cacheType }) => {
	const [dragActive, setDragActive] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		cover_img: null,
	});
	const [previewImage, setPreviewImage] = useState(null);
	const [showHint, setShowHint] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDragIn = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
			setDragActive(true);
		}
	};

	const handleDragOut = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);

		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith("image/")) {
			if (file.size > 5 * 1024 * 1024) {
				alert("File size should be less than 5MB");
				return;
			}
			setFormData({ ...formData, cover_img: file });
			setPreviewImage(URL.createObjectURL(file));
		} else {
			alert("Please upload a valid image file");
		}
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file && file.size > 5 * 1024 * 1024) {
			alert("File size should be less than 5MB");
			return;
		}
		setFormData({ ...formData, cover_img: file });
		setPreviewImage(URL.createObjectURL(file));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			// const data = new FormData();
			// data.append("title", formData.title);
			// data.append("description", formData.description);
			// if (formData.cover_img) data.append("cover_img", formData.cover_img);
			// for (const pair of data.entries()) {
			// 	console.log(pair[0] + ", " + pair[1]);
			// }

			const payload = {
				type: cacheType,
				title: formData.title,
				description: formData.description,
				cover_img: formData.cover_img,
			};

			const response = await apiCall("/caches", {
				method: REQ_METHODS.POST,
				body: payload,
			});

			const result = await response.json();
			console.log("API Response:", result);

			alert("Cache created successfully!");
			onClose();
		} catch (error) {
			console.error("Error creating cache:", error);
			alert("Failed to create cache. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<CommonModal isOpen={isOpen} onClose={onClose}>
			<motion.div
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: -50, opacity: 0 }}
				transition={{ duration: 0.3 }}
				className="p-6 rounded-2xl bg-white w-[600px] max-w-full"
			>
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">Add New Cache</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
						<RxCross2 size={28} />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Cache Name */}
					<div className="relative">
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleInputChange}
							className="w-full px-5 py-4 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors peer"
							placeholder=" "
							required
						/>
						<label className="absolute left-5 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500">
							Cache title
						</label>
						<IoImageOutline className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
					</div>

					{/* cover_img Upload */}
					<div>
						<label className="block mb-2 text-sm font-medium text-gray-700">Cache cover_img</label>
						<div
							onDragEnter={handleDragIn}
							onDragLeave={handleDragOut}
							onDragOver={handleDrag}
							onDrop={handleDrop}
							className={`flex items-center justify-center w-36 h-36 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
								dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
							}`}
						>
							<input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="photo-upload" />
							<label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-full h-full">
								{previewImage ? (
									<img src={previewImage} alt="preview" className="w-full h-full object-cover rounded-lg" />
								) : (
									<div className="text-center">
										<FcAddImage className="w-12 h-12 mb-3" />
										<p className="text-gray-500">{dragActive ? "Drop image here" : "Upload Image"}</p>
									</div>
								)}
							</label>

							{previewImage && (
								<button
									type="button"
									onClick={() => {
										setPreviewImage(null);
										setFormData({ ...formData, cover_img: null });
									}}
									className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
								>
									<BsTrash size={16} />
								</button>
							)}
						</div>
					</div>

					{/* Description */}
					<div className="relative">
						<textarea
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							className="w-full px-5 py-4 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors peer resize-none"
							placeholder=" "
							rows="4"
							maxLength={500}
							required
						/>
						<label className="absolute left-5 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500">
							Description
						</label>
						<div className="absolute bottom-2 right-4 text-gray-500 text-sm">{formData.description.length}/500</div>
					</div>

					{/* Hints */}
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => setShowHint(!showHint)}
							className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
						>
							<FaRegLightbulb />
							{showHint ? "Hide Hints" : "Show Hints"}
						</button>
						{showHint && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="absolute bg-white shadow-lg rounded-lg p-4 mt-16 w-96 right-0 z-10"
							>
								<h3 className="font-semibold mb-2">Pro Tips:</h3>
								<ul className="list-disc pl-4 text-sm text-gray-600">
									<li>Include landmarks in your description</li>
									<li>Use coordinates in decimal degrees format</li>
									<li>Add hints for difficult terrain</li>
								</ul>
							</motion.div>
						)}
					</div>

					{/* Submit Button */}
					<div className="flex justify-end gap-3 mt-6">
						<button
							type="button"
							onClick={onClose}
							className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
							disabled={loading}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-400 text-white rounded-lg hover:from-blue-700 hover:to-teal-500 transition-all"
							disabled={loading}
						>
							{loading ? "Creating..." : "Create Cache"}
						</button>
					</div>
				</form>
			</motion.div>
		</CommonModal>
	);
};

export default AddCache;
