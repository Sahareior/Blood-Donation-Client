import React, { useContext, useEffect } from 'react';
import { MyContext } from '../../../Provider/Myprovider';
import axios from 'axios';
import { Discuss } from 'react-loader-spinner';

const UserConversations = ({ navigate }) => {
  const { user, conversations, setName, setConversations, setIsLoading, isLoading, incomingMessage } = useContext(MyContext);

  useEffect(() => {
    const fetchUserConversations = async () => {
      try {
        const response = await axios.get(`https://blood-donar-server-production.up.railway.app/user-conversations/${user?.uid}`);
        // Get the data from the response
        const conversationsData = response.data;

        // Filter out duplicate conversations based on the uid
        const uniqueConversations = Array.from(
          new Map(
            conversationsData.map((item) => [item.participants[0].uid, item])
          ).values()
        );

        setConversations(uniqueConversations);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    if (user?.uid) {
      fetchUserConversations();
    }
  }, [user?.uid]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Discuss
          visible={true}
          height="80"
          width="80"
          ariaLabel="discuss-loading"
          wrapperStyle={{}}
          wrapperClass="discuss-wrapper"
          color="#fff"
          backgroundColor="#F4442E"
        />
      </div>
    );
  }

  const handleMessageClick = (donorId, name) => {
    setName(name);
    const userId = user?.uid;
    navigate(`/req/conversations/message?userId=${userId}&donorId=${donorId}`);
  };

  const getLatestMessage = (conversation) => {
    // Check if there's an incoming message for the current user
    if (incomingMessage?.receiverId === user?.uid && incomingMessage?.conversationId === conversation._id) {
      return incomingMessage.content;
    } else {
      return <div className='text-slate-900'>No new Message</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto overflow-y-auto h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">User Conversations</h1>

      {conversations.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {conversations.map((conversation) => {
            const participant = conversation.participants[0];

            return (
              <div
                key={conversation._id}
                onClick={() => handleMessageClick(participant?.uid, participant?.displayName)}
                className="bg-white shadow-md rounded-lg border border-gray-200 flex items-center p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <img
                  src={participant?.photoURL || 'https://via.placeholder.com/50'}
                  alt={participant?.displayName || 'User Avatar'}
                  className="w-12 h-12 rounded-full border-2 border-green-500 mr-4"
                  loading="lazy"
                />
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {participant?.displayName || 'Anonymous User'}
                  </p>
                  <p className="text-red-500 text-bold text-xl shadow-md truncate">
                    {getLatestMessage(conversation)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No conversations found.</p>
      )}
    </div>
  );
};

export default UserConversations;
