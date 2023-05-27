import React from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";

export const Card = ({ title, poster }) => {
  return (
    <div className="hover:shadow-lg hover:opacity-75 relative">
      <img src={poster} alt={title} className="relative top-0 left-0"/>
      <div className="text-[8rem] absolute z-10 top-0 left-0  opacity-0 hover:opacity-100 h-full w-full flex justify-center items-center">
      <AiOutlinePlayCircle  />
      </div>
    </div>
  );
};
