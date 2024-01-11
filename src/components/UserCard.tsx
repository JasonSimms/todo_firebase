import { useAuth } from "../contexts/AuthContext";
import React, { useState } from 'react';
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { User } from '../models/User';

interface UserCardProps {
  currentUser: {
    email: string;
    displayName?: string;
    household?: string;
    completedTasks?: { title: string; date: string }[];
  };
}



const UserCard: React.FC<UserCardProps> = ({ currentUser  }) => {
  // Component logic using currentUser
  return (
    <div>
      {/* Render the UserCard component using currentUser */}
      {/* ... */}
      {JSON.stringify(currentUser)}
    </div>
  );
};
// const UserCard: React.FC<User> = ({
//   email,
//   displayName,
//   household,
//   completedTasks,
// }) => {
//   const [editedDisplayName, setEditedDisplayName] = useState(email);
//   const [editedHousehold, setEditedHousehold] = useState(household);
//     const { currentUser } = useAuth();
//     if(!currentUser) return <>UserCard Failed to find CurrentUser!</>

  
//     const handleDisplayNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       setEditedDisplayName(event.target.value);
//     };
  
//     const handleHouseholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       setEditedHousehold(event.target.value);
//     };
  
//     return (
//       <div>
//         <TextField
//           label="Display Name"
//           value={editedDisplayName}
//           onChange={handleDisplayNameChange}
//         />
//         <TextField
//           label="Household"
//           value={editedHousehold}
//           onChange={handleHouseholdChange}
//         />
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>Date</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {/* {completedTasks.map((task, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{task.title}</TableCell>
//                   <TableCell>{task.date}</TableCell>
//                 </TableRow>
//               ))} */}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Button variant="contained" color="primary">
//           Save Changes
//         </Button>
//       </div>
//     );
//   };
  




//  return (
//   <div>
//     <h1>UserCard</h1>
//     <p>{JSON.stringify(currentUser)}</p>
//   </div>
//  );
// }
export default UserCard;