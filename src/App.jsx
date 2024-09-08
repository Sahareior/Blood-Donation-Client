import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainLayout from './Component/MainLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
 <div>
  <MainLayout />
 </div>
  )
}

export default App
