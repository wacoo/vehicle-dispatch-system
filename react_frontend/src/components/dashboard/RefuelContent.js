import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import Chart from "./Chart"
import Deposits from "./Deposits"
import Orders from "./Orders"
import Input from '@mui/joy/Input';
import UsersTable from "./UsersTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp } from "../../redux/user/userSlice";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const RefuelContent = () => {
    const dispatch = useDispatch();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [rrdate, setRRdate] = useState(dayjs('2022-04-17'));
    const [rdate, setRdate] = useState(dayjs('2022-04-17'));
    const vehicles = useSelector((state) => state.vehicles.vehicles.results) ?? [];
    const [refuelData, setRefuelData] = useState({
        vehicle: '',
        refuel_request_date: '',
        refuel_date: '',
        fuel_type: '',
        km_before_refuel: '',
        milage_in_km: '',
        km_per_liter: '',
        current_fuel_level: '',
        phone_number: '',
        dispatcher: '',
        remark: '',
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setSuccess(false);
        }, 5000);

        // Remember to clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [error, success]);
    //username=None, fname=None, mname=None, lname=None, access_level=None, password=None
    //fields = ('id', 'username', 'fname', 'mname', 'lname', 'department', 'access_level', 'password', 'is_staff', 'is_superuser')
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return <>
        {/* Recent Orders */}
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px' }}>
            <Typography variant="h4">Refuel</Typography>
        </Grid>

        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2 }}>
            {/* First name, Middle name, Last name in a row (3 on large, 2 on medium, 1 on small) */}
            <Grid item xs={12} md={6} lg={4}>
                <FormControl fullWidth>
                    <InputLabel id="vehicle" sx={{ marginBottom: '8px' }}>Vehicle</InputLabel>
                    <Select
                        labelId="vehicle"
                        id="vehicle"
                        label="Vehicle"
                        sx={{ minWidth: '100%' }}
                        // Handle value, label, onChange
                        onChange={(e) => setRefuelData((prev) => ({ ...prev, vehicle: e.target.value }))}
                    >
                        {vehicles.map((vehicle) => (
                            <MenuItem key={vehicle.id} value={vehicle.id}>
                                {`${vehicle.license_plate}; ${vehicle.make} ${vehicle.model}`}
                            </MenuItem>
                        ))}
                        {/* <MenuItem value={20}>Ashenafi</MenuItem>
                        <MenuItem value={30}>Yonas</MenuItem> */}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ mt: '-7px' }}>
            <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DatePicker
                            label='Refuel dequest date'
                            value={rrdate}
                            onChange={(newValue) => setRRdate(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DatePicker
                            label='Refuel date'
                            value={rdate}
                            onChange={(newValue) => setRdate(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
                <InputLabel id="fuel_type" sx={{ marginBottom: '8px' }}>Fuel type</InputLabel>
                <Select
                    labelId="fuel_type"
                    id="fuel_type"
                    label="Fuel type"
                    sx={{ minWidth: '100%' }}
                    // Handle value, label, onChange
                    onChange={(e) => setRefuelData((prev) => ({ ...prev, fuel_type: e.target.value }))}
                >
                    <MenuItem value={'BENZINE'}>BENZINE</MenuItem>
                    <MenuItem value={'NAFTA'}>NAFTA</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
                <TextField label="KM before refuel" type="number" name="fname" id="fname" onChange={(e) => setRefuelData((prev) => ({ ...prev, km_before_refuel: e.target.value }))} />
            </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
                <TextField label="Milage in KM" type="number" name="fname" id="fname" onChange={(e) => setRefuelData((prev) => ({ ...prev, milage_in_km: e.target.value }))} />
            </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
                <TextField label="KM per liter" type="number" name="fname" id="fname" onChange={(e) => setRefuelData((prev) => ({ ...prev, km_per_liter: e.target.value }))} />
            </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
                <TextField label="Current fuel level" type="number" name="fname" id="fname" onChange={(e) => setRefuelData((prev) => ({ ...prev, current_fuel_level: e.target.value }))} />
            </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
                <TextField label="Remark" type="text" name="fname" id="fname" multiline onChange={(e) => setRefuelData((prev) => ({ ...prev, remark: e.target.value }))} />
            </FormControl>
        </Grid>

        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px' }}>
            <Typography variant="h4">Users</Typography>
        </Grid>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px' }}>
            <UsersTable />
        </Grid>
    </>

}

export default RefuelContent;