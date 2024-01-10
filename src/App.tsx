import React from 'react';
import './App.css';

import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import { AuthProvider } from './contexts/AuthContext';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {



  return (
    <AuthProvider>

      <div className="App">
        <Dashboard />
        <Signup />
        <p>
          Ahoy there.
        </p>
      </div>
    </AuthProvider>
  );
}

export default App;
