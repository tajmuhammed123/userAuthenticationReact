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
        
    }
}

module.exports={
    userData
}