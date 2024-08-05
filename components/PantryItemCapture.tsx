// PantryItemCapture.tsx

import React, { useState } from 'react';
import { Button, CircularProgress, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Fab } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ImageCapture from './ImageCapture';
import { usePantryItems } from '@/providers/pantryContext';
import { addDoc, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSession } from 'next-auth/react';
import { identifyItemFromImage } from '@/utils/photoActions';

const PantryItemCapture: React.FC = () => {
  const [openCamera, setOpenCamera] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [identifiedItem, setIdentifiedItem] = useState<{ name: string; quantity: number | null }>({ name: '', quantity: null });
  const { inventory, setInventory } = usePantryItems();
  const { data: session } = useSession();

  const handleOpenCamera = () => {setOpenCamera(true)};
  const handleCloseCamera = () => {
    setOpenCamera(false);
    setImage(null);
  };

  const handleCapture = (capturedImage: string) => {
    setImage(capturedImage);
  };

  const handleRetake = () => {
    setImage(null);
  };

  const handleConfirmCapture = () => {
    if (image) {
      analyzeImage(image);
    }
  };

  const analyzeImage = async (capturedImage: string) => {
    if (!capturedImage || !session?.user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const base64Image = capturedImage.split(',')[1];
      const itemInfo = await identifyItemFromImage(base64Image);

      setIdentifiedItem({
        name: itemInfo.name,
        quantity: itemInfo.quantity || 1
      });

      setOpenConfirmation(true);
      setOpenCamera(false);
    } catch (err) {
      setError('Error analyzing image');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!session?.user?.id) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const newItemName = identifiedItem.name.trim();
      const newItemNameLower = newItemName.toLowerCase();
      const newItemQuantity = identifiedItem.quantity || 1;
  
      const itemQuery = query(
        collection(db, "inventory"),
        where("userId", "==", session.user.id),
        where("nameLower", "==", newItemNameLower)
      );
      const querySnapshot = await getDocs(itemQuery);
  
      if (!querySnapshot.empty) {
        const existingItem = querySnapshot.docs[0];
        const existingItemData = existingItem.data();
        const updatedQuantity = existingItemData.quantity + newItemQuantity;
  
        await updateDoc(doc(db, "inventory", existingItem.id), {
          quantity: updatedQuantity,
          name: newItemName // Update the display name to the latest capitalization
        });
  
        setInventory(inventory.map(item => 
          item.id === existingItem.id 
            ? { ...item, name: newItemName, quantity: updatedQuantity }
            : item
        ));
      } else {
        const newItem = {
          name: newItemName,
          nameLower: newItemNameLower,
          quantity: newItemQuantity,
          userId: session.user.id,
        };
  
        const docRef = await addDoc(collection(db, "inventory"), newItem);
        setInventory([...inventory, { ...newItem, id: docRef.id }]);
      }
  
      setOpenConfirmation(false);
      setImage(null);
    } catch (err) {
      setError('Error updating inventory');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Fab
        color="primary"
        onClick={handleOpenCamera}
      >
        <CameraAltIcon />
      </Fab>

      <Dialog 
        open={openCamera} 
        onClose={handleCloseCamera} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
          }
        }}
      >
        <DialogTitle>Capture Pantry Item</DialogTitle>
        <DialogContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Box sx={{ flex: 1, position: 'relative' }}>
            <ImageCapture image={image} onCapture={handleCapture} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            if(openCamera)
                setOpenCamera(false);
            }} 
            color="primary">
            Cancel
          </Button>
          {image ? (
            <>
              <Button onClick={handleRetake} color="primary">
                Retake
              </Button>
              <Button onClick={handleConfirmCapture} color="primary" variant="contained">
                Confirm
              </Button>
            </>
          ) : null}
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm item name and quantity</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            fullWidth
            value={identifiedItem.name}
            onChange={(e) => setIdentifiedItem({ ...identifiedItem, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={identifiedItem.quantity}
            onChange={(e) => setIdentifiedItem({ ...identifiedItem, quantity: parseInt(e.target.value) || null })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>

      {error && (
        <Typography color="error">{error}</Typography>
      )}
    </Box>
  );
};

export default PantryItemCapture;