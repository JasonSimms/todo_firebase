import { useAuth } from "../contexts/AuthContext";
import React, { useState, useEffect } from "react";
import { FirebaseService } from "../services/FirestoreServices";
import { Card, CardContent, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import CompletedTasksList from "./UserCompleteTaskTable";

import { User } from "../models/User";

const UserCard: React.FC = () => {
  
  const user = useAuth().currentUser;
  const [displayedUser, setdDisplayedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  
  const fetchProfile = async () => {
  const firebaseService = new FirebaseService();
    if (user !== null) {
      const { uid } = user;
      const userProfile = await firebaseService.getUserById(uid);
      setdDisplayedUser(userProfile);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleUpdate = () => {
  //   // Implement update logic here
  // };

  // const handleDelete = () => {
  //   // Implement delete logic here
  // };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   console.log("name =>", name, "  value =>", value);
  //   console.log(displayedUser);

  //   setdDisplayedUser((prevUser) => {
  //     if (!prevUser) {
  //       // If prevUser is null, initialize it with default values
  //       return {
  //         uid: "",
  //         email: "",
  //         household: "",
  //         displayName: "",
  //         completedTasks: [],
  //         [name]: value,
  //       };
  //     } else {
  //       // Otherwise, spread the previous state and overwrite the changed property
  //       return {
  //         ...prevUser,
  //         [name]: value,
  //       };
  //     }
  //   });
  // };

  if (!user) {
    return <div>No user data available!!</div>;
  }
  if (!displayedUser) return <LinearProgress color="secondary" />;

  return loading ? (
    <LinearProgress color="secondary" />
  ) : (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5">{displayedUser.displayName}</Typography>
          <Typography variant="body2">Email: {displayedUser.email}</Typography>
          <Typography variant="body2">
            Household: {displayedUser.household || "N/A"}
          </Typography>
          {/* <Typography variant="body2">
            Completed Tasks: {displayedUser.completedTasks?.length || 0}
          </Typography> */}
        </CardContent>
      </Card>
      <CompletedTasksList id={user.uid}/>
    </>
  );
};

export default UserCard;
