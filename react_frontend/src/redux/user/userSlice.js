import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {},
    isLoading: false,
    error: undefined
}

const url = 'http://localhost:8000/api/users';
const signIn = createAsyncThunk('user/signIn', async (data) => {
    try {
        const full_url = `${url}/1`;
        const res = res.data;
    } catch (error) {
        return error.message;
    }
});

const userSlice = createSlice({
    name: 'user',
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
    }
})

export { signIn };
export default userSlice.reducer;