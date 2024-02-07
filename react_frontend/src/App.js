import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Container maxWidth="lg">
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          {matches ? (
            <>
              <Button color="inherit">Menu Item 1</Button>
              <Button color="inherit">Menu Item 2</Button>
            </>
          ) : (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              sx={{
                display: { xs: 'block', md: 'none' }, // Ensure Drawer visibility only on mobile
              }}
            >
              <List>
                <ListItem key="Menu Item 1">
                  <ListItemText primary="Menu Item 1" />
                </ListItem>
                <ListItem key="Menu Item 2">
                  <ListItemText primary="Menu Item 2" />
                </ListItem>
              </List>
            </Drawer>
          )}
        </Toolbar>
      </AppBar>
      {/* Rest of your app content here */}
    </Container>
  );
}

export default App;
