import React, { useContext } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { MyContext } from '../../../Provider/Myprovider';
import { Card, Input, Button, Typography, Divider } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { RiDropFill } from 'react-icons/ri';

const { Title, Text } = Typography;

const UserLogin = ({ navigate }) => {
  const { auth, user } = useContext(MyContext);
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        phoneNumber: user.phoneNumber,
        uid: user.uid,
      };

      await axios.post('https://blood-donar-server-zf9x.onrender.com/user', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
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
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 px-4">
      {!user ? (
        <Card 
          className="w-full max-w-md shadow-2xl rounded-xl border-0 overflow-hidden" 
          bordered={false}
          headStyle={{ border: 0 }}
          bodyStyle={{ padding: '32px' }}
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 to-red-800"></div>
          
          <div className="flex flex-col items-center mb-6">
            <RiDropFill className="text-4xl text-red-600 mb-2" />
            <Title level={2} className="text-center mb-0 text-red-800 font-bold">
              Blood Donor Portal
            </Title>
            <Text type="secondary" className="text-gray-600">Sign in to save lives</Text>
          </div>

          <div className="space-y-4">
            <Input
              size="large"
              placeholder="Enter your email"
              prefix={<MailOutlined className="text-red-500" />}
              className="rounded-lg hover:border-red-300 focus:border-red-500"
            />
            <Input.Password
              size="large"
              placeholder="Enter your password"
              prefix={<LockOutlined className="text-red-500" />}
              className="rounded-lg hover:border-red-300 focus:border-red-500"
            />
            <Button
              type="primary"
              size="large"
              block
              className="bg-red-600 hover:bg-red-700 transition-all duration-300 h-10 rounded-lg font-semibold border-0 shadow-md"
            >
              Log In
            </Button>
          </div>

          <Divider className="text-gray-400 before:bg-gray-300 after:bg-gray-300">or</Divider>

          <div className="mb-6">
            <Button
              onClick={handleLogin}
              size="large"
              block
              className="flex items-center justify-center gap-2 border border-gray-300 hover:border-red-300 hover:text-red-600 transition-all duration-300 h-10 rounded-lg font-medium"
              icon={<FcGoogle className="text-xl" />}
            >
              Continue with Google
            </Button>
          </div>

          <div className="text-center">
            <Text type="secondary" className="text-gray-600">Don't have an account?</Text>
            <Button
              type="link"
              className="ml-2 text-red-600 hover:text-red-800 font-medium p-0 h-auto"
              onClick={handleMessageClick}
            >
              Register now
            </Button>
          </div>
        </Card>
      ) : (
        <div className="text-center p-8 bg-white rounded-xl shadow-xl max-w-md">
          <RiDropFill className="text-5xl text-red-600 mx-auto mb-4" />
          <Title level={3} className="text-red-800 mb-2">
            Thank you for joining!
          </Title>
          <Text className="text-gray-600">
            Your registration helps save lives. Check your dashboard to find donation opportunities.
          </Text>
        </div>
      )}
    </div>
  );
};

export default UserLogin;