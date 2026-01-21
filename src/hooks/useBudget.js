// src/hooks/useBudget.js
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveBudgetToStorage, loadBudgetFromStorage } from '../utils/storage';

export default function useBudget() {
  const [items, setItems] = useState(() => loadBudgetFromStorage() || []);

  // Save to localStorage whenever items change
  useEffect(() => {
    saveBudgetToStorage(items);
  }, [items]);

  const addItem = (itemData) => {
    const newItem = {
      id: uuidv4(),
      ...itemData,
    };
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (id, updatedData) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
  };

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    clearAll,
  };
}