import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { Helmet } from "react-helmet";
import { GoVerified } from "react-icons/go";
import { MdOutlineVerifiedUser } from "react-icons/md";





const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold animation-slide transition ease-in-out duration-500 p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();



  const User =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const logout = () => {
    localStorage.clear();

    navigate("/login");
  };

  if (!user) return <Spinner message="Loading profile" />;

  

  return (
    <>
      <Helmet>
        <title>{user.userName} || Profile</title>
      </Helmet>
      <div className="relative pb-2 h-full justify-center items-center">
        <div className="flex flex-col pb-5">
          <div className="relative flex flex-col mb-7">
            <div className="flex flex-col justify-center items-center">
              <img
                className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
                src="https://source.unsplash.com/1600x900/?nature,photography,technology"
                alt="user-pic"
              />
              <img
                className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                src={user.image}
                alt="user-pic"
              />
            </div>

            {user.userName === "Updater XD" ||
            user.userName === "Nazif Kotorri" ? (
              <div className="flex justify-center">
                <h1 className="font-bold text-3xl text-center mt-3">
                  {user.userName}
                </h1>
                {user.userName === "Updater XD" && (
                  <GoVerified
                    style={{ marginTop: 21, marginLeft: 9 }}
                    size={20}
                    color="#2BBDCF"
                  />
                )}
                {user.userName === "Nazif Kotorri" && (
                  <MdOutlineVerifiedUser
                    style={{ marginTop: 22, marginLeft: 9 }}
                    size={20}
                    color="green"
                  />
                )}
              </div>
            ) : (
              <div>
                <h1 className="font-bold text-3xl text-center mt-3">
                  {user.userName}
                </h1>
              </div>
            )}

            <div className="absolute top-2 mt-1 mr-1 z-1 right-3">
              {userId === User.googleId && (
                <GoogleLogout
                  clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className=" bg-white flex w-12 h-12 md:w-13 md:h-13 justify-center items-center rounded-full cursor-pointer outline-none shadow-md"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <FiLogOut color="red" fontSize={21} />
                    </button>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy="single_host_origin"
                />
              )}
            </div>
            <div className="absolute mt-1 top-2 z-1 right-3 mr-14">
              <Link
                to="/create-pin"
                className="bg-green-500 text-white rounded-full w-12 h-12 md:w-13 md:h-13 flex justify-center items-center"
              >
                <IoMdAdd fontSize={23} className="font-extrabold" />
              </Link>
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Liked
            </button>
          </div>

          <div className="px-2">
            <MasonryLayout pins={pins} />
          </div>

          {pins?.length === 0 && (
            <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
              No Pins Found!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
