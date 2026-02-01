import { FaEdit, FaTrash, FaCheck, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function BudgetTableRow({ item, onEdit, onDelete, onToggleBought, isDarkMode }) {
  const total = item.quantity * item.amount;
  
  const categoryColors = {
    rice: isDarkMode ? 'bg-purple-600' : 'bg-purple-500',
    beans: isDarkMode ? 'bg-emerald-600' : 'bg-emerald-500',
    spices: isDarkMode ? 'bg-amber-600' : 'bg-amber-500',
    protein: isDarkMode ? 'bg-red-600' : 'bg-red-500',
    other: isDarkMode ? 'bg-gray-600' : 'bg-gray-500'
  };

  return (
    <tr className={`border-b ${isDarkMode ? 'border-gray-800 hover:bg-gray-800/30' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
      <td className="py-3 px-4">
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggleBought(item.id)}
            className={`w-6 h-6 rounded mr-3 flex items-center justify-center ${item.bought ? 'bg-emerald-500' : 'bg-gray-300'}`}
          >
            {item.bought && <FaCheck className="text-white text-xs" />}
          </motion.button>
          <span className={`${item.bought ? 'line-through text-gray-500' : (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
            {item.description}
          </span>
        </div>
      </td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[item.category]} text-white`}>
          {item.category}
        </span>
      </td>
      <td className={`py-3 px-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {item.quantity}
      </td>
      <td className={`py-3 px-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        ₦{item.amount.toFixed(2)}
      </td>
      <td className={`py-3 px-4 font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
        ₦{total.toFixed(2)}
      </td>
      <td className="py-3 px-4">
        {item.bought ? (
          <span className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-emerald-800/50 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
            Bought
          </span>
        ) : (
          <span className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-yellow-800/50 text-yellow-300' : 'bg-yellow-100 text-yellow-700'}`}>
            Pending
          </span>
        )}
      </td>
      <td className="py-3 px-4">
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(item)}
            className={`p-1.5 rounded ${isDarkMode ? 'hover:bg-purple-900' : 'hover:bg-purple-100'} text-purple-500`}
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
            className={`p-1.5 rounded ${isDarkMode ? 'hover:bg-red-900' : 'hover:bg-red-100'} text-red-500`}
          >
            <FaTrash className="text-sm" />
          </motion.button>
        </div>
      </td>
    </tr>
  );
}