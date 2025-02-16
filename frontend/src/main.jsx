// src/main.jsx
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root

root.render(
  // Use the new render method
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
