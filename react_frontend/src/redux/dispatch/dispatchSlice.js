import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    dispatches: [],
    newDispatch: {},
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
const full_url = `${url}dispatches/`;
const fetchDispatches = createAsyncThunk('dispatches/fetchDispatches', async() => {
    try {
        const res = await axios.get(full_url);
        return res.data;
    } catch(error) {
        return error.message;
    }
});

const createDispatch = createAsyncThunk('dispatches/createDispatch', async (data) => {
    // console.log('Token: ',token);
    try {
        
        console.log(data);
        const res = await axios.post(full_url, data);
        // console.log(data);
        return res.data;
    } catch (error ) {
        return error.message;
    }
});

const dispatchSlice = createSlice({
    name: 'dispatches',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createDispatch.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(createDispatch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newDispatch = action.payload;
            console.log(action.payload);
        })
        .addCase(createDispatch.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(fetchDispatches.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchDispatches.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dispatches = action.payload;
            console.log(action.payload);
        })
        .addCase(fetchDispatches.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export {createDispatch, fetchDispatches };
export default dispatchSlice.reducer;