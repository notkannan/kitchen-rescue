'use client'

import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowModel } from '@mui/x-data-grid';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { IconButton, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

const InventoryGrid: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newQuantity, setNewQuantity] = useState<number | string>('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'inventory'), (snapshot) => {
      const itemList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as InventoryItem[];
      setItems(itemList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const processRowUpdate = async (newRow: GridRowModel) => {
    const { id, ...updatedFields } = newRow;
    const itemRef = doc(db, 'inventory', id);
    await updateDoc(itemRef, updatedFields);
    return newRow;
  };

  const handleProcessRowUpdateError = (error: Error) => {
    console.error(error);
  };

  const handleDeleteRow = async (id: string) => {
    const itemRef = doc(db, 'inventory', id);
    await deleteDoc(itemRef);
  };

  const handleAddItem = async () => {
    if (newName && newQuantity) {
      await addDoc(collection(db, 'inventory'), {
        name: newName,
        quantity: Number(newQuantity),
      });
      setNewName('');
      setNewQuantity('');
      setOpen(false);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'quantity', headerName: 'Quantity', width: 150, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDeleteRow(params.id as string)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 450, width: '60%', margin: 'auto', marginTop: 100 }}>
      <DataGrid
        rows={items}
        columns={columns}
        loading={loading}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Item
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddItem} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InventoryGrid;
