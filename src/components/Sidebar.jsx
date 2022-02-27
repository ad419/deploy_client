import React from "react";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../assets/okee.png";
import { categories } from "../utils/data";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { AiOutlineClose } from "react-icons/ai";

function Sidebar({ user, closeToggle }) {
  const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
  const isActiveStyle =
    "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          onClick={handleCloseSidebar}
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
        >
          <img src={logo} alt="logo" className="w-full rounded-lg" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
            to="/"
          >
            <AiOutlineHome className="text-xl" /> Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover cateogries
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              key={category.name}
              onClick={handleCloseSidebar}
              to={`/category/${category.name}`}
            >
              <img
                src={category.image}
                className="rounded-full w-8 h-8"
                alt=""
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div>
        <div className="flex mt-9 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3">
          <MaterialUISwitch /> Dark Mode
        </div>
        {user && (
          <Link
            to={`user-profile/${user._id}`}
            className="flex mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
            onClick={handleCloseSidebar}
          >
            <img
              src={user.image}
              className="w-10 h-10 rounded-full"
              alt="user-profile"
            />
            <p>{user.userName}</p>
            <IoIosArrowForward />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
