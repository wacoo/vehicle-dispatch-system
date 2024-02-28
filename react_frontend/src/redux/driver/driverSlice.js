import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    newDriver: {},
    isLoading: false,
    error: undefined
}

const url = 'http://localhost:8000/api/';

const user = localStorage.getItem('user');
let token = '';
if (user) {
	token = JSON.parse(user).token;
} else {
	token = '';
}

const headers = {
    Authorization: `Bearer ${token}`,
};

const createDriver = createAsyncThunk('driver/createDriver', async (data) => {
    console.log('Token: ',token);
    try {
        const full_url = `${url}drivers/`;
        const res = await axios.post(full_url, data);
        return res.data;
    } catch (error ) {
        return error.message;
    }
});

const driverSlice = createSlice({
    name: 'driver',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createDriver.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(createDriver.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newDriver = action.payload;
            console.log(action.payload);
        })
        .addCase(createDriver.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export {createDriver };
export default driverSlice.reducer;