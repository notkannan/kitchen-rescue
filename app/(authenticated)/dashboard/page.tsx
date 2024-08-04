'use client';

import { Box, Typography } from "@mui/material";
import TopItemsChart from "@/components/TopItemsChart";
import { usePantryItems } from "@/providers/pantryContext";

export default function Dashboard() {

  const {inventory} = usePantryItems();

  return (
    <Box
      width='100vw'
      height='100vh'
      sx={{
        bgcolor:'white'
      }}
    >
      <Box sx={{display: 'flex', gap: 4, alignItems: 'center', maxWidth: '75vw', margin: 'auto'}}>
        <Box sx={{width: '575px', height: '325px', bgcolor: 'background.default', borderRadius: '25px', boxShadow: 3}}>
          <TopItemsChart pantryItems={inventory} />
        </Box>
        <Typography>You are stacked up on these items, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni expedita soluta at eaque id totam.</Typography>
      </Box>
    </Box>
  );
}