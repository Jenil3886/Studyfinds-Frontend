import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CommonModal } from "./CommonModal";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { apiCall } from "../../api/config";
import { REQ_METHODS } from "../../helper/constants";

const AuthModal = ({ isModalOpen, closeModal }) => {
	const [activeForm, setActiveForm] = useState("login");
	const [successMessage, setSuccessMessage] = useState("");

	const [showPassword, setShowPassword] = useState({
		login: false,
		signup: false,
	});

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		fullname: "",
		username: "",
	});

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			if (activeForm === "forgotPassword") {
				await apiCall("/auth/forgot-password", {
					method: REQ_METHODS.POST,
					body: { email: formData.email },
				});
				setSuccessMessage("Password reset link sent to your email");
				setError("");
			} else {
				const response = await apiCall(activeForm === "login" ? "/auth/login" : "/auth/register", {
					method: REQ_METHODS.POST,
					body: activeForm === "login" ? { email: formData.email, password: formData.password } : formData,
				});

				localStorage.setItem("auth_token", response.token);
				window.location.replace("/");
			}
		} catch (error) {
			setError(error.response?.data?.message || "500 : Server Error");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<CommonModal isOpen={isModalOpen} onClose={closeModal}>
			<div className="w-full p-3">
				{/* Header */}
				<div className="flex justify-between items-center mb-6">
					{activeForm !== "forgotPassword" && (
						<div className="flex gap-4">
							<button
								type="button"
								className={`font-medium ${
									activeForm === "login"
										? "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 text-black border-b-2 border-black"
										: "text-gray-500"
								}`}
								onClick={() => setActiveForm("login")}
							>
								Log In
							</button>
							<button
								type="button"
								className={`font-medium ${
									activeForm === "signup"
										? "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 text-black border-b-2 border-black"
										: "text-gray-500"
								}`}
								onClick={() => setActiveForm("signup")}
							>
								Sign Up
							</button>
						</div>
					)}
					<h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
						{(() => {
							switch (activeForm) {
								case "login":
									return "Log In";
								case "signup":
									return "Sign Up";
								case "forgotPassword":
									return "Forgot Your Password";
								default:
									return "Log In";
							}
						})()}
					</h1>
					<RxCross2 className="text-3xl cursor-pointer hover:bg-gray-200 p-[6px] rounded-full" onClick={closeModal} />
				</div>

				<p className="font-semibold text-gray-600 mb-6">Please enter the email address you'd like your password reset information sent to.</p>

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Email Field */}
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
						placeholder="Email"
						required
					/>

					{/* Conditional Fields */}
					{activeForm !== "forgotPassword" && (
						<>
							{activeForm === "signup" && (
								<>
									<input
										type="text"
										name="fullname"
										value={formData.fullname}
										onChange={handleChange}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
										placeholder="Full Name"
										required
									/>
									<input
										type="text"
										name="username"
										value={formData.username}
										onChange={handleChange}
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
										placeholder="Username"
										required
									/>
								</>
							)}

							{/* Password Field */}
							<div className="relative">
								<input
									type={activeForm === "login" ? (showPassword.login ? "text" : "password") : showPassword.signup ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleChange}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-10"
									placeholder="Password"
									required={activeForm !== "forgotPassword"}
								/>
								{activeForm !== "forgotPassword" && (
									<button
										type="button"
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
										onClick={() =>
											setShowPassword((prev) => ({
												...prev,
												[activeForm]: !prev[activeForm],
											}))
										}
									>
										{activeForm === "login" ? (
											showPassword.login ? (
												<AiFillEye />
											) : (
												<AiFillEyeInvisible />
											)
										) : showPassword.signup ? (
											<AiFillEye />
										) : (
											<AiFillEyeInvisible />
										)}
									</button>
								)}
							</div>
						</>
					)}

					{/* Error/Success Messages */}
					{error && <div className="text-red-500 text-sm">{error}</div>}
					{successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}

					{/* Submit Button */}
					<button type="submit" disabled={isLoading} className="bg-black text-white w-full py-2.5 rounded-full flex items-center justify-center">
						{isLoading ? (
							activeForm === "login" ? (
								"Logging in..."
							) : activeForm === "signup" ? (
								"Signing up..."
							) : (
								<div class="w-6 h-6 relative">
									<div class="absolute w-full h-full animate-spin">
										<div class="w-[6px] h-[6px] bg-white rounded-full absolute top-0 left-1/2 -translate-x-1/2"></div>
										<div class="w-[6px] h-[6px] bg-white rounded-full absolute bottom-0 left-1/2 -translate-x-1/2"></div>
										<div class="w-[6px] h-[6px] bg-white rounded-full absolute top-1/2 left-0 -translate-y-1/2"></div>
										<div class="w-[6px] h-[6px] bg-white rounded-full absolute top-1/2 right-0 -translate-y-1/2"></div>
									</div>
								</div>
							)
						) : activeForm === "login" ? (
							"Log In"
						) : activeForm === "signup" ? (
							"Sign Up"
						) : (
							"Send Reset Link"
						)}
					</button>

					{/* Form Footer */}
					<div className="text-center text-sm text-gray-500">
						{activeForm === "login" && (
							<>
								Don't have an account?{" "}
								<button type="button" className="text-blue-500 underline" onClick={() => setActiveForm("signup")}>
									Sign Up
								</button>
							</>
						)}
						{activeForm === "signup" && (
							<>
								Already have an account?{" "}
								<button type="button" className="text-blue-500 underline" onClick={() => setActiveForm("login")}>
									Log In
								</button>
							</>
						)}
						{activeForm === "forgotPassword" && (
							<>
								Back to{" "}
								<button type="button" className="text-blue-500 underline" onClick={() => setActiveForm("login")}>
									Log In
								</button>
							</>
						)}
					</div>
				</form>

				{/* Forgot Password Link */}
				{activeForm === "login" && (
					<button
						type="button"
						className="text-blue-500 text-sm mt-3 block underline w-full text-left"
						onClick={() => {
							setActiveForm("forgotPassword");
							setError("");
							setSuccessMessage("");
						}}
					>
						Forgot Password?
					</button>
				)}
			</div>
		</CommonModal>
	);
};

