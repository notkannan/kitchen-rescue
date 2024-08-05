'use client';

import { Button, Typography } from "@mui/material";
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
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="flex flex-col mx-[10%] mt-[3%] mb-8">
          <Typography
            variant="h4"
            sx={{color:'primary.light', ml:3, mb: 4}}
          >
            We&apos;ve got some stats for you.
          </Typography>

          {/* Grid Starts Here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 rounded-lg pb-5">
            <div className="bg-white py-10 px-5 rounded-2xl shadow-lg">
              <Typography variant="h5" sx={{pb: 5, color:'primary.light'}}>Highest in quantity</Typography>
              <TopItemsChart pantryItems={inventory} />
            </div>
            <div className="bg-white py-10 px-5 rounded-2xl shadow-lg">
              <Typography variant="h5" sx={{pb: 5, color:'primary.light'}}>Lowest in quantity</Typography>
              <LeastItemsChart pantryItems={inventory} />
            </div>
          </div>
          
          <div className="mt-8">
            <Typography
              fontWeight='light'
              variant="h6"
              sx={{mb: 2}}
            >
              Your inventory, summarized. See what you&apos;re running high and low on.
            </Typography>
            <Button
              onClick={handleInventoryPush}
              variant="contained"
              color="primary"
              sx={{
                width: '200px', 
                '&:hover': {backgroundColor:'primary.dark'}
              }}
            >
              Take me to my Inventory
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}