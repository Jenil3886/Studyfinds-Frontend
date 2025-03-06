import { FiMenu } from "react-icons/fi";
import { MdLogin } from "react-icons/md";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { CONSTANTS } from "../helper/constants";
import { SIDEBAR_BOTTOM_TABS, SIDEBAR_TOP_TABS } from "../helper/tab";
import AuthModal from "../components/modal/AuthModal";
import SignupModal from "../components/modal/auth/signup.auth.modal";
import LoginModal from "../components/modal/auth/login.auth.modal";
import { useSelector } from "react-redux";

export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <aside
      className={`h-full shrink-0 flex flex-col justify-between gap-4 px-3 py-5 border-r border-gray-200 select-none ${
        sidebarOpen ? "w-[256px]" : "w-[76px]"
      }`}
    >
      <div className="flex flex-col gap-3">
        <div className={`flex px-3 gap-3 ${!sidebarOpen ? "justify-center" : ""}`}>
          <span
            className="p-1 h-16 mt-1.5 hover:cursor-pointer rounded-full text-xl transition duration-300"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu />
          </span>

          {sidebarOpen && (
            <div className="relative">
              <Link to="/" className="h-16 font-bold text-3xl text-center hover:cursor-pointer">
                {CONSTANTS.PROJECT_NAME}
              </Link>
              <p className="absolute bottom-4 right-0 text-sm font-semibold">
                {CONSTANTS.PROJECT_SUB_NAME}
              </p>
            </div>
          )}
        </div>

        {SIDEBAR_TOP_TABS.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `h-10 text-black rounded-3xl flex items-center gap-3 ${
                sidebarOpen ? "px-5" : "justify-center"
              } ${isActive ? "bg-primary rounded-3xl" : "hover:bg-gray-200"}`
            }
          >
            <span className="text-xl"> {tab.icon}</span>
            {sidebarOpen && <span className="text-[17px] font-semibold"> {tab.label} </span>}
          </NavLink>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `h-10 text-black rounded-3xl flex items-center gap-3 hover:cursor-pointer ${
              sidebarOpen ? "px-5" : "justify-center"
            } ${isActive ? "bg-primary rounded-3xl" : "hover:bg-gray-200"}`
          }
        >
          {/* Profile Icon */}
          <span
            className="w-6 h-6 rounded-full text-white flex justify-center items-center text-[10px]"
            style={{ backgroundColor: "#7E3794" }}
          >
            {CONSTANTS.PROFILE_SLUG}
          </span>
          {sidebarOpen && <span className="text-[17px] font-semibold">Profile</span>}
        </NavLink>

        {SIDEBAR_BOTTOM_TABS.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `h-10 text-black rounded-3xl flex items-center gap-3 ${
                sidebarOpen ? "px-5" : "justify-center"
              } ${isActive ? "bg-primary rounded-3xl" : "hover:bg-gray-200"}`
            }
          >
            <span className="text-xl"> {tab.icon} </span>
            {sidebarOpen && <span className="text-[17px] font-semibold">{tab.label} </span>}
          </NavLink>
        ))}

        <div
          onClick={openModal}
          className={`h-10 text-black rounded-3xl flex items-center gap-3 hover:cursor-pointer ${
            sidebarOpen ? "px-5" : "justify-center"
          }`}
        >
          <span className="text-xl">{<MdLogin />}</span>
          {sidebarOpen && (
            <span className="text-[17px] font-semibold">
              {isLoggedIn ? "Logout" : "Sign Up or Log In"}
            </span>
          )}
        </div>
      </div>

      {/* <SignupModal isModalOpen={isModalOpen} closeModal={closeModal} /> */}
      <LoginModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </aside>
  );
};