export default AuthModal;

// import { useState, useEffect } from "react";
// import { RxCross2 } from "react-icons/rx";
// import { CommonModal } from "./CommonModal";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { apiCall } from "../../api/config";
// import { REQ_METHODS } from "../../helper/constants";

// const AuthModal = ({ isModalOpen, closeModal, resetToken: initialToken }) => {
// 	const [activeForm, setActiveForm] = useState(initialToken ? "resetPassword" : "login");
// 	const [successMessage, setSuccessMessage] = useState("");
// 	const [showPassword, setShowPassword] = useState({
// 		login: false,
// 		signup: false,
// 		reset: false,
// 	});
// 	const [formData, setFormData] = useState({
// 		email: "",
// 		password: "",
// 		fullname: "",
// 		username: "",
// 		newPassword: "",
// 		confirmPassword: "",
// 	});
// 	const [error, setError] = useState("");
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [resetToken, setResetToken] = useState(initialToken);

// 	// Extract token from URL if not provided
// 	useEffect(() => {
// 		if (!initialToken) {
// 			const urlParams = new URLSearchParams(window.location.search);
// 			setResetToken(urlParams.get("token"));
// 			if (urlParams.get("token")) setActiveForm("resetPassword");
// 		}
// 	}, [initialToken]);

// 	const handleChange = (e) => {
// 		setFormData({
// 			...formData,
// 			[e.target.name]: e.target.value,
// 		});
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setError("");
// 		setIsLoading(true);

// 		try {
// 			switch (activeForm) {
// 				case "forgotPassword":
// 					await apiCall("/forgot-password", {
// 						method: REQ_METHODS.POST,
// 						body: { email: formData.email },
// 					});
// 					setSuccessMessage("Reset link sent to your email");
// 					break;

// 				case "resetPassword":
// 					if (formData.newPassword !== formData.confirmPassword) {
// 						throw new Error("Passwords do not match");
// 					}
// 					await apiCall("/reset-password", {
// 						method: REQ_METHODS.POST,
// 						body: {
// 							token: resetToken,
// 							newPassword: formData.newPassword,
// 						},
// 					});
// 					setSuccessMessage("Password reset successfully");
// 					setActiveForm("login");
// 					break;

