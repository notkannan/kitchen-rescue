import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab } from "@mui/material";
import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface CameraMethods {
  takePhoto: () => string | null;
}

const CameraComponent = () => {
  const camera = useRef<CameraMethods | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setImage(null); // Reset the image when closing the dialog
  }

  const handleTakePhoto = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      if (photo) {
        setImage(photo);
        console.log(photo);
      } else {
        console.error("Failed to take photo");
      }
    } else {
      console.error("Camera reference is null");
    }
  };

  return (
    <div>
      <Fab
        // sx={{position: 'fixed', bottom: '70%', right: '30%'}} 
        onClick={handleOpen} 
        aria-label="add" 
        color="primary"
      >
        <CameraAltIcon/>
      </Fab>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add items using your camera</DialogTitle>
        <DialogContent>
          <Box sx={{ width: '100%', height: '400px', position: 'relative' }}>
            {!image && (
              <Camera 
                ref={camera as React.RefObject<CameraMethods>}
                facingMode="environment"
                errorMessages={{
                  noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
                  permissionDenied: 'Permission denied. Please refresh and give camera permission.',
                  switchCamera: 'It is not possible to switch camera to different one because there is only one video device accessible.',
                  canvas: 'Canvas is not supported.'
                }}
              />
            )}
            {image && (
              <img src={image} alt='Taken photo' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {!image && <Button onClick={handleTakePhoto}>Take photo</Button>}
          {image && <Button onClick={() => setImage(null)}>Retake</Button>}
          {image && <Button onClick={handleClose}>Confirm</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CameraComponent;