import React from 'react';
import { Typography, Box } from '@mui/material';

const NotFound: React.FC = () => (
  <Box
    sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Typography component="h1">
      Page Not Found!
    </Typography>
  </Box>
);

export default NotFound;
