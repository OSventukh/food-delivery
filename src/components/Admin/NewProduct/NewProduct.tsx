'use client';
import { ChangeEvent, FormEvent, useState, useContext, useEffect } from 'react';
import NotificationContext from '@/context/notification-context';
import Paper from '@mui/material/Paper/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@/components/UI/LoadingButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { sendData, getData } from '@/utils/fetch';
import type { Restaurant } from '@/types/models';

export default function NewProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [restaurant, setRestarant] = useState<Restaurant | null>(null);
  const [restaurantList, setRestarantList] = useState<Restaurant[]>([]);
  const [openRestaurant, setOpenRestaurant] = useState(false);
  const [loadingRestaurant, setLoadingRestaurant] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { setError, setSuccess, clearNotification } = useContext(NotificationContext);

  useEffect(() => {
    let active = true;

    if (!openRestaurant) {
      return undefined;
    }


    (async() => {
      try {
        setLoadingRestaurant(true)
        const result = await getData('/api/restaurants');
        active && setRestarantList(result.restaurants) 
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Something went wrong')
      } finally {
        setLoadingRestaurant(false)
      }
      () => {
        active = false;
      }
    })()
  }, [setError, openRestaurant])
  
  const titleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const enteredTitle = event.target.value;
    setTitle(enteredTitle);
  };

  const descriptionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const enteretDescription = event.target.value;
    setDescription(enteretDescription);
  };

  const priceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const enteretPrice = +event.target.value;
    setPrice(enteretPrice);
  };

  const imageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const enteredImage = event.target.value;
    setImage(enteredImage);
  };

  const restaurantChangeHandler = (event: React.SyntheticEvent, value: Restaurant | null) => {
    setRestarant(value);
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setPrice(0);
    setImage('');
    setRestarant(null);
  };

  const createRestaurantSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    clearNotification();
    setIsLoading(true);
    try {
      await sendData('/api/products', {
        title,
        description,
        price,
        image,
        restaurant: restaurant?.id,
      });
      setSuccess('Product was successfully created');
      clearForm();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper sx={{ p: '1rem 3rem' }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ textAlign: 'center', mb: '2rem' }}
      >
        New Product
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
        <Autocomplete
          id="product-restaurant"
          open={openRestaurant}
          size='small'
          onOpen={() => {
            setOpenRestaurant(true);
          }}
          onClose={() => {
            setOpenRestaurant(false);
          }}
          value={restaurant}
          onChange={restaurantChangeHandler}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          options={restaurantList}
          loading={loadingRestaurant}
          renderInput={(params) => (
            <TextField
            {...params}
            label="Restaurant"
            InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingRestaurant ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <TextField
          id="product-title"
          label="Title"
          variant="outlined"
          onChange={titleChangeHandler}
          value={title}
          size="small"
        />
        <TextField
          id="product-description"
          label="Description"
          variant="outlined"
          onChange={descriptionChangeHandler}
          value={description}
          size="small"
        />
        <TextField
          id="product-price"
          label="Price"
          type="number"
          variant="outlined"
          onChange={priceChangeHandler}
          value={price}
          size="small"
        />
        <TextField
          id="product-image"
          label="Image (URL)"
          variant="outlined"
          onChange={imageChangeHandler}
          value={image}
          size="small"
        />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <LoadingButton text="Create" loading={isLoading} />
        </Box>
      </Box>
    </Paper>
  );
}
