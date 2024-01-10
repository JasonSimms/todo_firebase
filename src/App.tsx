import React, { ReactNode } from 'react';
import './App.css';

import Dashboard from './components/Dashboard';
import NewTask from './components/NewTask';
import Signup from './components/Signup';
import TaskTable from './components/TaskTable';
import UserCard from './components/UserCard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useAuth(); // Get the current user from your AuthContext

  return currentUser ? <>{children}</> : <Signup />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
        <Router>
          <Dashboard />
      <ProtectedRoute>
          <Routes>
            <Route path="/"><>You are logged in!</></Route>
            <Route path="newtask" Component={NewTask} />
            <Route path="tasks" Component={TaskTable} />
            <Route path="user" Component={UserCard} />
          </Routes>
      </ProtectedRoute>
        </Router>
    </AuthProvider>
  );
}

export default App;