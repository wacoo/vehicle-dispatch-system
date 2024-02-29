import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../user/userSlice';
import driverReducer from '../driver/driverSlice';
import vehicleReducer from '../vehicle/vehicleSlice';
const store = configureStore({
    reducer: {
        user: userReducer,
        driver: driverReducer,
        vehicles: vehicleReducer,
    }
});

export default store;