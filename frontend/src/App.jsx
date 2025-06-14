import React from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import { useContext } from 'react'
import { UserDataContext } from './context/UserContext'
import Network from './pages/Network'
import Notification from './pages/Notification'

function App() {
  let {userData} = useContext(UserDataContext)
  return (
    <Routes>
      <Route path='/' element={userData?<Home/>:<Navigate to="/login"/>} />
      <Route path='/login' element={userData?<Navigate to="/" /> : <Login/>} /> 
      <Route path='/network' element={userData?<Network /> : <Navigate to="/login"/>} /> 
      <Route path='/profile' element={userData?<Profile /> : <Navigate to="/login"/>} /> 
      <Route path='/notification' element={userData?<Notification /> : <Navigate to="/login"/>} /> 
      <Route path='/signUp' element={userData?<Navigate to="/" /> : <SignUp/>} /> 
    </Routes>
  )
}

export default App
