// import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import PrivateRoute from "./components/PrivateRoute";
// import Login from "./components/Auth/Login";
// import Signup from "./components/Auth/Signup";
// import NotePad from "./components/Notes/NotePad";
// import Favorites from "./components/Notes/Favourites";
import "./index.css"; // Ensure Tailwind is included

// function App() {
//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <NotePad />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/favorites"
//           element={
//             <PrivateRoute>
//               <Favorites />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </AuthProvider>
//   );
// }

// export default App;

// src/App.jsx// src/App.jsx
import React from "react";
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
