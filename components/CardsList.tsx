'use client'

import { db } from "@/app/firebase";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore"; 
import { useState, useEffect } from "react";
import BasicCard from "./Card";
import Inventory from '@/interfaces/inventory'

export default function CardsList() {

    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState();

    useEffect(() => {
        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(db,"inventory"));
            const item: Inventory[] = querySnapshot.docs.map(doc =>({
                id: doc.id,
                ...doc.data() as Inventory
            }));
            setInventory(item);
        }
        fetchItems();
    },[]);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleSave() {
        console.log("Saved")
    }

    const mappedItems = inventory.map(item => {
        return(
            <BasicCard 
                data={item} 
                handleClose= {handleClose}
                handleOpen= {handleOpen}
                handleSave= {handleSave}
                isOpen={open}
            />
        )
    })



    return (
        <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center',}}>
            {mappedItems}
        </Box>
    )
}




