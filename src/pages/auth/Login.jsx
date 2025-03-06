import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // ||  process.env.REACT_APP_API_URL
  withCredentials: true,
});

const LoginModal = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      const response = await apiClient.post("/login", formData);

      localStorage.setItem("auth_token", response.data.token);
      navigate("/dashboard"); // Update with your desired route
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-center items-center">
      {/* Close button with navigation */}
      <div className="w-full flex gap-40 items-baseline">
        <RxCross2
          className="text-[25px] cursor-pointer"
          onClick={() => navigate("/")} // Add proper navigation
        />
        <div className="flex flex-col gap-3 justify-center items-center">
          <h2 className="text-[28px] font-semibold">Log In</h2>
          <p>Welcome back!</p>
        </div>
      </div>

      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        placeholder="Username"
        required
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        placeholder="Enter Your Password"
        required
      />

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white w-full py-2.5 rounded-full"
      >
        {isLoading ? "Logging in..." : "Continue with email"}
      </button>

      <p className="text-sm text-gray-500 select-none">
        By clicking "Continue with Email" you agree to our <u>Terms of Service</u> and{" "}
        <u>Privacy Policy</u>.
      </p>

      <button
        type="button"
        className="text-blue-500 text-sm underline"
        onClick={() => navigate("/forgot-password")} // Add proper route
      >
        Forgot Password?
      </button>
    </form>
  );
};

export default LoginModal;
