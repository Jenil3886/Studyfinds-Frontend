"react";
import { useState } from "react";
import { ASK_TABS } from "../helper/tab";

export const Ask = () => {
	const [activeTab, setActiveTab] = useState("everything");
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	const tabStyle = {
		width: "120px",
		height: "32px",
	};

	return (
		<div className=" h-full flex flex-col items-center p-3 md:p-4 lg:p-6 overflow-y-scroll none-scrollbar">
			<div className="w-full max-w-3xl">
				<div className=" text-center font-bold lg:text-5xl md:text-4xl sm:text-3xl">
					<span>Go ahead, ask away.</span>
				</div>

				<div className="container  my-10 border-2 border-gray-200 p-3 rounded-lg">
					<textarea
						placeholder="Ask Me Anything..."
						name="about"
						id="about"
						rows="4"
						className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
					/>
					<div className="flex justify-between mt-5">
						<div className="flex">
							<div className="flex px-2 py-1.5 bg-gray-100 rounded-full select-none">
								{ASK_TABS.map((tab) => (
									<span
										key={tab.value}
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
						<div>
							<button
								type="button"
								className="text-white bg-black hover:bg-gray-700  font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center "
							>
								<svg
									stroke="currentColor"
									fill="currentColor"
									stroke-width="0"
									viewBox="0 0 512 512"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M32 136v144h357.7l-84.4 86.2 33.2 33.8L480 256 338.5 112l-33.2 33.8 84.4 86.2H79.2v-96H32z"></path>
								</svg>
								Enter
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 w-full max-w-3xl">
				<p className="text-2xl font-semibold ">History</p>
				<div className="flex justify-center items-center">
					<p className="text-md mt-16">No asked Question</p>
				</div>
			</div>
		</div>
	);
};
