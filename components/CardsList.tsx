'use client'

import { db } from "@/app/firebase";
import { Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { collection, getDocs, query, where, addDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import BasicCard from "@/components/Card";
import  Inventory  from '@/interfaces/inventory';
import AddItem from "./AddItem";
import EditItemDialog from "./EditItemDialog";
import { usePantryItems } from "@/providers/pantryContext";
import { printSuccessMessage } from "@/utils/util";


export default function CardsList() {
    const { data: session, status } = useSession();
    const {inventory, setInventory} =  usePantryItems();
    const [editItem, setEditItem] = useState<Inventory | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortBy, setSortBy] = useState<'name' | 'quantityAsc' | 'quantityDesc'>('name');


    const addOrUpdateItem = async (item: Omit<Inventory, 'userId'>) => {
        if (!session?.user?.id) return;

        const existingItem = inventory.find(i => i.name.toLowerCase() === item.name.toLowerCase());

        if (existingItem) {
            setInventory(prev => prev.map(i => 
                i.name === existingItem.name ? { ...i, quantity: newQuantity } : i
            ));
            printSuccessMessage("Item updated successfully!")
            const newQuantity = Number(existingItem.quantity) + Number(item.quantity);
            const itemRef = collection(db, "inventory");
            const q = query(itemRef, 
                where("userId", "==", session.user.id),
                where("name", "==", existingItem.name)
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const docRef = querySnapshot.docs[0].ref;
                await updateDoc(docRef, { quantity: newQuantity });
            }
            

        } else {
            const newItem = { 
                ...item, 
                userId: session.user.id 
            };
            const docRef = await addDoc(collection(db, "inventory"), newItem);
            printSuccessMessage("Item added successfully!")
            setInventory(prev => [...prev, { ...newItem, id: docRef.id }]);
            
        }
    };

    const deleteItem = async (name: string) => {
        if (!session?.user?.id) return;

        setInventory(prev => prev.filter(item => item.name !== name));
        printSuccessMessage("Item deleted successfully!")
        const itemRef = collection(db, "inventory");
        const q = query(itemRef, 
            where("userId", "==", session.user.id),
            where("name", "==", name)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            await deleteDoc(querySnapshot.docs[0].ref);
        }
        

    };

    const updateItem = async (name: string, updatedItem: Partial<Inventory>) => {
        if (!session?.user?.id) return;

        setInventory(prev => prev.map(item => 
            item.name === name ? { ...item, ...updatedItem } : item
        ));

        const itemRef = collection(db, "inventory");
        const q = query(itemRef, 
            where("userId", "==", session.user.id),
            where("name", "==", name)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await updateDoc(docRef, updatedItem);
        }
        printSuccessMessage("Item updated successfully!")
        setEditItem(null);
    };

    const handleQuantityChange = async (name: string, change: number) => {
        const item = inventory.find(i => i.name === name);
        if (!item) return;

        const newQuantity = Math.max(0, Number(item.quantity) + change);
        if (newQuantity === 0) {
            await deleteItem(name);
        } else {
            await updateItem(name, { quantity: newQuantity });
        }
    };

    const filteredAndSortedItems = inventory
        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            return sortBy === 'quantityAsc' ? a.quantity - b.quantity : b.quantity - a.quantity;
        });

    return (
        <>
            {status === "authenticated" ? (
                <>
                    <Typography variant='h4' color='primary.light' mb={4}>
                        Welcome to your inventory<br />
                        <span className="text-sm text-gray-900">This inventory is linked to {session.user.email}</span>
                    </Typography>
                    <Box sx={{ mb: 2, mt: 2 }} className='flex flex-row gap-4 ml-6'>
                        <TextField
                            label="Search by Name"
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '25px' } }}
                        />
                        <FormControl>
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'name' | 'quantityAsc' | 'quantityDesc')}
                                label="Sort By"
                                sx={{ borderRadius: '25px' }}
                            >
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="quantityAsc">Quantity (Low to High)</MenuItem>
                                <MenuItem value="quantityDesc">Quantity (High to Low)</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mt: 5 }}>
                        {filteredAndSortedItems.map(item => (
                            <BasicCard 
                                key={item.name}
                                data={item} 
                                onEdit={() => setEditItem(item)}
                                onDelete={() => deleteItem(item.name)}
                                onIncrement={() => handleQuantityChange(item.name, 1)}
                                onDecrement={() => handleQuantityChange(item.name, -1)}
                            />
                        ))}
                    </Box>
                    <AddItem onSubmit={addOrUpdateItem} />

                    {editItem && (
                        <EditItemDialog 
                            item={editItem} 
                            onClose={() => setEditItem(null)}
                            onSave={(updatedItem) => updateItem(editItem.name, updatedItem)}
                        />
                    )}
                </>
            ) : (
                <Typography variant="h6">Please log in to view your pantry items.</Typography>
            )}
        </>
    );
}