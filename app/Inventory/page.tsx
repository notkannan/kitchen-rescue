'use client'
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import Navbar from '../../components/Navbar';
import CardsList from '@/components/CardsList';




export default function Home() {


  return (
      <Box
        width='100vw'
        height='100vh'
        bgcolor='background.default'
      >
        <Navbar />
        <CardsList />
      </Box>

  );
}