import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Sidebar } from "./layout/Sidebar";
import { useState } from "react";
import { Header } from "./layout/header";
import { routes } from "./router";

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	return (
		<>
			<div
				style={{
					height: "100dvh",
					width: "100vw",
					display: "flex",
					overflow: "hidden",
				}}
			>
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				<div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
					<Header />

					<main
						style={{
							flexGrow: 1,
							overflow: "auto",
						}}
					>
						<Routes>
							<Route
								path="*"
								/*Go to path - "/" */ element={
									<div className="text-gray-500 font-bold text-7xl w-full text-center mt-44 ">
										The page you’re looking <br /> for can’t be found.
									</div>
								}
							/>
							{routes.map((route) => (
								<Route key={route.path} path={route.path} element={route.component} />
							))}
						</Routes>
					</main>
				</div>
			</div>
		</>
	);
}

export default App;
