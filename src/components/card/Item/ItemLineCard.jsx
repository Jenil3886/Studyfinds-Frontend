import { BiMessageRounded } from "react-icons/bi";
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { RiSparkling2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { dispatchAction } from "../../../app/store";
import { likeItem } from "../../../features/dataSlice";

export const ItemLineCard = ({ item, isLiked, isStarred, setIsModalOpen }) => {
	const likeToggle = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatchAction(likeItem(item.id));
	};

	const starToggle = (e) => {
		e.preventDefault();
		e.stopPropagation();
		// Star feature to be implimented
		// dispatchAction(saveItem(item.id));
	};

	const openModal = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsModalOpen(true);
	};

	return (
		<Link
			to={`/items/${item.id}`}
			className="flex gap-3 p-2 group border-2 border-transparent transition-all duration-300 ease-in-out rounded-lg hover:border-gray-200 hover:shadow-md select-none bg-gray-100 lg:bg-white hover:cursor-pointer "
		>
			{/* Like Button */}
			<div className="flex gap-1 items-baseline justify-center">
				<div className="flex gap-1 items-center">
					<div onClick={likeToggle}>
						{isLiked ? (
							<FaHeart className="text-primary" /> // like content
						) : (
							<FaRegHeart className="text-gray-500" /> // unlike content
						)}
					</div>
					<div>0</div>
				</div>
			</div>

			{/* item iamges */}
			<div className="flex items-baseline w-32 py-1.5">
				<img src={item.url} className="w-full max-w-[672px] rounded-sm mx-auto object-cover aspect-video" alt="" />
			</div>

			{/* item Content */}
			<div className="flex gap-2 w-full items-center justify-between">
				<div className="flex flex-col w-full">
					<div className="font-bold text-[18px]">{item.title}</div>
					{item.description && (
						<p className="text-sm font-hankenMedium overflow-hidden break-words text-gray-500 leading-[22px]">{item.description}</p>
					)}
					{/* Tags */}
					<div className="flex gap-2 items-center py-1.5">
						{item.tags.map((tag, index) => (
							<div key={index} className="font-semibold text-[12px] border-2 border-gray-600 rounded-[4px] px-2">
								{tag}
							</div>
						))}
					</div>
					{/* Source */}
					<div className="flex w-full">
						<div className="bg-gray-100 hover:bg-slate-200 text-gray-500 self-start flex items-center font-hankenMedium py-1 px-2 text-[12px] rounded-full overflow-hidden hover:bg-extraGray transition duration-300 gap-x-1">
							{/* Render avatar if available, otherwise render srcIcon */}
							{item.source.avatar ? <img src={item.source.avatar} alt={item.source.name} className="w-4 h-4 rounded-full" /> : item.source.srcIcon}
							<span className="overflow-hidden whitespace-nowrap text-ellipsis text-[11px]">{item.source.name}</span>
						</div>
					</div>

					{/* Stats */}
					<div className="flex items-center gap-x-3 mt-2 w-full">
						<div className="flex gap-1 items-center w-[55px]">
							<BiMessageRounded className="text-[12px]" />
							<span className="text-sm">{item.stats.comments}</span>
						</div>
						<div className="flex gap-1 items-center w-[55px]">
							<IoEyeOutline className="text-[12px]" />
							<span className="text-sm">{item.stats.views}</span>
						</div>
						<div className="flex gap-1 items-center w-[55px]">
							<RiSparkling2Fill className="text-[12px]" />
							<span className="text-sm">{item.stats.sparks}</span>
						</div>
						<div onClick={starToggle}>
							{isStarred ? (
								<FaStar className="text-primary" /> // save Icon
							) : (
								<FaRegStar className="text-gray-500" /> // unsave Icon
							)}
						</div>
					</div>
				</div>

				{/* User Info */}
				<div className="max-lg:w-full h-7 flex items-center gap-x-2 lg:gap-x-1.5 2xl:gap-x-3">
					<div className="flex gap-1 items-center">
						<div className="w-6 h-6 flex justify-center items-center">
							<img src={item.user.avatar} alt="" className="rounded-full" />
						</div>
						<span className="text-[13px] w-24 xl:w-28 2xl:w-32 overflow-hidden text-ellipsis">{item.user.name}</span>
					</div>
					<span className="text-[13px] w-[100px] lg:max-2xl:w-[90px] overflow-hidden whitespace-nowrap">{item.user.time}</span>
					<div onClick={openModal} className="flex gap-1 items-center">
						<FiShare2 className="text-md" />
					</div>
				</div>
			</div>
		</Link>
	);
};
