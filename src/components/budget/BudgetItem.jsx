import { FaEdit, FaTrash, FaCheck, FaShoppingCart, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function BudgetItem({ item, onEdit, onDelete, onToggleBought }) {
  const { isDarkMode } = useTheme();

  const categoryColors = {
    rice: isDarkMode ? 'bg-purple-500' : 'bg-purple-400',
    beans: isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400',
    spices: isDarkMode ? 'bg-amber-500' : 'bg-amber-400',
    protein: isDarkMode ? 'bg-red-500' : 'bg-red-400',
    other: isDarkMode ? 'bg-gray-500' : 'bg-gray-400'
  };

  const categoryIcons = {
    rice: '🍚',
    beans: '🫘',
    spices: '🌶️',
    protein: '🥩',
    other: '📦'
  };

  const total = item.quantity * item.amount;

  const themeClasses = {
    background: isDarkMode ? 'bg-dark' : 'bg-light',
    text: isDarkMode ? 'text-text' : 'text-textLight',
    card: isDarkMode ? 'bg-card' : 'bg-white',
    border: isDarkMode ? 'border-gray-800' : 'border-gray-200',
    textPrimary: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-700',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.01 }}
      className={`group ${item.bought ? (isDarkMode ? 'bg-emerald-900/20 border-emerald-700/50' : 'bg-emerald-50 border-emerald-200') : (isDarkMode ? 'bg-gray-900/40' : 'bg-gray-50')} backdrop-blur-sm p-4 rounded-xl border ${item.bought ? 'border-emerald-500/30' : (isDarkMode ? 'border-gray-800' : 'border-gray-200')} hover:border-purple-800/50 transition-all duration-300 hover:shadow-lg ${item.bought ? 'opacity-90' : ''}`}
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Checkmark Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggleBought(item.id)}
            className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${item.bought ? 'bg-emerald-500 shadow-lg' : 'bg-gray-800/50 hover:bg-emerald-500/20'}`}
            title={item.bought ? "Mark as not bought" : "Mark as bought"}
          >
            {item.bought ? (
              <>
                <FaCheckCircle className="text-white text-xl" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                  <FaCheck className="text-white text-xs" />
                </div>
              </>
            ) : (
              <FaShoppingCart className="text-gray-400 group-hover:text-emerald-400 text-lg" />
            )}
          </motion.button>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-bold ${item.bought ? 'line-through text-gray-500' : themeClasses.textPrimary} group-hover:text-purple-500 transition-colors`}>
                {item.description}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[item.category]} text-white`}>
                {item.category}
              </span>
              {item.bought && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isDarkMode ? 'bg-emerald-700/50' : 'bg-emerald-200'} ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                  ✓ Bought
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
              <div className={themeClasses.textMuted}>
                <span className={`font-medium ${item.bought ? 'text-gray-500' : themeClasses.textSecondary}`}>{item.quantity}</span> units
              </div>
              <div className={themeClasses.textMuted}>
                @ <span className={`font-medium ${item.bought ? 'text-gray-500' : themeClasses.textSecondary}`}>₦{item.amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span> each
              </div>
              <div className={`hidden sm:block ${themeClasses.textMuted}`}>•</div>
              <div className={`hidden sm:block font-medium ${item.bought ? 'text-gray-500' : (isDarkMode ? 'text-emerald-400' : 'text-emerald-600')}`}>
                Subtotal: ₦{total.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Total Display - Mobile */}
          <div className="sm:hidden text-right">
            <div className={`font-bold text-lg ${item.bought ? 'text-gray-500' : (isDarkMode ? 'text-emerald-400' : 'text-emerald-600')}`}>
              ₦{total.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </div>
            <div className={`text-xs ${themeClasses.textMuted}`}>
              {item.quantity} × ₦{item.amount.toFixed(2)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(item)}
              className={`p-2 ${isDarkMode ? 'bg-gray-800 hover:bg-purple-900' : 'bg-gray-200 hover:bg-purple-100'} ${item.bought ? 'text-gray-500' : 'text-purple-500'} hover:text-white rounded-lg transition-colors group/btn disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Edit item"
              disabled={item.bought}
            >
              <FaEdit className="group-hover/btn:rotate-12 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (window.confirm(`Delete "${item.description}" from budget?`)) {
                  onDelete(item.id);
                }
              }}
              className={`p-2 ${isDarkMode ? 'bg-gray-800 hover:bg-red-900' : 'bg-gray-200 hover:bg-red-100'} text-red-500 hover:text-white rounded-lg transition-colors group/btn`}
              title="Delete item"
            >
              <FaTrash className="group-hover/btn:shake transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}