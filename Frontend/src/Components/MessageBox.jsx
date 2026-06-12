import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { IoIosSearch } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import Message from './Message';
import axios from 'axios';
import { MESSAGE_API_ENDPOINT } from '@/utils/api';
import socket from '@/utils/socket';

const MessageBox = () => {
  const convo = useSelector(store => store.conversation.convo);
  const user = useSelector(store => store.auth.user);
  const onlineUsers = useSelector(store => store.auth.onlineUsers);
  
  const receiverId = convo?._id;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef();
  const messagesEndRef = useRef();

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (!receiverId) return;

    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${MESSAGE_API_ENDPOINT}/${receiverId}`, {
          withCredentials: true
        });

        if (res?.data?.success) {
          setMessages(res.data.messages || []);
        }
      } catch (error) {
        console.log('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [receiverId]);

  // Socket event handlers
  useEffect(() => {
    // Handle incoming messages
    const handleNewMessage = (newMessage) => {
      // Only add if it's from the current conversation
      if (newMessage.senderId === receiverId || 
          (newMessage.senderId._id && newMessage.senderId._id === receiverId)) {
        setMessages(prev => {
          // Check for duplicates
          const isDuplicate = prev.some(msg => msg._id === newMessage._id);
          if (isDuplicate) return prev;
          return [...prev, newMessage];
        });
      }
    };

    // Handle message sent confirmation (for sender's other devices)
    const handleMessageSent = (sentMessage) => {
      if (sentMessage.receiverId === receiverId) {
        setMessages(prev => {
          const isDuplicate = prev.some(msg => msg._id === sentMessage._id);
          if (isDuplicate) return prev;
          return [...prev, sentMessage];
        });
      }
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("messageSent", handleMessageSent);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messageSent", handleMessageSent);
    };
  }, [receiverId]);

  const changeEventHandler = (e) => {
    setInput(e.target.value);
  };

  const sendHandler = async () => {
    const messageText = input.trim();
    if (!messageText || !receiverId) return;

    // Clear input immediately for better UX
    setInput("");

    try {
      const res = await axios.post(
        `${MESSAGE_API_ENDPOINT}/send/${receiverId}`, 
        { message: messageText }, 
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      if (res?.data?.success) {
        // Only add message if socket hasn't already added it
        setMessages(prev => {
          const isDuplicate = prev.some(msg => msg._id === res.data.newMessage._id);
          if (isDuplicate) return prev;
          return [...prev, res.data.newMessage];
        });
      }
    } catch (error) {
      console.log('Error sending message:', error);
      // Optionally show error to user
    }
  };

  // Key press handler for Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendHandler();
    }
  };

  // Render empty state when no conversation is selected
  if (!convo) {
    return (
      <div className='m-2 flex-1 flex items-center justify-center h-[90vh] max-w-full flex-col gap-2 border-gray-200 shadow-lg border rounded-t-2xl rounded-b-2xl'>
        <div>
          <img 
            src="https://cultureofyes.ca/wp-content/uploads/2020/04/chit-chat.png" 
            alt="logo" 
            className='w-50' 
          />
        </div>
        <div>
          <h1 className='text-2xl font-semibold text-center'>No conversation Selected</h1>
          <p className='text-md text-gray-400 text-center'>You can view your conversations on the sidebar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-[90vh] max-w-full m-2 bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center gap-4">
          {convo?.profilePhoto ? (
            <img
              src={convo?.profilePhoto}
              alt="profile"
              className="w-9 h-9 rounded-full object-cover cursor-pointer"
            />
          ) : (
            <div className="w-10 h-10 text-lg rounded-full bg-green-500 text-white flex items-center justify-center font-semibold cursor-pointer">
              {convo?.fullName?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              {convo?.fullName}
            </h1>
            <p className={`text-sm ${onlineUsers.includes(convo._id) ? 'text-green-500' : 'text-gray-500'}`}>
              {onlineUsers.includes(convo._id) ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200">
            <IoIosSearch size={22} />
          </button>
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200">
            <BsThreeDotsVertical size={22} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-200 px-4 py-3">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const senderId = String(msg.senderId?._id || msg.senderId);
            const currentUserId = String(user?._id);
            
            return (
              <Message
                key={msg._id || index}
                message={msg.message}
                messanger={senderId === currentUserId ? "sender" : "receiver"}
                timestamp={msg.createdAt}
              />
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-3 flex items-center gap-3 border-t border-gray-200">
        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200">
          <GrGallery size={20} className="text-gray-700" />
        </button>

        <input
          name='message_text'
          onChange={changeEventHandler}
          onKeyPress={handleKeyPress}
          value={input}
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />

        <button 
          onClick={sendHandler}
          disabled={!input.trim()}
          className={`p-3 rounded-full transition-all duration-200 shadow-md ${
            input.trim() 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          <IoMdSend size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default MessageBox;