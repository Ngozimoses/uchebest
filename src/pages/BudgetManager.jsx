// src/pages/BudgetManager.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BudgetForm from '../components/budget/BudgetForm';
import BudgetList from '../components/budget/BudgetList';
import BudgetActions from '../components/budget/BudgetActions';
import { v4 as uuidv4 } from 'uuid';

const loadBudgets = () => {
  const saved = localStorage.getItem('uchebest-budget');
  return saved ? JSON.parse(saved) : [];
};

export default function BudgetManager() {
  const [items, setItems] = useState(loadBudgets);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('uchebest-budget', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (itemData) => {
    if (editingItem) {
      setItems(items.map(item =>
        item.id === editingItem.id
          ? { ...itemData, id: editingItem.id }
          : item
      ));
      setEditingItem(null);
    } else {
      const newItem = { ...itemData, id: uuidv4() };
      setItems([...items, newItem]);
    }
  };

  const handleEdit = (item) => setEditingItem(item);
  const handleDelete = (id) => setItems(items.filter(item => item.id !== id));

  const total = items.reduce((sum, item) => sum + (item.quantity * item.amount), 0);

  return (
    <div className="min-h-screen bg-dark text-text pb-16">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-purple-900/40 to-gold/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Smart <span className="text-gold">Budget Manager</span>
          </motion.h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Plan your grocery spending, track expenses, and share your budget with family.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-10">
        {/* Total Summary Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card rounded-xl p-6 mb-8 border border-purple-800/30"
        >
          <h2 className="text-2xl font-bold text-gold mb-2">Total Budget</h2>
          <p className="text-3xl font-mono text-white">₦{total.toFixed(2)}</p>
        </motion.div>

        {/* Budget Form */}
        <BudgetForm onAddItem={handleAddItem} />

        {editingItem && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-yellow-900/30 border-l-4 border-gold p-4 mb-6 rounded"
          >
            <p className="text-yellow-200">
              Editing: <strong>{editingItem.description}</strong>
            </p>
            <button 
              onClick={() => setEditingItem(null)}
              className="mt-2 text-sm text-yellow-300 underline"
            >
              Cancel Edit
            </button>
          </motion.div>
        )}

        {/* Budget List */}
        <BudgetList items={items} onEdit={handleEdit} onDelete={handleDelete} />

        {/* Actions */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <BudgetActions items={items} />
          </motion.div>
        )}
      </div>
    </div>
  );
}