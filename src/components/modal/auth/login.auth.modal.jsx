import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { CommonModal } from "../CommonModal";
import { apiCall } from "../../../api/config";
import { REQ_METHODS } from "../../../helper/constants";

const LoginModal = ({ isModalOpen, closeModal }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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
      const response = await apiCall("/login", { method: REQ_METHODS.POST, body: formData });

      localStorage.setItem("auth_token", response.token);
      window.location.replace("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommonModal isOpen={isModalOpen} onClose={closeModal}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-center items-center">
        {/* Close button with navigation */}
        <div className="w-full flex gap-40 items-baseline">
          <RxCross2 className="text-[25px] cursor-pointer" onClick={closeModal} />
          <div className="flex flex-col gap-3 justify-center items-center">
            <h2 className="text-[28px] font-semibold">Log In</h2>
            <p>Welcome back!</p>
          </div>
        </div>

        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Email Address"
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
    </CommonModal>
  );
};

export default LoginModal;
