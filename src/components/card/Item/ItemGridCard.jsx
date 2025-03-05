import { BiMessageRounded } from "react-icons/bi";
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosLink } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { RiSparkling2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { likeItem } from "../../../features/dataSlice";
import { saveItem } from "../../../features/saveDataSlice";
import { dispatchAction } from "../../../app/store";

export const ItemGridCard = ({ item, isStarred, isLiked, setIsModalOpen }) => {
	const likeToggle = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatchAction(likeItem(item.id));
	};

	const starToggle = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatchAction(saveItem(item.id));
	};

	const openModal = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsModalOpen(true);
	};

	return (
		<Link
			to={`/items/${item.id}`}
			className="flex flex-col gap-y-4 p-4 group border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-300"
		>
			<div className="flex items-center justify-between">
				<h2 className="text-lg overflow-hidden break-words text-ellipsis font-semibold">{item.title}</h2>
				<div className="flex items-center gap-2">
					<div onClick={likeToggle}>
						{isLiked ? (
							<FaHeart className="text-primary" /> // like content
						) : (
							<FaRegHeart className="text-gray-500" /> // unlike content
						)}
					</div>
					<div onClick={starToggle}>
						{isStarred ? (
							<FaStar className="text-primary" /> // save Icon
						) : (
							<FaRegStar className="text-gray-500" /> // unsave Icon
						)}
					</div>
					<div>
						<HiDotsHorizontal />
					</div>
				</div>
			</div>
			<p className="text-sm text-gray-600">{item.description}</p>
			<div className="flex w-full">
				<div className="bg-gray-100 hover:bg-slate-200 text-gray-500 self-start flex items-center font-hankenMedium py-1 px-2 text-[12px] rounded-full overflow-hidden hover:bg-extraGray transition duration-300 gap-x-1">
					{/* Render avatar if available, otherwise render srcIcon */}

					{item.source.avatar ? (
						<img src={item.source.avatar} alt={item.source.name} className="w-4 h-4 rounded-full" />
					) : (
						item.source.srcIcon === "IoIosLink" && <IoIosLink />
					)}

					<span>{item.source.name}</span>
				</div>
			</div>
			<img alt="Preview" loading="lazy" className="w-full h-48 object-cover rounded-md" src={item.imageUrl} />
			<div className="flex items-center justify-between gap-x-2 mt-2">
				<div className=" flex gap-1 items-center">
					{item.user.avatar !== "" ? (
						// Display avatar image if available
						<img src={item.user.avatar} alt={item.user.name} className="w-8 h-8 rounded-full" />
					) : (
						// Display avatar initials if avatar image is not available
						<div className="w-8 h-8 rounded-full text-white flex justify-center items-center" style={{ backgroundColor: item.user.avatarColor }}>
							{item.user.avatarInitial}
						</div>
					)}
					<span className="text-sm">{item.user.name}</span>
				</div>
				<div className=" flex gap-1 items-center">
					<BiMessageRounded />
					<span>{item.stats.comments}</span>
				</div>
				<div className=" flex gap-1 items-center  ">
					<IoEyeOutline />
					<span>{item.stats.views}</span>
				</div>
				<div className=" flex gap-1 items-center ">
					<RiSparkling2Fill />
					<span>{item.open}</span>
				</div>
				<div className=" ">{item.time}</div>
				<div onClick={openModal} className=" flex gap-1 items-center">
					<FiShare2 />
				</div>
			</div>
		</Link>
	);
};
