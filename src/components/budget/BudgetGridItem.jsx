import { FaEdit, FaTrash, FaCheck, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function BudgetGridItem({ item, onEdit, onDelete, onToggleBought, isDarkMode }) {
  const total = item.quantity * item.amount;
  
  const categoryColors = {
    rice: isDarkMode ? 'bg-purple-600' : 'bg-purple-500',
    beans: isDarkMode ? 'bg-emerald-600' : 'bg-emerald-500',
    spices: isDarkMode ? 'bg-amber-600' : 'bg-amber-500',
    protein: isDarkMode ? 'bg-red-600' : 'bg-red-500',
    other: isDarkMode ? 'bg-gray-600' : 'bg-gray-500'
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      className={`relative ${item.bought ? (isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-50') : (isDarkMode ? 'bg-gray-900/40' : 'bg-gray-50')} backdrop-blur-sm p-4 rounded-xl border ${item.bought ? 'border-emerald-500/30' : (isDarkMode ? 'border-gray-800' : 'border-gray-200')} hover:border-purple-500/50 transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[item.category]} text-white`}>
          {item.category}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleBought(item.id)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bought ? 'bg-emerald-500' : 'bg-gray-800/50'}`}
        >
          {item.bought ? (
            <FaCheck className="text-white text-sm" />
          ) : (
            <FaShoppingCart className="text-gray-400 text-sm" />
          )}
        </motion.button>
      </div>
      
      <h3 className={`font-bold mb-2 ${item.bought ? 'line-through text-gray-500' : (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
        {item.description}
      </h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Quantity:</span>
          <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{item.quantity}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Price:</span>
          <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>₦{item.amount.toFixed(2)}</span>
        </div>
      </div>
      
      <div className={`text-center py-2 rounded-lg mb-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className={`text-lg font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
          ₦{total.toFixed(2)}
        </div>
      </div>
      
      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onEdit(item)}
          className={`p-2 ${isDarkMode ? 'bg-gray-800 hover:bg-purple-900' : 'bg-gray-200 hover:bg-purple-100'} text-purple-500 hover:text-white rounded-lg transition-colors`}
        >
          <FaEdit className="text-sm" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (window.confirm(`Delete "${item.description}" from budget?`)) {
              onDelete(item.id);
            }
          }}
          className={`p-2 ${isDarkMode ? 'bg-gray-800 hover:bg-red-900' : 'bg-gray-200 hover:bg-red-100'} text-red-500 hover:text-white rounded-lg transition-colors`}
        >
          <FaTrash className="text-sm" />
        </motion.button>
      </div>
    </motion.div>
  );
}