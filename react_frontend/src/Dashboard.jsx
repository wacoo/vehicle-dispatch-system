import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { PhotoCamera } from "@mui/icons-material";
const Dashboard = () => {
    <AppBar position="relative">
        <Toolbar>
            <PhotoCamera />
            <Box paddingLeft={2}>
                <Typography variant="h6">
                    Photo Album
                </Typography>
            </Box>
        </Toolbar>
    </AppBar>
}

export default Dashboard;