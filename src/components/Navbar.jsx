import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
        <div className="flex  justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate("/search")}
            className="p-2 w-full sm:w-2/4 bg-white outline-none"
          />
        </div>
        <div className="flex gap-2 h-12 ">
          <Link
            to="/create-pin"
            className="bg-green-500 text-white rounded-full h-12 w-12 flex justify-center items-center"
          >
            <IoMdAdd fontWeight={700} fontSize={30} />
          </Link>
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img
              src={user.image}
              alt="user-pic"
              className="w-12 h-12 rounded-full flex"
            />
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;
