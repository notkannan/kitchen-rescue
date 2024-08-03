'use client'
import { Box } from '@mui/material';
import CardsList from '@/components/CardsList';
import Footer from '@/components/Footer';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Home() {



  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
        bgcolor: 'background.default',
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          mt: 5,
          mb: 4,
        }}
      >
        <Box sx={{ width: '60vw', maxWidth: '1200px' }}>
          <CardsList />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}