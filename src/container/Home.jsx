import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserProfile from "../components/UserProfile";
import { client } from "../client";
import logo from "../assets/okee.png";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";
import { Helmet } from "react-helmet";

const Home = () => {
  const scrollRef = useRef(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const userInfo = fetchUser();
  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Ripterest Home</title>
      </Helmet>
      <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
        <div className="hidden md:flex h-screen flex-initial">
          <Sidebar user={user && user} />
        </div>
        <div className="flex md:hidden flex-row">
          <div className="p-1 w-full flex flex-row justify-between items-center shadow-md">
            <HiMenu
              onClick={() => setToggleSidebar(true)}
              fontSize={40}
              className="cursor-pointer"
            />
            <Link to="/">
              <img src={logo} className="w-28" alt="logo"></img>
            </Link>
            <Link to={`user-profile/${user?._id}`}>
              <img
                className="w-12 rounded-full"
                src={user?.image}
                alt="logo"
              ></img>
            </Link>
          </div>
          {toggleSidebar && (
            <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
              <div className="absolute w-full flex justify-end items-center p-2">
                <AiOutlineClose
                  fontSize={30}
                  className="cursor-pointer"
                  onClick={() => setToggleSidebar(false)}
                />
              </div>
              <Sidebar user={user && user} closeToggle={setToggleSidebar} />
            </div>
          )}
        </div>

        <div
          className="pb-2 flex-1 h-screen overflow-y-scroll "
          ref={scrollRef}
        >
          <Routes>
            <Route path="user-profile/:userId" element={<UserProfile />} />
            <Route path="/*" element={<Pins user={user && user} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
