import "./index.css"; // Ensure Tailwind is included

import { Navigate, Routes, Route } from "react-router-dom"; // No need to import BrowserRouter here
import HomePage from "./HomePage";
import LoginPage from "./components/Auth/Login";
import SignUpPage from "./components/Auth/Signup";
import NotePad from "./components/Notes/NotePad";
import Favorites from "./components/Notes/Favourites";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<NotePad />} />}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Favorites />} />}
        />
      </Routes>
    </>
  );
}

export default App;
