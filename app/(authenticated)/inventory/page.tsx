'use client'
import { Box, Typography } from '@mui/material';
import Navbar from '../../../components/Navbar';
import CardsList from '@/components/CardsList';


export default function Home() {


  return (
      <Box
        width='100vw'
        height='100vh'
        bgcolor='background.default'
        overflow='auto'
      >
        <Navbar />
        <div className='w-[60vw] mt-10 m-auto'>
          <Typography
            variant='h4'
            color='primary.light'
          >
            Welcome to your inventory, Kannan.
          </Typography>
          <CardsList />
        </div>
        
      </Box>

  );
}