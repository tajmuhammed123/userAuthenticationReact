import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../Pages/Admin/AdminHome'
import AdminProtect from './AdminProtect'

function AdminRoutes() {
  return (
    <Routes>
        <Route path="/home" element={<AdminProtect> <AdminHome /></AdminProtect> }/>
    </Routes>
  )
}

export default AdminRoutes