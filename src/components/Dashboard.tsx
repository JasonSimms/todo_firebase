import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';


const Dashboard: React.FC = () => {
   const navigate = useNavigate();
   const { currentUser, logout } = useAuth()
  


   const handleLogout = async () => {
      await logout();
      navigate('/');
      };

   return (
      <Stack direction="row" spacing={2}>
         <Button color="secondary" disabled={!currentUser}>Secondary</Button>
         <Button variant="contained" color="success" disabled={!currentUser} onClick={()=>navigate('/newtask')}>
            New
         </Button>
         <Button variant="outlined" color="error" disabled={!currentUser} onClick={()=>navigate('/tasks')}>
            View Tasks
         </Button>
         <Button variant="outlined" color="error" disabled={!currentUser} onClick={()=>navigate('/user')}>
            View User
         </Button>
         {currentUser ? <>
         <h2>User: {currentUser && currentUser.email || null} </h2>
         <Button onClick={handleLogout}>
            Sign out
         </Button>
         </> : <>please sign in</>}
      </Stack>
   );
}

export default Dashboard;