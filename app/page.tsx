import { Box, Typography } from '@mui/material';
import Navbar from '../components/Navbar';


export default function Home() {
  return (
      <Box
        width='100vw'
        height='100vh'
        bgcolor='background.default'
        overflow='auto'
      >
        <Navbar />
        <Typography
          variant='h2'
          sx={
            {
              mt: 10,
              color: 'primary.light',
              textAlign: 'center',
              fontWeight: 300
            }
          }
        >
          Welcome Kannan, How can I help you today?
        </Typography>
        <Box sx={{}}>

          

        </Box>
      </Box>

  );
}
