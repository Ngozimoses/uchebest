// src/components/FloatingActions.jsx
import { Link } from 'react-router-dom';
import { FaQrcode, FaWallet } from 'react-icons/fa';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3">
      {/* Scan QR Button */}
      <Link
        to="/scan"
        className="flex items-center justify-center w-14 h-14 bg-gold text-black rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-110 animate-float"
        aria-label="Scan QR Code"
      >
        <FaQrcode className="text-xl" />
      </Link>

      {/* Budget Manager Button */}
      <Link
        to="/budget"
        className="flex items-center justify-center w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 animate-float-delayed"
        aria-label="Open Budget Manager"
      >
        <FaWallet className="text-xl" />
      </Link>
    </div>
  );
}