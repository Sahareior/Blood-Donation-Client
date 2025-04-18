import React, { useContext, useEffect } from 'react';
import { MyContext } from '../../../Provider/Myprovider';
import axios from 'axios';
import { Discuss } from 'react-loader-spinner';
import './Styles.css'

const UserConversations = ({ navigate }) => {
  const { user, conversations, setName, setConversations, activeUsers, setIsLoading, isLoading, incomingMessage } = useContext(MyContext);

  useEffect(() => {
    const fetchUserConversations = async () => {
      if (!user?.uid) return;
  
      setIsLoading(true);
      try {
        const { data: conversationsData } = await axios.get(`https://blood-donar-server-zf9x.onrender.com/user-conversations/${user.uid}`);
  
        const uniqueConversations = Array.from(
          new Map(conversationsData.map((item) => [item.participants[0].uid, item])).values()
        );
  
        const conversationsWithLastMessage = await Promise.allSettled(
          uniqueConversations.map(async (conversation) => {
            const { data: messages } = await axios.get(`https://blood-donar-server-zf9x.onrender.com/messages/${conversation._id}`);
            if (messages.length === 0) return null;
  
            const lastMessageTime = new Date(messages[messages.length - 1].createdAt).getTime();
            return { ...conversation, lastMessageTime };
          })
        );
  
        const filteredConversations = conversationsWithLastMessage
          .filter(result => result.status === 'fulfilled' && result.value !== null)
          .map(result => result.value)
          .sort((a, b) => b.lastMessageTime - a.lastMessageTime); // sort by last message time
  
        setConversations(filteredConversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUserConversations();
  }, [user?.uid, setConversations, setIsLoading]);
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Discuss
          visible={true}
          height="80"
          width="80"
          ariaLabel="discuss-loading"
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

  const getLatestMessage = (conversation) => (
    incomingMessage?.receiverId === user?.uid && incomingMessage?.conversationId === conversation._id
      ? incomingMessage.content
      : <div className="text-gray-500 italic">No new messages</div>
  );

  const hasNewMessage = (conversation) => (
    incomingMessage?.receiverId === user?.uid && incomingMessage?.conversationId === conversation._id
  );

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 px-4 py-8 pb-[calc(5rem+env(safe-area-inset-bottom))]">
  <h1 className="text-3xl  font-bold text-center mb-12 text-white tracking-wide">
    💬 Your Conversations
  </h1>

  {conversations.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 sm:px-4">
      {conversations.map((conversation) => {
        const participant = conversation.participants[0];
        return (
<div
  key={conversation._id}
  onClick={() => handleMessageClick(participant?.uid, participant?.displayName)}
  className="group md:h-[150px] h-32 relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-white/30 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.2)] transition-all duration-500 hover:scale-[1.02] rounded-3xl p-6 flex items-center gap-6 cursor-pointer overflow-hidden"
>
  {/* Premium Gradient Glow Effect */}
  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
  
  {/* Animated Border Glow */}
  <div className="absolute inset-0 rounded-3xl group-hover:ring-[3px] group-hover:ring-indigo-500/20 transition-all duration-500 pointer-events-none" />
  
  {/* Avatar with glossy effect */}
  <div className="relative">
    <img
      src={participant?.photoURL || 'https://via.placeholder.com/50'}
      alt={participant?.displayName || 'User Avatar'}
      className="w-16 h-16 rounded-full border-[3px] border-white object-cover shadow-lg group-hover:border-indigo-200 transition-all duration-300"
      loading="lazy"
    />
    <div className="absolute inset-0 rounded-full bg-white/20 pointer-events-none" />
  </div>

  <div className="flex-1 min-w-0">
    <div className="flex items-center justify-between mb-2">
      <p className="text-xl font-bold text-gray-900 truncate max-w-[70%] group-hover:text-indigo-700 transition-colors duration-300">
        {participant?.displayName || 'Anonymous User'}
      </p>
      <div className="flex items-center gap-2">
        <span
          className={`w-3.5 h-3.5 rounded-full ${
            activeUsers.includes(participant?.uid) ? 'bg-green-500' : 'bg-gray-400'
          } border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-300`}
        />
        <span className="text-xs font-medium text-gray-500">
          {activeUsers.includes(participant?.uid) ? 'Online' : 'Offline'}
        </span>
      </div>
    </div>

    <div className="relative">
      {hasNewMessage(conversation) && (
        <span className="absolute -top-3 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg animate-pulse z-10">
          New
        </span>
      )}
      <p className="text-sm text-gray-800 bg-white/90 rounded-xl px-4 md:py-3 py-1 shadow-sm hover:bg-white transition duration-300 border border-gray-100 group-hover:border-indigo-100 line-clamp-2">
        {getLatestMessage(conversation)}
      </p>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/50 to-transparent pointer-events-none rounded-b-xl" />
    </div>
  </div>
  
  {/* Shimmer effect on hover */}
  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
    <div className="absolute -inset-y-full -left-20 w-16 h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
  </div>
</div>

        );
      })}
    </div>
  ) : (
    <p className="text-center text-gray-300 italic mt-16 text-lg">
      🕊️ No conversations found. Start messaging someone now!
    </p>
  )}
</div>

  );
};

export default UserConversations;
