import React, {useContext} from 'react';
import { useAuth } from "../contexts/AuthContext";
import { FirestoreContext } from '../contexts/FirestoreContext';
import { collection, getDocs, QueryDocumentSnapshot, FirestoreDataConverter,WithFieldValue,SnapshotOptions } from "firebase/firestore";

interface User {
  email: string;
  uid?: string;
}


const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: WithFieldValue<User>) => {
    let userCopy = {...user};
    delete userCopy.uid;
    return userCopy;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options?: SnapshotOptions) => {
    const data = snapshot.data(options) as User;
    const user = {
      id: snapshot.id,
      ...data
    } as User;
    return user;
  }
}

const UserCard: React.FC = () => {
  
  const { currentUser } = useAuth();

  console.log('beep?',currentUser);

  const db = useContext(FirestoreContext);

  const getUsers = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const usersCollectionRef = collection(db, 'users').withConverter(userConverter);
    const querySnapshot = await getDocs(usersCollectionRef);
    
    querySnapshot.forEach((doc) => {
      const user: User = doc.data();
      console.log(`${doc.id} => ${JSON.stringify(user)}`);
     });
   }


 return (
  <div>
    <h1>UserCard</h1>
    <p>{JSON.stringify(currentUser)}</p>
    <button onClick={getUsers}>GO....</button>
  </div>
 );
}
export default UserCard;