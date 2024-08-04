'use client';

import { Box, Button, Typography } from "@mui/material";
import TopItemsChart from "@/components/TopItemsChart";
import { usePantryItems } from "@/providers/pantryContext";
import LeastItemsChart from "@/components/LeastItemsCharts";
import { useRouter } from 'next/navigation';
import Footer from "@/components/Footer";


export default function Dashboard() {

  const {inventory} = usePantryItems();
  const router = useRouter();

  function handleInventoryPush(){
    router.push('/inventory')
  }
  
  return (
    <>
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
      <div className="bg-[#FFF] pt-10 px-5 rounded-2xl">
        <Typography variant="h5" sx={{pb: 5, color:'primary.light'}}>Lowest in quantity</Typography>
        <LeastItemsChart pantryItems={inventory} />
      </div>
    </div>

      <div className="flex flex-col gap-4 justify-center ml-5 mb-20">
        <Typography
          fontWeight='light'
          variant="h6"
        >
          Your inventory, summarized. See what you're running high and low on.
        </Typography>
        <Button
          onClick={handleInventoryPush}
          sx={
            {
            width: '200px', 
            backgroundColor: 'primary.main', 
            color:'white', 
            '&:hover': 
              {backgroundColor:'primary.dark'}
            }
          }
        >Take me to my Inventory</Button>
      </div>
    </div>
    <Footer />
    </>


  );
}