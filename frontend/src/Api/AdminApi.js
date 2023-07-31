import axios from 'axios'

const adminApi = axios.create({
    baseURL:`http://localhost:4000/admin`
})
adminApi.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        console.log("intersrptor");
        req.headers.Authorization = "Bearer" + localStorage.getItem("token");
    }
    console.log("not the if of interseptor");
    return req; 
});

export async function getUsers(){
    try {
       const data = await adminApi.get('/getusers')
       console.log(data);
       return data
    } catch (error) {
      console.log(error.message);
    }
  }