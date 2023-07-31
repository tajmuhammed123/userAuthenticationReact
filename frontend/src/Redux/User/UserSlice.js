import { createSlice } from "@reduxjs/toolkit";

const initialState={
    id:'',
    name:'',
    email:'',
    mob:'',
    is_admin:''

}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            state.id= action.payload.id
            state.name= action.payload.name
            state.email= action.payload.email
            state.mob= action.payload.mob
            state.is_admin=action.payload.is_admin
        },

        logOutUser:(state,action)=>{
            state.id= ""
            state.name=""
            state.email=""
            state.mob=""
            state.is_admin=""
        }
    }
})

export const {setUserDetails, logOutUser}= userSlice.actions;

export default userSlice.reducer;