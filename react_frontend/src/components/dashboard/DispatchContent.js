import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CheckIcon from '@mui/icons-material/Check';
import Chart from "./Chart"
import Deposits from "./Deposits"
import Orders from "./Orders"
import Input from '@mui/joy/Input';
import UsersTable from "./UsersTable";
import RequestsTable from "./RequestsTable";
import DispatchTable from "./DispatchTable";
import { createDispatch, fetchDispatches } from "../../redux/dispatch/dispatchSlice";
import { useEffect, useState } from "react";
import { fetchRequests } from "../../redux/request/requestSlice";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers";
import {fetchDrivers } from "../../redux/driver/driverSlice";
import { fetchVehicles } from "../../redux/vehicle/vehicleSlice";


const DispatchContent = () => {
    const [value, setValue] = useState(dayjs('2022-04-17'));
    const [dispatchData, setDispatchData] = useState({
        vehicle_request: '',
        assigned_driver: '',
        assigned_vehicle: '',
        assigned_date: new Date(value.format('YYYY-MM-DD')).toISOString(),
        departure_milage: '',
        departure_fuel_level: '',
        return_milage: 0,
        return_fuel_level: 0.0
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.requests.requests.results) ?? [];
    const drivers = useSelector((state) => state.driver.drivers.results) ?? [];
    const vehicles = useSelector((state) => state.vehicles.vehicles.results) ?? [];
    const isLoadingRequests = useSelector((state) => state.requests.isLoading);
    const isLoadingDrivers = useSelector((state) => state.driver.isLoading);
    const isLoadingVehicles = useSelector((state) => state.vehicles.isLoading);

    useEffect(() => {
        dispatch(fetchRequests());
        dispatch(fetchDrivers());
        dispatch(fetchVehicles());
    }, []);

    useEffect(() => {
        console.log(requests);
        console.log(drivers);
        console.log(vehicles);
    }, [requests, drivers, vehicles]);

    useEffect(() => {
        const timer = setTimeout(() => {
          setError('');
          setSuccess(false);
        }, 5000);
    
        // Remember to clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [error, success]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(dispatchData);
        dispatch(createDispatch(dispatchData)).then((res) => {
            // console.log(res.payload.fname);
            if (res.payload?.id) {
                setSuccess(true);
                dispatch(fetchDispatches());
            } else {
                setError(res.payload);
                console.log(res.payload);
            }
        }).catch((error) => {
            // Handle any errors from the first then block
            setError(error);
            console.log(error);
        });
    }

    if (isLoadingRequests || isLoadingDrivers || isLoadingVehicles) {
        return <h1>Loading...</h1>
    }
    return <>
        {/* Recent Orders */}

        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px' }}>
            <Typography variant="h4">New Vehicle Dispatch</Typography>
        </Grid>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2 }}>
            {/* First name, Middle name, Last name in a row (3 on large, 2 on medium, 1 on small) */}
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <InputLabel id="dept_lbl" sx={{ marginBottom: '8px' }}>Request</InputLabel>
                    <Select
                        labelId="dept_lbl"
                        id="demo-simple-select"
                        label="Select Request"
                        sx={{ minWidth: '100%' }}
                        // Handle value, label, onChange
                        onChange={(e) => setDispatchData((prev) => ({...prev, vehicle_request: e.target.value}))}
                    >
                        {
                            requests.map((request) => (
                                <MenuItem value={request.id}>{`${request.request_date.slice(0, 10)}; ${request.user.fname} ${request.user.mname}; ${request.user.department}`}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <InputLabel id="vehicle" sx={{ marginBottom: '8px' }}>Vehicle</InputLabel>
                    <Select
                        labelId="vehicle"
                        id="vehicle"
                        label="Select Vehicle"
                        sx={{ minWidth: '100%' }}
                        // Handle value, label, onChange
                        onChange={(e) => setDispatchData((prev) => ({...prev, assigned_vehicle: e.target.value}))}
                    >
                        {
                            vehicles.map((vehicle) => (
                                <MenuItem value={vehicle.id}>{`${vehicle.license_plate}; ${vehicle.make} ${vehicle.model}; ${vehicle.type}`}</MenuItem>
                            ))
                        
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <InputLabel id="dept_lbl" sx={{ marginBottom: '8px' }}>Driver</InputLabel>
                    <Select
                        labelId="dept_lbl"
                        id="demo-simple-select"
                        label="Select Driver"
                        sx={{ minWidth: '100%' }} // Ensure select is full width
                        // Handle value, label, onChange
                        onChange={(e) => setDispatchData((prev) => ({...prev, assigned_driver: e.target.value}))}
                    >
                        {
                            drivers.map((driver) => (
                                <MenuItem value={driver.id}>{`${driver.fname} ${driver.mname}`}</MenuItem>
                            ))
                        
                        }
                        {/* <MenuItem value={20}>Dinberu</MenuItem>
                        <MenuItem value={30}>Negessie</MenuItem> */}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4} sx={{mt: '-7px'}}>
                <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                        <DatePicker
                        label='Assigned date'
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        />
                        </DemoContainer>
                    </LocalizationProvider>
                </FormControl>
            </Grid>
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Departure milage" type="number" name="dmilage" id="dmilage" onChange={(e) => setDispatchData((prev) => ({...prev, departure_milage: e.target.value}))}/>
                </FormControl>
            </Grid>
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Departure fuel level" type="number" name="dfuel" id="dfuel" onChange={(e) => setDispatchData((prev) => ({...prev, departure_fuel_level: e.target.value}))}/>
                </FormControl>
            </Grid>
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Return milage" type="number" name="rmilage" id="rmilage" onChange={(e) => setDispatchData((prev) => ({...prev, return_milage: e.target.value}))}/>
                </FormControl>
            </Grid>
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Return fuel level" type="number" name="rfuel" id="rfuel" onChange={(e) => setDispatchData((prev) => ({...prev, return_fuel_level: e.target.value}))}/>
                </FormControl>
            </Grid>
            <Grid item xs={12} marginTop={2}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <FormControl fullWidth>
                        <Button variant="outlined" type="submit">Create</Button>
                    </FormControl>
                </form>
            </Grid>
            <Grid item xs={12} marginTop={2}>
                {
                    success && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Dispatch sent successfully!.
                    </Alert>
                }
                {error && <Alert severity="error">{error}</Alert>}
                {/* <Alert severity="info">This is an info Alert.</Alert>
                <Alert severity="warning">This is a warning Alert.</Alert> */}
            </Grid>
        </Grid>
        <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px'}}>
            <Typography variant="h4">Dispatches</Typography>        
        </Grid>
        <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px'}}>
            <DispatchTable />      
        </Grid>
    </>

}

export default DispatchContent;