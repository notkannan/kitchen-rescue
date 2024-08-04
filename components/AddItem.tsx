import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import  Inventory  from '@/interfaces/inventory';

interface AddItemProps {
  onSubmit: (item: Omit<Inventory, 'id' | 'userId'>) => void;
}

export default function AddItem({ onSubmit }: AddItemProps) {
    const [open, setOpen] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', quantity: 0 });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewItem({ name: '', quantity: 0 });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: name === 'quantity' ? Number(value) : value }));
    };

    const handleSubmit = () => {
        if (newItem.name && newItem.quantity > 0) {
            onSubmit(newItem);
            handleClose();
        }
    };

    return (
        <>
            <Fab 
                // sx={{position: 'fixed', bottom: '70%', right: '23%'}} 
                onClick={handleOpen} 
                aria-label="add" 
                color="primary"
            >
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{bgcolor:'#fff', margin: 'auto', padding: 2, borderRadius: '15px'}}>
                    <DialogTitle>Add a new item</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography 
                                variant="h6"
                                sx={{
                                    color: 'gray',
                                    fontWeight: 300
                                }}
                            >
                                What would you like to add?
                            </Typography>
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
                            value={newItem.name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Quantity"
                            name='quantity'
                            type="number"
                            fullWidth
                            variant="standard"
                            required
                            value={newItem.quantity}
                            onChange={handleChange}
                            inputProps={{ min: "0", step: "1" }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Add Item</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
}