import React, { useContext } from 'react';
import { MyContext } from '../Provider/Myprovider';
import { signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";
import axios from 'axios';

const Registration = () => {
    const { auth } = useContext(MyContext);
    const provider = new GoogleAuthProvider();

    const handleLogin = async () => {
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
          

            // Post user data to the backend
            const userData = {
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                phoneNumber: user.phoneNumber,
                uid: user.uid
            };

            await axios.post('http://localhost:5000/user', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('User data posted successfully');
        } catch (error) {
            console.error('Error during login or posting user data:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        
            console.log('User logged out successfully');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout} >Logout</button>
        </div>
    );
};

export default Registration;
