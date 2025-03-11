import { HiOutlinePlus, HiOutlineUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { LuBookLock, LuBookUser, LuDot } from "react-icons/lu";
import { PiStarFourBold } from "react-icons/pi";
import AddCache from "../components/modal/AddCacheModal";
import { apiCall } from "../api/config";
import { FaRegCalendarMinus, FaRegCircle } from "react-icons/fa";

export const Profile = () => {
	// modal

	const [isCacheModalOpen, setIsCacheModalOpen] = useState(false);

	const openModal = () => setIsCacheModalOpen(true);
	const closeModal = () => setIsCacheModalOpen(false);

	const [cacheType, setCacheType] = useState("public");

	const [generatedBgColor, setGeneratedBgColor] = useState("#ffffff");

	const generateRandomColor = () => {
		return "#" + Math.floor(Math.random() * 16777215).toString(16);
	};

	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	// const [isCacheModalOpen, setIsCacheModalOpen] = useState(false);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await apiCall("/users/profile", {});

				console.log(response);

				setUser(response);
				// Generate color only if no image exists
				if (!response.image) {
					setGeneratedBgColor(generateRandomColor());
				}
				setIsLoading(false);
			} catch (error) {
				console.error("Error:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserData();
	}, []);

	if (isLoading) {
		return <div className="p-4">Loading profile...</div>;
	}

	if (!user) {
		return <div className="p-4">Error loading profile</div>;
	}

	const openpublicModal = () => {
		setCacheType("public");
		openModal();
	};

	const openprivateModal = () => {
		setCacheType("private");
		openModal();
	};

	return (
		<>
			<div className="relative p-6 mx-10 my-6 bg-white rounded-3xl flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
				{/* Profile Card */}
				<div className="flex items-center justify-between">
					{/* Left Section */}
					<div className="flex items-center gap-9">
						<div className="relative">
							{user.image ? (
								<img
									src={user.image}
									alt="User"
									className="w-36 h-36 rounded-full object-cover ring-4 ring-offset-4 ring-offset-white"
									style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
								/>
							) : (
								<div
									className=" rounded-full border-4 shadow-lg w-36 h-36  text-white text-5xl font-bold flex justify-center items-center ring-4 ring-offset-4 ring-offset-white border-3 border-white"
									style={{
										backgroundColor: generatedBgColor,
										boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
									}}
								>
									<span className="text-white font-bold drop-shadow-md">{user.username.slice(0, 2).toUpperCase()}</span>
								</div>
							)}
							<div className="absolute -bottom-0 -right-0 bg-gray-100 rounded-full p-2 shadow-md border-4 border-white  ">
								<HiOutlinePlus className="w-5 h-5 text-gray-500 hover:text-blue-500 transition-colors" />
							</div>
						</div>
						{/* User Details */}
						<div className="flex flex-col justify-center items-start">
							<div className="text-4xl font-bold text-gray-900 mb-2">{user.fullname}</div>

							<div className="flex items-center space-x-4 mb-3">
								<div className="flex items-center text-gray-600">
									<HiOutlineUser className="w-5 h-5 mr-1 text-blue-500" />
									<span>@{user.username}</span>
								</div>

								<div className="flex items-center text-gray-600">
									<FaRegCircle className="w-5 h-5 mr-1 text-green-500" />
									<span>{user.followers?.length || 0} followers</span>
								</div>
							</div>

							<div className="flex items-center text-gray-600 mb-4">
								<FaRegCalendarMinus className="w-5 h-5 mr-2 text-purple-500" />
								<span className="text-sm font-medium">
									Joined{" "}
									{new Date(user.createdAt).toLocaleDateString("default", {
										month: "long",
										year: "numeric",
									})}
								</span>
							</div>

							{/* <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:scale-105 transition-transform shadow-md">
								Follow
							</button> */}
						</div>
					</div>

					{/* Middle Section (Social Proof) */}

					<div className="hidden md:grid md:grid-cols-2 gap-6 w-full max-w-md">
						{/* Stats Card 1 */}
						<div className="group bg-gradient-to-br from-blue-50 to-white p-5 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
							<div className="flex items-center gap-3">
								<div className="text-3xl font-extrabold text-blue-600 group-hover:scale-110 transition-transform duration-300">{user.postsCount}</div>
								<div>
									<div className="text-sm font-medium text-gray-600">Followers</div>
									<div className="text-xs text-gray-400">{user.followers?.length || 0} </div>
								</div>
							</div>
						</div>

						{/* Stats Card 2 */}
						<div className="group bg-gradient-to-br from-green-50 to-white p-5 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
							<div className="flex items-center gap-3">
								<div className="text-3xl font-extrabold text-green-600 group-hover:scale-110 transition-transform duration-300">
									{user.followingCount}
								</div>
								<div>
									<div className="text-sm font-medium text-gray-600">Following</div>
									<div className="text-xs text-gray-400">{user.following?.length || 0}</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Section (Social Proof) */}
					<div className="hidden md:grid md:grid-cols-2 gap-6 w-full max-w-md">
						{/* Cache Card */}
						<div className="group relative overflow-hidden bg-blue-50 p-5 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl">
							<div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -translate-x-10 -translate-y-10 opacity-50 group-hover:scale-125 transition-transform duration-300"></div>
							<div className="relative">
								<div className="text-3xl font-extrabold text-blue-600">{user.postsCount}</div>
								<div className="text-sm font-medium text-gray-600 mt-1">Caches</div>
								<div className="text-xs text-blue-500 font-semibold">Explore More →</div>
							</div>
						</div>

						{/* Items Card */}
						<div className="group relative overflow-hidden bg-green-50 p-5 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl">
							<div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full -translate-x-10 -translate-y-10 opacity-50 group-hover:scale-125 transition-transform duration-300"></div>
							<div className="relative">
								<div className="text-3xl font-extrabold text-green-600">{user.followingCount}</div>
								<div className="text-sm font-medium text-gray-600 mt-1">Items</div>
								<div className="text-xs text-green-500 font-semibold">View Collection →</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex justify-center items-center">
					<div className="py-2 px-14 bg-gray-300 rounded-lg shadow-md border-4 border-white transition-transform transform hover:scale-105">
						EDIT PROFILE
					</div>
				</div>{" "}
			</div>
			{/* Cards Section */}
			<section className="container mx-auto px-6 pb-20">
				<div className="flex flex-wrap items-stretch gap-6">
					{/* public Card */}

					<div
						onClick={openpublicModal}
						className="relative shadow-lg cursor-pointer border border-transparent rounded-3xl w-full max-w-[398px] p-6 phone:p-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out overflow-hidden"
					>
						<div className="absolute top-0 right-0 m-4">
							<PiStarFourBold className="h-6 w-6 text-yellow-300 drop-shadow-md" />
						</div>

						<div className="flex flex-col items-start justify-between h-full">
							<div className="flex items-center mb-4">
								<div className="p-3 bg-white/20 rounded-full mr-4">
									<LuBookUser className="h-10 w-10 text-white drop-shadow-lg" />
								</div>
								<h3 className="font-bold text-3xl tracking-wide">public</h3>
							</div>

							<div className="flex justify-between w-full items-end">
								<div className="text-sm opacity-80">0 items</div>
								<button className="bg-white/20 rounded-full px-4 py-2 text-sm font-medium hover:bg-white/30 transition">View Details →</button>
							</div>
						</div>
					</div>

					{/* private Card */}
					<div
						onClick={openprivateModal}
						className="relative shadow-lg cursor-pointer border border-transparent rounded-3xl w-full max-w-[398px] p-6 phone:p-8 bg-gradient-to-r from-green-500 to-green-700 text-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out overflow-hidden"
					>
						<div className="absolute top-0 right-0 m-4">
							<PiStarFourBold className="h-6 w-6 text-yellow-300 drop-shadow-md" />
						</div>

						<div className="flex flex-col items-start justify-between h-full">
							<div className="flex items-center mb-4">
								<div className="p-3 bg-white/20 rounded-full mr-4">
									<LuBookLock className="h-10 w-10 text-white drop-shadow-lg" />
								</div>
								<h3 className="font-bold text-3xl tracking-wide">private</h3>
							</div>

							<div className="flex justify-between w-full items-end">
								<div className="text-sm opacity-80">0 items</div>
								<button className="bg-white/20 rounded-full px-4 py-2 text-sm font-medium hover:bg-white/30 transition">View Details →</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="container mx-auto px-6 py-20 bg-white">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-gray-800 mb-4">Key Features</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">Advanced tools to help you manage your content more effectively</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="p-6 rounded-lg shadow-md hover:shadow-lg transition">
						<div className="bg-blue-100 p-4 rounded-full w-16 h-16 mb-4 mx-auto">
							<svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
						</div>
						<h3 className="text-xl font-semibold mb-2">Easy Management</h3>
						<p className="text-gray-600">Simplify your content organization process</p>
					</div>

					<div className="p-6 rounded-lg shadow-md hover:shadow-lg transition">
						<div className="bg-green-100 p-4 rounded-full w-16 h-16 mb-4 mx-auto">
							<svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9a1 1 0 01-1-1v-.586z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold mb-2">Security</h3>
						<p className="text-gray-600">Keep your private content secure</p>
					</div>

					<div className="p-6 rounded-lg shadow-md hover:shadow-lg transition">
						<div className="bg-purple-100 p-4 rounded-full w-16 h-16 mb-4 mx-auto">
							<svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
							</svg>
						</div>
						<h3 className="text-xl font-semibold mb-2">Analytics</h3>
						<p className="text-gray-600">Track your content performance</p>
					</div>
				</div>
			</section>

			<AddCache isOpen={isCacheModalOpen} onClose={closeModal} cacheType={cacheType} />
		</>
	);
};
