import { memo } from "react";
import moment from "moment";
import { RxCross2 } from "react-icons/rx";
import { dispatchAction } from "../../app/store";
import { removeNotification } from "../../features/notificationSlice";

export const NotificationCard = memo(({ notification }) => {
	const handleDelete = () => {
		dispatchAction(removeNotification(notification.id));
	};

	return (
		<div className="flex flex-col">
			<div className="border-b border-gray-300 flex items-center justify-between">
				<div className="flex items-center gap-3 px-2 py-1">
					<div>
						{!!notification.icon ? (
							<img src={notification.icon} alt={notification.title} className="w-12 h-12 rounded-full overflow-hidden" />
						) : (
							<span className="w-12 h-12 rounded-full bg-[#a81563] text-white text-2xl font-normal flex justify-center items-center">
								{notification.initials}
							</span>
						)}
					</div>
					<div className="flex flex-col justify-center">
						<h3 className="flex items-center gap-2">
							<span className="text-xl font-bold">{notification.title} :</span>
							<span className="text-[15px] text-gray-700  break-words">{notification.message}</span>
						</h3>

						<p className="font-semibold text-gray-700">{moment(notification.time).fromNow()}</p>
					</div>
				</div>
				<div className="me-5 p-1 rounded-full cursor-pointer hover:bg-gray-200" onClick={handleDelete}>
					<RxCross2 className="text-[14px]" />
				</div>
			</div>

			<div className="w-full text-center pt-2 cursor-pointer hover:text-gray-500">Delete All</div>
		</div>
	);
});
