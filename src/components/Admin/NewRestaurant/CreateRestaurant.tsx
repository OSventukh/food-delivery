'use client';
import { ChangeEvent, FormEvent, useState, useContext } from 'react';
import NotificationContext from '@/context/notification-context';
import Paper from '@mui/material/Paper/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { sendData } from '@/utils/fetch';

export default function CreateRestaurant() {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  const { setError, setSuccess, clearNotification } = useContext(NotificationContext);

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
    clearNotification();
    try {
      await sendData('/api/restaurants', {
        name: name,
        address: {
          street: street,
          house: houseNumber,
        },
      });
      setSuccess('Restaurant was successfully created')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    }
  };

  return (
    <Paper sx={{ p: '1rem 3rem' }}>
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
