'use client';
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CustomerData from '../Auth/CustomerData';
import CheckoutOrder from './CheckoutOrder';
import { Button } from '@mui/material';
import CartContext from '@/context/cart-context';
import NotificationContext from '@/context/notification-context';
import getLocation from '@/utils/location';
import { sendData } from '@/utils/fetch';
import Container from '@mui/material/Container';
import { Session } from 'next-auth';
import Map from '../Map';

export default function Checkout({ session }: { session: Session | null }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');

  const [restaurantLocation, setRestaurantLocation] =
    useState<google.maps.LatLngLiteral>();
  const [customerLocation, setCustomerLocation] =
    useState<google.maps.LatLngLiteral>();

  const router = useRouter();

  const { items, clearCart, restaurant } = useContext(CartContext);
  const { setError, setSuccess, clearNotification } =
    useContext(NotificationContext);
    
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

  // get restaurant location
  useEffect(() => {
    (async () => {
      if (restaurant) {
        const restaurantLocation = await getLocation(
          `${restaurant?.address.house} ${restaurant?.address.street}, ${restaurant?.address.city}`
        );
        setRestaurantLocation(restaurantLocation);
      }
    })();
  }, [restaurant]);

  // get customer location
  useEffect(() => {
    if (street && houseNumber) {
      (async () => {
        const customerLocation = await getLocation(
          `${houseNumber} ${street}, Kyiv`
        );
        setCustomerLocation(customerLocation);
      })();
    }
    if (session?.user) {
      const { house: houseNumber, street} = session.user.address;
      (async () => {
        const customerLocation = await getLocation(
          `${houseNumber} ${street}, Kyiv`
        );
        setCustomerLocation(customerLocation);
      })();
    }
  }, [street, houseNumber, session]);

  const checkoutSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    clearNotification();

    const enteredUserData = {
      firstname: firstName,
      lastname: lastName,
      email,
      phone,
      address: {
        street,
        house: houseNumber,
      },
    };
    const orderData = {
      user: session?.user ? session.user : enteredUserData,
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
      setError(error instanceof Error ? error.message : 'Order not created');
    }
  };

  const createMarkers = () => {
    const markersData = [];
    if (restaurantLocation) {
      markersData.push({
        position: restaurantLocation,
        title: restaurant?.name,
      });
    }
    if (customerLocation) {
      markersData.push({
        position: customerLocation,
        title: `${firstName} ${lastName}`,
      });
    }

    return markersData;
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
          mt: '5rem',
        }}
      >
        <Grid container justifyContent="center" spacing={5}>
          {!session?.user && (
            <Grid
              item
              display="flex"
              flexGrow="1"
              alignItems="center"
              direction="column"
            >
              <CustomerData
                onFirstName={firstNameChangeHandler}
                onLastName={lastNameChangeHandler}
                onEmail={emailChangeHandler}
                onPhone={phoneChangeHandler}
                onStreet={streetChangeHandler}
                onHouseNumber={houseNumberChangeHandler}
              />
            </Grid>
          )}
          <Grid
            item
            display="flex"
            flexGrow="2"
            alignItems="center"
            direction="column"
          >
            <Map
              center={{
                lat: parseFloat('50,428435709353245'),
                lng: parseFloat('30,564635998273676'),
              }}
              zoom={13}
              markers={createMarkers()}
              sx={{ maxWidth: '80%', width: '30rem', height: '15rem' }}
            />

            <CheckoutOrder />
          </Grid>
        </Grid>
        <Button type="submit">Submit</Button>
      </Paper>
    </Container>
  );
}
