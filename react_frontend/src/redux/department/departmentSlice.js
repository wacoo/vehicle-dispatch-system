import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    departments: [],
    newDeparment: {},
    isLoading: false,
    error: undefined
}

const url = 'http://localhost:8000/api/';

const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
const headers = {
    Authorization: `Bearer ${token}`,
};

const full_url = `${url}departments/`;
const fetchDepartments = createAsyncThunk('departments/fetchDepartments', async() => {
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

const createDepartment = createAsyncThunk('departments/createDepartment', async (data) => {
    // console.log('Data: ',data);
    try {
        const res = await axios.post(full_url, data);
        return res.data;
    } catch (error ) {
        return error.message;
    }
});

const departmentSlice = createSlice({
    name: 'departments',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createDepartment.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(createDepartment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newDeparment = action.payload;
            // console.log(action.payload);
        })
        .addCase(createDepartment.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(fetchDepartments.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchDepartments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.departments = action.payload;
            console.log(action.payload);
        })
        .addCase(fetchDepartments.rejected, (state, action) => {
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

export {createDepartment, fetchDepartments};
export default departmentSlice.reducer;