'use client'

import * as React from 'react';
import { Card, CardActions, CardContent, Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import  Inventory from '@/interfaces/inventory';


function BasicCard({ data, handleClose, handleOpen, handleSave, isOpen, onChanging, editItem, onDelete }: any) {
  return (
    <>
      <Card sx={{ width: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="h6" align='center'>
            {data.quantity}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex' }}>
          <Button size="small" onClick={handleOpen}>Edit</Button>
          <Button size="small" onClick={onDelete}>Delete</Button>
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
            value={editItem.name}
            onChange={onChanging}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="text"
            name='quantity'
            fullWidth
            variant="standard"
            value={editItem.quantity}
            onChange={onChanging}
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
