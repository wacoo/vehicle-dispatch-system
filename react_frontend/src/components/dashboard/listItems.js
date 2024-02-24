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
import ApprovalIcon from '@mui/icons-material/Approval';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';

const MainListItems = ({ changeTab }) => {
  return (
    <React.Fragment>
      <ListItemButton  onClick={(e) => changeTab('Dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={(e) => changeTab('Drivers')}>
        <ListItemIcon>
          <AirlineSeatReclineNormalIcon />
        </ListItemIcon>
        <ListItemText primary="Drivers" />
      </ListItemButton>
      <ListItemButton onClick={(e) => changeTab('Vehicles')}>
        <ListItemIcon>
          <DirectionsCarIcon />
        </ListItemIcon>
        <ListItemText primary="Vehicles" />
      </ListItemButton>
      <ListItemButton  onClick={(e) => changeTab('Requests')}>
        <ListItemIcon>
        <ContactSupportIcon />
        </ListItemIcon>
        <ListItemText primary="Requests" />
      </ListItemButton>
      <ListItemButton   onClick={(e) => changeTab('Dispatches')}>
        <ListItemIcon>
          <AltRouteIcon />
        </ListItemIcon>
        <ListItemText primary="Dispatches" />
      </ListItemButton>
      <ListItemButton onClick={(e) => changeTab('Approvals')}>
        <ListItemIcon>
          <ApprovalIcon />
        </ListItemIcon>
        <ListItemText primary="Approvals" />
      </ListItemButton>
      <ListItemButton onClick={(e) => changeTab('Users')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
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