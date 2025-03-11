import { IoIosArrowBack, IoIosLink } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { PiHeartStraightDuotone } from "react-icons/pi";
import { FaHeart } from "react-icons/fa6";
import { useState } from "react";
import CommentBox from "./Comment";
import { HOME_ITEMS, RELATED_ITEMS } from "../data";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ItemHeader } from "../components/Header/itemHeader";
import ShereModal from "../components/modal/ShereModal";
import { ITEMS_TABS } from "../helper/tab";
import { RelatedItemCard } from "../components/card/Item/RelatedItemCard";

const Item = () => {
	// item header
	// const [isGridIcon, setIsGridIcon] = useState(true);

	// // Function to toggle between icons
	// const toggleIcon = () => {
	// 	setIsGridIcon(!isGridIcon);
	// };

	// star toggal

	const starToggle = (e) => {
		e.preventDefault();
		e.stopPropagation();
		// Star feature to be implimented
		// setisStared((prevState) => !prevState); // Toggle the state
	};

	// likeToggle
	const [isLikeOpen, setIsLikeOpen] = useState(false);

	const likeToggle = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsLikeOpen((prevState) => !prevState); // Toggle the state
	};

	// modal

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	//

	const { id } = useParams();

	const [activeTab, setActiveTab] = useState("Comment");
	// const [activeFilter, setActiveFilter] = useState("");

	const navigate = useNavigate();

	const item = useMemo(() => {
		if (id) {
			let item = HOME_ITEMS.find((item) => item.id === id);
			if (!item) item = RELATED_ITEMS.find((item) => item.id === id);

			if (!item) {
				navigate("/");
			}

			return item;
		}
	}, [id]);

	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const tabStyle = {
		width: "120px",
		height: "32px",
	};

	const navigateToBack = () => {
		navigate(-1);
	};

	return (
		<div>
			<header
				className="w-full px-4 flex items-center justify-between gap-3 font-bold text-white text-xl border-b border-gray-200"
				style={{
					height: "10vh",
				}}
			>
				<div className="flex items-center gap-5 text-black">
					<button onClick={navigateToBack} className="w-7 h-7 flex justify-center items-center text-lg rounded-full hover:bg-gray-100">
						<IoIosArrowBack />
					</button>
					<h1 className="inline text-[15px] font-semibold break-words hover:cursor-pointer">{item.title}</h1>
				</div>

				<div className="flex gap-3">
					<div
						onClick={starToggle}
						className=" p-3 flex items-center font-semibold text-[16px] border border-gray-500 rounded-full   text-black transition duration-300"
					>
						{false ? (
							<FaStar className="text-primary" /> // save Icon
						) : (
							<FaRegStar /> // unsave Icon
						)}
					</div>
					<div
						onClick={openModal}
						className=" flex gap-2 items-center px-5 py-2 font-semibold text-[16px] rounded-full bg-black transition duration-300 select-none"
					>
						<IoIosLink />
						<span className="">Shere</span>
					</div>

					<ShereModal isModalOpen={isModalOpen} closeModal={closeModal} />
				</div>
			</header>

			<div className="h-full flex m-4 gap-4 overflow-y-auto ">
				<div className="w-full lg:w-[70%] xl:w-[68%] 2xl:w-[65%]">
					{/* Article Title */}
					<h1 className="inline text-2xl md:text-3xl font-bold break-words hover:cursor-pointer">{item.title}</h1>

					{/* Article Details */}
					<div className="flex justify-between items-start mt-2.5 mb-4">
						<div className="flex max-lg:flex-col gap-2">
							{/* Author Info */}
							<div className="flex items-center gap-x-2">
								<div className="flex items-center gap-x-1">
									<div
										className="sb-avatar sb-avatar--text"
										style={{
											display: "inline-block",
											verticalAlign: "middle",
											width: "24px",
											height: "24px",
											borderRadius: "100%",
											fontFamily: "Helvetica, Arial, sans-serif",
											backgroundColor: "rgb(126, 55, 148)",
											color: "white",
										}}
									>
										<div
											className="sb-avatar__text"
											title="StudyFinds"
											style={{
												width: "24px",
												height: "24px",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												fontSize: "8px",
											}}
										>
											S
										</div>
									</div>
									<span className="text-sm max-w-30 md:max-w-36 text-gray-600 font-semibold overflow-hidden hover:cursor-pointer">
										{item.user.name}
									</span>
								</div>
								<span className="text-[13px] w-[100px] lg:max-2xl:w-[90px] pl-1 overflow-hidden whitespace-nowrap">3 years ago</span>
							</div>

							{/* Likes and Comments */}
							<div className="flex items-center gap-x-2 select-none">
								<div className="flex gap-x-1 h-full self-start mt-1 overflow-hidden whitespace-nowrap">
									<div
										onClick={likeToggle}
										data-testid="empty-heart-icon"
										className={`w-5 h-5 flex justify-center items-center hover:cursor-pointer `}
									>
										{isLikeOpen ? (
											<FaHeart className="text-primary" /> // Open Icon
										) : (
											<FaRegHeart /> // Close Icon
										)}
									</div>
									<span className="text-sm -mt-0.5">0</span>
								</div>
								<span>•</span>
								<div className="flex items-center font-semibold text-gray-600 text-sm gap-x-1">
									<IoEyeOutline />9
								</div>
							</div>
						</div>
					</div>

					{/* Article Image */}
					<img
						alt="Preview"
						loading="lazy"
						width={672}
						height={378}
						className="w-full sm:w-[85%] lg:max-w-[672px] rounded-sm max-md:mx-auto"
						src={item.imageUrl}
					/>

					{/* Article Summary */}
					<section className="mt-4 border-b flex flex-col gap-y-2">
						<h2 className="text-xl font-hankenMedium">💬 Summary</h2>
						<div>
							New research from New York University reveals that living near busy roads increases the risk of premature death by 20%, primarily due to
							cardiovascular disease...
						</div>
					</section>

					{/* Comment Box */}

					<div className=" my-7     flex items-start ">
						{/* Tab Navigation */}
						<div className="flex px-2 py-1.5 bg-gray-100 rounded-full select-none">
							{ITEMS_TABS.map((tab, index) => (
								<span
									key={index}
									value={tab.value}
									className={`flex justify-center items-center text-sm font-medium rounded-full z-20 hover:cursor-pointer h-8 text-black ${
										activeTab === tab.value ? "font-bold bg-white" : ""
									}`}
									style={tabStyle}
									onClick={() => handleTabClick(tab.value)}
								>
									{tab.label}
								</span>
							))}
						</div>
					</div>
					<CommentBox />
				</div>

				<div className="w-full lg:w-[30%] xl:w-[32%] 2xl:w-[35%] flex flex-col gap-y-3">
					<h2 className="font-semibold text-xl text-black">Related content</h2>
					<div className="w-full flex flex-col gap-y-4">
						{RELATED_ITEMS.map((item) => (
							<RelatedItemCard key={item.id} item={item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Item;
