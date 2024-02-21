import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import Chart from "./Chart"
import Deposits from "./Deposits"
import Orders from "./Orders"
import Input from '@mui/joy/Input';
import UsersTable from "./UsersTable";
import VehiclesTable from "./VehiclesTable";


const VehicleContent = () => {
    return <>
        {/* Recent Orders */}
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px' }}>
            <Typography variant="h4">New Vehicle</Typography>
        </Grid>
        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2 }}>
            {/* First name, Middle name, Last name in a row (3 on large, 2 on medium, 1 on small) */}
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="dept_lbl" sx={{ marginBottom: '8px' }}>Make</InputLabel>
                    <Select
                        labelId="dept_lbl"
                        id="demo-simple-select"
                        label="Make"
                        sx={{ minWidth: '100%' }} // Ensure select is full width
                    // Handle value, label, onChange
                    >
                        <MenuItem value={10}>Toyota</MenuItem>
                        <MenuItem value={20}>Ford</MenuItem>
                        <MenuItem value={30}>Fiat</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Model" type="text" name="model" id="model" />
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Year" type="number" name="year" id="year" />
                </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Current milage" type="number" name="cmilage" id="cmilage" />
                </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="License plate" type="text" name="plate" id="plate" />
                </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
                <FormControl fullWidth>
                    <TextField label="Fuel level" type="number" name="fuel_level" id="fuel_level" />
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
            <Typography variant="h4">Vehicles</Typography>
        </Grid>
        <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'background.paper', pr: '12px', pb: '12px', borderRadius: 4, boxShadow: 3, padding: 2, my: '30px'}}>
            <VehiclesTable />
        </Grid>
    </>

}

export default VehicleContent;