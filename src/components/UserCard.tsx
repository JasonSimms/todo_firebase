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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();


const UserCard: React.FC = () => {
  const user = useAuth().currentUser;

  const [displayedUser, setdDisplayedUser] = useState(user);

  const handleUpdate = () => {
    // Implement update logic here
  };

  const handleDelete = () => {
    // Implement delete logic here
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log('name =>', name, "  value =>", value);

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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {displayedUser && (
            <>
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
                name="email"
                value={displayedUser.email}
                onChange={handleInputChange}
              />
              <Table>
                <TableHead>
                </TableHead>
                <TableBody>
                  {displayedUser.completedTasks && displayedUser.completedTasks.length > 0 ? (
                    displayedUser.completedTasks.map((task, index) => (
                      <TableRow key={index}>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.date}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2}>No tasks completed</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update User
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete User
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserCard;