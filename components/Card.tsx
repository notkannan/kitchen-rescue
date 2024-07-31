'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { DialogContentText, TextField, DialogActions } from '@mui/material';


export default function BasicCard({data, handleClose, handleOpen, handleSave, isOpen}:any) {

  return (
    <>
    <Card sx={{ width: 275 }}>
        <CardContent>
            <Typography variant="h5" component="div">
                {data.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
            </Typography>
            <Typography variant="body2">
                {data.quantity}
                <br />
                {'"a benevolent smile"'}
            </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button size="small" onClick={handleOpen}>Edit</Button>
            <Button size="small">Delete</Button>
        </CardActions>
    </Card>

    {isOpen && <Dialog open onClose={handleClose}>
    <DialogTitle>Edit Item</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Edit the details of the item.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        label="Name"
        type="text"
        fullWidth
        variant="standard"
        // value={name}
        // onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="dense"
        label="Quantity"
        type="text"
        fullWidth
        variant="standard"
        // value={quantity}
        // onChange={(e) => setQuantity(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleSave}>Save</Button>
    </DialogActions>
  </Dialog>}
  </>
  );
}
