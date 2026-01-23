import { FaEdit, FaTrash, FaTag, FaTimes, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function BudgetItem({ item, onEdit, onDelete }) {
  const categoryColors = {
    rice: 'bg-purple-500',
    beans: 'bg-emerald-500',
    spices: 'bg-amber-500',
    protein: 'bg-red-500',
    other: 'bg-gray-500'
  };

  const categoryIcons = {
    rice: '🍚',
    beans: '🫘',
    spices: '🌶️',
    protein: '🥩',
    other: '📦'
  };

  const total = item.quantity * item.amount;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="group bg-gray-900/40 hover:bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-800 hover:border-purple-800/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 ${categoryColors[item.category] || 'bg-gray-600'} rounded-xl flex items-center justify-center`}>
            <span className="text-xl">{categoryIcons[item.category] || '📦'}</span>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors">
                {item.description}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[item.category] || 'bg-gray-600'} text-white`}>
                {item.category}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-gray-400">
                <span className="text-gray-300 font-medium">{item.quantity}</span> units
              </div>
              <div className="text-gray-400">
                @ <span className="text-gray-300 font-medium">₦{item.amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span> each
              </div>
              <div className="hidden sm:block text-gray-400">
                •
              </div>
              <div className="hidden sm:block text-emerald-400 font-medium">
                Total: ₦{total.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Total Display - Mobile */}
          <div className="sm:hidden text-right">
            <div className="text-emerald-400 font-bold text-lg">
              ₦{total.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-gray-400 text-xs">
              {item.quantity} × ₦{item.amount.toFixed(2)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(item)}
              className="p-2 bg-gray-800 hover:bg-purple-900 text-purple-400 hover:text-white rounded-lg transition-colors group/btn"
              title="Edit item"
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
              className="p-2 bg-gray-800 hover:bg-red-900 text-red-400 hover:text-white rounded-lg transition-colors group/btn"
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