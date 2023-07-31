const express=require('express')
const AdminRouter=express.Router()
const AdminController =require('../Controller/AdminController')

AdminRouter.get('/getusers',AdminController.userData)

module.exports = AdminRouter