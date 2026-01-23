import { useState } from 'react';
import { FaPlus, FaCalculator } from 'react-icons/fa';

export default function BudgetForm({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('rice');

  const categories = [
    { value: 'rice', label: 'Rice', color: 'bg-purple-500' },
    { value: 'beans', label: 'Beans', color: 'bg-emerald-500' },
    { value: 'spices', label: 'Spices', color: 'bg-amber-500' },
    { value: 'protein', label: 'Protein', color: 'bg-red-500' },
    { value: 'other', label: 'Other', color: 'bg-gray-500' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    onAddItem({ 
      description, 
      quantity: Number(quantity), 
      amount: Number(amount),
      category,
      id: Date.now()
    });
    setDescription('');
    setQuantity(1);
    setAmount('');
    setCategory('rice');
  };

  const calculateTotal = () => {
    const qty = Number(quantity) || 0;
    const amt = Number(amount) || 0;
    return (qty * amt).toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-purple-900/30 to-card backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-purple-800/30 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl flex items-center justify-center mr-3">
          <FaCalculator className="text-white text-lg" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Add Budget Item</h2>
          <p className="text-gray-400 text-sm">Plan your grocery expenses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Description */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Item Description</label>
            <div className="relative">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-dark/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pl-12"
                placeholder="e.g., Premium Ofada Rice"
                required
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Category</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${category === cat.value ? `${cat.color} text-white scale-105` : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Quantity */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Quantity</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 bg-dark/60 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  units
                </div>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Unit Price</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-dark/60 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pl-12"
                  placeholder="0.00"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ₦
                </div>
              </div>
            </div>
          </div>

          {/* Total Preview */}
          <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/20 rounded-xl p-4 border border-purple-800/30">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-400 text-sm">Estimated Total</div>
                <div className="text-2xl font-bold text-white">{calculateTotal()}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-sm">Unit Cost</div>
                <div className="text-lg text-white">₦{Number(amount || 0).toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-purple-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group"
            disabled={!description || !amount}
          >
            <FaPlus className="mr-2 group-hover:rotate-90 transition-transform" />
            Add Item to Budget
          </button>
        </div>
      </div>
    </form>
  );
}