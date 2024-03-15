import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CheckIcon from '@mui/icons-material/Check';
import Chart from "./Chart"
import Deposits from "./Deposits"
import Orders from "./Orders"
import Input from '@mui/joy/Input';
import UsersTable from "./UsersTable";
import RequestsTable from "./RequestsTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRequest, fetchRequests } from "../../redux/request/requestSlice";
import { fetchUsers } from "../../redux/user/userSlice";
import dayjs from "dayjs";


const RequestContent = () => {
    const [value, setValue] = useState(dayjs('2022-04-17'));
    const [requestData, setRequestData] = useState({
        user: '',
        request_date: new Date(value.format('YYYY-MM-DD')).toISOString(),
        description: '',
        requested_vehicle_type: '',
        destination: '',
        estimated_duration_hrs: '',
        status: 'PENDING',
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users.results) ?? [];
    const isLoading = useSelector((state) => state.users.isLoading);

    // const handleDateChange = (newValue) => {
    //     console.log(newValue);
    //     // setSelectedDate(newValue);
    // };

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        console.log(isLoading);
        console.log(users);
    }, [users]);

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
        console.log(requestData);
        dispatch(createRequest(requestData)).then((res) => {
            // console.log(res.payload.fname);
            if (res.payload?.id) {
                setSuccess(true);
                dispatch(fetchRequests());
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

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    return <>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px' }}>
            <Typography variant="h4">New Vehicle Request</Typography>
        </Grid>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2 }}>
            {/* First name, Middle name, Last name in a row (3 on large, 2 on medium, 1 on small) */}
            <Grid item xs={12} md={6} lg={4}>
                <FormControl fullWidth>
                    <InputLabel id="dept_lbl" sx={{ marginBottom: '8px' }}>Requester</InputLabel>
                    <Select
                        labelId="dept_lbl"
                        id="user"
                        label="Department"
                        sx={{ minWidth: '100%' }}
                        // Handle value, label, onChange
                        onChange={(e) => setRequestData((prev) => ({ ...prev, user: e.target.value }))}
                    >
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {`${user.fname} ${user.mname}`}
                            </MenuItem>
                        ))}
                        {/* <MenuItem value={20}>Ashenafi</MenuItem>
                        <MenuItem value={30}>Yonas</MenuItem> */}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4} sx={{ mt: '-7px' }}>
                <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </LocalizationProvider>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <FormControl fullWidth>
                    <InputLabel id="dept_lbl" sx={{ marginBottom: '8px' }}>Vehicle type</InputLabel>
                    <Select
                        labelId="dept_lbl"
                        id="demo-simple-select"
                        label="Department"
                        sx={{ minWidth: '100%' }}
                        // Handle value, label, onChange
                        onChange={(e) => setRequestData((prev) => ({ ...prev, requested_vehicle_type: e.target.value }))}
                    >
                        <MenuItem value={'BIKE'}>MOTOR BIKE</MenuItem>
                        <MenuItem value={'CAR'}>CAR</MenuItem>
                        <MenuItem value={'VAN'}>VAN</MenuItem>
                        <MenuItem value={'MINIBUS'}>MINIBUS</MenuItem>
                        <MenuItem value={'BUS'}>BUS</MenuItem>
                        <MenuItem value={'TRUCK'}>TRUCK</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Destination" type="text" name="dest" id="dest" onChange={(e) => setRequestData((prev) => ({ ...prev, destination: e.target.value }))} />
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Estimated duration" type="number" name="duration" id="duration" onChange={(e) => setRequestData((prev) => ({ ...prev, estimated_duration_hrs: e.target.value }))} />
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <FormControl fullWidth>
                    <InputLabel id="dept_lbl" sx={{ marginBottom: '8px' }}>Status</InputLabel>
                    <Select
                        labelId="dept_lbl"
                        id="demo-simple-select"
                        label="Department"
                        sx={{ minWidth: '100%' }}
                    // Handle value, label, onChange
                    // onChange={(e) => setRequestData((prev) => ({...prev, status: e.target.value}))}
                    >
                        <MenuItem value={'PENDING'}>PENDING</MenuItem>
                        <MenuItem value={'APPROVED'}>APPROVED</MenuItem>
                        <MenuItem value={'REJECTED'}>REJECTED</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <TextField label="Description" type="text" name="desc" id="desc" multiline onChange={(e) => setRequestData((prev) => ({ ...prev, description: e.target.value }))} />
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
                        Request sent successfully, please wait for approval.
                    </Alert>
                }
                {error && <Alert severity="error">{error}</Alert>}
                {/* <Alert severity="info">This is an info Alert.</Alert>
                <Alert severity="warning">This is a warning Alert.</Alert> */}
            </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px' }}>
            <Typography variant="h4">Requests</Typography>
        </Grid>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px' }}>
            <RequestsTable />
        </Grid>
    </>

}

export default RequestContent;