// 				default:
// 					const response = await apiCall(activeForm === "login" ? "/login" : "/register", {
// 						method: REQ_METHODS.POST,
// 						body: activeForm === "login" ? { email: formData.email, password: formData.password } : formData,
// 					});
// 					localStorage.setItem("auth_token", response.token);
// 					window.location.replace("/");
// 			}
// 		} catch (error) {
// 			setError(error.response?.data?.message || error.message);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return (
// 		<CommonModal isOpen={isModalOpen} onClose={closeModal}>
// 			<div className="w-full p-3">
// 				{/* Header */}
// 				<div className="flex justify-between items-center mb-6">
// 					{activeForm !== "forgotPassword" && activeForm !== "resetPassword" && (
// 						<div className="flex gap-4">
// 							<button
// 								type="button"
// 								className={`font-medium ${
// 									activeForm === "login"
// 										? "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 text-black border-b-2 border-black"
// 										: "text-gray-500"
// 								}`}
// 								onClick={() => setActiveForm("login")}
// 							>
// 								Log In
// 							</button>
// 							<button
// 								type="button"
// 								className={`font-medium ${
// 									activeForm === "signup"
// 										? "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 text-black border-b-2 border-black"
// 										: "text-gray-500"
// 								}`}
// 								onClick={() => setActiveForm("signup")}
// 							>
// 								Sign Up
// 							</button>
// 						</div>
// 					)}
// 					<h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
// 						{(() => {
// 							switch (activeForm) {
// 								case "login":
// 									return "Log In";
// 								case "signup":
// 									return "Sign Up";
// 								case "forgotPassword":
// 									return "Forgot Password";
// 								case "resetPassword":
// 									return "Reset Password";
// 								default:
// 									return "Log In";
// 							}
// 						})()}
// 					</h1>
// 					<RxCross2 className="text-3xl cursor-pointer hover:bg-gray-200 p-[6px] rounded-full" onClick={closeModal} />
// 				</div>

// 				{activeForm === "resetPassword" && <p className="font-semibold text-gray-600 mb-6">Enter your new password</p>}

// 				<form onSubmit={handleSubmit} className="space-y-4">
// 					{/* Conditional Fields */}
// 					{activeForm === "resetPassword" ? (
// 						<>
// 							<div className="relative">
// 								<input
// 									type={showPassword.reset ? "text" : "password"}
// 									name="newPassword"
// 									value={formData.newPassword}
// 									onChange={handleChange}
// 									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-10"
// 									placeholder="New Password"
// 									required
// 								/>
// 								<button
// 									type="button"
// 									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
// 									onClick={() =>
// 										setShowPassword((prev) => ({
// 											...prev,
// 											reset: !prev.reset,
// 										}))
// 									}
// 								>
// 									{showPassword.reset ? <AiFillEye /> : <AiFillEyeInvisible />}
// 								</button>
// 							</div>
// 							<div className="relative">
// 								<input
// 									type={showPassword.reset ? "text" : "password"}
// 									name="confirmPassword"
// 									value={formData.confirmPassword}
// 									onChange={handleChange}
// 									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-10"
// 									placeholder="Confirm Password"
// 									required
// 								/>
// 							</div>
// 						</>
// 					) : (
// 						<>
// 							<input
// 								type="email"
// 								name="email"
// 								value={formData.email}
// 								onChange={handleChange}
// 								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
// 								placeholder="Email"
// 								required
// 							/>

// 							{activeForm !== "forgotPassword" && (
// 								<>
// 									{activeForm === "signup" && (
// 										<>
// 											<input
// 												type="text"
// 												name="fullname"
// 												value={formData.fullname}
// 												onChange={handleChange}
// 												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
// 												placeholder="Full Name"
// 												required
// 											/>
// 											<input
// 												type="text"
// 												name="username"
// 												value={formData.username}
// 												onChange={handleChange}
// 												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
// 												placeholder="Username"
// 												required
// 											/>
// 										</>
// 									)}

