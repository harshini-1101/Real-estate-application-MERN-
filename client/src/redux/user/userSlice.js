import { createSlice } from "@reduxjs/toolkit";
import SignIn from "../../pages/SignIn";

const initialState = {
    currentUser : null,
    loading : false,
    error: null,
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        signInStart: (state) =>{
            state.loading = true
        },
        signInSuccess: (state,action) =>{
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        signInFailure : (state, action)=>{
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;

export default userSlice.reducer;