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
        console.log(res.data);
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
            console.log(action.payload);
        })
        .addCase(signIn.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export { signIn };
export default userSlice.reducer;