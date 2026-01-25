import { saveAs } from 'file-saver';
import { FaDownload, FaShareAlt, FaFileCsv, FaCopy } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function BudgetActions({ items, onShare }) {
  const { isDarkMode } = useTheme();

  const handleDownloadCSV = () => {
    const header = ['Description', 'Category', 'Quantity', 'Unit Amount (₦)', 'Total (₦)', 'Status'];
    const rows = items.map(item => [
      `"${item.description}"`,
      item.category,
      item.quantity,
      item.amount.toFixed(2),
      (item.quantity * item.amount).toFixed(2),
      item.bought ? 'BOUGHT' : 'PENDING'
    ]);
    
    const csvContent = [header, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'uchebest-budget.csv');
  };

  const handleShare = async () => {
    try {
      // Generate a comprehensive budget summary
      const total = items.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
      const boughtItems = items.filter(item => item.bought);
      const pendingItems = items.filter(item => !item.bought);
      const boughtTotal = boughtItems.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
      const pendingTotal = pendingItems.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
      const categoryBreakdown = items.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + (item.quantity * item.amount);
        return acc;
      }, {});
      
      const summary = `Uchebest Budget Summary:\n\n` +
        `📊 Total Budget: ₦${total.toLocaleString('en-NG', { minimumFractionDigits: 2 })}\n` +
        `✅ Bought: ${boughtItems.length} items (₦${boughtTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })})\n` +
        `🛒 Pending: ${pendingItems.length} items (₦${pendingTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })})\n\n` +
        `📂 Categories:\n${Object.entries(categoryBreakdown)
          .map(([cat, amt]) => `  • ${cat.charAt(0).toUpperCase() + cat.slice(1)}: ₦${amt.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`)
          .join('\n')}\n\n` +
        `📝 Items List:\n${items.map(item => `  ${item.bought ? '✅' : '⭕'} ${item.description} (${item.category}) - ${item.quantity} × ₦${item.amount.toFixed(2)} = ₦${(item.quantity * item.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`).join('\n')}`;
      
      await navigator.clipboard.writeText(summary);
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
        isDarkMode 
          ? 'bg-emerald-800 text-white border border-emerald-700' 
          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
      }`;
      notification.innerHTML = `
        <div class="flex items-center">
          <div class="mr-3">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <p class="font-semibold">Budget copied to clipboard!</p>
            <p class="text-sm opacity-90">Share it with family or friends.</p>
          </div>
        </div>
      `;
      document.body.appendChild(notification);
      
      // Auto-remove notification
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    } catch (err) {
      // Fallback alert if clipboard fails
      alert('Budget summary copied to clipboard! Share it with others.');
    }
  };

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
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8 p-4 sm:p-5 rounded-xl sm:rounded-2xl border ${
        isDarkMode
          ? 'bg-card/50 border-purple-800/30'
          : 'bg-white/80 border-purple-200 shadow-light'
      }`}
    >
      <div className="w-full mb-3 sm:mb-4">
        <h3 className={`text-lg sm:text-xl font-bold flex items-center ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          <FaDownload className="mr-2 text-gold" />
          Export & Share
        </h3>
        <p className={`text-sm sm:text-base mt-1 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Download your budget or share it with family members
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownloadCSV}
          className="flex-1 px-4 sm:px-5 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 hover:shadow-lg flex items-center justify-center group"
        >
          <FaFileCsv className="mr-2 sm:mr-3 text-lg" />
          <span className="font-semibold">Download CSV</span>
          <span className="ml-2 text-xs sm:text-sm opacity-80 group-hover:translate-x-1 transition-transform">
            ({items.length} items)
          </span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShare}
          className="flex-1 px-4 sm:px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 hover:shadow-lg flex items-center justify-center group"
        >
          <FaCopy className="mr-2 sm:mr-3 text-lg" />
          <span className="font-semibold">Copy Budget</span>
          <span className="ml-2 text-xs sm:text-sm opacity-80 group-hover:translate-x-1 transition-transform">
            (Share)
          </span>
        </motion.button>
      </div>
      
      {/* Additional Export Options (Future Enhancement) */}
      <div className={`w-full mt-3 pt-3 border-t ${
        isDarkMode ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <p className={`text-xs sm:text-sm ${
          isDarkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          💡 <span className="font-medium">Tip:</span> Share your budget with family members for collaborative grocery planning.
        </p>
      </div>
    </motion.div>
  );
}