import { saveAs } from 'file-saver';

export default function BudgetActions({ items, onShare }) {
  const handleDownloadCSV = () => {
    const header = ['Description', 'Quantity', 'Unit Amount (₦)', 'Total (₦)'];
    const rows = items.map(item => [
      `"${item.description}"`,
      item.quantity,
      item.amount.toFixed(2),
      (item.quantity * item.amount).toFixed(2)
    ]);
    
    const csvContent = [header, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'uchebest-budget.csv');
  };

  const handleShare = () => {
    // In a real app, you'd generate a shareable link
    // For now, copy JSON to clipboard
    navigator.clipboard.writeText(JSON.stringify(items, null, 2))
      .then(() => alert('Budget copied to clipboard! Share it with others.'));
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={handleDownloadCSV}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Download CSV
      </button>
      <button
        onClick={handleShare}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Copy Budget
      </button>
    </div>
  );
}