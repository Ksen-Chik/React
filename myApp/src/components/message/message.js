import React from "react";

export const Message = ({ text, onClick, id }) => {
  const handleClick = () => {
    onClick(id);
  }
  return <div onClick={handleClick}>{text}</div>;
};