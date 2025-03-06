import { useState } from "react";
import { CommonModal } from "../CommonModal";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../../api/config";
import { REQ_METHODS } from "../../../helper/constants";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

const SignupModal = ({ isModalOpen, closeModal }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    console.log("handle submit");

    try {
      const response = await apiCall("/register", { method: REQ_METHODS.POST, body: formData });

      localStorage.setItem("auth_token", response.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommonModal isOpen={isModalOpen} onClose={closeModal}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-center items-center">
        <div className="w-full flex gap-40 items-baseline">
          <RxCross2 onClick={closeModal} className="text-[25px] cursor-pointer" />
          <div className="flex flex-col gap-3 justify-center items-center">
            <h2 className="text-[28px] font-semibold">Sign Up</h2>
            <p>Get started for free</p>
          </div>
        </div>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Username"
          required
        />
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
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Password"
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
          By clicking "Continue with Google / Facebook / Email" you agree to our User{" "}
          <u>Terms of Service</u> and <u>Privacy Policy</u>.
        </p>
      </form>
    </CommonModal>
  );
};

export default SignupModal;
