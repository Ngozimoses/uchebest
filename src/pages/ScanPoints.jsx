import { useState, useEffect } from 'react';
import QRScanner from '../components/scanner/QRScanner';

import { usePersistedState, useSessionState } from '../hooks/usePersistedState';
export default function ScanPoints() {
  const [message, setMessage] = useState('');
  const [points, setPoints] = useState(0);

  // Load points and last scan date from localStorage
  useEffect(() => {
    const savedPoints = localStorage.getItem('uchebest-points') || '0';
    setPoints(parseInt(savedPoints));
  }, []);

  const handleScanSuccess = (qrData) => {
    const today = new Date().toISOString().split('T')[0];
    const lastScanDate = localStorage.getItem('uchebest-last-scan');

    if (lastScanDate === today) {
      setMessage('❌ You already earned points today. Come back tomorrow!');
      return;
    }

    // Award 10 points
    const newPoints = points + 10;
    setPoints(newPoints);
    localStorage.setItem('uchebest-points', newPoints.toString());
    localStorage.setItem('uchebest-last-scan', today);
    setMessage('✅ 10 loyalty points earned! Total: ' + newPoints);
    
    // Reset message after 5 seconds
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Scan & Earn Points</h1>
      <p className="text-gray-600 text-center mb-6">
        Scan any Uchebest store QR code to earn 10 loyalty points — once per day.
      </p>

      <div className="bg-white p-6 rounded-xl shadow mb-6 text-center">
        <p className="text-2xl font-bold text-purple-700">Your Points: {points}</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 text-center ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <QRScanner onScanSuccess={handleScanSuccess} />
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>ℹ️ Make sure you're scanning an official Uchebest Store QR code.</p>
        <p>Points reset daily at midnight.</p>
      </div>
    </div>
  );
}