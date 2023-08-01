import {Routes,Route} from "react-router-dom"

import React from "react"

import Login from '../Pages/User/Login'
import Signup from '../Pages/User/SignUp'
import Home from '../Pages/User/Home'
import Profile from '../Pages/User/Profile'
import UserPublic from './UserPublic'

function UserRoutes() {
  return (
    <Routes>
        <Route path="/profile" element={<Profile /> }/>
        <Route path="/login" element={<UserPublic> <Login /></UserPublic> }/>
        <Route path="/signup" element={<Signup /> }/>
        <Route path="/" element={<Home /> }/>
    </Routes>
  )
}

export default UserRoutes