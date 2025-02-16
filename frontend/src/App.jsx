import "./index.css"; // Ensure Tailwind is included

import { Routes, Route } from "react-router-dom"; // No need to import BrowserRouter here
import HomePage from "./HomePage";
import LoginPage from "./components/Auth/Login";
import SignUpPage from "./components/Auth/Signup";
import NotePad from "./components/Notes/NotePad";
import Favorites from "./components/Notes/Favourites";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<NotePad />} />
      <Route path="/dashboard" element={<Favorites />} />
    </Routes>
  );
}

export default App;
