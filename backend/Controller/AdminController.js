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

module.exports={
    userData,
    deleteUser
}