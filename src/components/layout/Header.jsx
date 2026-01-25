// src/components/layout/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes, FaShoppingCart, FaUser, FaLeaf, FaSun, FaMoon } from 'react-icons/fa';

export default function Header({ isDarkMode, toggleTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Rice', path: '/rice', icon: '🍚' },
    { name: 'Beans', path: '/beans', icon: '🫘' },
    { name: 'Products', path: '/products', icon: '🛒' },
    { name: 'Budget', path: '/budget', icon: '💰' },
    { name: 'Scan & Earn', path: '/scan', icon: '📱' }, 
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 shadow-lg backdrop-blur-md transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-dark/95 border-b border-gold/20' 
        : 'bg-white/95 border-b border-gray-200'
    }`}>
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar - Desktop & Mobile */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-yellow-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-black font-bold text-lg">U</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden md:block">
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Uchebest Store
              </h1>
              <p className="text-xs text-gold">Premium Rice & Beans</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center ${
                      isActive(item.path)
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-gold/20 to-gold/10 text-gold border border-gold/30'
                          : 'bg-gradient-to-r from-gold/10 to-yellow-50 text-yellow-700 border border-yellow-200'
                        : isDarkMode
                          ? 'text-gray-300 hover:text-gold hover:bg-gray-800'
                          : 'text-gray-700 hover:text-yellow-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-gold hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-yellow-600 hover:bg-gray-100'
              }`}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
            </button>

            {/* Cart Icon */}
            <button className={`relative p-2 transition group rounded-lg ${
              isDarkMode 
                ? 'text-gray-300 hover:text-gold hover:bg-gray-800' 
                : 'text-gray-700 hover:text-yellow-600 hover:bg-gray-100'
            }`}>
            
        
            </button>

            {/* User Icon */}
            <button className={`hidden md:flex items-center p-2 transition rounded-lg ${
              isDarkMode 
                ? 'text-gray-300 hover:text-gold hover:bg-gray-800' 
                : 'text-gray-700 hover:text-yellow-600 hover:bg-gray-100'
            }`}>
              <FaUser className="text-lg" />
              <span className="ml-2">Account</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition rounded-lg ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-gold' 
                  : 'text-gray-700 hover:text-yellow-600'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`rounded-xl p-4 border shadow-2xl backdrop-blur-lg ${
            isDarkMode 
              ? 'bg-card/90 border-gray-800' 
              : 'bg-white/90 border-gray-200'
          }`}>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                      isActive(item.path)
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-gold/20 to-gold/10 text-gold border border-gold/30'
                          : 'bg-gradient-to-r from-gold/10 to-yellow-50 text-yellow-700 border border-yellow-200'
                        : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                    {isActive(item.path) && (
                      <span className={`ml-auto w-2 h-2 rounded-full animate-pulse ${
                        isDarkMode ? 'bg-gold' : 'bg-yellow-500'
                      }`}></span>
                    )}
                  </Link>
                </li>
              ))}
              
              {/* Mobile-only items */}
              <li className="pt-4 border-t border-gray-800">
                <div className="flex justify-between px-4 py-3">
                  <button className={`flex items-center ${
                    isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                  }`}>
                    <FaUser className="mr-3" />
                    My Account
                  </button>
                  <div className="flex items-center text-gold">
                    <FaLeaf className="mr-2" />
                    <span className="text-sm">Premium Member</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Simple Mobile Navigation (Alternative - Always visible) */}
        <nav className="lg:hidden flex justify-center mt-4 border-t border-gray-800 pt-4">
          <ul className="flex space-x-4 overflow-x-auto pb-2">
            {navigation.slice(0, 5).map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
                    isActive(item.path)
                      ? isDarkMode
                        ? 'text-gold bg-gold/10'
                        : 'text-yellow-600 bg-yellow-50'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="text-xl mb-1">{item.icon}</span>
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}