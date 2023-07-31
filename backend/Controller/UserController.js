const UserModel =require('../Models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UseReg=async (req, res) => {
    try {
        console.log('user registered');
        console.log("FN : userReg");
        const {name,email,password,mob} = req.body
        const exists = await UserModel.findOne({email:email})
        if(exists){
            console.log("email already exists");
            return res.status(200).json({alert:"Email already Exists",status:false})
        }else{
            const hash = await bcrypt.hash(password,10)
            const newuser = await UserModel.create({name:name,email:email,password:hash,mob:mob,is_admin:false})
            const token = jwt.sign({ userId: newuser._id }, 'shhitssecret', { expiresIn: '1m' });
            return res.status(200).json({ token: token,user:newuser, alert:'Registred', status: true});
        }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

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
                const token = jwt.sign({userId: access._id},'shhitssecret',{expiresIn:'1m'})
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



module.exports= {
    UseReg,
    useLogin
}