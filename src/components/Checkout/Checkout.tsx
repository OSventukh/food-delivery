'use client';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CheckoutData from './CheckoutData';
import CheckoutOrder from './CheckoutOrder';
import { Button } from '@mui/material';
import CartContext from '@/context/cart-context';
import NotificationContext from '@/context/notification-context';

import { sendData } from '@/utils/fetch';
import Container from '@mui/material/Container';

export default function Checkout() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  const router = useRouter();

  const { items, clearCart } = useContext(CartContext);
  const { setError, setSuccess, clearNotification } = useContext(NotificationContext);
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

  const checkoutSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    clearNotification();

    const orderData = {
      user: {
        firstname: firstName,
        lastname: lastName,
        email,
        phone,
        address: {
          street,
          house: houseNumber,
        },
      },
      items: [
        ...items.map((item) => ({ id: item.id, quantity: item.quantity })),
      ],
    };
    try {
      await sendData('/api/orders', orderData);
      setSuccess('Order successfully created');
      clearCart();
      router.replace('/');
    } catch (error) {
      setError( error instanceof Error ? error.message : 'Order not created');
    }
  };

  return (
    <Container>
      <Paper
        component="form"
        onSubmit={checkoutSubmitHandler}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '1rem 2rem',
        }}
      >
        <Grid container>
          <CheckoutData
            onFirstName={firstNameChangeHandler}
            onLastName={lastNameChangeHandler}
            onEmail={emailChangeHandler}
            onPhone={phoneChangeHandler}
            onStreet={streetChangeHandler}
            onHouseNumber={houseNumberChangeHandler}
          />
          <CheckoutOrder />
        </Grid>
        <Button type="submit">Submit</Button>
      </Paper>
    </Container>
  );
}
