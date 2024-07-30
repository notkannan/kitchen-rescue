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
        light:'#9DC08B',
        main:'#609966',
        dark:'#40513B'
    },
    background:{
        default:'#EDF1D6'
    },
    
  }
});

export default theme;
