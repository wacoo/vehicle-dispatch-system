import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import Chart from "./Chart"
import Deposits from "./Deposits"
import Orders from "./Orders"
import Input from '@mui/joy/Input';
import UsersTable from "./UsersTable";
import VehiclesTable from "./VehiclesTable";
import DriversTable from "./DriversTable";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ApprovalTable from "./ApprovalTable";


const ApprovalContent = () => {
    return <>
        {/* Recent Orders */}
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px' }}>
            <Typography variant="h4">New Approval</Typography>
        </Grid>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2 }}>
            {/* First name, Middle name, Last name in a row (3 on large, 2 on medium, 1 on small) */}
            
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <InputLabel id="dept_lbl" sx={{ marginBottom: '8px' }}>Request</InputLabel>
                    <Select
                        labelId="dept_lbl"
                        id="demo-simple-select"
                        label="Department"
                        sx={{ minWidth: '100%' }} // Ensure select is full width
                    // Handle value, label, onChange
                    >
                        <MenuItem value={10}>12/05/2034;Yosef;ICT;Car</MenuItem>
                        <MenuItem value={20}>12/05/2034;Abraham;Technique;Track</MenuItem>
                        <MenuItem value={30}>12/05/2034;Yirga;HR;Car</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <InputLabel id="dept_lbl" sx={{ marginBottom: '8px' }}>Manager</InputLabel>
                    <Select
                        labelId="dept_lbl"
                        id="demo-simple-select"
                        label="Department"
                        sx={{ minWidth: '100%' }} // Ensure select is full width
                    // Handle value, label, onChange
                    >
                        <MenuItem value={10}>Shitahun Wale</MenuItem>
                        <MenuItem value={20}>Yosef Tadesse</MenuItem>
                        <MenuItem value={30}>Mitiku Afework</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4} sx={{mt: '-7px'}}>
                <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="Approval Date" />
                        </DemoContainer>
                    </LocalizationProvider>
                </FormControl>
            </Grid>
            <Grid item xs={12} marginTop={2}>
                <FormControl fullWidth>
                    <Button variant="outlined">Approve</Button>
                </FormControl>
            </Grid>

            <Grid item xs={12} marginTop={2}>
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Here is a gentle confirmation that your action was successful.
                </Alert>
                {/* <Alert severity="error">This is an error Alert.</Alert>
                <Alert severity="info">This is an info Alert.</Alert>
                <Alert severity="warning">This is a warning Alert.</Alert> */}
            </Grid>
        </Grid>

        <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px'}}>
            <Typography variant="h4">Approvals</Typography>
        </Grid>
        <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px'}}>
            <ApprovalTable />
        </Grid>
    </>

}

export default ApprovalContent;