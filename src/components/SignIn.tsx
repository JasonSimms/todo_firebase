import React from 'react'
import { useAuth } from '../contexts/AuthContext';

import About from './About';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Google } from '@mui/icons-material';

const defaultTheme = createTheme();

export default function SignInComponent() {
  // Get the navigate function from react-router-dom
  const navigate = useNavigate();
  const { login, proceedWithGooglePopup } = useAuth();

  const handleGoogle = async (e: React.MouseEvent) => {
    e.preventDefault();
      await proceedWithGooglePopup();
      navigate('/tasks');
    }
  

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate('/tasks');
      // Handle successful login
    } catch (error) {
      // Handle login errors
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    handleLogin(email, password);  //TODO Alert on error

  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <About />
          <br/>

          
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> */}
            {/* <LockOutlinedIcon /> */}
          {/* </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            /> */}
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            {/* <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 0, mb: 1 }}
              name="login"
            >
              login
            </Button> */}
            <Button fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 2 }}
              onClick={handleGoogle}
              startIcon={<Google />}
              color={'secondary'}>
              Proceed in with Google
            </Button>
            <Button fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 2 }}
              onClick={() => handleLogin('max@gmail.com', 'maxPass')}
              color={'success'}>
              Sign in as Max Mustermann (DEMO)
            </Button>
            <Button fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 2 }}
              onClick={() => handleLogin('erika@gmail.com', 'erikaPass')}
              color={'info'}>
              Sign in as Erika Mustermann (DEMO)
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2" onClick={handlePasswordReset}>
                  Forgot password?
                </Link>
              </Grid> */}
              {/* <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>)
}
