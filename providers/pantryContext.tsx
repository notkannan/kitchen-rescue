'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import Inventory from '@/interfaces/inventory';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSession } from 'next-auth/react';

interface PantryContextType {
  inventory: Inventory[];
  setInventory: React.Dispatch<React.SetStateAction<Inventory[]>>;
  loading: boolean;
}

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export const PantryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchItems = async (userId: string) => {
      try {
        setLoading(true);
        const inventoryRef = collection(db, "inventory");
        const q = query(inventoryRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        } as Inventory));
        setInventory(items);
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && session?.user?.id) {
      fetchItems(session.user.id);
    } else if (status === "unauthenticated") {
      setInventory([]);
      setLoading(false);
    }
  }, [status, session]);

  return (
    <PantryContext.Provider value={{ inventory, setInventory, loading }}>
      {children}
    </PantryContext.Provider>
  );
};

export const usePantryItems = () => {
  const context = useContext(PantryContext);
  if (context === undefined) {
    throw new Error('usePantryItems must be used within a PantryProvider');
  }
  return context;
};