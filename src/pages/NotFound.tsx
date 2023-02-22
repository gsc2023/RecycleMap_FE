import React from 'react';
import { Typography, Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
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
      <Button onClick={() => navigate('/map')}>
        asdf
      </Button>
    </Box>
  );
};

export default NotFound;
