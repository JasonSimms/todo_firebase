import React from 'react';
import './App.css';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth} from './firebase/firebaseconfig';

import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import  {AuthProvider}  from './contexts/AuthContext';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {

  const handleGoogle = async (e : React.MouseEvent) => {
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

 
  return (
    <AuthProvider>

    <div className="App">
      <Dashboard />
      <Signup/>
        <button onClick={handleGoogle}>
          Sign in with Google
        </button>
        <p>
          Ahoy there. 
        </p>
    </div>
    </AuthProvider>
  );
}

export default App;
