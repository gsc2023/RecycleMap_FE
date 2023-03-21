import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from "axios";

import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';

const Login: React.FC = () => {

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userData = {
      Email: data.get('email'),
      Password: data.get('password'),
    };

    axios.post('/login', userData).then((response: AxiosResponse) => {
      alert("로그인이 정상적으로 완료되었습니다.");
      console.log(response.data);
      navigate('/');
    })
    .catch(() => {
      console.log("Axios Error");
    });

  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }}}>
        <Typography variant="h6" align="center">로그인</Typography>
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
          <Button
            color="primary"
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        <Box display="flex" justifyContent="center"><Button onClick={() => navigate('/auth/signup')}>회원가입하기</Button></Box>
      </Paper>
    </Container>
  );
};

export default Login;
