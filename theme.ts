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
        light:'#4A4A4A',
        main:'#D6536D',
        dark:'#B13C57',
    },

    secondary:{
      main:'#fff',
    },

    background:{
        default:'#fff9fb'
    },
    
  }
});

export default theme;
