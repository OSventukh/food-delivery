'use client';
import React, { useState, useContext } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CheckoutData from './CheckoutData';
import CheckoutOrder from './CheckoutOrder';
import { Button } from '@mui/material';
import CartContext from '@/context/cart-context';
export default function Checkout() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  const { items } = useContext(CartContext)
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

  const checkoutSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const orderData = {
      user: {
        firstName,
        lastName,
        email,
        phone,
        street,
        houseNumber,
      },
      order: [...items.map((item) => ({id: item.id, quantity: item.quantity}))]
    };
    console.log(orderData)
  };

  return (
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
  );
}
