'use client'

import React, { use, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ingredients = [
    'Tomatoes', 'Onions', 'Chillies', 'Bread', 'Banana'
]

const quantity = [
    '15', '16', '25', '1 loaf', '3'
]

const inventory = [
  {
    name: 'Onions',
    quantity: '15',
    note: 'Gets over fast, buy them soon'
  },
  {
    name: 'Tomatoes',
    quantity: '7',
    note: 'Gets over fast, buy them soon'
  },
  {
    name: 'Bread',
    quantity: '1 loaf',
    note: ''
  },
  {
    name: 'Milk',
    quantity: '2 cartons',
    note: 'Use it quick, gets spoilt soon'
  },
]



const name = 'Kannan'

const mapped = ingredients.map((item, index) => {
    return(
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          {item} | {quantity[index]}
        </AccordionSummary>
        <AccordionDetails>
          Quantity goes here
        </AccordionDetails>
        <AccordionActions>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </AccordionActions>
      </Accordion>
    )
})


export default function AccordionContent() {

    return (
      <div className='min-w-[25vw] max-w-[50vw] m-auto mt-10'>
        <Typography
            variant='h5'
            sx={
                {color: 'black', mb: 3}
            }
        >
            Welcome to your Inventory, {name}
        </Typography>
        {mapped}
      </div>
    );
  }