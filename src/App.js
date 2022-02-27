import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./container/Home";
import Login from "./components/Login";
import { fetchUser } from "./utils/fetchUser";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import ThemeSwitcher from "react-theme-switcher";

const themes = {
  light: "public/light.css",
  dark: "public/dark.css",
};

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();

    if (!user) navigate("/login");
  }, []);

  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
