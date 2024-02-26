import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    newUser: {},
    isLoading: false,
    error: undefined
}

const url = 'http://localhost:8000/api/';
const signIn = createAsyncThunk('user/signIn', async (data) => {
    try {
        console.log(data);
        const full_url = `${url}login/`;
        const res = await axios.post(full_url, data);
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
});

const user = localStorage.getItem('user');
let token = '';
if (user) {
	token = JSON.parse(user).access_token;
} else {
	token = '';
}

const headers = {
    Authorization: `Bearer ${token}`,
};

const signUp = createAsyncThunk('user/signUp', async (data) => {
    try {
        const full_url = `${url}users/`;
        const res = await axios.post(full_url, data);
        return res.data;
    } catch (error ) {
        return error.message;
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(signIn.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(signIn.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            console.log('Working');
            // const userInfo = {
            //     user: action.payload.user,
            //     token: action.payload.access
            // }

            // localStorage.setItem('user', JSON.stringify(userInfo));
            // console.log(action.payload.user);
            // console.log(action.payload.access);
        })
        .addCase(signIn.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            console.log('Error');
        })
        .addCase(signUp.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(signUp.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newUser = action.payload;
            console.log(action.payload);
        })
        .addCase(signUp.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export { signIn, signUp };
export default userSlice.reducer;