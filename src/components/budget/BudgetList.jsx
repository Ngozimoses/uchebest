import BudgetItem from './BudgetItem';

export default function BudgetList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No budget items yet. Add one above!
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + (item.quantity * item.amount), 0);

  return (
    <div className="space-y-4">
      <div className="bg-purple-100 p-4 rounded-lg text-center">
        <h3 className="text-lg font-bold text-purple-800">Total Budget: ₦{total.toFixed(2)}</h3>
      </div>
      {items.map((item) => (
        <BudgetItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}