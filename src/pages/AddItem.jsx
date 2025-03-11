import { useCallback, useEffect, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import { VscSend } from "react-icons/vsc";
import { apiCall } from "../api/config";
import { REQ_METHODS } from "../helper/constants";

export const AddItem = () => {
	const [formData, setFormData] = useState({
		title: "",
		tags: "",
		description: "",
		image: null,
		sourceName: "",
		sourceIcon: "",
		userName: "",
		userAvatar: "",
		userAvatarInitial: "",
		userAvatarColor: "",
	});

	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await apiCall("/users/profile", {});

				console.log(response);

				setUser(response);
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchUserData();
	}, []);

	const [caches, setCaches] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchCaches = useCallback(async () => {
		try {
			const response = await apiCall("/caches", {});

			setCaches(response.data);
			setLoading(false);
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	}, []);
	useEffect(() => {
		fetchCaches();
	}, [fetchCaches]);

	const [imagePreview, setImagePreview] = useState(null);
	const [dragActive, setDragActive] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleFileSelect = (file) => {
		setFormData((prevData) => ({
			...prevData,
			image: file,
		}));
		setImagePreview(URL.createObjectURL(file));
	};

	const handleImageChange = (e) => {
		if (e.target.files[0]) {
			handleFileSelect(e.target.files[0]);
		}
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
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFileSelect(e.dataTransfer.files[0]);
		}
	};

	const handleRemoveImage = () => {
		setFormData((prevData) => ({
			...prevData,
			image: null,
		}));
		setImagePreview(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData();
		for (const key in formData) {
			if (key === "image" && formData[key]) {
				data.append(key, formData[key]);
			} else {
				data.append(key, formData[key]);
			}
		}

		try {
			const response = await apiCall("/items", {
				method: REQ_METHODS.POST,
				body: data,
			});
			if (response.ok) {
				const result = await response.json();
				console.log(result.message);
				// Reset form
				setFormData({
					title: "",
					tags: "",
					description: "",
					image: null,
					sourceName: "",
					sourceIcon: "",
					userName: "",
					userAvatar: "",
					userAvatarInitial: "",
					userAvatarColor: "",
				});
				setImagePreview(null);
			} else {
				console.error("Failed to create blog");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
			<div className="container mx-auto px-4 py-12">
				<h1 className="text-4xl md:text-5xl md:leading-normal font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 animate-gradient animate-duration-[5s] animate-direction-alternate">
					Create New Item
				</h1>

				<form
					onSubmit={handleSubmit}
					className="max-w-2xl mx-auto p-6 bg-white/90 rounded-3xl shadow-xl border border-gray-100  backdrop-blur-sm flex flex-col gap-3"
				>
					{/* Title */}
					<div className=" flex flex-col gap-1">
						<label htmlFor="title" className="input-label">
							Item Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							value={formData.title}
							onChange={handleChange}
							required
							className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  peer"
						/>
					</div>

					{/* Tags */}
					<div className=" flex flex-col gap-1">
						<label htmlFor="tags" className="input-label">
							Tags (comma separated)
						</label>
						<input
							type="text"
							id="tags"
							name="tags"
							value={formData.tags}
							onChange={handleChange}
							required
							className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 peer "
						/>
					</div>

					{/* Description */}
					<div className=" flex flex-col gap-1">
						<label htmlFor="description" className="input-label">
							Item Content
						</label>
						<textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleChange}
							required
							rows="4"
							className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
						/>
					</div>

					{/* Media Section */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
						{/* Image Upload */}
						<div
							onDragEnter={handleDragIn}
							onDragLeave={handleDragOut}
							onDragOver={handleDrag}
							onDrop={handleDrop}
							className={`flex flex-col gap-1 ${dragActive ? "" : ""}`}
						>
							<input type="file" id="image" name="image" onChange={handleImageChange} className="hidden" accept="image/*" />
							<label
								htmlFor="image"
								className={`w-full flex flex-col items-center p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${
									dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500"
								}`}
							>
								<FcAddImage className="w-12 h-12 mb-3" />
								<span className="text-gray-600">{imagePreview ? "Change Image" : "Upload Featured Image"}</span>
							</label>
							{imagePreview && (
								<div className="mt-4 relative">
									<div className="top-[-10px] right-[-10px] absolute z-10 cursor-pointer" onClick={handleRemoveImage}>
										<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 16 16">
											<circle cx="8" cy="8" r="8" fill="#fe3155"></circle>
											<polygon
												fill="#fff"
												points="11.536,10.121 9.414,8 11.536,5.879 10.121,4.464 8,6.586 5.879,4.464 4.464,5.879 6.586,8 4.464,10.121 5.879,11.536 8,9.414 10.121,11.536"
											></polygon>
										</svg>
									</div>
									<img src={imagePreview} alt="Preview" className="relative rounded-lg shadow-lg max-h-44 w-full object-cover" />
								</div>
							)}
						</div>

						{/* Avatar Preview */}
						<div className="p-4 bg-gray-100  rounded-2xl">
							<h3 className="text-lg font-medium mb-4 text-gray-800 ">Author Preview</h3>
							<div className="flex items-center space-x-4">
								<div
									className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-xl font-bold"
									style={{
										backgroundColor: formData.userAvatarColor || "#cbd5e0",
									}}
								>
									{/* {user.username.slice(0, 2).toUpperCase()} */}
								</div>
								<div>
									<div className="text-lg font-medium text-gray-900 ">{/* @{user.username} */}</div>
									<div className="text-sm text-gray-600 ">Just now</div>
								</div>
							</div>
						</div>
					</div>

					{/* Source Section */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 ">
						<div className="flex flex-col gap-1">
							<label htmlFor="sourceName" className="input-label">
								Source Name
							</label>
							<input
								type="text"
								id="sourceName"
								name="sourceName"
								value={formData.sourceName}
								onChange={handleChange}
								required
								className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  peer"
							/>
						</div>

						<div className="flex flex-col gap-1">
							<label htmlFor="sourceIcon" className="input-label">
								Source Icon URL
							</label>
							<input
								type="text"
								id="sourceIcon"
								name="sourceIcon"
								value={formData.sourceIcon}
								onChange={handleChange}
								required
								className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  peer"
							/>
						</div>
					</div>

					<h3 className="font-semibold text-gray-900">Select Caches</h3>
					<ul className="flex justify-around flex-wrap gap-3 p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
						{caches.map((cache, index) => (
							<li
								key={cache._id}
								className={`flex items-center gap-2 p-2 hover:bg-gray-100 hover:border  transition-all hover:rounded-md ${
									index !== caches.length - 1 ? "border-r border-gray-300" : ""
								}`}
							>
								<input
									id={`cache-${cache._id}`}
									type="checkbox"
									value={cache._id}
									className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:outline-none"
								/>
								<label htmlFor={`cache-${cache._id}`} className="text-sm font-medium text-gray-900 cursor-pointer select-none">
									{cache.title}
								</label>
							</li>
						))}
					</ul>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-teal-500 
              hover:from-blue-700 hover:to-teal-600 text-white font-bold rounded-full 
              transition-all duration-300 ease-in-out transform hover:scale-105 
              active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Publish Item
						<VscSend className="w-5 h-5 ml-2 inline-block" />
					</button>
				</form>
			</div>
		</div>
	);
};
