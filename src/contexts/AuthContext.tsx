import React, { useContext, useState, useEffect, createContext, ReactNode } from 'react';
import { auth } from '../firebase/firebaseconfig';
import { createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword  } from 'firebase/auth';
import {FirebaseService} from '../services/FirebaseService';

interface User {
  uid: string;
  email: string;
}

interface AuthContextProps {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  // resetPassword: (email: string) => Promise<void>;
  // updateEmail: (email: string) => Promise<void>;
  // updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string): Promise<void> {
    console.log('initiating signup...');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      // await createUser(email,user.uid);
    } catch (error:unknown) {
      if (error instanceof Error) {
        // Use the specific Error type
        console.error('Sign-up error:', error.message);
      } else {
        // Fallback for other types of errors
        console.error('An error occurred during sign-up:', error);
      }
    }
  }

  async function login(email: string, password: string): Promise<any> {
    // signsignInWithEmailAndPassword
    console.log('initiating login...');
    const firebaseService = new FirebaseService() ;
    firebaseService.createUser('email', 'password');
    // try {
    //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //   const user = userCredential.user;
    //   console.log(user);
    // } catch (error:unknown) {
    //   if (error instanceof Error) {
    //     // Use the specific Error type
    //     console.error('Sign-up error:', error.message);
    //   } else {
    //     // Fallback for other types of errors
    //     console.error('An error occurred during sign-up:', error);
    //   }
    
  }

  function logout(): Promise<void> {
    return auth.signOut();
  }

  // function resetPassword(email: string): Promise<void> {
  //   return auth.sendPasswordResetEmail(email);
  // }

  // function updateEmail(email: string): Promise<void> {
  //   return currentUser?.updateEmail(email) ?? Promise.resolve();
  // }

  // function updatePassword(password: string): Promise<void> {
  //   return currentUser?.updatePassword(password) ?? Promise.resolve();
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user ? { uid: user.uid, email: user.email || '' } : null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextProps = {
    currentUser,
    login,
    signup,
    logout,
    // resetPassword,
    // updateEmail,
    // updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}