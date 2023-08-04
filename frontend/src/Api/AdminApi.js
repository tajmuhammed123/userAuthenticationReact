import axios from 'axios'

const adminApi = axios.create({
    baseURL:`http://localhost:4000/admin`
})
adminApi.interceptors.request.use((req) => {
    if (localStorage.getItem("admintoken")) {
        console.log("intersrptor");
        req.headers.Authorization = "Bearer" + localStorage.getItem("admintoken");
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

export async function deleteUser(userid){
    try {
        console.log(userid);
        const data = await adminApi.post('/deleteuser',{userid})
        console.log(data);
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export async function editUserData(id,name,email,mob){
    try {
        const data= await adminApi.post('/updateuser',{id,name,email,mob})
        return data
    } catch (error) {
        console.log(error.message);
    }
}
export async function userDetails(userid){
    try {
        const userdetails = await adminApi.get(`/userdetails/${userid}`)
        return userdetails
    } catch (error) {
        console.log(error.message);
    }
}

export async function AddUser(credentials){
    try {
       const data = await adminApi.post('/adduser',credentials)
       return data
    } catch (error) {
       console.log(error);
    }
}