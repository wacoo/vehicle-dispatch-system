import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
    user: {},
    approvals: [],
    newApproval: {},
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
const full_url = `${url}approvals/`;

const fetchApprovals = createAsyncThunk('vehicles/fetchApprovals', async() => {
    try {
        const res = await axios.get(full_url);
        return res.data;
    } catch(error) {
        return error.message;
    }
});

const createApproval = createAsyncThunk('approvals/createApproval', async (data, { dispatch }) => {
    console.log('Data: ', data);
    try {
        const updateRes = await dispatch(updateRequest({ id: data.request, status: 'APPROVED' }));
        if (updateRes.error) {
            throw new Error(updateRes.error.message);
        }
        console.log('Update Request Data:', updateRes.payload);
        const res = await axios.post(full_url, data);
        return res.data;
    } catch (error) {
        return error.message;
    }
});


const updateRequest = createAsyncThunk('requests/updateRequest', async (data) => {
    try {
        const res = await axios.put(`${url}requests/${data.id}/`, data.status);
        console.log('Update Request Response:', res.data);
        return res.data;
    } catch (error) {
        console.error('Error updating request:', error.message);
        throw error; // Rethrow the error for proper handling by the caller
    }
});

const approvalSlice = createSlice({
    name: 'approvals',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createApproval.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(createApproval.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newApproval = action.payload;
            console.log(action.payload);
        })
        .addCase(createApproval.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(fetchApprovals.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchApprovals.fulfilled, (state, action) => {
            state.isLoading = false;
            state.approvals = action.payload;
            console.log(action.payload);
        })
        .addCase(fetchApprovals.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export {createApproval, fetchApprovals };
export default approvalSlice.reducer;