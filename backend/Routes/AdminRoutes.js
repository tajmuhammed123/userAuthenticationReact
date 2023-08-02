const express=require('express')
const AdminRouter=express.Router()
const AdminController =require('../Controller/AdminController')


AdminRouter.post('/login',AdminController.useLogin)
AdminRouter.get('/getusers',AdminController.userData)
AdminRouter.post('/deleteuser',AdminController.deleteUser)
AdminRouter.post('/updateuser',AdminController.editUser)
AdminRouter.get('/userdetails/:id',AdminController.getUser)

module.exports = AdminRouter