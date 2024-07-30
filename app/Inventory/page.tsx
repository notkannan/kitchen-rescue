import { Box, Stack } from '@mui/material';

import Navbar from '../../components/Navbar';
import AccordionContent from '../../components/Accordion';


export default function Home() {
  return (
      <Box
        width='100vw'
        height='100vh'
        bgcolor='background.default'
      >
        <Navbar />
        <AccordionContent />
      </Box>

  );
}