import { Box, Button, TextField, Typography } from "@mui/material";



export default function AddItem({onChange, submitItem}: any) {
    return(
        <Box sx={{bgcolor:'#fff', maxWidth: '25vw', margin: 'auto', padding: 5, mt: 5, borderRadius: 4, minWidth: '20vw'}}>
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
                type="text"
                fullWidth
                variant="standard"
                required
                onChange={onChange}
            ></TextField>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mt: 3}}>
                <Button>Cancel</Button>
                <Button onClick={submitItem}>Add Item</Button>
            </Box>
        </Box>
    )
}