import React from "react";

const Message = ({
  message,
  messanger,
  timestamp
}) => {

  const time = timestamp
    ? new Date(timestamp)
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
    : "";

  return (
    <div
      className={`flex mb-3 ${
        messanger === "sender"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl shadow ${
          messanger === "sender"
            ? "bg-green-500 text-white rounded-br-none"
            : "bg-white text-black rounded-bl-none"
        }`}
      >
        <p>{message}</p>

        <p
          className={`text-xs mt-1 text-right ${
            messanger === "sender"
              ? "text-green-100"
              : "text-gray-400"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
};

export default Message;