/**
 * This file defines the Dashboard component.
 * It includes the logic for handling user authentication, navigation, and rendering the dashboard UI.
 */

import * as React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AddTaskIcon from '@mui/icons-material/AddTask';


// Define the structure for a page
interface Page {
   label: string;
   action?: () => void;
  }
  
  // Main Dashboard component
  const Dashboard: React.FC = () => {
   // Get the current user and logout function from AuthContext
   const { currentUser, logout } = useAuth();
   // Get the navigate function from react-router-dom
   const navigate = useNavigate();
  
   // Function to handle logout
   const handleLogout = async () => {
    await logout();
    navigate('/');
   };
  
   // Array of pages with their respective actions
   const pages: Page[] = [
    { label: 'New Task', action: () => navigate('/newtask') },
    { label: 'Complete a Task', action: () => navigate('/tasks') },
    { label: 'Household', action: () => navigate('/household') },
   ];
  
   // Array of settings with their respective actions
   const settings = [
    { name: 'Profile', action: () => navigate('/user') },
    { name: 'Logout', action: handleLogout },
   ];
  
   // State for managing the navigation menu
   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
   // State for managing the user menu
   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
   // Function to open the navigation menu
   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
   };
  
   // Function to open the user menu
   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
   };
  
   // Function to close the navigation menu
   const handleCloseNavMenu = (callback : Function) => {
    setAnchorElNav(null);
    callback();
   };
  
   // Function to close the user menu
   const handleCloseUserMenu = () => {
    setAnchorElUser(null);
   };

   // Support the Avatar Icon with a random color and unique letters per email.
   function stringToColor(string: string) {
      let hash = 0;
      let i;

      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
         hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }

      let color = '#';

      for (i = 0; i < 3; i += 1) {
         const value = (hash >> (i * 8)) & 0xff;
         color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */

      return color;
   }

   //Reduce a displayedname to 2 characters for Avatar
   function stringAvatar(name: string) {
      return {
         sx: {
            bgcolor: stringToColor(name),
         },
         children: `${name[0]}${name[1]}`,
      };
   }


   return (
      <AppBar position="static">
         <Container maxWidth="xl">
            <Toolbar disableGutters>
               <AddTaskIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
               <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  // href="#app-bar-with-responsive-menu"
                  sx={{
                     mr: 2,
                     display: { xs: 'none', md: 'flex' },
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.3rem',
                     color: 'inherit',
                     textDecoration: 'none',
                  }}
               >
                  ChoreMaster
               </Typography>

               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleOpenNavMenu}
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: 'block', md: 'none' },
                     }}
                  >
                     {pages.map((page) => (
                        <MenuItem key={page.label} onClick={() => { if (page.action) handleCloseNavMenu(page.action) }}>
                           <Typography textAlign="center">{page.label}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
               <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
               <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                     mr: 2,
                     display: { xs: 'flex', md: 'none' },
                     flexGrow: 1,
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.3rem',
                     color: 'inherit',
                     textDecoration: 'none',
                  }}
               >
               </Typography>
               <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                     <Button
                        key={page.label}
                        onClick={() => { if (page.action) handleCloseNavMenu(page.action) }}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        disabled={!currentUser}
                     >
                        {page.label}
                     </Button>
                  ))}
               </Box>

               <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                     <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                     {currentUser ? (currentUser.photoUrl ? <Avatar alt="Remy Sharp" src={currentUser.photoUrl} /> : <Avatar {...stringAvatar(currentUser.email)} />) : <></>} </IconButton>
                  </Tooltip>
                  <Menu
                     sx={{ mt: '45px' }}
                     id="menu-appbar"
                     anchorEl={anchorElUser}
                     anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     open={Boolean(anchorElUser)}
                     onClose={handleCloseUserMenu}
                  >
                     {settings.map((setting) => (
                        <MenuItem key={setting.name} onClick={() => { handleCloseUserMenu(); setting.action(); }}>
                           <Typography textAlign="center">{setting.name}</Typography>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
}

export default Dashboard;