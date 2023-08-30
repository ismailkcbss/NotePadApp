import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UsersDataTable(props) {


  const { allUsersData } = props;
  let count = 1;


  const handleClick = () => {

  }

  return (
    <TableContainer component={Paper} sx={{ height: 450 }}>
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell>Delete</TableCell>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Full Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Admin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsersData?.map((user) => (
            <TableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Button  onClick={handleClick}><DeleteIcon sx={{ color: "rgba(177, 20, 20, 0.815)" }} /></Button>
              </TableCell>
              <TableCell align="left">
                {count++}
              </TableCell>
              <TableCell align="left">{user.FullName}</TableCell>
              <TableCell align="left">{user.Email}</TableCell>
              <TableCell align="left">{user.Phone}</TableCell>
              <TableCell align="left">{user.Admin.toString() === "true" ? "true" : "false"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}