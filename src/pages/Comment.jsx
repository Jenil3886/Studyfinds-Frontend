import React, { useState } from "react";
import { VscSmiley } from "react-icons/vsc";
import EmojiPicker from "emoji-picker-react";

const CommentBox = () => {
	const [comment, setComment] = useState("");
	const maxCharacters = 1000;

	const handleInputChange = (event) => {
		setComment(event.target.value);
	};

	const isButtonDisabled = comment.trim().length === 0;

	return (
		<div className="relative flex gap-x-3 border rounded-md p-4">
			{/* User Avatar */}
			<div className="flex flex-col items-end gap-2">
				<span className="w-10 h-10 rounded-full text-white font-normal flex justify-center items-center" style={{ backgroundColor: "#a81563" }}>
					JG
				</span>

				<VscSmiley className="text-[20px]" />
				{/* <EmojiPicker /> */}
			</div>

			{/* Comment Input */}
			<div className="flex-1 min-w-0 flex flex-col gap-y-2">
				<div className="mentions mentions--multiLine" style={{ position: "relative", overflowY: "visible" }}>
					<div className="mentions__control">
						<textarea
							name="leave_comment"
							placeholder="Leave a comment"
							autoComplete="off"
							className="mentions__input w-full bg-slate-100 p-2"
							rows="3"
							value={comment}
							onChange={handleInputChange}
							maxLength={1000}
						/>
					</div>
				</div>

				{/* Footer: Character Counter & Save Button */}
				<div className="flex max-phone:flex-col max-phone:items-end justify-between max-phone:gap-y-2 pl-2">
					<p className="text-[13px] font-semibold text-gray-400">{maxCharacters - comment.length} characters left</p>
					<button
						aria-label="Add Comment"
						className={`w-40 h-10 mt-1 flex items-center justify-center gap-x-2 ${
							isButtonDisabled ? "bg-gray-300 opacity-50" : "bg-black text-white"
						} rounded-full select-none`}
						disabled={isButtonDisabled}
					>
						<svg
							stroke="currentColor"
							fill="currentColor"
							strokeWidth="0"
							viewBox="0 0 24 24"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path fill="none" d="M24 24H0V0h24v24z" opacity=".87"></path>
							<path d="m19 15-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path>
						</svg>
						<span>Save Comment</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default CommentBox;
