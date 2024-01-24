import { useAuth } from "../contexts/AuthContext";
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FirebaseService } from "../services/FirestoreServices";
import { Card, CardContent, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import {User} from '../models/User';


const UserCard: React.FC = () => {
  const user = useAuth().currentUser;
  const firebaseService = new FirebaseService();
  const [displayedUser, setdDisplayedUser] = useState<User | null>(null);

  const fetchProfile = async () => {
    if (user !== null) {
      const { uid } = user;
      const userProfile = await firebaseService.getUserById(uid);
      setdDisplayedUser(userProfile);
   }
  }

  useEffect(() => {
    fetchProfile();
  }, []);



  const handleUpdate = () => {
    // Implement update logic here
  };

  const handleDelete = () => {
    // Implement delete logic here
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log('name =>', name, "  value =>", value);
    console.log(displayedUser);

    setdDisplayedUser(prevUser => {
      if (!prevUser) {
        // If prevUser is null, initialize it with default values
        return {
          uid: '',
          email: '',
          household: '',
          displayName: '',
          completedTasks: [],
          [name]: value,
        };
      } else {
        // Otherwise, spread the previous state and overwrite the changed property
        return {
          ...prevUser,
          [name]: value,
        };
      }
    });
  };

  if (!user) {
    return <div>No user data available!!</div>;
 }
 if (!displayedUser) return <LinearProgress color="secondary" />

  return (
    <Card>
    <CardContent>
      <Typography variant="h5">{displayedUser.displayName}</Typography>
      <Typography variant="body2">Email: {displayedUser.email}</Typography>
      <Typography variant="body2">Household: {displayedUser.household || 'N/A'}</Typography>
      <Typography variant="body2">Completed Tasks: {displayedUser.completedTasks?.length || 0}</Typography>
    </CardContent>
  </Card>
  )

  // return (
  //   <ThemeProvider theme={defaultTheme}>
  //     <Container component="main" maxWidth="xs">
  //       <CssBaseline />
  //       <Box
  //         sx={{
  //           marginTop: 8,
  //           display: 'flex',
  //           flexDirection: 'column',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
  //           <LockOutlinedIcon />
  //         </Avatar>
  //         {displayedUser && (
  //           <>
  //             <TextField
  //               id="standard-basic"
  //               label="Standard"
  //               variant="standard"
  //               name="email"
  //               value={displayedUser.email}
  //               onChange={handleInputChange}
  //             />
  //             <Table>
  //               <TableHead>
  //               </TableHead>
  //               <TableBody>
  //                 {displayedUser.completedTasks && displayedUser.completedTasks.length > 0 ? (
  //                   displayedUser.completedTasks.map((task, index) => (
  //                     <TableRow key={index}>
  //                       <TableCell>{task.title}</TableCell>
  //                       <TableCell>{task.date}</TableCell>
  //                     </TableRow>
  //                   ))
  //                 ) : (
  //                   <TableRow>
  //                     <TableCell colSpan={2}>No tasks completed</TableCell>
  //                   </TableRow>
  //                 )}
  //               </TableBody>
  //             </Table>
  //           </>
  //         )}
  //         <Button variant="contained" color="primary" onClick={handleUpdate}>
  //           Update User
  //         </Button>
  //         <Button variant="contained" color="secondary" onClick={handleDelete}>
  //           Delete User
  //         </Button>
  //       </Box>
  //     </Container>
  //   </ThemeProvider>
  // );
};

export default UserCard;