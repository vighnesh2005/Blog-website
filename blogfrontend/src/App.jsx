import { useState } from 'react'
import Navbar from './components/navbar.jsx'  
import Signup from './components/signup.jsx'
import Login from './components/login.jsx'
import Dashboard from './components/dashboard.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar isLoggedIn={true}/>
    <Dashboard />
    
    </>
  )
}

export default App
