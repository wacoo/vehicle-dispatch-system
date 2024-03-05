import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateRequest } from "../request/requestSlice";

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

const createApproval = createAsyncThunk('approvals/createApproval', async (data) => {
    console.log('Token: ',token);
    try {
        const dispatch = useDispatch();
        dispatch(updateRequest({status: 'APPROVED'}));
        const res = await axios.post(full_url, data);
        return res.data;
    } catch (error ) {
        return error.message;
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