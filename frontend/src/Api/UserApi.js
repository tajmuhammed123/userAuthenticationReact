import axios from 'axios'

const userApi = axios.create({
    baseURL:`http://localhost:4000`
})
userApi.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        console.log("intersrptor");
        req.headers.Authorization = "Bearer" + localStorage.getItem("token");
    }
    console.log("not the if of interseptor");
    return req; 
});
export async function RegUser(credentials){
    try {
       const data = await userApi.post('/signup',credentials)
       return data
    } catch (error) {
       console.log(error);
    }
}

export async function UserLogin(details){
    try{
        const data = await userApi.post("/login",details)
        return data
    }catch(err){
        console.log(err);
    }
}
export async function UpdateImage(id,img){
    try{
        const formData= new FormData()
        formData.append('image',img)
        formData.append('userId',id)
        const config={
            header:{
                'content-type':'multipart/form-data',
                userId : id
            },WithCreadentials:true
        }
        const data = await userApi.post("/imgupdate",formData,config)
        return data
    }catch(err){
        console.log(err);
    }
}
