import React from 'react';
import './App.css';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth} from './firebase/firebaseconfig';


function App() {
  const handleGoogle = async (e : React.MouseEvent) => {
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleGoogle}>
          Sign in with Google
        </button>
        <p>
          Ahoy there.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
