import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


export default function AddItem({onChange, submitItem, modalVisibility, formOpen, formClose}: any) {
    return(
        <>
        <Fab sx={{position: 'fixed', top: '85%', left: '80%'}} onClick={formOpen} aria-label="add" color="primary">
            <AddIcon />
        </Fab>
        <Dialog open={modalVisibility} onClose={formClose}>
        <Box sx={{bgcolor:'#fff', margin: 'auto', padding: 3, borderRadius: 4}}>
            <DialogTitle>Add a new item</DialogTitle>
            <DialogContent>
            <DialogContentText>
            <Typography 
                    variant="h6"
                    sx={
                        {
                        color: 'gray',
                        fontWeight: 300
                        }
                    }
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
                    onChange={onChange}
                ></TextField>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Quantity"
                    name='quantity'
                    type="number"
                    fullWidth
                    variant="standard"
                    required
                    onChange={onChange}
                ></TextField>
            </DialogContent>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mt: 3}}>
                    <Button onClick={formClose}>Cancel</Button>
                    <Button onClick={submitItem}>Add Item</Button>
            </Box>
        </Box>
        </Dialog>
        </>
    )
}