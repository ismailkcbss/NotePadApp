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
import alertify from 'alertifyjs';
import { axiosInstance } from '../axios.util';

export default function UsersDataTable(props) {

  const { allUsersData, setAllUsersData } = props;
  let count = 1;

  const deleteUser = async (_id) => {
    if (_id) {
      try {
        const { data } = await axiosInstance.delete(`/Users/DeleteUser/${_id}`);
        setAllUsersData((prev) =>{
          const newPrew = prev.filter((each)=> each._id !== _id);
          return newPrew;
        })
        alertify.success("User Silme Başarılı")
      } catch (error) {
        alertify.error("Veri silinemedi")
      }
    }
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
              {
                user.Admin ? (
                  <Button><DeleteIcon sx={{ '&: nth-of-type(1)': { display: "none" }, color: "rgba(177, 20, 20, 0.815)" }} /></Button>
                ) : (
                  <TableCell component="th" scope="row">
                    <Button onClick={() => deleteUser(user?._id)}><DeleteIcon sx={{ color: "rgba(177, 20, 20, 0.815)" }} /></Button>
                  </TableCell>
                )
              }

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