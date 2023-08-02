import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../Pages/Admin/AdminHome'
import EditUser from '../Pages/Admin/EditUser'
import AdminProtect from './AdminProtect'
import AdminLogin from '../Pages/Admin/AdminLogin'
import AdminPublic from './AdminPublic'

function AdminRoutes() {
  return (
    <Routes>
        <Route path="/login" element={<AdminPublic> <AdminLogin /></AdminPublic> }/>
        <Route path="/home" element={<AdminProtect> <AdminHome /></AdminProtect> }/>
        <Route path="/edituser/:id" element={<AdminProtect> <EditUser /></AdminProtect> }/>
    </Routes>
  )
}

export default AdminRoutes