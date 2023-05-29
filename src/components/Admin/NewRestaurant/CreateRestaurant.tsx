'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import Paper from '@mui/material/Paper/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { sendData } from '@/utils/fetch';
import Snack from '@/components/UI/SnackBar';
export default function CreateRestaurant() {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setName(enteredName);
  };
  const streetChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const enteredStreet = event.target.value;
    setStreet(enteredStreet);
  };
  const houseNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const enteredHouseNumber = event.target.value;
    setHouseNumber(enteredHouseNumber);
  };

  const createRestaurantSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    setSuccessMessage('');
    setSuccess(false);
    setErrorMessage('');
    setError(false);
    try {
      await sendData('/api/restaurants', {
        name: name,
        address: {
          street: street,
          house: houseNumber,
        },
      });
      setSuccessMessage('Restaurant was successfully created');
      setSuccess(true);
    } catch (error) {
      console.log(error)
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong'
      );
      setError(true);
    }
  };

  return (
    <Paper sx={{ p: '1rem 3rem' }}>
      <Snack
        show={error || success}
        text={error ? errorMessage : success ? successMessage : ''}
        type={error ? 'error' : 'success'}
      />
      <Typography
        variant="h5"
        component="h2"
        sx={{ textAlign: 'center', mb: '2rem' }}
      >
        New Restaurant
      </Typography>
      <Box
        component="form"
        onSubmit={createRestaurantSubmitHandler}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          justifyContent: 'center',
        }}
      >
        <TextField
          id="restaurant-name"
          label="Name"
          variant="outlined"
          onChange={nameChangeHandler}
        />
        <Typography sx={{ textAlign: 'center' }}>Address</Typography>
        <TextField
          id="restaurant-street"
          label="Street"
          variant="outlined"
          onChange={streetChangeHandler}
        />
        <TextField
          id="restaurant-house"
          label="House number"
          variant="outlined"
          onChange={houseNumberChangeHandler}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit">Create</Button>
        </Box>
      </Box>
    </Paper>
  );
}
