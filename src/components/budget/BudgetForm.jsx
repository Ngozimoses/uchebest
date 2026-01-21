import { useState } from 'react';

export default function BudgetForm({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    onAddItem({ description, quantity: Number(quantity), amount: Number(amount) });
    setDescription('');
    setQuantity(1);
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Budget Item</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // In BudgetForm.jsx input fields
className="w-full px-3 py-2 bg-card border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="E.g., Ofada Rice"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            // In BudgetForm.jsx input fields
className="w-full px-3 py-2 bg-card border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Amount (₦)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          // In BudgetForm.jsx input fields
className="w-full px-3 py-2 bg-card border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"    placeholder="0.00"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
      >
        Add Item
      </button>
    </form>
  );
}