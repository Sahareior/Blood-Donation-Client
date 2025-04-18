import { useContext, useEffect, useState } from 'react'

import './App.css'
import MainLayout from './Component/MainLayout'
import { MyContext } from './Provider/MyProvider'

function App() {
  const { userData, user,activeUsers,setName,setActiveUsers,socket,setIsLoading,isLoading} = useContext(MyContext);

  useEffect(() => {
    const handleConnect = () => {
      if (user?.uid && socket.current) {
        socket.current.emit('addUser', user);
      }
    };
  
    const handleGetUsers = (users) => {
      setActiveUsers(users.map(user => user.uid)); // or just setActiveUsers(users) if you want full user data
      setIsLoading(false);
    };
  
    if (socket.current) {
      socket.current.on('connect', handleConnect);
      socket.current.on('getUsers', handleGetUsers);
      
      // If socket is already connected and not waiting for 'connect'
      if (socket.current.connected && user?.uid) {
        socket.current.emit('addUser', user);
      }
    }
  
    return () => {
      if (socket.current) {
        socket.current.off('connect', handleConnect);
        socket.current.off('getUsers', handleGetUsers);
      }
    };
  }, [user?.uid]);
  


  return (
 <div>
  <MainLayout />
 </div>
  )
}

export default App
