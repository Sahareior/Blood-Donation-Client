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
  const [name,setName] =useState("")
  const [isLoading,setIsLoading] = useState(true)

  // https://blood-donar-server-zf9x.onrender.com

  useEffect(() => {
    socket.current = io('https://blood-donar-server-zf9x.onrender.com'); // Use http:// instead of ws://
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




// console.log(conversations)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('https://blood-donar-server-zf9x.onrender.com/users');
        setUserData(res.data);
        setLoading(false)
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


  const values = {
    auth,
    user,
    userData,
    loading,
    socket,
    activeUsers,
    setLoading,
    setActiveUsers,
    conversations,
    incomingMessage,
    setIncomingMessage,
    setMessageAlert,
    name,
    setName,
    setConversations,
    isLoading,setIsLoading
 
  };

  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  );
};
