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
  },

  palette: {
    primary:{
        light:'#739072',
        main:'#D6536D',
        dark:'#3A4D39'
    },
    background:{
        default:'#FCF8F3'
    },
    
  }
});

export default theme;
