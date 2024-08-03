'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/theme";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



// TODO remove, this demo shouldn't need to reset the theme.

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
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-700">Kitchen Rescue is your inventory management app. Track your stuff efficiently and get great recipes!</p>

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
      {/* // <Container 
    //   maxWidth={false}
    //   disableGutters 
    //   sx={{ 
    //     height: '100vh',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '100vw',
    //     bgcolor: 'secondary.main'
    //     backgroundImage: 'url(/landing-page-bg.webp)',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     backgroundRepeat: 'no-repeat',
    //   }}
    // >
    //   <Box
    //     sx={{
    //       backgroundColor: 'secondary.main',
    //       padding: { xs: 4, sm: 6 },
    //       borderRadius: 4,
    //       textAlign: 'center',
    //       maxWidth: '90%',
    //       width: '400px',
    //     }}
    //   >
    //     <Typography 
    //       variant="h2" 
    //       component="h1" 
    //       sx={{ 
    //         fontWeight: 'bold',
    //         marginBottom: 2,
    //         fontSize: { xs: '2.5rem', sm: '3rem' },
    //         color: 'primary.main'
    //       }}
    //     >
    //       Kitchen Rescue
    //     </Typography>
    //     <Typography
    //       variant="subtitle1"
    //       sx={{
    //         color: 'primary.main',
    //         marginBottom: 4,
    //         fontSize: { xs: '1.1rem', sm: '1.3rem' },
    //         fontWeight: 'light'
    //       }}
    //     >
    //       Your Culinary Crisis Manager
    //     </Typography>
    //     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    //       <Link href="/login" passHref style={{ textDecoration: 'none', width: '100%' }}>
    //         <Button 
    //           variant="contained" 
    //           color="primary"
    //           fullWidth
    //           sx={{ 
    //             py: 1.5,
    //             fontSize: '1.1rem',
    //             textTransform: 'none',
    //             backgroundColor: 'secondary.main',
    //             '&:hover': {
    //               backgroundColor: 'secondary.dark',
    //             }
    //           }}
    //         >
    //           Log In
    //         </Button>
    //       </Link>
    //       <Link href="/signup" passHref style={{ textDecoration: 'none', width: '100%' }}>
    //         <Button 
    //           variant="contained" 
    //           color="primary" 
    //           fullWidth
    //           sx={{ 
    //             py: 1.5,
    //             fontSize: '1.1rem',
    //             textTransform: 'none',
    //             backgroundColor: 'secondary.main',
    //             '&:hover': {
    //               backgroundColor: 'secondary.dark',
    //             }
    //           }}
    //         >
    //           Sign Up
    //         </Button>
    //       </Link>
    //     </Box>
    //   </Box>
    // </Container> */}


