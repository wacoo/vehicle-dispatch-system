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


const DispatchContent = () => {
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
                        label="Request"
                        sx={{ minWidth: '100%' }} // Ensure select is full width
                    // Handle value, label, onChange
                    >
                        <MenuItem value={10}>ID;Abebe;Finance;Car</MenuItem>
                        <MenuItem value={20}>ID;Yonas;ICT;Bus</MenuItem>
                        <MenuItem value={30}>ID;Yirga;HR;Bike</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <InputLabel id="dept_lbl" sx={{ marginBottom: '8px' }}>Assigned driver</InputLabel>
                    <Select
                        labelId="dept_lbl"
                        id="demo-simple-select"
                        label="Driver"
                        sx={{ minWidth: '100%' }} // Ensure select is full width
                    // Handle value, label, onChange
                    >
                        <MenuItem value={10}>Chuchu</MenuItem>
                        <MenuItem value={20}>Dinberu</MenuItem>
                        <MenuItem value={30}>Negessie</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4} sx={{mt: '-7px'}}>
                <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="Assigned date" />
                        </DemoContainer>
                    </LocalizationProvider>
                </FormControl>
            </Grid>
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Departure milage" type="number" name="dmilage" id="dmilage" />
                </FormControl>
            </Grid>
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Departure fuel level" type="number" name="dfuel" id="dfuel" />
                </FormControl>
            </Grid>
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Return milage" type="number" name="rmilage" id="rmilage" />
                </FormControl>
            </Grid>
            <Grid item xs={12}  md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Return fuel level" type="number" name="rfuel" id="rfuel" />
                </FormControl>
            </Grid>
            <Grid item xs={12} marginTop={2}>
                <FormControl fullWidth>
                    <Button variant="outlined">Create</Button>
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
            <Typography variant="h4">Dispatches</Typography>        
        </Grid>
        <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px'}}>
            <DispatchTable />      
        </Grid>
    </>

}

export default DispatchContent;