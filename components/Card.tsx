import * as React from 'react';
import { Card, CardActions, CardContent, Button, Typography, Box, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import  Inventory  from '@/interfaces/inventory';

interface BasicCardProps {
  data: Inventory;
  onEdit: () => void;
  onDelete: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

function BasicCard({ data, onEdit, onDelete, onIncrement, onDecrement }: BasicCardProps) {
  const truncateName = (name: string, maxLength: number) => {
    if (name.length <= maxLength) return name;
    return `${name.substring(0, maxLength)}...`;
  };

  return (
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
        <Button size="small" onClick={onEdit}><EditIcon /></Button>
        <Button size="small" onClick={onDelete}><DeleteIcon /></Button>
      </CardActions>
    </Card>
  );
}

export default BasicCard;