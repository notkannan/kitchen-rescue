import { Box, Stack, Typography } from '@mui/material';
import Navbar from '../../components/Navbar';
import Table from '@/components/Table';

export default function Home() {
  return (
      <Box
        width='100vw'
        height='100vh'
        bgcolor='background.default'
      >
        <Navbar />
        <Table />
      </Box>

  );
}