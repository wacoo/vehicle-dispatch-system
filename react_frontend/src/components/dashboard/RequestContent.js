import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Chart from "./Chart"
import Deposits from "./Deposits"
import Orders from "./Orders"
import Input from '@mui/joy/Input';
import UsersTable from "./UsersTable";


const RequestContent = () => {
    return <>
        {/* Recent Orders */}

        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px' }}>
            <Typography variant="h3">New Request</Typography>
        </Grid>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2 }}>
            {/* First name, Middle name, Last name in a row (3 on large, 2 on medium, 1 on small) */}
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="dept_lbl" sx={{ marginBottom: '8px' }}>Requester</InputLabel>
                    <Select
                        labelId="dept_lbl"
                        id="demo-simple-select"
                        label="Department"
                        sx={{ minWidth: '100%' }} // Ensure select is full width
                    // Handle value, label, onChange
                    >
                        <MenuItem value={10}>Abebe</MenuItem>
                        <MenuItem value={20}>Ashenafi</MenuItem>
                        <MenuItem value={30}>Yonas</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <DateTimePicker label="Basic date time picker" />
            <Grid item xs={12} md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Middle name" type="text" name="mname" id="mname" />
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Last name" type="text" name="lname" id="lname" />
                </FormControl>
            </Grid>

            {/* Department Select (full width on all screen sizes) */}
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="dept_lbl" sx={{ marginBottom: '8px' }}>Department</InputLabel>
                    <Select
                        labelId="dept_lbl"
                        id="demo-simple-select"
                        label="Department"
                        sx={{ minWidth: '100%' }} // Ensure select is full width
                    // Handle value, label, onChange
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="dept_lbl" sx={{ marginBottom: '8px' }}>Role</InputLabel>
                    <Select
                        labelId="dept_lbl"
                        id="demo-simple-select"
                        label="Department"
                        sx={{ minWidth: '100%' }} // Ensure select is full width
                    // Handle value, label, onChange
                    >
                        <MenuItem value={10}>User</MenuItem>
                        <MenuItem value={20}>Administrator</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <TextField sx={{ minWidth: '100%' }} label="Phone number" type="text" name="pnumber" id="pnumber" />
                </FormControl>
            </Grid>
        </Grid>
        <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px'}}>
            <Typography variant="h3">Users</Typography>        
        </Grid>
        <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px'}}>
            <UsersTable />      
        </Grid>
    </>

}

export default RequestContent;