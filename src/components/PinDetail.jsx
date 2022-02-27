import React, { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { BsBookmarkPlus } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { feedQuery } from "../utils/data";
import Spinner from "./Spinner";
import { BiTrash } from "react-icons/bi";
import { Helmet } from "react-helmet";
import { pinDetailQuery, pinDetailMorePinQuery } from "../utils/data";

import { HiOutlinePaperAirplane } from "react-icons/hi";

const PinDetail = ({ user, save, _id, postedBy }) => {
  const { pinId } = useParams();
  const [savingPost, setSavingPost] = useState(false);
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const alreadySaved = !!save?.filter(
    (item) => item?.postedBy?._id === user?.googleId
  )?.length;

  const navigate = useNavigate();

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);
        setPinDetail(data[0]);
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((res) => setPins(res));
        }
      });
    }
  };

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

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: "postedBy", _ref: user._id },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  if (!pinDetail) {
    return <Spinner message="Showing pin" />;
  }

  if (!pinDetail)
    return <Spinner message="Your pins are loading Hold Up wait a minute" />;

  return (
    <>
      <Helmet>
        <title>
          {user.userName} Post | {pinDetail.title}
        </title>
      </Helmet>
      {pinDetail && (
        <div
          className="flex xl:flex-row flex-col m-auto bg-white"
          style={{ maxWidth: "1500px", borderRadius: "32px" }}
        >
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              src={pinDetail?.image && urlFor(pinDetail?.image).url()}
              alt=""
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <a
                  href={`${pinDetail.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>

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
                        savePin(pinId);
                      }}
                      type="button"
                      className="bg-gray-300 text-black opacity-70 hover:opacity-100 text-white font-bold  h-9 w-9 text-base rounded-3xl hover:shadow-md outline-none flex items-center justify-center"
                    >
                      <BsHeart />
                    </button>
                    <h1 className="absolute text-lg flex right-12 mr-1 text-black">
                      {save?.length}
                    </h1>
                  </>
                )}
              </div>
              <a href={pinDetail.destination} target="_blank" rel="noreferrer">
                {pinDetail.destination?.slice(8)}
              </a>
            </div>
            <div>
              <div>
                <h1 className="text-4xl font-bold break-words mt-3">
                  {pinDetail.title}
                </h1>
                {pinDetail?.postedBy.userName === "Updater XD" && (
                  <p className="font-bold text-orange-500">Owner</p>
                )}
                {pinDetail?.postedBy.userName === "Nazif Kotorri" && (
                  <p className="font-bold text-green-500">Co-Owner</p>
                )}
              </div>
              <p className="mt-3">{pinDetail.about}</p>
            </div>
            <Link
              to={`/user-profile/${pinDetail?.postedBy._id}`}
              className="flex gap-2 mt-5 items-center bg-white rounded-lg "
            >
              <img
                src={pinDetail?.postedBy.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              {pinDetail?.postedBy.userName === "Updater XD" && (
                <p className="font-bold text-orange-500">
                  {pinDetail?.postedBy.userName}
                </p>
              )}
              {pinDetail?.postedBy.userName === "Nazif Kotorri" ? (
                <p className="font-bold text-green-500">
                  {pinDetail?.postedBy.userName}
                </p>
              ) : (
                <p className="font-bold"></p>
              )}
            </Link>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {pinDetail?.comments?.map((item) => (
                <div
                  className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                  key={item.comment}
                >
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>

                    {item.postedBy?.userName === "Updater XD" ? (
                      <p className="font-bold text-orange-500">
                        {item.comment}
                      </p>
                    ) : (
                      <p className="font-bold">{item.comment}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user-profile/${user._id}`}>
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-green-500 flex items-center justify-center text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? "Adding your comment...." : "Comment"}

                <HiOutlinePaperAirplane className="ml-3 rotate-90 text-xl" />
              </button>
            </div>
          </div>
        </div>
      )}
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  );
};

export default PinDetail;
