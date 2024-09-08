// MyContext.js
import React, { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../Firebase/Firebase.config';
import axios from 'axios';

// Create the context
export const MyContext = createContext();

const auth = getAuth(app); 

export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
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
 
  };

  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  );
};
