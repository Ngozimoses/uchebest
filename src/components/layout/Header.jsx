// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-dark border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center text-gold">
          <span className="bg-gold text-black rounded-full w-8 h-8 flex items-center justify-center mr-2">U</span>
          Uchebest Store
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-gold transition">Home</Link></li>
            <li><Link to="/rice" className="hover:text-gold transition">Rice</Link></li>
            <li><Link to="/beans" className="hover:text-gold transition">Beans</Link></li>
            <li><Link to="/budget" className="hover:text-gold transition">Budget</Link></li>
            <li><Link to="/scan" className="hover:text-gold transition">Scan & Earn</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}