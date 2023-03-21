import React, { memo } from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';

// interface Props {
//   setUserList: React.Dispatch<React.SetStateAction<string>>;
// }

const UserForm: React.FC = () => {

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //     name: data.get('name'),
  //   })
  // }

  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      {/* <TextField 
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
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
      /> */}
    </Box>
  );
};

export default memo(UserForm);
