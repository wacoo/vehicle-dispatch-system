import { Grid, Paper } from "@mui/material"
import Chart from "./Chart"
import Deposits from "./Deposits"
import Orders from "./Orders"


const  UserContent = () => {
    return <>
        {/* Recent Orders */}
        <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Orders />
        </Paper>
        </Grid>
    </>
    
}

export default UserContent;