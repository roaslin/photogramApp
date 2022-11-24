import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState } from 'react';
import './Login.css';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';

const Login = () => {
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
          PhotoGram
        </Typography>
        <TextField
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type='password'
          label='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <Button variant='contained' sx={{ marginTop: 2 }}>
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
