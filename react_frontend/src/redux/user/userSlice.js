import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    isLoading: false,
    error: undefined
}

const signIn = createAsyncThunk('user/signIn', async (data) => {
    try {
        console.log(data);
        const full_url = 'http://localhost:8000/api/login/';
        const res = await axios.post(full_url, data);
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
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
    }
})

export { signIn };
export default userSlice.reducer;