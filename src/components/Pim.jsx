import React, { useState } from "react";
import { urlFor, client } from "../client";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { fetchUser } from "../utils/fetchUser";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import { GoVerified } from "react-icons/go";
import { MdOutlineVerifiedUser } from "react-icons/md";

const Pin = ({ pin: { postedBy, image, _id, save } }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();
  const user = fetchUser();

  const alreadySaved = !!save?.filter(
    (item) => item?.postedBy?._id === user?.googleId
  )?.length;

  const savePin = (id) => {
    if (!alreadySaved) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="m-2">
      <div
        className="relative cursor-zoom-in  hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        onClick={() => navigate(`/pin-detail/${_id}`)}
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
      >
        <div>
          <img
            className="w-full"
            src={urlFor(image).width(250).url()}
            alt="ok"
          />
        </div>
        {postHovered && (
          <div className="absolute  top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 b-2 z-50">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  download
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75"
                  onClick={(e) => e.stopPropagation()}
                  href={`${image?.asset?.url}?dl=`}
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <div className="flex absolute bottom-2 justify-between items-center gap-2 w-full">
                {postedBy?._id === user?.googleId && (
                  <button
                    style={{ zIndex: 20 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePin(_id);
                    }}
                    type="button"
                  >
                    <div className="text-white text-xl ml-3 bg-red-400 h-7 w-7 flex items-center justify-center rounded-full">
                      <BiTrash />
                    </div>
                  </button>
                )}
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-gray-700 text-black opacity-70 hover:opacity-100 text-white font-bold  h-9 w-9 text-base rounded-3xl hover:shadow-md outline-none flex items-center justify-center"
                >
                  <h1 className="absolute text-lg flex right-12 mr-1 text-white">
                    {save?.length}
                  </h1>
                  <BsHeartFill style={{ color: "red" }} />
                </button>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      savePin(_id);
                    }}
                    type="button"
                    className="bg-gray-300 text-black opacity-70 hover:opacity-100 text-white font-bold  h-9 w-9 text-base rounded-3xl hover:shadow-md outline-none flex items-center justify-center"
                  >
                    <BsHeart />
                  </button>
                  <h1 className="absolute text-lg flex right-12 mr-1 text-white">
                    {save?.length}
                  </h1>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-2 items-center">
        <Link className="flex mt-2 gap-2" to={`user-profile/${postedBy?._id}`}>
          <img
            src={postedBy?.image}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />

          <p className=" text-slate-900 font-semibold capitalize">
            {postedBy?.userName}
          </p>
          {postedBy.userName === "Updater XD" && (
            <GoVerified size={20} style={{ marginTop: 3 }} color="#2BBDCF" />
          )}
          {postedBy.userName === "Nazif Kotorri" && (
            <MdOutlineVerifiedUser
              size={21}
              color="green"
              style={{ marginTop: 3 }}
            />
          )}
        </Link>

        <div className="flex md:hidden gap-2 absolute right-3">
          {alreadySaved ? (
            <div className="flex">
              <button
                type="button"
                className=" text-black opacity-70 hover:opacity-100  font-bold  h-9 w-9 text-base rounded-3xl hover:shadow-md outline-none flex items-center justify-center"
              >
                <BsHeartFill style={{ color: "red", fontSize: "20" }} />
              </button>
              <p className="mt-1  font-medium">{save?.length}</p>
            </div>
          ) : (
            <>
              <div className="flex">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className=" text-black opacity-70 hover:opacity-100  font-bold  h-9 w-9 text-base rounded-3xl hover:shadow-md outline-none flex items-center justify-center"
                >
                  <BsHeart style={{ fontSize: "20" }} />
                  <p className="ml-2">{save?.length}</p>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pin;
