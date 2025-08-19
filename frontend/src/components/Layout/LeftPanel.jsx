import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { handleSuccess } from "../../utils";

const LeftPanel = () => {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out Successfully");
    navigate("/login");
  };

  return (
    <div className="w-full md:w-64  mt-2 mx-3 mb-3 min-h-[calc(100vh-20px)] bg-white shadow-lg rounded-2xl transition-all duration-300">
      <div className="p-6">
        <h1 className="flex items-center text-2xl font-bold mb-8 text-gray-800 hover:text-purple-600 transition-colors">
          <NoteAltIcon className="mr-2 text-purple-500" />
          <span className="hidden md:inline">AI Prompts</span>
        </h1>

        <div className="flex flex-col h-[calc(100vh-12rem)]">
          <hr className="border-t border-gray-200 mb-6" />

          <nav className="space-y-4">
            <button
              className="flex items-center w-full text-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 rounded-xl p-3 transition-all duration-200 group"
              onClick={() => navigate("/dashboard")}
            >
              <DashboardIcon className="mr-3 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">Dashboard</span>
            </button>

            <button
              className="flex items-center w-full text-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 rounded-xl p-3 transition-all duration-200 group"
              onClick={() => navigate("/favorites")}
            >
              <StarBorderIcon className="mr-3 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">Favorites</span>
            </button>
          </nav>

          <div className="flex-grow"></div>

          <div className="mt-auto">
            <button
              className="flex items-center justify-between w-full p-3 text-gray-700 hover:bg-purple-100 hover:text-purple-700 rounded-xl transition-all duration-200"
              onClick={() => setShowSettings(!showSettings)}
            >
              <div className="flex items-center">
                <SettingsIcon className="mr-3" />
                <span className="hidden md:inline text-lg">Settings</span>
              </div>
              {showSettings ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </button>

            {showSettings && (
              <div className="mt-2 pl-4 space-y-2 animate-fadeIn">
                <button
                  className="flex items-center w-full text-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 rounded-xl p-3 transition-all duration-200 group"
                  onClick={handleLogout}
                >
                  <LogoutIcon className="mr-3 group-hover:scale-110 transition-transform" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
