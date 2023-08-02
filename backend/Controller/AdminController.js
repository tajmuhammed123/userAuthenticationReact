const userModal = require('../Models/userModels')
require('dotenv').config()

const useLogin=async(req,res)=>{
    try {
        console.log('hjkj');
        const {email,password}=req.body
        let exists= await UserModel.findOne({email:email})
        if(exists){
            const access = await bcrypt.compare(password,exists.password)
            console.log('exists');
            if(access){
                console.log('user logined');
                const token = jwt.sign({userId: access._id},process.env.JwtSecretKey,{expiresIn:'1m'})
                return res.status(200).json({ user:exists,token:token, message:'Login', status:true })
            }else{
                return res.status(404).json({alert:"Password is wrong", status:false})
            }
        }else{
            return res.status(201).json({alert:"No Account in this email", status:false})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const userData = async(req,res)=>{
    try {
        const data = await userModal.find({is_admin:false})
        console.log(data);
        if(data){
            res.status(200).json({status:true,data:data})
        }else{
            res.status(200).json({status:false,data:data})

        }
    } catch (error) {
        console.error(error);
    }
}

const deleteUser =async(req,res)=>{
    try {
        console.log('hjkghhj');
        const userid=req.body.userid
        console.log('user', userid);
        const deleted = await userModal.deleteOne({_id:userid})
        console.log(deleted);
        if(deleted){
            res.status(200).json({deleted:true})
        }else{
            res.status(200).json({deleted:false})
        }
    } catch (error) {
        console.error(error);
    }
}

const getUser = async(req,res)=>{
    try {
        const id = req.params.id
        const userData= await userModal.findOne({_id:id})
        if(userData){
            res.status(200).json({user:userData,status:true,message:'user found'})
        }else{
            res.status(200).json({status:false,message:'user not found'})
        }
    } catch (error) {
        console.log(error.message);
    }
}

const editUser = async(req,res)=>{
    try {
        console.log('hjkfhj');
        const {id,name,email,mob} = req.body
        await userModal.findOneAndUpdate({_id:id},{$set:{name:name,email:email,mob:mob}},{new:true}).then(response=>{
            res.json({updated:true,data:response})
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    useLogin,
    userData,
    deleteUser,
    getUser,
    editUser
}