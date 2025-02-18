import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/dashboard", { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return <div></div>;
};

export default RefreshHandler;
