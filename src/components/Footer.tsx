import { Typography, Link } from '@mui/material';

export default function Footer() {
        return (
          <Typography variant="body2" color="text.secondary" align="center">
            <Link color="inherit" href="https://github.com/JasonSimms/todo_firebase" target="_blank" rel="noopener noreferrer">
              See This Code on GitHub.
            </Link>
          </Typography>
        );
}
