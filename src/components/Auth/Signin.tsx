'use client';
import { useRef, useContext } from 'react';
import { useRouter } from 'next/navigation';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import NotificationContext from '@/context/notification-context';
import { signIn } from 'next-auth/react';


export default function Signin() {
  const phoneRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const router = useRouter();

  const { setError, setSuccess, clearNotification } =
    useContext(NotificationContext);

  const signinSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    clearNotification();
    const phone = phoneRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    if (!phone) {
      setError('Please, enter the phone number');
    }

    if (!password) {
      setError('Please, enter the password');
    }

    try {
      const response = await signIn('credentials', { phone, password });
      if (response?.error) {
        throw new Error(response.error);
      }
      router.back();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <Container>
      <Paper
        sx={{
          margin: 'auto',
          mt: '5rem',
          p: { xs: '1rem', sm: '1rem 5rem' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: {
            xs: '80%',
            md: '50%',
          },
        }}
        component="form"
        onSubmit={signinSubmitHandler}
      >
        <Typography variant="h5">SignIn</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            p: '1rem 2rem',
            width: '100%',
          }}
        >
          <TextField
            id="phone"
            label="Phone"
            variant="filled"
            size="small"
            autoComplete="tel"
            inputRef={phoneRef}
            required
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            variant="filled"
            size="small"
            inputRef={passwordRef}
            required
          />
        </Box>
        <Box>
          <Button type="submit">SignIn</Button>
        </Box>
      </Paper>
    </Container>
  );
}
