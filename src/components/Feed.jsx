import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  const ideaName = categoryId || "new";
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }

  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
      <div className="justify-center flex items-center">
        <button
          className="fixed p-3 rounded-full animate-bounce bg-green-600 text-zinc-50 bottom-3 right-5"
          onClick={handleOpen}
        >
          <span className="animate-ping absolute right-0 bottom-1 inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
          <BsChatDots size={30} />
        </button>
        <Modal
          className="justify-center flex items-center"
          open={open}
          onClose={handleClose}
        >
          <Box className="justify-center items-center">
            <button className="float-right rounded-xl" onClick={handleClose}>
              <AiOutlineClose
                fontSize={27}
                className="text-white bg-red-500 rounded-xl animate-bounce"
              />
            </button>
            <iframe
              className="mt-8 self-center"
              width={400}
              style={{ borderRadius: "10px" }}
              height={700}
              src="https://chatappripterest.netlify.app"
              frameBorder="0"
            ></iframe>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Feed;
