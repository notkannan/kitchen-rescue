'use client'

import * as React from 'react';
import { Card, CardActions, CardContent, Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Box, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function BasicCard({ data, handleClose, handleOpen, handleSave, isOpen, onChanging, editItem, onDelete, onIncrement, onDecrement }: any) {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChanging({
      target: {
        name: 'quantity',
        value: value === '' ? '' : Number(value)
      }
    });
  };

  const truncateName = (name: string, maxLength: number) => {
    if (name.length <= maxLength) return name;
    return `${name.substring(0, maxLength)}...`;
  };

  return (
    <>
      <Card sx={{ width: 275, borderRadius: 5, bgcolor:'secondary.main' }}>
        <CardContent>
          <Tooltip title={data.name} placement="top" arrow>
            <Typography 
              variant="h6" 
              align='center' 
              mb={2} 
              mr={0.5} 
              color='primary.light'
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {truncateName(data.name, 25)}
            </Typography>
          </Tooltip>
          <Box className="flex flex-row justify-center items-center">
            <Button onClick={onDecrement}><RemoveIcon /></Button>
            <div className='w-[75px] h-[75px] rounded-[50%] flex flex-col justify-center items-center text-2xl text-[#D6536D]'>    
                <Typography variant="h5" color='primary.light'>
                    {data.quantity}
                </Typography>
            </div> 
            <Button onClick={onIncrement}><AddIcon /></Button>
          </Box>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button size="small" onClick={handleOpen}><EditIcon /></Button>
          <Button size="small" onClick={onDelete}><DeleteIcon /></Button>
        </CardActions>
      </Card>

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the details of the item.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name='name'
            type="text"
            fullWidth
            variant="standard"
            required
            value={editItem.name}
            onChange={onChanging}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            name='quantity'
            fullWidth
            required
            variant="standard"
            value={editItem.quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: "0", step: "1" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BasicCard;