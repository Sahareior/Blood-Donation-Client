import React, { useContext } from 'react';
import { MyContext } from '../Provider/Myprovider';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';

const About = () => {
    const { auth, setUser } = useContext(MyContext);
    const provider = new GoogleAuthProvider();

    const handleLogin = async () => {
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
            console.log(user);

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

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default About;
