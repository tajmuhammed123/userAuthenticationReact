const express=require('express')
const UserRouter=express.Router()
const UserController =require('../Controller/UserController')


UserRouter.post('/signup',UserController.UseReg);
UserRouter.post('/login',UserController.useLogin);

module.exports = UserRouter