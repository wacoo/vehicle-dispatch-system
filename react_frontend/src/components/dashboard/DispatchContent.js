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
import { fetchUsers } from "../../redux/user/userSlice";


const DispatchContent = () => {
    const [value, setValue] = useState(dayjs('2024-04-17'));
    const [ddate, setDdate] = useState(dayjs('2024-04-17'));
    const [rdate, setRdate] = useState(dayjs('2024-04-17'));
    const [dispatchData, setDispatchData] = useState({
        vehicle_request: '',
        assigned_driver: '',
        assigned_vehicle: '',
        assigned_date: new Date(value.format('YYYY-MM-DD')).toISOString(),
        departure_date: new Date(ddate.format('YYYY-MM-DD')).toISOString(),
        departure_time: '00:00:00',
        departure_milage: '',
        departure_fuel_level: '',
        return_date: new Date(rdate.format('YYYY-MM-DD')).toISOString(),
        return_time: '00:00:00',
        return_milage: 0,
        return_fuel_level: 0.0
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.requests.requests.results) ?? [];
    const drivers = useSelector((state) => state.driver.drivers.results) ?? [];
    const vehicles = useSelector((state) => state.vehicles.vehicles.results) ?? [];
    const dispatchers = useSelector((state) => state.users.users.results) ?? [];
    const isLoadingRequests = useSelector((state) => state.requests.isLoading);
    const isLoadingDrivers = useSelector((state) => state.driver.isLoading);
    const isLoadingVehicles = useSelector((state) => state.vehicles.isLoading);

    useEffect(() => {
        dispatch(fetchRequests());
        dispatch(fetchDrivers());
        dispatch(fetchVehicles());
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        console.log(requests);
        console.log(drivers);
        console.log(vehicles);
        console.log(dispatchers);
    }, [requests, drivers, vehicles, dispatchers]);

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

    const times = {'1:00 (ከጠዋቱ)': '7:00 AM', '2:00 (ከጠዋቱ)': '2:00 AM', '3:00 (ከጠዋቱ)': '9:00 AM', '4:00 (ከረፋዱ)': '10:00 AM', '5:00 (ከረፋዱ)': '11:00 AM', '6:00 (ከቀኑ)': '12:00 AM', '7:00 (ከቀኑ)': '1:00 PM', '8:00 (ከቀኑ)': '2:00 PM', '9:00 (ከቀኑ)': '3:00 PM', '10:00 (ከቀኑ)': '4:00 PM', '11:00 (ከአመሻሹ)': '5:00 PM', '12:00 (ከአመሻሹ)': '6:00 PM', '1:00 (ከምሽቱ)': '7:00 PM', '2:00 (ከምሽቱ)': '8:00 PM', '3:00 (ከምሽቱ)': '9:00 PM', '4:00 (ከምሽቱ)': '10:00 PM', '5:00 (ከምሽቱ)': '11:00 PM', '6:00 (ከለሊቱ)': '12:00 PM', '7:00 (ከለሊቱ)': '1:00 AM', '8:00 (ከለሊቱ)': '2:00 AM', '9:00 (ከለሊቱ)': '3:00 AM', '10:00 (ከለሊቱ)': '4:00 AM', '11:00 (ከለሊቱ)': '5:00 AM', '12:00 (ክጥዋቱ)': '6:00 AM'};
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
            <Grid item xs={12} md={6} lg={4} sx={{mt: '-7px'}}>
                <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                        <DatePicker
                        label='Departure date'
                        value={ddate}
                        onChange={(newValue) => setDdate(newValue)}
                        />
                        </DemoContainer>
                    </LocalizationProvider>
                </FormControl>
            </Grid>
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <InputLabel id="vehicle" sx={{ marginBottom: '8px' }}>Departure time</InputLabel>
                    <Select
                        labelId="Depature time"
                        id="departure_time"
                        label="Select Vehicle"
                        sx={{ minWidth: '100%' }}
                        // Handle value, label, onChange
                        onChange={(e) => setDispatchData((prev) => ({...prev, departure_time: e.target.value}))}
                    >
                        {
                            Object.values(times).map((val) => (
                                <MenuItem value={val}>{val}</MenuItem>
                            ))
                        }
                            
                    </Select>
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
            <Grid item xs={12} md={6} lg={4} sx={{mt: '-7px'}}>
                <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                        <DatePicker
                        label='Return date'
                        value={rdate}
                        onChange={(newValue) => setRdate(newValue)}
                        />
                        </DemoContainer>
                    </LocalizationProvider>
                </FormControl>
            </Grid>
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <InputLabel id="vehicle" sx={{ marginBottom: '8px' }}>Return time</InputLabel>
                    <Select
                        labelId="Return time"
                        id="return_time"
                        label="Return time"
                        sx={{ minWidth: '100%' }}
                        // Handle value, label, onChange
                        onChange={(e) => setDispatchData((prev) => ({...prev, return_time: e.target.value}))}
                    >
                        {
                            Object.values(times).map((val) => (
                                <MenuItem value={val}>{val}</MenuItem>
                            ))
                        }
                            
                    </Select>
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
            <Grid item xs={12} md={6} lg={4}>
                <FormControl fullWidth>
                    <InputLabel id="dept_lbl" sx={{ marginBottom: '8px' }}>Dispatcher</InputLabel>
                    <Select
                        labelId="dept_lbl"
                        id="user"
                        label="Department"
                        sx={{ minWidth: '100%' }}
                        // Handle value, label, onChange
                        onChange={(e) => setDispatchData((prev) => ({ ...prev, user: e.target.value }))}
                    >
                        {dispatchers.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {`${user.fname} ${user.mname}`}
                            </MenuItem>
                        ))}
                        {/* <MenuItem value={20}>Ashenafi</MenuItem>
                        <MenuItem value={30}>Yonas</MenuItem> */}
                    </Select>
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