import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'user',
    initialState:{
        isAuth:false,
        user:{
            id:"",
            FullName:"",
            Email:"",
            Password:"",
            Phone:"",
        },
        token:"",
    },
    reducers:{
        login:(state,action) => {
            state.user = {...action.payload.user};
            state.isAuth = true;
            state.token = action.payload.token;
        },
        set:(state,action) => {
            state.user = {...action.payload.user};
            state.isAuth = true;
        },
        logout:(state) => {
            state.user = {
                id:"",
                fullName:"",
                email:"",
                password:"",
            };
            state.isAuth = false;
            state.token = "";
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;