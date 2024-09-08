// MyContext.js
import React, { createContext, useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { app } from '../Firebase/Firebase.config';
import axios from 'axios';

// Create the context
export const MyContext = createContext();

const auth = getAuth(app); 

export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize as null
  const [userData, setUserData] = useState([]);

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

  const name = "sijab"; // Example static value, replace as needed
  const values = {
    auth,
    name,
    user,
    setUser,
    userData
  };

  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  );
};
