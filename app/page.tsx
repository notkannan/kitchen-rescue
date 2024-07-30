import { Box, Stack, Typography } from '@mui/material';

import Navbar from '../components/Navbar';
import AccordionContent from '../components/Accordion';


export default function Home() {
  return (
      <Box
        width='100vw'
        height='100vh'
        bgcolor='background.default'
      >
        <Navbar />
        <Typography
          variant='h2'
          sx={
            {
              mt: 10,
              color: 'black',
              textAlign: 'center',
              fontWeight: 300
            }
          }
        >
          Welcome Kannan, How can I help you today?
        </Typography>
      </Box>

  );
}
