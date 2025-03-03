import React from "react";

const Notification = ({ message, type }) => {
  if (!message) return null;

  const notificationStyle = {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    color: type === "success" ? "green" : "red",
    border: `1px solid ${type === "success" ? "green" : "red"}`,
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;