import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useContext } from 'react';
// Import Google icon (you can use React Icons or an SVG for the Google icon)
import { FcGoogle } from 'react-icons/fc'; 
import { MyContext } from '../../../Provider/Myprovider';
import axios from 'axios';

const UserLogin = ({navigate}) => {
  const { auth,user } = useContext(MyContext);
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

            await axios.post('https://blood-donar-server-production.up.railway.app/user', userData, {
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

  const handleMessageClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    {
      !user? (  <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-36 flex justify-center mx-auto py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 mb-4"
          >
            Log In
          </button>
        </form>

        {/* Sign in with Google button */}
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-900 transition duration-300 flex items-center justify-center space-x-2"
        >
          <FcGoogle className="text-2xl" /> 
          <span>Sign in with Google</span>
        </button>

        <p className="text-sm text-gray-500 text-center mt-6">
  Don't have an account? 
  <a href="#" className="inline-block">
    <button
      className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
      onClick={() => handleMessageClick()}
    >
      Sign Up
    </button>
  </a>
</p>

      </div>):(
        <div className='text-4xl flex justify-center items-center'>Thanks For Joining!</div>
      )
    }
    </div>
  );
};

export default UserLogin;
