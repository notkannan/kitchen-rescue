'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/theme";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default function SignInSide() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: '',
            backgroundColor: 'primary.dark'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{backgroundColor: 'background.default'}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              mt: '150px'
            }}
          >
              <LocalDiningIcon fontSize='large' sx={{
                color: 'primary.main',
              }}/>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

              <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-gray-900 md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-indigo-950">Kitchen Rescue</span><br />Culinary crisis manager.</h1>
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-700">Get appetizing receipes and efficiently maintain your inventory! We&apos;re happy to have you</p>

              <Button
                type="button"
                fullWidth
                variant="contained"
                href='/login'
                sx={{ mt: 3, mb: 2 }}
              >
                Take me there &nbsp;
                <ArrowForwardIosIcon  fontSize='small'/>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}


