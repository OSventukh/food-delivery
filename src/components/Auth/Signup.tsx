'use client';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import CustomerData from './CustomerData';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NotificationContext from '@/context/notification-context';
import Container from '@mui/material/Container';
import { sendData } from '@/utils/fetch';

export default function Signup() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [password, setPassword] = useState('');
  
  const router = useRouter();

  const { setSuccess, setError, clearNotification } = useContext(NotificationContext);

  const firstNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setFirstName(value);
  };

  const lastNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setLastName(value);
  };

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
  };

  const phoneChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone(value);
  };

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
  };

  const streetChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStreet(value);
  };

  const houseNumberChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setHouseNumber(value);
  };

  const signupSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    clearNotification();
    
    const enteredUserData = {
      firstname: firstName,
      lastname: lastName,
      email,
      phone,
      password,
      address: {
        street,
        house: houseNumber,
      },
    };

    try {
      await sendData('/api/auth/signup', enteredUserData);
      setSuccess('You have successfully registered and can now login');
      router.replace('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
    }
  }
  return (
    <Container>
      <Paper
        sx={{
          mt: '5rem',
          p: '1rem 5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        component="form"
        onSubmit={signupSubmitHandler}
      >
        <Typography variant="h5">SignUp</Typography>
        <CustomerData
          withPassword
          onFirstName={firstNameChangeHandler}
          onLastName={lastNameChangeHandler}
          onEmail={emailChangeHandler}
          onPhone={phoneChangeHandler}
          onPassword={passwordChangeHandler}
          onStreet={streetChangeHandler}
          onHouseNumber={houseNumberChangeHandler}
        />
        <Box>
          <Button type="submit">SignUp</Button>
        </Box>
      </Paper>
    </Container>
  );
}
