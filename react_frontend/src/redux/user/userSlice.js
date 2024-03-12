import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    users: [],
    newUser: {},
    isLoading: false,
    error: undefined
};

const url = 'http://localhost:8000/api/';
const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
const headers = {
    Authorization: `Token cadc4c960307899070d09ede289b87bba64ba158`,
};

const signIn = createAsyncThunk('user/signIn', async (data) => {
    try {
        const full_url = `${url}login/`;
        const res = await axios.post(full_url, data);
        return res.data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
});

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const full_url = `${url}users/`;
        const res = await axios.get(full_url, { headers });
        return res.data;
    } catch (error) {
        return error.message;
    }
});

const signUp = createAsyncThunk('users/signUp', async (data) => {
    try {
        console.log(headers.Authorization);
        const full_url = `${url}users/`;
        const res = await axios.post(full_url, data, { headers });
        return res.data;
    } catch (error) {
        return error.message;
    }
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(signUp.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.newUser = action.payload;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUsers.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export { signIn, signUp, fetchUsers };
export default userSlice.reducer;