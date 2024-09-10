import { useContext, useEffect, useState } from 'react'

import './App.css'
import MainLayout from './Component/MainLayout'
import { MyContext } from './Provider/MyProvider'

function App() {
  const { userData, user, socket } = useContext(MyContext);


  return (
 <div>
  <MainLayout />
 </div>
  )
}

export default App
