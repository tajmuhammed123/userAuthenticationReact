const userModal = require('../Models/userModels')

const userData = async(req,res)=>{
    try {
        console.log('ghgfh');
        const data = await userModal.find({is_admin:false})
        console.log('ghgfh');
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
    userData,
    deleteUser,
    getUser,
    editUser
}