import { FaCheck, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function BudgetCompactItem({ item, onEdit, onDelete, onToggleBought, isDarkMode }) {
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
      whileHover={{ x: 5 }}
      className={`flex items-center justify-between p-3 rounded-lg ${item.bought ? (isDarkMode ? 'bg-emerald-900/20' : 'bg-emerald-50') : (isDarkMode ? 'bg-gray-900/40' : 'bg-gray-50')} backdrop-blur-sm border ${item.bought ? 'border-emerald-500/20' : (isDarkMode ? 'border-gray-800' : 'border-gray-200')} hover:border-purple-500/30 transition-all duration-300`}
    >
      <div className="flex items-center space-x-3 flex-1">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleBought(item.id)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.bought ? 'bg-emerald-500' : 'bg-gray-800/50'}`}
        >
          {item.bought ? (
            <FaCheck className="text-white text-xs" />
          ) : (
            <FaShoppingCart className="text-gray-400 text-xs" />
          )}
        </motion.button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[item.category]} text-white`}>
              {item.category}
            </span>
            <h3 className={`font-medium truncate ${item.bought ? 'line-through text-gray-500' : (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
              {item.description}
            </h3>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              {item.quantity} × ₦{item.amount.toFixed(2)}
            </span>
            {item.bought && (
              <span className={`px-1.5 py-0.5 rounded ${isDarkMode ? 'bg-emerald-800/50' : 'bg-emerald-100'} ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                ✓
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-right flex-shrink-0">
        <div className={`font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
          ₦{total.toFixed(2)}
        </div>
        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {item.quantity} units
        </div>
      </div>
    </motion.div>
  );
}