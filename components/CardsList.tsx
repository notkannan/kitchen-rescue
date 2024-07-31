'use client'

import { db } from "@/app/firebase";
import { Box } from "@mui/material";
import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc } from "firebase/firestore"; 
import { useState, useEffect } from "react";
import BasicCard from "./Card";
import Inventory from '@/interfaces/inventory';
import AddItem from "./AddItem";

export default function CardsList() {
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState<Inventory>({id:'', name: '', quantity: 0 });

    useEffect(() => {
        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(db, "inventory"));
            const items: any = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setInventory(items);
        }
        fetchItems();
    }, []);

    const addItem = async() => {
        const docRef = await addDoc(collection(db, "inventory"), {
            name: editItem.name,
            quantity: editItem.quantity
        });
        setInventory(prevState => ([
            ...prevState,
            {id: docRef.id, name: editItem.name, quantity: editItem.quantity}
        ]))
    }

    const deleteItem = async (id: string) => {
        await deleteDoc(doc(db, "inventory", id));
    }

    const updateItem = async (id: string) => {
        const editableItem = doc(db,"inventory", id);

        await updateDoc(editableItem, {
            name: editItem.name,
            quantity: editItem.quantity
        })
        setOpen(false);
    }


    function handleOpen(item: Inventory) {
        setEditItem(item);
        console.log(item.id)
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    // function handleSave() {
    //     console.log("Saved");
    //     console.log(`name: ${editItem.name} | quantity: ${editItem.quantity}`);
    //     setOpen(false);
    // }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setEditItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const mappedItems = inventory.map(item => (
        <BasicCard 
            key={item.id} 
            data={item} 
            handleClose={handleClose}
            handleOpen={() => handleOpen(item)}
            handleSave={() => updateItem(item.id)}
            isOpen={open && editItem.id === item.id}
            onChanging={handleChange}
            editItem={editItem}
            onDelete= {() => deleteItem(item.id)}
        />
    ));

    return (
        <>
        <AddItem onChange={handleChange} submitItem={addItem}/>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mt: 10 }}>
            {mappedItems}
        </Box>
        </>
    );
}
