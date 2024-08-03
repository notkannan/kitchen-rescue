'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
      button: {
        textTransform: 'none'
      },
  },

  palette: {
    primary:{
        light:'#4A4A4A',
        main:'#4f46e5',
        dark:'#1e1b4b',
    },

    secondary:{
      main:'#fff',
    },

    background:{
        default:'#F3F4F8'
    },
    
  }
});

export default theme;
