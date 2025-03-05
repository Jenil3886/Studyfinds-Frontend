import { CiSearch } from "react-icons/ci";

export default function Search() {
	return (
		// <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 500 }}>
		// 	<IconButton type="button" sx={{ p: "10px" }} aria-label="search">
		// 		<SearchIcon />
		// 	</IconButton>
		// 	<InputBase
		// 		sx={{ ml: 1, flex: 1 }}
		// 		placeholder="Search for content, caches, or profiles"
		// 		inputProps={{ "aria-label": "Search for content, caches, or profiles" }}
		// 	/>
		// 	<p classNameName="text-sm font-normal text-gray-700 px-2">ctrl+k</p>
		// </Paper>

		<form className="w-[500px] ">
			<div className="relative ">
				<div className="text-black absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer">
					<CiSearch />
				</div>
				<input
					type="search"
					id="default-search"
					className="block w-full p-2.5 ps-10 text-[15px] font-semibold text-gray-900  border border-gray-300 rounded-full bg-gray-50 placeholder:text-gray-700"
					placeholder="Search for Content, Caches, or Profiles"
					required
				/>
				<div className="text-gray-700 font-semibold text-[15px] absolute inset-y-0 end-0 flex items-center pe-4 pointer-events">cntrl+k</div>
			</div>
		</form>
	);
}
