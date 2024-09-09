import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { MyContext } from '../../../Provider/Myprovider';

const UserConversations = ({ navigate }) => {
 
  const { user,conversations } = useContext(MyContext);
  


  const handleMessageClick = (donorId) => {
    const userId = user?.uid;
    navigate(`/req/conversations/message?userId=${userId}&donorId=${donorId}`);
  };

  return (
    <div className="max-w-4xl mx-auto h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">User Conversations</h1>

      {conversations.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {conversations.map((conversation) => (
            <div
              key={conversation._id}
              className="bg-white shadow-md rounded-lg border border-gray-200 flex items-center p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={conversation.participants[0].photoURL || 'https://via.placeholder.com/50'}
                alt={conversation.participants[0].displayName || 'User Avatar'}
                className="w-12 h-12 rounded-full border-2 border-green-500 mr-4"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold">{conversation.participants[0].displayName || 'User'}</p>
                <p className="text-gray-600 truncate">{conversation.latestMessage || 'No recent messages'}</p>
              </div>
              <button
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                onClick={() => handleMessageClick(conversation.participants[0].uid)}
              >
                Message
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No conversations found.</p>
      )}
    </div>
  );
};

export default UserConversations;
