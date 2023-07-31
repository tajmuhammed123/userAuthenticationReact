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
