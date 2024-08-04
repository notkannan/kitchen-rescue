'use client';

import { Box, Button, Typography } from "@mui/material";
import TopItemsChart from "@/components/TopItemsChart";
import { usePantryItems } from "@/providers/pantryContext";

export default function Dashboard() {

  const {inventory} = usePantryItems();

  return (
    <div className="mx-[10%] mt-[3%]">
    <Typography
      variant="h4"
      sx={{color:'primary.light', ml:3}}
    >
      We've got some stats for you.
    </Typography>

    {/* Grid Starts Here */}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 rounded-lg p-6 h-[500px]">

      <div className="bg-[#FFF] pt-10 px-5 rounded-2xl">
        <Typography variant="h5" sx={{pb: 5, color:'primary.light'}}>Highest in quantity</Typography>
        <TopItemsChart pantryItems={inventory} />
      </div>

      <div className="flex flex-col gap-4 justify-center">
        <Typography
          
        >
          Your inventory is loaded with these items currently, scroll down to see other stats which might be useful!
        </Typography>
        <Button
          sx={{width: '200px', bgcolor: 'primary.main', color:'white'}}
        >Take me to my Inventory</Button>
      </div>

    </div>
    </div>




    // <Box
    //   width='100vw'
    //   height='100vh'
    //   sx={{
    //     bgcolor:'white'
    //   }}
    // >
    //   <Box sx={{display: 'flex', gap: 4, alignItems: 'center', maxWidth: '75vw', margin: 'auto'}}>
    //     <Box sx={{width: '575px', height: '325px', bgcolor: 'background.default', borderRadius: '25px', boxShadow: 3}}>
    //       <TopItemsChart pantryItems={inventory} />
    //     </Box>
    //     <Typography>You are stacked up on these items, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni expedita soluta at eaque id totam.</Typography>
    //   </Box>
    // </Box>
  );
}