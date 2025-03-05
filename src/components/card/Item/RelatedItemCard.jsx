import { memo } from "react";
import { IoIosLink } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export const RelatedItemCard = memo(({ item }) => {
	return (
		<Link to={`/items/${item.id}`}>
			<article key={item.id}>
				<NavLink
					aria-label="View Item Details"
					className="relative w-full flex flex-col justify-between gap-2 p-2 bg-gray-100 group border-2 border-transparent transition-all duration-300 ease-in-out rounded-lg select-none hover:cursor-pointer hover:border-gray-200 hover:shadow-md"
					href={item.link}
				>
					<div className="flex flex-col gap-y-2 w-full">
						<h2 className="font-hankenBold text-lg break-words">{item.title}</h2>
						<div className="bg-gray-200 text-gray-600 self-start max-w-[90%] flex items-center font-hankenMedium py-1 px-2 text-[12px] rounded-full overflow-hidden hover:bg-extraGray transition duration-300 gap-x-1">
							<IoIosLink />
							<span className="overflow-hidden whitespace-nowrap text-ellipsis">{item.url}</span>
						</div>
					</div>
					<div className="w-full h-7 flex justify-between items-center gap-x-2">
						<span className="text-[13px]">{item.date}</span>
					</div>
				</NavLink>
			</article>
		</Link>
	);
});
