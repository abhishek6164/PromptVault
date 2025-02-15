import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import NotePad from "./components/Notes/NotePad";
import Favourites from "./components/Notes/Favourites";

const App = () => {
  return (
    <Router>
      <div className="h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<NotePad />} />
          <Route path="/favourites" element={<Favourites />} />

          <Route
            path="/"
            element={
              <div className="flex items-center justify-center">
                <h1 className="text-3xl font-bold">Welcome to Notes App</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
