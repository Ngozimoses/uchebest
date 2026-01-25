import { FaReceipt, FaChartPie, FaTags, FaListAlt, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import BudgetItem from './BudgetItem';
import { useTheme } from '../../context/ThemeContext';

const BoughtItemsSummary = ({ items, isDarkMode }) => {
  const boughtItems = items.filter(item => item.bought);
  const totalBoughtCost = boughtItems.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
  const remainingItems = items.filter(item => !item.bought);
  const remainingCost = remainingItems.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
  
  if (boughtItems.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-5 sm:p-6 border ${isDarkMode ? 'border-emerald-800/50 bg-emerald-900/20' : 'border-emerald-200 bg-emerald-50'} mb-6`}
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-xl flex items-center justify-center mr-3">
          <FaCheck className="text-white text-lg" />
        </div>
        <div>
          <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Purchased Items
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
            {boughtItems.length} of {items.length} items marked as bought
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-emerald-800/30' : 'bg-emerald-100'}`}>
          <div className={`text-sm ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>Bought</div>
          <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {boughtItems.length} items
          </div>
          <div className={`text-lg ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            ₦{totalBoughtCost.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </div>
        </div>
        
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-100'}`}>
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Remaining</div>
          <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {remainingItems.length} items
          </div>
          <div className={`text-lg ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
            ₦{remainingCost.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </div>
        </div>
        
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
          <div className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>Progress</div>
          <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {items.length > 0 ? Math.round((boughtItems.length / items.length) * 100) : 0}%
          </div>
          <div className="w-full h-2 bg-gray-700/30 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
              style={{ width: `${items.length > 0 ? (boughtItems.length / items.length) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function BudgetList({ items, onEdit, onDelete, onToggleBought }) {
  const { isDarkMode } = useTheme();
  const total = items.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
  
  const categoryTotals = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + (item.quantity * item.amount);
    return acc;
  }, {});

  const categoryCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

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
  };

  const categoryColors = {
    rice: isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50',
    beans: isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50',
    spices: isDarkMode ? 'bg-amber-900/30' : 'bg-amber-50',
    protein: isDarkMode ? 'bg-red-900/30' : 'bg-red-50',
    other: isDarkMode ? 'bg-gray-900/30' : 'bg-gray-50'
  };

  const categoryBorderColors = {
    rice: isDarkMode ? 'border-purple-700/50' : 'border-purple-200',
    beans: isDarkMode ? 'border-emerald-700/50' : 'border-emerald-200',
    spices: isDarkMode ? 'border-amber-700/50' : 'border-amber-200',
    protein: isDarkMode ? 'border-red-700/50' : 'border-red-200',
    other: isDarkMode ? 'border-gray-700/50' : 'border-gray-200'
  };

  const categoryTextColors = {
    rice: isDarkMode ? 'text-purple-300' : 'text-purple-700',
    beans: isDarkMode ? 'text-emerald-300' : 'text-emerald-700',
    spices: isDarkMode ? 'text-amber-300' : 'text-amber-700',
    protein: isDarkMode ? 'text-red-300' : 'text-red-700',
    other: isDarkMode ? 'text-gray-300' : 'text-gray-700'
  };

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-center py-12 ${themeClasses.card} backdrop-blur-sm rounded-2xl border ${themeClasses.border} shadow-lg`}
      >
        <div className="w-20 h-20 bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaListAlt className="text-3xl text-purple-400" />
        </div>
        <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-2`}>No Budget Items Yet</h3>
        <p className={`${themeClasses.textMuted} max-w-sm mx-auto mb-6`}>
          Start planning your grocery budget by adding your first item above.
        </p>
        <div className={`inline-flex items-center px-4 py-2 rounded-full ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'} text-purple-400`}>
          <FaTags className="mr-2" />
          Add items to see your budget summary
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Total Budget Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${themeClasses.card} backdrop-blur-sm rounded-2xl p-5 sm:p-6 border ${isDarkMode ? 'border-purple-800/30' : 'border-purple-200'} shadow-lg`}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl flex items-center justify-center mr-3">
              <FaReceipt className="text-white text-lg" />
            </div>
            <div>
              <div className={`text-sm ${themeClasses.textMuted}`}>Total Budget</div>
              <div className={`text-2xl sm:text-3xl font-bold ${themeClasses.textPrimary}`}>
                ₦{total.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
            {items.length} item{items.length !== 1 ? 's' : ''} added • ₦{(total/items.length).toLocaleString('en-NG', { minimumFractionDigits: 2 })} avg
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${themeClasses.card} backdrop-blur-sm rounded-2xl p-5 sm:p-6 border ${themeClasses.border} shadow-lg col-span-2`}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-400 rounded-xl flex items-center justify-center mr-3">
              <FaChartPie className="text-white text-lg" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${themeClasses.textPrimary}`}>Category Breakdown</h3>
              <p className={`text-sm ${themeClasses.textMuted}`}>Spending by category</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(categoryTotals).map(([category, amount]) => {
              const percentage = ((amount / total) * 100).toFixed(1);
              return (
                <motion.div 
                  key={category} 
                  whileHover={{ scale: 1.05 }}
                  className={`rounded-xl p-3 sm:p-4 border ${categoryBorderColors[category] || categoryBorderColors.other} ${categoryColors[category] || categoryColors.other}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${categoryColors[category]?.replace('bg-', 'bg-').replace('/30', '') || 'bg-gray-500'}`}></div>
                      <span className={`text-sm font-medium capitalize ${categoryTextColors[category] || categoryTextColors.other}`}>
                        {category}
                      </span>
                    </div>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isDarkMode ? 'bg-black/30' : 'bg-white/80'}`}>
                      {categoryCounts[category] || 0}
                    </span>
                  </div>
                  <div className={`font-bold text-lg ${themeClasses.textPrimary}`}>
                    ₦{amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className={`text-xs ${themeClasses.textMuted}`}>{percentage}%</div>
                    <div className="w-16 h-1.5 bg-gray-700/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Purchased Items Summary */}
      <BoughtItemsSummary items={items} isDarkMode={isDarkMode} />

      {/* Items List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`${themeClasses.card} backdrop-blur-sm rounded-2xl p-5 sm:p-6 border ${themeClasses.border} shadow-lg`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h3 className={`text-lg sm:text-xl font-bold ${themeClasses.textPrimary}`}>Budget Items</h3>
            <p className={`text-sm ${themeClasses.textMuted}`}>Click the cart icon to mark items as bought</p>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <div className={`text-sm ${themeClasses.textMuted}`}>
              {items.length} item{items.length !== 1 ? 's' : ''}
            </div>
            {items.some(item => item.bought) && (
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-emerald-800/50' : 'bg-emerald-100'} ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                {items.filter(item => item.bought).length} bought
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          {items.map((item, index) => (
            <BudgetItem
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleBought={onToggleBought}
            />
          ))}
        </div>

        {/* Summary Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-6 border-t border-gray-800"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className={`text-center sm:text-left ${themeClasses.textMuted}`}>
              Total estimated cost for {items.length} item{items.length !== 1 ? 's' : ''}
            </div>
            <div className={`text-2xl sm:text-3xl font-bold ${themeClasses.goldText}`}>
              ₦{total.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          
          {/* Budget Tips */}
          <div className={`mt-4 pt-4 border-t ${themeClasses.border}`}>
            <div className={`text-sm ${themeClasses.textMuted} flex items-start`}>
              <span className="mr-2">💡</span>
              <span>
                <span className="font-medium">Tip:</span> Consider bulk purchases for items you use frequently to save money.
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}