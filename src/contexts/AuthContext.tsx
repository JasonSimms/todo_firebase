import { useContext, useState, useEffect, createContext, ReactNode } from 'react';
import { auth } from '../firebase/firebaseconfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseService } from '../services/FirestoreServices';
// import { User } from '../models/User';
// import { getAuth } from "firebase/auth";
import * as admin from 'firebase-admin';
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';



interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  photoUrl: string;
 }

// Context for the Auth Provider
interface AuthContextProps {
  currentUser: AuthUser | null;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  proceedWithGooglePopup: () => Promise<void>;
  // resetPassword: (email: string) => Promise<void>;
  // updateEmail: (email: string) => Promise<void>;
  // updatePassword: (password: string) => Promise<void>;
}

//Create the context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

//Generic type for all children
interface AuthProviderProps {
  children: ReactNode;
}

// Function component that provides authentication context to its children
export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  
const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  const [loading, setLoading] = useState(true);

  async function proceedWithGooglePopup() {
    const provider = await new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // console.log('result', result);
    if (result) {
      const moreInfo = getAdditionalUserInfo(result);
      const newUser = moreInfo?.isNewUser;
      if (!newUser) return;
      let email = result.user.email;
      let uid = result.user.uid;
      let displayName = result.user.displayName;
      let photoURL = result.user.photoURL;
      if (email && uid && displayName && photoURL) {
        const firebaseService = new FirebaseService(); //Firestore User doc creation
        await firebaseService.createUser(email, uid, displayName, photoURL);
        console.log('new user created from google!')
     }
    }
  }

  /**
   * Signup Flow for new user from Firebase
   * 
   * @param email - user provided email string
   * @param password - user provided password string
   */
  async function signup(email: string, password: string, displayName: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);  //Firebase Auth
      const user = userCredential.user;

      const firebaseService = new FirebaseService(); //Firestore User doc creation
      await firebaseService.createUser(email, user.uid, displayName);
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Use the specific Error type
        console.error('Sign-up error:', error.message);
      } else {
        // Fallback for other types of errors
        console.error('An error occurred during sign-up:', error);
      }
    }
  }

  /**
   * Login Process from Firebase
   * 
   * @param email - user provided email string
   * @param password - user provided password string
   */
  async function login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;
      // console.log(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Use the specific Error type
        console.error('Sign-up error:', error.message);
      } else {
        // Fallback for other types of errors
        console.error('An error occurred during sign-up:', error);
      }
    }
  }

  /**
   * 
   * Logout from Firebase
   */
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

  // Effect hook to set up an observer for changes in authentication state
  useEffect(() => {
    // Subscribe to changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Update the current user state when the authentication state changes
      // console.log('auth state changed what is available? ', user);
      setCurrentUser(user ? { uid: user.uid, email: user.email || '', displayName: user.displayName || '', photoUrl: user.photoURL || '' } : null);
      // Set loading to false once authentication state is determined
      setLoading(false);
    });

    // Cleanup: Unsubscribe from the authentication state observer on component unmount
    return unsubscribe;
  }, []);

  // Define the value for the authentication context
  const value: AuthContextProps = {
    currentUser, // Current authenticated user information
    login,       // Function to handle user login (not shown in the provided code)
    signup,      // Function to handle user signup (not shown in the provided code)
    logout,      // Function to handle user logout (not shown in the provided code)
    proceedWithGooglePopup,
    // Additional functions (e.g., resetPassword, updateEmail, updatePassword) may be added as needed
  };

  // Provide the authentication context to its children
  return (
    <AuthContext.Provider value={value}>
      {/* Render the children only when the authentication state is determined (not loading) */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function handlePasswordReset() {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for
    // this URL must be whitelisted in the Firebase Console.
    url: 'https://www.example.com/checkout?cartId=1234',
    // This must be true for email link sign-in.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios',
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12',
    },
    // FDL custom domain.
    dynamicLinkDomain: 'coolapp.page.link',
  };

  // Admin SDK API to generate the password reset link.
  // const userEmail = email;
  console.log('Not Yet Implemented')
  // admin.auth().generatePasswordResetLink('simmsthecoder@gmail.com', actionCodeSettings)
  //   .then((link:string) => {
  //     // Construct password reset email template, embed the link and send
  //     // using custom SMTP server.
  //     console.log('results,',link);
  //     // return sendCustomPasswordResetEmail(userEmail, displayName, link);
  //   })
  //   .catch((error:any) => {
  //     console.error(error)// Some error occurred.
  //   });
}