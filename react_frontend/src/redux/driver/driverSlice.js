import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    driver: {},
    drivers: [],
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
const full_url = `${url}drivers/`;
const fetchDrivers = createAsyncThunk('drivers/fetchDrivers', async() => {
    try {
        const res = await axios.get(full_url);
        return res.data;
    } catch(error) {
        return error.message;
    }
});

const fetchDriver = createAsyncThunk('drivers/fetchDriver', async(id) => {
    try {
        const res = await axios.get(`${full_url}/${id}/`);
        return res.data;
    } catch(error) {
        return error.message;
    }
});

const createDriver = createAsyncThunk('drivers/createDriver', async (data) => {
    console.log('Token: ',token);
    try {
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
        .addCase(fetchDrivers.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchDrivers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.drivers = action.payload;
            console.log(action.payload);
        })
        .addCase(fetchDrivers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(fetchDriver.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchDriver.fulfilled, (state, action) => {
            state.isLoading = false;
            state.driver = action.payload;
            console.log(action.payload);
        })
        .addCase(fetchDriver.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export {createDriver, fetchDrivers, fetchDriver };
export default driverSlice.reducer;