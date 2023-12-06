import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <Login/> */}
     <Register/>
    </>
  )
}

export default App
