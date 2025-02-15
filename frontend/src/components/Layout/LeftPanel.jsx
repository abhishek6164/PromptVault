import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SettingsIcon from "@mui/icons-material/Settings";
// import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
// import DeleteIcon from "@mui/icons-material/Delete";

const LeftPanel = () => {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="w-1/6 mt-2 ml-3 mb-3 min-h-screen text-gray p-6 border border-gray/20 rounded-2xl">
      <h1 className="flex items-center text-2xl font-bold mb-8">
        <NoteAltIcon className="mr-2" />
        AI Note
      </h1>

      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <hr className="border-t border-gray/40 mb-4" />

        <div className="space-y-4">
          <h2
            className="flex items-center text-lg hover:bg-purple-100 rounded-2xl p-2 cursor-pointer transition-colors"
            onClick={() => navigate("/")}
          >
            <HomeIcon className="mr-2" />
            Home
          </h2>
          <h2
            className="flex items-center text-lg hover:bg-purple-100 rounded-2xl p-2 cursor-pointer transition-colors"
            onClick={() => navigate("/dashboard")}
          >
            <DashboardIcon className="mr-2" />
            Dashboard
          </h2>
          <h2
            className="flex items-center text-lg hover:bg-purple-100 rounded-2xl p-2 cursor-pointer transition-colors"
            onClick={() => navigate("/favourites")}
          >
            <StarBorderIcon className="mr-2" />
            Favorites
          </h2>
        </div>

        <div className="flex-grow"></div>

        <div className="mt-auto">
          <div
            className="flex items-center justify-between p-2 hover:bg-purple-100 rounded-2xl cursor-pointer transition-colors"
            onClick={() => setShowSettings(!showSettings)}
          >
            <SettingsIcon className="mr-2" />
            <span className="text-lg">Settings</span>
            {showSettings ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>

          {showSettings && (
            <div className="ml-4 mt-2 space-y-2">
              <div
                className="flex items-center text-lg hover:bg-purple-100 rounded-2xl p-2 cursor-pointer transition-colors"
                onClick={handleLogout}
              >
                <LogoutIcon className="mr-2" />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
