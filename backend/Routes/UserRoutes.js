const express=require('express')
const UserRouter=express.Router()
const UserController =require('../Controller/UserController');
const { upload } = require('../Multer');


UserRouter.post('/signup',UserController.UseReg);
UserRouter.post('/login',UserController.useLogin);
UserRouter.post('/imgupdate',upload.single('image'),UserController.updateImage);

module.exports = UserRouter