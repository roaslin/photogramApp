import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
import './Signup.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Stack sx={{ color: 'white' }}>
        <Typography
          sx={{
            color: 'black',
            marginBottom: 5,
            marginTop: -15,
            textAlign: 'center',
          }}
        >
          Sign up form
        </Typography>
        <TextField
          label='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <TextField
          type='password'
          label='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <Button variant='contained' sx={{ marginTop: 2 }}>
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
