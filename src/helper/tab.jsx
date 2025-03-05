import { FaEyeSlash, FaRegFolderOpen, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { TbMessageDots, TbSettings } from "react-icons/tb";

export const SIDEBAR_TOP_TABS = [
	{ path: "/", label: "Home", icon: <FiHome /> },
	{ path: "/topics", label: "Topics", icon: <FaRegFolderOpen /> },
	{ path: "/like", label: "Like", icon: <FaRegHeart /> },
	{ path: "/saved", label: "Saved", icon: <FaRegStar /> },
	{ path: "/ask", label: "Ask", icon: <TbMessageDots /> },
];

export const SIDEBAR_BOTTOM_TABS = [{ path: "/settings", label: "Settings", icon: <TbSettings /> }];

export const HOME_TABS = [
	{ value: "for-you", label: "For You" },
	{ value: "following", label: "Following" },
	{ value: "select-cache", label: "Select Cache" },
];

export const ASK_TABS = [
	{ value: "everything", label: "Everything" },
	{ value: "my-cach", label: "My Cach" },
];

export const SAVE_TABS = [
	{ value: "items", label: "Items" },
	{ value: "caches", label: "Caches" },
	{ value: "profiles", label: "Profiles" },
];

// export const SAVE_TABS = [
// 	{ value: "all", label: "All" },
// 	{ value: "nature", label: "Nature" },
// 	{ value: "science", label: "Science" },
// 	{ value: "technology", label: "Technology" },
// 	{ value: "lifestyle", label: "Lifestyle" },
// ];

export const ITEM_FILTER_TABS = [
	{ value: "private", label: "Private", icon: <FaEyeSlash /> },
	{ value: "asked", label: "Ask", icon: <TbMessageDots /> },
	{ value: "created-by-you", label: "Created By You" },
];

export const CACHES_FILTER_TABS = [
	{ value: "private", label: "Private", icon: <FaEyeSlash /> },
	{ value: "starred", label: "Starred", icon: <FaStar /> },
	{ value: "created-by-you", label: "Created By You" },
];

// items tab

export const ITEMS_TABS = [
	{ value: "Comment", label: "Comment" },
	{ value: "Asks", label: "Asks" },
];
