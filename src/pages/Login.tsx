import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField,
  Container,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { loginFirebase } from '../lib/firebase';
import { useAuthStore } from '../store';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [state, setState] = useState({ email: '', passwd: '' });

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginFirebase(state.email, state.passwd).then((user) => {
      if (!user) {
        return;
      }
      user.getIdToken().then((accessToken) => {
        login({
          uid: user.uid,
          displayName: user.displayName || '',
          email: user.email || '',
          accessToken,
        });
        navigate('/');
      });
    });
  }, [state, login, navigate]);

  return (
    <Container component="main" maxWidth="xs" sx={{ pt: '100px' }}>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }}}>
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
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
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
            value={state.passwd}
            onChange={(e) => setState({ ...state, passwd: e.target.value })}
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
        <Link to='/auth/signup' style={{ textDecoration: "none" }}>
          <Box display="flex" justifyContent="center">회원가입하기</Box>
        </Link>
      </Paper>
    </Container>
  );
};

export default Login;