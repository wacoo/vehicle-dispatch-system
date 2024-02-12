import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';

const MainListItems = ({ setTab }) => {
  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
        <ContactSupportIcon />
        </ListItemIcon>
        <ListItemText primary="Requests" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AltRouteIcon />
        </ListItemIcon>
        <ListItemText primary="Dispatches" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DirectionsCarIcon />
        </ListItemIcon>
        <ListItemText primary="Vehicles" />
      </ListItemButton>
      <ListItemButton onClick={(e) => setTab('Users')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AirlineSeatReclineNormalIcon />
        </ListItemIcon>
        <ListItemText primary="Drivers" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
    </React.Fragment>
    );
}


export default MainListItems;