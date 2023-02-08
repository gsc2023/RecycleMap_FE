import React from 'react';
import './App.scss';
import { Box } from '@mui/system';
import { createStyle } from './lib/styleHelper';
import { Typography } from '@mui/material';

const style = createStyle({
  top: {
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
});

const App: React.FC = () => {
  return (
    <Box sx={style.sx.top}>
      <Typography>
        Hello, World!
      </Typography>
    </Box>
  );
}

export default App;
