import { FiMenu } from "react-icons/fi";
import { MdGridView } from "react-icons/md";
import { useSelector } from "react-redux";
import { dispatchAction } from "../app/store";
import { toggleToGrid, toggleToMenu } from "../features/layoutslice";
import Search from "../components/header/Search";
import NotificationDropdown from "../components/header/NotificationDropdown";

export const Header = () => {
	const activeButton = useSelector((state) => state.viewToggle);

	return (
		<header
			className="w-full px-4 flex items-center justify-between gap-3 py-5 font-bold	text-white text-xl border-b border-gray-200"
			style={{
				height: "10vh",
			}}
		>
			<div className="flex items-center gap-5">
				<Search />

				<div className="flex border-2 border-black rounded-md overflow-hidden">
					{/* Grid View Button */}
					<span
						className={`h-6 w-7 flex justify-center items-center hover:cursor-pointer transition-all duration-300 border-r-2 border-black ${
							activeButton === "grid" ? "bg-gray-300" : "bg-extraGray"
						}`}
						onClick={() => dispatchAction(toggleToGrid())}
					>
						<MdGridView className="text-black" />
					</span>

					{/* Menu View Button */}
					<span
						className={`h-6 w-7 flex justify-center items-center hover:cursor-pointer transition-all duration-300 ${
							activeButton === "menu" ? "bg-gray-300" : "bg-extraGray"
						}`}
						onClick={() => dispatchAction(toggleToMenu())}
					>
						<FiMenu className="text-black" />
					</span>
				</div>
			</div>

			<div className="p-5">
				<NotificationDropdown />
			</div>
		</header>
	);
};
