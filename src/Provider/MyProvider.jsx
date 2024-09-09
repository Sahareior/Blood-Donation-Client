// MyContext.js
import React, { createContext, useEffect, useRef, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../Firebase/Firebase.config';
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

  const name = "sijab"; // Example static value, replace as needed
  const values = {
    auth,
    name,
    user,
    userData,
    loading,
    socket,
    activeUsers,
    setActiveUsers
 
  };

  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  );
};
