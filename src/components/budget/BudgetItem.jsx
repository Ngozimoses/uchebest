import { FaEdit, FaTrash } from 'react-icons/fa';

export default function BudgetItem({ item, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
      <div>
        <h3 className="font-semibold text-gray-800">{item.description}</h3>
        <p className="text-gray-600">
          Qty: {item.quantity} × ₦{item.amount.toFixed(2)} = ₦{(item.quantity * item.amount).toFixed(2)}
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(item)}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
          title="Edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-2 text-red-600 hover:bg-red-100 rounded-full"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}