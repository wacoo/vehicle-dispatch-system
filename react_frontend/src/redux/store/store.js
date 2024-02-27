import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../user/userSlice';
import driverReducer from '../driver/driverSlice';
const store = configureStore({
    reducer: {
        user: userReducer,
        driver: driverReducer,
    }
});

export default store;