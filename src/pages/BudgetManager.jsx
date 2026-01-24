// src/pages/BudgetManager.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BudgetForm from '../components/budget/BudgetForm';
import BudgetList from '../components/budget/BudgetList';
import BudgetActions from '../components/budget/BudgetActions';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '../context/ThemeContext';
import { FaCalculator, FaChartLine, FaShareAlt, FaDownload, FaWallet } from 'react-icons/fa';

const loadBudgets = () => {
  const saved = localStorage.getItem('uchebest-budget');
  return saved ? JSON.parse(saved) : [];
};

export default function BudgetManager() {
  const { isDarkMode } = useTheme();
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

  // Theme-based classes
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
    purpleGradient: isDarkMode 
      ? 'bg-gradient-to-r from-purple-900/40 to-gold/10' 
      : 'bg-gradient-to-r from-purple-100 to-yellow-100',
  };

  return (
    <div className={`min-h-screen pb-16 transition-colors duration-300 ${themeClasses.background} ${themeClasses.text}`}>
      {/* Hero Banner */}
      <section className={`py-12 md:py-16 lg:py-20 ${themeClasses.purpleGradient}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm rounded-full text-sm font-medium mb-4 ${
              isDarkMode
                ? 'bg-purple-500/20 text-purple-300'
                : 'bg-purple-100 text-purple-700 border border-purple-200'
            }`}>
              <FaCalculator className="mr-2" />
              Smart Budgeting Tool
            </div>
            
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Smart <span className={themeClasses.goldText}>Budget Manager</span>
            </h1>
            <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Plan your grocery spending, track expenses, and share your budget with family.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
        {/* Total Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl sm:rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 border shadow-lg ${
            isDarkMode
              ? 'bg-card border-purple-800/30'
              : 'bg-white border-purple-200 shadow-light'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className={`text-xl sm:text-2xl font-bold mb-1 sm:mb-2 ${
                isDarkMode ? 'text-gold' : 'text-purple-600'
              }`}>
                Total Budget
              </h2>
              <p className={`text-2xl sm:text-3xl md:text-4xl font-mono font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                ₦{total.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className={`text-sm sm:text-base mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {items.length} item{items.length !== 1 ? 's' : ''} in your budget
              </p>
            </div>
            
            {/* Budget Stats */}
            <div className="flex gap-4">
              {[
                { icon: FaChartLine, label: 'Tracking', value: 'Active' },
                { icon: FaWallet, label: 'Status', value: total > 0 ? 'Budgeted' : 'Empty' },
              ].map((stat, index) => (
                <div key={index} className={`text-center p-3 sm:p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'
                }`}>
                  <stat.icon className={`mx-auto mb-2 ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-500'
                  }`} />
                  <div className={`text-xs sm:text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>{stat.label}</div>
                  <div className={`font-bold text-sm sm:text-base ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Budget Form */}
        <BudgetForm onAddItem={handleAddItem} editingItem={editingItem} />

        {/* Editing Notification */}
        {editingItem && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`rounded-lg sm:rounded-xl p-3 sm:p-4 mb-6 ${
              isDarkMode
                ? 'bg-yellow-900/30 border-l-4 border-gold'
                : 'bg-yellow-50 border-l-4 border-yellow-500'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className={`font-medium text-sm sm:text-base ${
                  isDarkMode ? 'text-yellow-200' : 'text-yellow-800'
                }`}>
                  ✏️ Editing: <strong>{editingItem.description}</strong>
                </p>
                <p className={`text-xs sm:text-sm ${
                  isDarkMode ? 'text-yellow-300/80' : 'text-yellow-700'
                }`}>
                  Update the details below and click "Update Item"
                </p>
              </div>
              <button 
                onClick={() => setEditingItem(null)}
                className={`text-sm font-medium px-3 py-1.5 rounded ${
                  isDarkMode
                    ? 'bg-yellow-800/50 text-yellow-200 hover:bg-yellow-800'
                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                }`}
              >
                Cancel Edit
              </button>
            </div>
          </motion.div>
        )}

        {/* Budget List */}
        <BudgetList items={items} onEdit={handleEdit} onDelete={handleDelete} />

        {/* Actions */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 sm:mt-10"
          >
            <BudgetActions items={items} />
          </motion.div>
        )}

        {/* Tips Section */}
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-8 sm:mt-10 rounded-xl sm:rounded-2xl p-5 sm:p-6 border ${
              isDarkMode
                ? 'bg-card/50 border-purple-800/30'
                : 'bg-white/80 border-purple-200 shadow-light'
            }`}
          >
            <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              💡 Budgeting Tips
            </h3>
            <ul className={`space-y-2 sm:space-y-3 text-sm sm:text-base ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li className="flex items-start">
                <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                  isDarkMode ? 'bg-gold' : 'bg-yellow-500'
                }`}></span>
                Start by adding your essential rice and beans items
              </li>
              <li className="flex items-start">
                <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                  isDarkMode ? 'bg-gold' : 'bg-yellow-500'
                }`}></span>
                Include quantity to estimate total costs accurately
              </li>
              <li className="flex items-start">
                <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                  isDarkMode ? 'bg-gold' : 'bg-yellow-500'
                }`}></span>
                Use categories to organize your budget items
              </li>
              <li className="flex items-start">
                <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                  isDarkMode ? 'bg-gold' : 'bg-yellow-500'
                }`}></span>
                Share your budget with family for collaborative planning
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}