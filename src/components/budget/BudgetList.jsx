import { FaReceipt, FaChartPie } from 'react-icons/fa';
import BudgetItem from './BudgetItem';

export default function BudgetList({ items, onEdit, onDelete }) {
  const total = items.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
  
  const categoryTotals = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + (item.quantity * item.amount);
    return acc;
  }, {});

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 bg-gradient-to-br from-card to-dark/50 backdrop-blur-sm rounded-2xl border border-gray-800"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaReceipt className="text-3xl text-purple-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Budget Items Yet</h3>
        <p className="text-gray-400 max-w-sm mx-auto mb-6">
          Start planning your grocery budget by adding your first item above.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Budget Card */}
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-800/30">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl flex items-center justify-center mr-3">
              <FaReceipt className="text-white text-lg" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">Total Budget</div>
              <div className="text-3xl font-bold text-white">
                ₦{total.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
          <div className="text-purple-300 text-sm">
            {items.length} item{items.length !== 1 ? 's' : ''} added
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-gradient-to-br from-card to-dark/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 col-span-2">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-400 rounded-xl flex items-center justify-center mr-3">
              <FaChartPie className="text-white text-lg" />
            </div>
            <h3 className="text-lg font-bold text-white">Category Breakdown</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(categoryTotals).map(([category, amount]) => (
              <div key={category} className="bg-gray-900/50 rounded-xl p-3">
                <div className="flex items-center mb-2">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    category === 'rice' ? 'bg-purple-500' :
                    category === 'beans' ? 'bg-emerald-500' :
                    category === 'spices' ? 'bg-amber-500' :
                    category === 'protein' ? 'bg-red-500' : 'bg-gray-500'
                  }`}></div>
                  <span className="text-gray-300 text-sm font-medium capitalize">{category}</span>
                </div>
                <div className="text-white font-bold">
                  ₦{amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-gradient-to-br from-card to-dark/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Budget Items</h3>
          <div className="text-gray-400 text-sm">
            Showing {items.length} item{items.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <div className="space-y-3">
          {items.map((item) => (
            <BudgetItem
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <div className="text-gray-400">
              Total estimated cost for all items
            </div>
            <div className="text-2xl font-bold text-white">
              ₦{total.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}