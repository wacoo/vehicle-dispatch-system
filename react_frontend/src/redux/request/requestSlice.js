import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    requests: [],
    newRequest: {},
    updatedRequest: {},
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
const full_url = `${url}requests/`;
const fetchRequests = createAsyncThunk('requests/fetchRequests', async() => {
    try {
        const res = await axios.get(full_url);
        return res.data;
    } catch(error) {
        return error.message;
    }
});

const createRequest = createAsyncThunk('requests/createRequest', async (data) => {
    console.log('Token: ',token);
    try {
        const res = await axios.post(full_url, data);
        console.log(data);
        return res.data;
    } catch (error ) {
        return error.message;
    }
});

const updateRequest = createAsyncThunk('requests/updateRequest', async (data) => {
    console.log('Token: ',token);
    try {
        const res = await axios.put(full_url, data);
        console.log(data);
        return res.data;
    } catch (error ) {
        return error.message;
    }
});

const requestSlice = createSlice({
    name: 'requests',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createRequest.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(createRequest.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newRequest = action.payload;
            console.log(action.payload);
        })
        .addCase(createRequest.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(fetchRequests.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchRequests.fulfilled, (state, action) => {
            state.isLoading = false;
            state.requests = action.payload;
            console.log(action.payload);
        })
        .addCase(fetchRequests.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(updateRequest.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(updateRequest.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updatedRequest = action.payload;
            console.log(action.payload);
        })
        .addCase(updateRequest.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export {createRequest, fetchRequests, updateRequest };
export default requestSlice.reducer;