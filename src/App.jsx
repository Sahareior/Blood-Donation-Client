import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainLayout from './Component/MainLayout'
import { MyContext } from './Provider/MyProvider'

function App() {
  const { userData, user, socket,setActiveUsers } = useContext(MyContext);

  useEffect(() => {
    if (socket.current) {
      socket.current.emit('addUser', user);

      socket.current.on('getUsers', (users) => {
        setActiveUsers(users.map(user => user.uid)); 
      });
    }

  
    return () => {
      if (socket.current) {
        socket.current.off('getUsers');
      }
    };
  }, [user, socket]);
  return (
 <div>
  <MainLayout />
 </div>
  )
}

export default App
