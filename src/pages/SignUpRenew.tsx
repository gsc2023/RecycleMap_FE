import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';

// interface Payload {
//   Email?: String,
//   EmailVerified?: Boolean,
//   PhonNumber?: String,
//   Password?: String,
//   DisplayName?: String,
//   PhotoURL?: String,
//   Disabled?: Boolean
// }

const SignUpRenew: React.FC = () => {

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userData = {
      Email: data.get('email'),
      Password: data.get('password'),
      DisplayName: data.get('nickname'),
    };

    axios.post('/auth/signup', userData).then(() => {
      alert("회원가입이 정상적으로 완료되었습니다.");
      navigate('/auth/signin');
    })
    .catch(() => {
      console.log("Axios Error");
    });

  };

  return (
    <Container component="main" maxWidth="xs" sx={{ pt: '100px' }}>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }}}>
        <Typography variant="h6" align="center">회원가입</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField 
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField 
            margin="normal"
            required
            fullWidth
            id="password"
            type="password"
            label="Password"
            name="password"
            autoComplete="password"
            autoFocus
          />
          <TextField 
            margin="normal"
            required
            fullWidth
            id="nickname"
            label="Nickname"
            name="nickname"
            autoComplete="nickname"
            autoFocus
          />
          <Button
            color="primary"
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUpRenew;