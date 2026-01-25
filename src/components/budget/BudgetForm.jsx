import { useState } from 'react';
import { FaPlus, FaCalculator, FaTags, FaEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function BudgetForm({ onAddItem, editingItem }) {
  const { isDarkMode } = useTheme();
  const [description, setDescription] = useState(editingItem?.description || '');
  const [quantity, setQuantity] = useState(editingItem?.quantity || 1);
  const [amount, setAmount] = useState(editingItem?.amount || '');
  const [category, setCategory] = useState(editingItem?.category || 'rice');

  const categories = [
    { value: 'rice', label: 'Rice', color: 'bg-purple-500', icon: '🍚' },
    { value: 'beans', label: 'Beans', color: 'bg-emerald-500', icon: '🫘' },
    { value: 'spices', label: 'Spices', color: 'bg-amber-500', icon: '🌶️' },
    { value: 'protein', label: 'Protein', color: 'bg-red-500', icon: '🥩' },
    { value: 'other', label: 'Other', color: 'bg-gray-500', icon: '📦' },
  ];

  const themeClasses = {
    background: isDarkMode ? 'bg-dark' : 'bg-light',
    text: isDarkMode ? 'text-text' : 'text-textLight',
    card: isDarkMode ? 'bg-card' : 'bg-white',
    border: isDarkMode ? 'border-gray-800' : 'border-gray-200',
    textPrimary: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-700',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    hoverBg: isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100',
    goldBg: 'bg-gradient-to-r from-gold to-yellow-500',
    goldText: 'text-gold',
    goldBorder: 'border-gold',
    inputBg: isDarkMode ? 'bg-gray-800/60' : 'bg-gray-50',
    inputBorder: isDarkMode ? 'border-gray-700' : 'border-gray-300',
    inputFocus: isDarkMode 
      ? 'focus:ring-2 focus:ring-purple-500 focus:border-transparent' 
      : 'focus:ring-2 focus:ring-purple-400 focus:border-transparent',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    onAddItem({ 
      description, 
      quantity: Number(quantity), 
      amount: Number(amount),
      category,
      id: editingItem?.id || Date.now()
    });
    if (!editingItem) {
      setDescription('');
      setQuantity(1);
      setAmount('');
      setCategory('rice');
    }
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
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={`${themeClasses.card} backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl border ${themeClasses.border} mb-6 sm:mb-8`}
    >
      <div className="flex items-center mb-5 sm:mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl flex items-center justify-center mr-3">
          {editingItem ? <FaEdit className="text-white text-lg" /> : <FaCalculator className="text-white text-lg" />}
        </div>
        <div>
          <h2 className={`text-xl sm:text-2xl font-bold ${themeClasses.textPrimary}`}>
            {editingItem ? 'Edit Budget Item' : 'Add Budget Item'}
          </h2>
          <p className={`text-sm sm:text-base ${themeClasses.textMuted}`}>
            {editingItem ? 'Update your grocery item details' : 'Plan your grocery expenses'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        <div className="space-y-5 sm:space-y-6">
          {/* Description */}
          <div>
            <label className={`block ${themeClasses.textSecondary} mb-2 font-medium`}>Item Description</label>
            <div className="relative">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-4 py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-xl ${themeClasses.textPrimary} placeholder-gray-500 focus:outline-none ${themeClasses.inputFocus} transition-all pl-12`}
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
            <label className={`block ${themeClasses.textSecondary} mb-2 font-medium`}>Category</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat.value}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategory(cat.value)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex flex-col items-center justify-center ${
                    category === cat.value 
                      ? `${cat.color} text-white shadow-lg scale-105` 
                      : `${themeClasses.inputBg} ${themeClasses.textSecondary} hover:${themeClasses.hoverBg} border ${themeClasses.inputBorder}`
                  }`}
                >
                  <span className="text-lg mb-1">{cat.icon}</span>
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Quantity */}
            <div>
              <label className={`block ${themeClasses.textSecondary} mb-2 font-medium`}>Quantity</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className={`w-full px-4 py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-xl ${themeClasses.textPrimary} focus:outline-none ${themeClasses.inputFocus} transition-all`}
                  required
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  units
                </div>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className={`block ${themeClasses.textSecondary} mb-2 font-medium`}>Unit Price</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`w-full px-4 py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-xl ${themeClasses.textPrimary} focus:outline-none ${themeClasses.inputFocus} transition-all pl-12`}
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
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className={`bg-gradient-to-r from-purple-900/20 to-purple-800/10 rounded-xl p-4 border border-purple-800/30 ${isDarkMode ? '' : 'bg-gradient-to-r from-purple-50 to-purple-100'}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-400 text-sm">Estimated Total</div>
                <div className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {calculateTotal()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-sm">Unit Cost</div>
                <div className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  ₦{Number(amount || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full ${themeClasses.goldBg} text-black font-bold py-3 px-6 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={!description || !amount}
          >
            {editingItem ? (
              <>
                <FaEdit className="mr-2 group-hover:rotate-12 transition-transform" />
                Update Item
              </>
            ) : (
              <>
                <FaPlus className="mr-2 group-hover:rotate-90 transition-transform" />
                Add Item to Budget
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
}