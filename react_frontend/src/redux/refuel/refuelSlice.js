import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    refuels: [],
    newRefuel: {},
    isLoading: false,
    error: undefined
}

const url = 'http://localhost:8000/api/';

const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
const headers = {
    Authorization: `Bearer ${token}`,
};

const full_url = `${url}refuels/`;
const fetchRefuels = createAsyncThunk('refuels/fetchRefuels', async() => {
    try {
        const res = await axios.get(full_url);
        return res.data;
    } catch(error) {
        return error.message;
    }
});

// const fetchDriver = createAsyncThunk('drivers/fetchDriver', async(id) => {
//     try {
//         const res = await axios.get(`${full_url}/${id}/`);
//         return res.data;
//     } catch(error) {
//         return error.message;
//     }
// });

const createRefuel = createAsyncThunk('refuels/createRefuel', async (data) => {
    console.log('Data: ',data);
    try {
        const res = await axios.post(full_url, data);
        return res.data;
    } catch (error ) {
        return error.message;
    }
});

const refuelSlice = createSlice({
    name: 'refuels',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createRefuel.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(createRefuel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newRefuel = action.payload;
            // console.log(action.payload);
        })
        .addCase(createRefuel.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(fetchRefuels.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchRefuels.fulfilled, (state, action) => {
            state.isLoading = false;
            state.refuels = action.payload;
            console.log(action.payload);
        })
        .addCase(fetchRefuels.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        // .addCase(fetchDriver.pending, (state, action) => {
        //     state.isLoading = true;
        // })
        // .addCase(fetchDriver.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.driver = action.payload;
        //     console.log(action.payload);
        // })
        // .addCase(fetchDriver.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.error.message;
        // })
    }
})

export {createRefuel, fetchRefuels};
export default refuelSlice.reducer;