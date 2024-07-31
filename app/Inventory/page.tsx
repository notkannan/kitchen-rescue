
import { Box, Stack, Typography } from '@mui/material';
import Navbar from '../../components/Navbar';
import Table from '@/components/Table';
import Accordion from '@/components/Accordion';
import DataGridDemo from '@/components/SimpleTable';



export default function Home() {
  
  return (
      <Box
        width='100vw'
        height='100vh'
        bgcolor='background.default'
      >
        <Navbar />
        <Accordion />
      </Box>

  );
}