import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../user/userSlice';
import driverReducer from '../driver/driverSlice';
import vehicleReducer from '../vehicle/vehicleSlice';
import requestReducer from '../request/requestSlice';
import dispatchReducer from '../dispatch/dispatchSlice';
import approvalReducer from '../approval/approvalSlice';
import refuelReducer from '../refuel/refuelSlice';
const store = configureStore({
    reducer: {
        users: userReducer,
        driver: driverReducer,
        vehicles: vehicleReducer,
        requests: requestReducer,
        dispatches: dispatchReducer,
        approvals: approvalReducer,
        refuels: refuelReducer
    }
});

export default store;