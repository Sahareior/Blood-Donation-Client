import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';
import { MyContext } from '../../../../Provider/MyProvider';

const Message = ({ queryParams }) => {
  const { socket } = useContext(MyContext);
  const userId = queryParams?.userId;
  const donorId = queryParams?.donorId;
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState(null);
  
  // Reference to the message container
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('getMessage', (data) => {
        setIncomingMessage({
          ...data,
          createdAt: Date.now(),
        });
      });
    }
  }, [socket]);

  console.log(incomingMessage);

  // Scroll to the bottom of the message container
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when messages change
  }, [messages]);

  // Fetch or create conversation
  useEffect(() => {
    const getOrCreateConversation = async () => {
      try {
        const res = await axios.get('http://localhost:5000/conversations', {
          params: { userId, donorId },
        });

        if (res.data) {
          setConversationId(res.data._id);
          console.log('Existing conversation found:', res.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          try {
            const response = await axios.post('http://localhost:5000/conversations', { userId, donorId });
            setConversationId(response.data._id);
            console.log('New conversation created:', response.data);
          } catch (err) {
            console.error('Error creating conversation:', err);
          }
        } else {
          console.error('Error fetching conversation:', error);
        }
      }
    };

    if (userId && donorId && !conversationId) {
      getOrCreateConversation();
    }
  }, [conversationId, userId, donorId]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Fetch messages after conversationId is set
  useEffect(() => {
    const fetchMessages = async () => {
      if (conversationId) {
        try {
          const response = await axios.get(`http://localhost:5000/messages/${conversationId}`);
          setMessages(response.data);
          console.log('Fetched messages:', response.data);
        } catch (err) {
          console.error('Error fetching messages:', err);
        }
      }
    };

    fetchMessages();
  }, [conversationId]);

  const handleSendMessage = async () => {
    if (input.trim() && conversationId) {
      try {
        const message = {
          conversationId,
          senderId: userId,
          content: input,
          receiverId: donorId,
        };

        socket.current.emit('sendMessage', message);

        const response = await axios.post('http://localhost:5000/messages', message);
        const newMessage = response.data;

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput('');
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  useEffect(() => {
    incomingMessage &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage]);

  return (
    <div className="flex flex-col h-[530px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-green-600 text-white">
        <div>
          <h2 className="text-lg font-semibold">Chat with Yusuf</h2>
          <p className="text-sm text-gray-200">Online</p>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        {messages?.map((message) => (
          <div
            key={message._id}
            className={`flex mb-4 ${message.senderId === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                message.senderId === userId ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
            >
              {message.content}
              <div ref={messageEndRef} />
            </div>
          </div>
        ))}
       
       
      </div>

      {/* Input Area */}
      <div className="flex items-center p-4 bg-white border-t border-gray-200">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
        >
          <FiSend size={24} />
        </button>
      </div>
    </div>
  );
};

export default Message;
