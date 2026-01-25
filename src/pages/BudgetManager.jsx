import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BudgetForm from '../components/budget/BudgetForm';
import BudgetList from '../components/budget/BudgetList';
import BudgetActions from '../components/budget/BudgetActions';
import { v4 as uuidv4 } from 'uuid';

import { usePersistedState, useSessionState } from '../hooks/usePersistedState';
import { useTheme } from '../context/ThemeContext';
import { 
  FaCalculator, 
  FaChartLine, 
  FaWallet, 
  FaCheck, 
  FaShoppingCart,
  FaFilter 
} from 'react-icons/fa';

const loadBudgets = () => {
  const saved = localStorage.getItem('uchebest-budget');
  if (!saved) return [];
  
  const parsed = JSON.parse(saved);
  // Ensure all items have a bought property for backward compatibility
  return parsed.map(item => ({
    ...item,
    bought: item.bought || false
  }));
};

export default function BudgetManager() {
  const { isDarkMode } = useTheme();
  const [items, setItems] = useState(loadBudgets);
  const [editingItem, setEditingItem] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'bought', 'pending'

  useEffect(() => {
    localStorage.setItem('uchebest-budget', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (itemData) => {
    if (editingItem) {
      setItems(items.map(item =>
        item.id === editingItem.id
          ? { ...itemData, id: editingItem.id, bought: item.bought || false }
          : item
      ));
      setEditingItem(null);
    } else {
      const newItem = { ...itemData, id: uuidv4(), bought: false };
      setItems([...items, newItem]);
    }
  };

  const handleEdit = (item) => setEditingItem(item);
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };
  
  const handleToggleBought = (id) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, bought: !item.bought }
        : item
    ));
  };

  const handleClearBought = () => {
    if (window.confirm('Clear all purchased items from the list?')) {
      setItems(items.filter(item => !item.bought));
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all items from the budget?')) {
      setItems([]);
    }
  };

  // Filter items based on selection
  const filteredItems = items.filter(item => {
    switch (filter) {
      case 'bought': return item.bought;
      case 'pending': return !item.bought;
      default: return true; // 'all'
    }
  });

  // Calculate totals
  const totalBudget = items.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
  const boughtItems = items.filter(item => item.bought);
  const pendingItems = items.filter(item => !item.bought);
  const boughtTotal = boughtItems.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
  const pendingTotal = pendingItems.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
  const progressPercentage = totalBudget > 0 ? (boughtTotal / totalBudget) * 100 : 0;

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
              Plan your grocery spending, track purchases, and share your budget with family.
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
                ₦{totalBudget.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <div>
                  <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    <FaCheck className="inline mr-1" />
                    Bought: ₦{boughtTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    <FaShoppingCart className="inline mr-1" />
                    Remaining: ₦{pendingTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Progress Circle */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-20 h-20" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={isDarkMode ? '#374151' : '#e5e7eb'}
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray={`${progressPercentage}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Purchase Progress
              </span>
              <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>
                {boughtItems.length}/{items.length} items
              </span>
            </div>
            <div className="w-full h-2 bg-gray-700/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Filter Controls */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-xl ${
              isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50'
            }`}>
              <div className="flex items-center">
                <FaFilter className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Filter Items:
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'bought'].map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filter === filterType
                        ? filterType === 'bought'
                          ? 'bg-emerald-500 text-white'
                          : filterType === 'pending'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-purple-500 text-white'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {filterType === 'all' && 'All Items'}
                    {filterType === 'pending' && 'To Buy'}
                    {filterType === 'bought' && 'Purchased'}
                    {filterType === 'all' && ` (${items.length})`}
                    {filterType === 'pending' && ` (${pendingItems.length})`}
                    {filterType === 'bought' && ` (${boughtItems.length})`}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-2">
                {boughtItems.length > 0 && (
                  <button
                    onClick={handleClearBought}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      isDarkMode
                        ? 'bg-emerald-800/30 text-emerald-300 hover:bg-emerald-700/30'
                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    }`}
                  >
                    Clear Purchased
                  </button>
                )}
                {items.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      isDarkMode
                        ? 'bg-red-800/30 text-red-300 hover:bg-red-700/30'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

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
        <BudgetList 
          items={filteredItems} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          onToggleBought={handleToggleBought}
        />

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
                Click the cart icon to mark items as purchased
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

        {/* Purchasing Tips */}
        {pendingItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`mt-8 sm:mt-10 rounded-xl sm:rounded-2xl p-5 sm:p-6 border ${
              isDarkMode
                ? 'bg-blue-900/20 border-blue-800/30'
                : 'bg-blue-50 border-blue-200 shadow-light'
            }`}
          >
            <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              <FaShoppingCart className="mr-2" />
              Shopping Tips
            </h3>
            <ul className={`space-y-2 sm:space-y-3 text-sm sm:text-base ${
              isDarkMode ? 'text-blue-200' : 'text-blue-600'
            }`}>
              <li className="flex items-start">
                <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                }`}></span>
                You have {pendingItems.length} items left to purchase (₦{pendingTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })})
              </li>
              <li className="flex items-start">
                <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                }`}></span>
                Click the cart icon next to each item to mark it as bought
              </li>
              <li className="flex items-start">
                <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                }`}></span>
                Use the filter buttons to view only pending or purchased items
              </li>
              <li className="flex items-start">
                <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                }`}></span>
                Consider buying in bulk for frequently purchased items to save money
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}