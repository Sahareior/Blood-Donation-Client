// MyContext.js
import React, { createContext, useEffect, useRef, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../Firebase/Firebase.config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { io } from 'socket.io-client';

// Create the context
export const MyContext = createContext();

const auth = getAuth(app); 

export const MyProvider = ({ children }) => {
  const socket = useRef()
  const [user, setUser] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [messageAlert, setMessageAlert] = useState(false)

  useEffect(() => {
    socket.current = io('http://localhost:5000'); // Use http:// instead of ws://
}, []);





useEffect(() => {
  console.log('Socket Initialized:', socket.current); // Log to ensure socket is initialized

  if (socket.current) {
    socket.current.on('connect', () => {
      console.log('Socket connected');
    });

    socket.current.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      socket.current.off('connect');
      socket.current.off('disconnect');
    };
  }
}, [socket]);



useEffect(() => {
  if (socket.current) {
    socket.current.on('getMessage', (data) => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now(),
      });
      
       // Assuming data contains sender's name
      toast.info("you have a new message!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }
}, [socket]);


useEffect(() => {
  const fetchUserConversations = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user-conversations/${user?.uid}`);
      // Get the data from the response
      const conversationsData = response.data;

      // Filter out duplicate conversations based on the uid
      const uniqueConversations = Array.from(
        new Map(
          conversationsData.map((item) => [item.participants[0].uid, item])
        ).values()
      );

      setConversations(uniqueConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  if (user?.uid) {
    fetchUserConversations();
  }
}, [user?.uid]);



  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/users');
        setUserData(res.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      console.log("logged in user inside auth state observer", loggedUser);
      setUser(loggedUser);
      setLoading(false);
   
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(messageAlert)

  const name = "sijab"; // Example static value, replace as needed
  const values = {
    auth,
    name,
    user,
    userData,
    loading,
    socket,
    activeUsers,
    setActiveUsers,
    conversations,
    incomingMessage,
    setIncomingMessage,
    setMessageAlert
 
  };

  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  );
};
