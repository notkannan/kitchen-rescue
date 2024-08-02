'use client'

import Navbar from "@/components/Navbar";
import { Box, Typography } from "@mui/material";
import { ColorRing } from 'react-loader-spinner';

export default function Loading(){
    return (
        <Box
            width='100vw'
            height='100vh'
            bgcolor='background.default'
        >
        {/* <Navbar /> */}
        <div className='flex flex-row justify-center items-center h-[100vh]'>
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#B13C57', '#B13C57', '#B13C57', '#B13C57', '#B13C57']}
        />
        </div>
        
      </Box>

    )
}