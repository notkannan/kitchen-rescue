'use client'

import { db } from "@/app/firebase";
import { Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import BasicCard from "./Card";
import Inventory from '@/interfaces/inventory';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddItem from "./AddItem";

export default function CardsList() {
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [open, setOpen] = useState(false);
    const [addFormVisibility, setAddFormVisibility] = useState(false);
    const [editItem, setEditItem] = useState<Inventory>({id:'', name: '', quantity: 0 });
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortBy, setSortBy] = useState<'name' | 'quantityAsc' | 'quantityDesc'>('name');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                fetchItems(currentUser.uid);
            } else {
                setInventory([]);
            }
        });

        return () => unsubscribe();
    }, []);

  console.log(user)

    const fetchItems = async (userId: string) => {
        const querySnapshot = await getDocs(collection(db, "inventory"));
        const items: any = querySnapshot.docs
            .map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            .filter(item => item.userId === userId);
        setInventory(items);
    }

    const addItem = async() => {
        if (user) {
            const docRef = await addDoc(collection(db, "inventory"), {
                name: editItem.name,
                quantity: Number(editItem.quantity),
                userId: user.uid
            });
            setAddFormVisibility(false);
            setInventory(prevState => ([
                ...prevState,
                {id: docRef.id, name: editItem.name, quantity: Number(editItem.quantity), userId: user.uid}
            ]))

        }
    }

    const deleteItem = async (id: string) => {
        setInventory(prevState => prevState.filter(item => item.id !== id));
        await deleteDoc(doc(db, "inventory", id));

    }

    const updateItem = async (id: string) => {
        const editableItem = doc(db,"inventory", id);
        setInventory(prevState => prevState.map(item => 
            item.id === id ? { ...item, ...editItem } : item
        ));
    
        setOpen(false);

        await updateDoc(editableItem, {
            name: editItem.name,
            quantity: editItem.quantity
        });
        setOpen(false);

    }

    const incrementQuantity = async (id: string) => {
        const item = inventory.find(item => item.id === id);
        setInventory(prevState => prevState.map(item => 
            item.id === id ? { ...item, quantity: Number(item.quantity) + 1} : item
        ));
        if (item) {
            const newQuantity = Number(item.quantity) + 1;
            const itemRef = doc(db, "inventory", id);
            await updateDoc(itemRef, { quantity: newQuantity });
        
        }
    };
    
    const decrementQuantity = async (id: string) => {
        const item = inventory.find(item => item.id === id);
        setInventory(prevState => prevState.map(item => 
            item.id === id ? { ...item, quantity: Number(item.quantity) - 1 } : item
        ));
        if (item && Number(item.quantity) > 0) {
            const newQuantity = Number(item.quantity) - 1;
            const itemRef = doc(db, "inventory", id);
            await updateDoc(itemRef, { quantity: newQuantity });
            
        }
    };

    function handleOpen(item: Inventory) {
        setEditItem(item);
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleAddFormOpen() {
        setAddFormVisibility(true);
    }

    function handleAddFormClose() {
        setAddFormVisibility(false);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setEditItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const filteredAndSortedItems = inventory
        .filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortBy === 'quantityAsc') {
                return a.quantity - b.quantity;
            } else if (sortBy === 'quantityDesc') {
                return b.quantity - a.quantity;
            }
            return 0;
        });

    const mappedItems = filteredAndSortedItems.map(item => (
        <BasicCard 
            key={item.id} 
            data={item} 
            handleClose={handleClose}
            handleOpen={() => handleOpen(item)}
            handleSave={() => updateItem(item.id)}
            isOpen={open && editItem.id === item.id}
            onChanging={handleChange}
            editItem={editItem}
            onDelete={() => deleteItem(item.id)}
            onIncrement={() => incrementQuantity(item.id)}
            onDecrement={() => decrementQuantity(item.id)}
        />
    ));

    return (
        <>
            {user ? (
                <>
                    <AddItem onChange={handleChange} submitItem={addItem} formOpen={handleAddFormOpen} formClose={handleAddFormClose} modalVisibility={addFormVisibility} />
                    <Typography
                        variant='h4'
                        color='primary.light'
                        mb={4}
                        ml={4}
                    >
                        Welcome to your inventory<br />
                        <span className="text-sm text-gray-900">This inventory is linked to {user.email}</span>
                    </Typography>
                    <Box sx={{ mb: 2, mt: 2}} className='flex flex-row gap-4 ml-6'>
                        <TextField
                            label="Search by Name"
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '25px',  // Adjust this value to control the roundness
                                },
                            }}
                        />
                        <FormControl>
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'name' | 'quantityAsc' | 'quantityDesc')}
                                label="Sort By"
                                sx={{
                                    borderRadius:'25px'
                                }}
                            >
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="quantityAsc">Quantity (Low to High)</MenuItem>
                                <MenuItem value="quantityDesc">Quantity (High to Low)</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mt: 5 }}>
                        {mappedItems}
                    </Box>
                </>
            ) : (
                <Typography variant="h6">Please log in to view your pantry items.</Typography>
            )}
        </>
    );
}