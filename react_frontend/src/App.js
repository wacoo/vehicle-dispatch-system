import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    // <Container maxWidth="lg">
    //   <AppBar position="fixed">
    //     <Toolbar>
    //       <IconButton
    //         size="large"
    //         edge="start"
    //         color="inherit"
    //         aria-label="menu"
    //         sx={{ mr: 2 }}
    //         onClick={handleDrawerToggle}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
    //         Vehicle Request and Dispatch System
    //       </Typography>
    //       <SizesList />
    //     </Toolbar>
    //   </AppBar>      
    // </Container>
    <Dashboard />
  );
}

export default App;
