import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    vehicles: [],
    newVehicle: {},
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
const full_url = `${url}vehicles/`;
const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async() => {
    try {
        const res = await axios.get(full_url);
        return res.data;
    } catch(error) {
        return error.message;
    }
});

const createVehicle = createAsyncThunk('vehicles/createVehicle', async (data) => {
    console.log('Token: ',token);
    try {
        const res = await axios.post(full_url, data);
        return res.data;
    } catch (error ) {
        return error.message;
    }
});

const vehicleSlice = createSlice({
    name: 'vehicles',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createVehicle.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(createVehicle.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newVehicle = action.payload;
            console.log(action.payload);
        })
        .addCase(createVehicle.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(fetchVehicles.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchVehicles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.vehicles = action.payload;
            console.log(action.payload);
        })
        .addCase(fetchVehicles.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export {createVehicle, fetchVehicles };
export default vehicleSlice.reducer;