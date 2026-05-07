import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Todo from './components/Todo'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <div className='bg-orange-300 min-h-screen flex justify-center pt-20 p-4'>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<SignUp />} />

        <Route path="/login" element={<Login />} />

        <Route path="/tasks" element={<Todo />} />

      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App