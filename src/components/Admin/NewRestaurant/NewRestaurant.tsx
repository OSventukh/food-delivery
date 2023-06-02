'use client';
import { ChangeEvent, FormEvent, useState, useContext } from 'react';
import NotificationContext from '@/context/notification-context';
import Paper from '@mui/material/Paper/Paper';
import TextField from '@mui/material/TextField';
import LoadingButton from '@/components/UI/LoadingButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { sendData } from '@/utils/fetch';

export default function NewRestaurant() {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { setError, setSuccess, clearNotification } =
    useContext(NotificationContext);

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

  const clearForm = () => {
    setName('');
    setStreet('');
    setHouseNumber('');
  };

  const createRestaurantSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    clearNotification();
    setIsLoading(true);
    try {
      await sendData('/api/restaurants', {
        name: name,
        address: {
          street: street,
          house: houseNumber,
        },
      });
      setSuccess('Restaurant was successfully created');
      clearForm();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
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
            value={name}
            size="small"
          />
          <Typography sx={{ textAlign: 'center' }}>Address</Typography>
          <TextField
            id="restaurant-street"
            label="Street"
            variant="outlined"
            onChange={streetChangeHandler}
            value={street}
            size="small"
          />
          <TextField
            id="restaurant-house"
            label="House number"
            variant="outlined"
            onChange={houseNumberChangeHandler}
            value={houseNumber}
            size="small"
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <LoadingButton text="Create" loading={isLoading} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
