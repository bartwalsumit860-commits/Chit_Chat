import React from 'react';

const Message = ({ message, messanger, timestamp }) => {

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${messanger === "sender" ? 'justify-end' : 'justify-start'} mb-4`}>
      {messanger === "receiver" && (
        <div className="max-w-[70%] bg-white p-3 rounded-2xl rounded-bl-none shadow-sm">
          <p className="text-gray-800">{message}</p>
          {timestamp && (
            <p className="text-xs text-gray-400 mt-1 text-right">
              {formatTime(timestamp)}
            </p>
          )}
        </div>
      )}

      {messanger === "sender" && (
        <div className="max-w-[70%] bg-green-500 text-white p-3 rounded-2xl rounded-br-none shadow-sm">
          <p>{message}</p>
          {timestamp && (
            <p className="text-xs text-green-100 mt-1 text-right">
              {formatTime(timestamp)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;