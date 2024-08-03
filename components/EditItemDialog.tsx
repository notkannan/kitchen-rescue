import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { useState } from "react";
import  Inventory  from '@/interfaces/inventory';

interface EditItemDialogProps {
  item: Inventory;
  onClose: () => void;
  onSave: (item: Omit<Inventory, 'id' | 'userId'>) => void;
}

function EditItemDialog({ item, onClose, onSave }: EditItemDialogProps) {
  const [editedItem, setEditedItem] = useState<Omit<Inventory, 'id' | 'userId'>>({
    name: item.name,
    quantity: item.quantity
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedItem(prev => ({ 
      ...prev, 
      [name]: name === 'quantity' ? Number(value) : value 
    }));
  };

  const handleSave = () => {
    onSave(editedItem);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={editedItem.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="quantity"
          label="Quantity"
          type="number"
          fullWidth
          variant="standard"
          value={editedItem.quantity}
          onChange={handleChange}
          inputProps={{ min: "0", step: "1" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditItemDialog