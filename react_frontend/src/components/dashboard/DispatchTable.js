import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { fetchDispatches } from '../../redux/dispatch/dispatchSlice';
import { useDispatch, useSelector } from 'react-redux';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function DispatchTable({title}) {
  const dispatches = useSelector((state) => state.dispatches.dispatches.results) ?? [];
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchDispatches());
  }, []);

  React.useEffect(() => {
    console.log(dispatches);
  }, [dispatches]);
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Dispatch ID</TableCell>
            <TableCell>Request</TableCell>
            <TableCell>Vehicle</TableCell>
            <TableCell>Driver</TableCell>
            <TableCell>Dispatch date </TableCell>
            <TableCell>Departure date </TableCell>
            <TableCell>Departure milage</TableCell>
            <TableCell>Departure fuel level</TableCell>
            <TableCell>Return date</TableCell>
            <TableCell>Return milage</TableCell>
            <TableCell>Return fuel level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dispatches.map((dispatch) => (
            <TableRow key={dispatch.id}>
              <TableCell>{dispatch.id}</TableCell>
              <TableCell>{`(${dispatch.request.id}) ${dispatch.request.request_date.slice(0, 10)}; ${dispatch.request.requested_vehicle_type}; ${dispatch.request.destination}`}</TableCell>
              <TableCell>{`${dispatch.vehicle.license_plate}; ${dispatch.vehicle.make} ${dispatch.vehicle.model}`}</TableCell>
              <TableCell>{`${dispatch.driver.license_number}; ${dispatch.driver.fname} ${dispatch.driver.mname}`}</TableCell>
              <TableCell>{dispatch.assigned_date.slice(0, 10)}</TableCell>
              <TableCell>{`${dispatch.departure_date}: ${dispatch.departure_time}`}</TableCell>
              <TableCell>{dispatch.departure_milage}</TableCell>
              <TableCell>{dispatch.departure_fuel_level}</TableCell>
              <TableCell>{`${dispatch.return_date}: ${dispatch.return_time}`}</TableCell>
              <TableCell>{dispatch.return_milage}</TableCell>
              <TableCell align="right">{`${dispatch.return_fuel_level}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