// 									<div className="relative">
// 										<input
// 											type={activeForm === "login" ? (showPassword.login ? "text" : "password") : showPassword.signup ? "text" : "password"}
// 											name="password"
// 											value={formData.password}
// 											onChange={handleChange}
// 											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-10"
// 											placeholder="Password"
// 											required={activeForm !== "forgotPassword"}
// 										/>
// 										{activeForm !== "forgotPassword" && (
// 											<button
// 												type="button"
// 												className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
// 												onClick={() =>
// 													setShowPassword((prev) => ({
// 														...prev,
// 														[activeForm]: !prev[activeForm],
// 													}))
// 												}
// 											>
// 												{activeForm === "login" ? (
// 													showPassword.login ? (
// 														<AiFillEye />
// 													) : (
// 														<AiFillEyeInvisible />
// 													)
// 												) : showPassword.signup ? (
// 													<AiFillEye />
// 												) : (
// 													<AiFillEyeInvisible />
// 												)}
// 											</button>
// 										)}
// 									</div>
// 								</>
// 							)}
// 						</>
// 					)}

// 					{/* Error/Success Messages */}
// 					{error && <div className="text-red-500 text-sm">{error}</div>}
// 					{successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}

// 					{/* Submit Button */}
// 					<button type="submit" disabled={isLoading} className="bg-black text-white w-full py-2.5 rounded-full flex items-center justify-center">
// 						{isLoading ? (
// 							<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// 								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
// 								<path
// 									className="opacity-75"
// 									fill="currentColor"
// 									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.411 0 8-3.589 8-8 0-1.12-.219-2.208-.619-3.241L4.618 17.24C4.219 18.208 4 19.291 4 20.417z"
// 								/>
// 							</svg>
// 						) : activeForm === "resetPassword" ? (
// 							"Reset Password"
// 						) : activeForm === "login" ? (
// 							"Log In"
// 						) : activeForm === "signup" ? (
// 							"Sign Up"
// 						) : (
// 							"Send Reset Link"
// 						)}
// 					</button>

// 					{/* Form Footer */}
// 					<div className="text-center text-sm text-gray-500">
// 						{activeForm === "login" && (
// 							<>
// 								Don't have an account?{" "}
// 								<button type="button" className="text-blue-500 underline" onClick={() => setActiveForm("signup")}>
// 									Sign Up
// 								</button>
// 							</>
// 						)}
// 						{activeForm === "signup" && (
// 							<>
// 								Already have an account?{" "}
// 								<button type="button" className="text-blue-500 underline" onClick={() => setActiveForm("login")}>
// 									Log In
// 								</button>
// 							</>
// 						)}
// 						{activeForm === "forgotPassword" && (
// 							<>
// 								Back to{" "}
// 								<button type="button" className="text-blue-500 underline" onClick={() => setActiveForm("login")}>
// 									Log In
// 								</button>
// 							</>
// 						)}
// 						{activeForm === "resetPassword" && (
// 							<>
// 								Remember password?{" "}
// 								<button type="button" className="text-blue-500 underline" onClick={() => setActiveForm("login")}>
// 									Log In
// 								</button>
// 							</>
// 						)}
// 					</div>
// 				</form>

// 				{/* Forgot Password Link */}
// 				{activeForm === "login" && (
// 					<button
// 						type="button"
// 						className="text-blue-500 text-sm mt-3 block underline w-full text-left"
// 						onClick={() => {
// 							setActiveForm("forgotPassword");
// 							setError("");
// 							setSuccessMessage("");
// 						}}
// 					>
// 						Forgot Password?
// 					</button>
// 				)}

// 				{/* ======================== */}
// 				{activeForm === "forgotPassword" && (
// 					<button
// 						type="button"
// 						className="text-blue-500 text-sm mt-3 block underline w-full text-left"
// 						onClick={() => {
// 							setActiveForm("resetPassword");
// 							setError("");
// 							setSuccessMessage("");
// 						}}
// 					>
// 						Reset Password
// 					</button>
// 				)}
// 			</div>
// 		</CommonModal>
// 	);
// };

// export default AuthModal;
