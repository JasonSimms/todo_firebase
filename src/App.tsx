import React, { ReactNode } from 'react';
import './App.css';

// Import necessary components
import Dashboard from './components/Dashboard';
import NewTask from './components/NewTaskForm';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TaskTable from './components/TaskTable';
import UserCard from './components/UserCard';
import Footer from './components/Footer';
import CompletedTaskTable from './components/CompletedTaskTable';

// Import necessary hooks and services
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LocalizationContext from './contexts/LocalizationContext';

// Import necessary fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Define the props for the ProtectedRoute component
interface ProtectedRouteProps {
  children: ReactNode;
  unprotectedPaths?: string[];
}

// Define the ProtectedRoute component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, unprotectedPaths = [] }) => {
  const { currentUser } = useAuth(); // Get the current user from your AuthContext
  const location = useLocation();
  // If the user is not authenticated and the current path is not in the unprotectedPaths array, render the SignIn component
  if (!currentUser && !unprotectedPaths.includes(location.pathname)) {
    return <SignIn />;
  }
  // Otherwise, render the children
  return <>{children}</>;
};



// Define the App component
const App: React.FC = () => {
  return (
    <AuthProvider>
      <LocalizationContext>
        <Router>
          {/* <button onClick={handleClick}>Debug: Click here</button> */}
          <Dashboard />
          <ProtectedRoute unprotectedPaths={['/signup', '/login']}>
            <Routes>
              <Route path="signup" Component={SignUp} />
              <Route path="/login" Component={SignIn} />
              <Route path="/"><>You are logged in!</></Route>
              <Route path="newtask" Component={NewTask} />
              <Route path="tasks" Component={TaskTable} />
              <Route path="user" element={<UserCard />} />
              <Route path="/household" element={<CompletedTaskTable/>} />

            </Routes>
          </ProtectedRoute>
          <Footer />
        </Router>
      </LocalizationContext>

    </AuthProvider>
  );
}

export default App;