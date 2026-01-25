// src/pages/RiceGallery.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaFilter, FaFire, FaLeaf, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

import { usePersistedState, useSessionState } from '../hooks/usePersistedState';
const riceData = [
  { 
    id: '1', 
    name: 'Ofada Rice', 
    description: 'Traditional Nigerian short-grain rice with earthy aroma and natural brown color.', 
    image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    price: '₦5,500',
    weight: '5kg bag',
    origin: 'Ogun State',
    cookingTime: '25-30 mins',
    rating: 4.8,
    tags: ['Traditional', 'Organic', 'Best Seller'],
    category: 'local'
  },
  { 
    id: '2', 
    name: 'Basmati Rice', 
    description: 'Premium long-grain aromatic rice from India, perfect for biryanis and special occasions.', 
    image: 'https://images.pexels.com/photos/12737658/pexels-photo-12737658.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    price: '₦6,200',
    weight: '5kg bag',
    origin: 'India',
    cookingTime: '15-20 mins',
    rating: 4.9,
    tags: ['Premium', 'Aromatic', 'Imported'],
    category: 'imported'
  },
  { 
    id: '3', 
    name: 'Abakaliki Rice', 
    description: 'Premium locally grown white rice from Ebonyi State, known for clean taste and fluffy texture.', 
    image: 'https://images.pexels.com/photos/4110258/pexels-photo-4110258.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    price: '₦4,800',
    weight: '5kg bag',
    origin: 'Ebonyi State',
    cookingTime: '20-25 mins',
    rating: 4.7,
    tags: ['Local', 'Fluffy', 'Affordable'],
    category: 'local'
  },
  { 
    id: '4', 
    name: 'Brown Rice', 
    description: 'Unpolished whole grain rice rich in fiber and nutrients. Healthier alternative to white rice.', 
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    price: '₦7,800',
    weight: '5kg bag',
    origin: 'Multiple',
    cookingTime: '40-45 mins',
    rating: 4.6,
    tags: ['Healthy', 'High Fiber', 'Organic'],
    category: 'healthy'
  },
  { 
    id: '5', 
    name: 'Jasmine Rice', 
    description: 'Fragrant Thai jasmine rice with soft, slightly sticky texture perfect for Asian dishes.', 
    image: 'https://images.pexels.com/photos/12681236/pexels-photo-12681236.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    price: '₦6,500',
    weight: '5kg bag',
    origin: 'Thailand',
    cookingTime: '18-22 mins',
    rating: 4.7,
    tags: ['Fragrant', 'Soft', 'Imported'],
    category: 'imported'
  },
  { 
    id: '6', 
    name: 'Parboiled Rice', 
    description: 'Partially boiled rice that retains more nutrients and cooks to separate, fluffy grains.', 
    image: 'https://images.pexels.com/photos/4110257/pexels-photo-4110257.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    price: '₦5,000',
    weight: '5kg bag',
    origin: 'Nigeria',
    cookingTime: '25-30 mins',
    rating: 4.5,
    tags: ['Nutritious', 'Fluffy', 'Easy to Cook'],
    category: 'local'
  },
  { 
    id: '7', 
    name: 'Wild Rice', 
    description: 'Nutty-flavored, protein-rich rice native to North America. Great for salads and pilafs.', 
    image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    price: '₦9,500',
    weight: '2kg bag',
    origin: 'USA/Canada',
    cookingTime: '45-50 mins',
    rating: 4.4,
    tags: ['Premium', 'Protein-rich', 'Nutty'],
    category: 'healthy'
  },
  { 
    id: '8', 
    name: 'Coconut Rice Mix', 
    description: 'Rice pre-mixed with coconut flavor for easy preparation of traditional Nigerian coconut rice.', 
    image: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    price: '₦7,200',
    weight: '2kg pack',
    origin: 'Nigeria',
    cookingTime: '25 mins',
    rating: 4.9,
    tags: ['Pre-seasoned', 'Convenient', 'Popular'],
    category: 'specialty'
  },
];

const categories = [
  { id: 'all', name: 'All Rice', icon: '🍚' },
  { id: 'local', name: 'Local', icon: '🇳🇬' },
  { id: 'imported', name: 'Imported', icon: '🌍' },
  { id: 'healthy', name: 'Healthy', icon: '💚' },
  { id: 'specialty', name: 'Specialty', icon: '⭐' },
  { id: 'best', name: 'Best Sellers', icon: '🔥' },
];

export default function RiceGallery() {
  const { isDarkMode } = useTheme();  
  const [search, setSearch] = useSessionState('rice-search', '');
  const [selectedCategory, setSelectedCategory] = useSessionState('rice-category', 'all');
  const [sortBy, setSortBy] = useSessionState('rice-sort', 'featured');
  const [showFilters, setShowFilters] = useSessionState('rice-show-filters', false);
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
    gradientOverlay: isDarkMode 
      ? 'bg-gradient-to-br from-purple-900/70 via-purple-900/50 to-gold/40' 
      : 'bg-gradient-to-br from-purple-900/40 via-purple-900/20 to-gold/30',
    cardGradient: isDarkMode 
      ? 'bg-gradient-to-br from-card to-dark/50' 
      : 'bg-gradient-to-br from-white to-gray-50',
  };

  // Filter rice based on search and category
  const filteredRice = riceData.filter(rice => {
    const matchesSearch = 
      rice.name.toLowerCase().includes(search.toLowerCase()) ||
      rice.description.toLowerCase().includes(search.toLowerCase()) ||
      rice.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'best' && rice.rating >= 4.7) ||
      rice.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort rice
  const sortedRice = [...filteredRice].sort((a, b) => {
    switch(sortBy) {
      case 'price-low': return parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
      case 'price-high': return parseFloat(b.price.replace(/[^0-9.-]+/g, "")) - parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
      case 'rating': return b.rating - a.rating;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0; // featured
    }
  });

  return (
    <div className={`min-h-screen pb-16 transition-colors duration-300 ${themeClasses.background} ${themeClasses.text}`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className={`absolute inset-0 ${
          isDarkMode ? 'opacity-5' : 'opacity-10'
        }`} style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${
            isDarkMode ? 'ffffff' : '000000'
          }' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden">
        {/* Background Image with Gradient */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          
          {/* Gradient Overlays */}
          <div className={`absolute inset-0 ${themeClasses.gradientOverlay}`}></div>
          <div className={`absolute inset-0 bg-gradient-to-t ${
            isDarkMode ? 'from-dark' : 'from-white'
          } via-transparent to-transparent`}></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm rounded-full text-sm font-medium mb-4 sm:mb-6 ${
              isDarkMode
                ? 'bg-gold/20 text-gold'
                : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
            }`}>
              <FaLeaf className="mr-2" />
              Premium Quality Guaranteed
            </div>
            
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Our Premium <span className={themeClasses.goldText}>Rice</span> Collection
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl md:max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Discover authentic Nigerian and international rice varieties with detailed preparation guides and cooking tips.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <Link
                to="#shop"
                className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-gold to-yellow-500 text-black font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center text-sm sm:text-base"
              >
                <FaShoppingCart className="mr-2" />
                Shop Premium Rice
              </Link>
              <Link
                to="/recipes"
                className={`px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 border-2 font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center text-sm sm:text-base ${
                  isDarkMode
                    ? 'border-gold text-gold hover:bg-gold hover:text-black'
                    : 'border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white'
                }`}
              >
                View Rice Recipes
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className={`backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border shadow-lg ${
          isDarkMode
            ? 'bg-gradient-to-br from-card/80 to-dark/60 border-gray-800'
            : 'bg-white/80 border-gray-200 shadow-light-lg'
        }`}>
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <FaSearch className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search rice varieties, tags, or descriptions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm sm:text-base ${
                    isDarkMode
                      ? 'bg-dark border-gray-700 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`lg:hidden flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition text-sm sm:text-base ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                <FaFilter className="mr-2" />
                Filters
              </button>

              {/* Desktop Sort Dropdown */}
              <div className="hidden lg:block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold text-sm sm:text-base ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="featured">Featured</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Results Count */}
              <div className={`hidden lg:block text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {sortedRice.length} {sortedRice.length === 1 ? 'item' : 'items'} found
              </div>
            </div>
          </div>

          {/* Mobile Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden mt-3 sm:mt-4 pt-3 sm:pt-4 border-t ${
                isDarkMode ? 'border-gray-800' : 'border-gray-300'
              }`}
            >
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className={`block mb-1.5 sm:mb-2 text-sm sm:text-base ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Sort by</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base ${
                      isDarkMode
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="featured">Featured</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {sortedRice.length} {sortedRice.length === 1 ? 'item' : 'items'} found
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="flex overflow-x-auto pb-2 sm:pb-3 space-x-1.5 sm:space-x-2 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 flex items-center whitespace-nowrap text-sm sm:text-base ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="mr-1.5 sm:mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Rice Grid */}
      <div id="shop" className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        {sortedRice.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-12 sm:py-16 backdrop-blur-sm rounded-xl sm:rounded-2xl border ${
              isDarkMode
                ? 'bg-card/30 border-gray-800'
                : 'bg-white/80 border-gray-200'
            }`}
          >
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 ${
              isDarkMode
                ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/20'
                : 'bg-gradient-to-br from-purple-100 to-purple-50'
            }`}>
              <FaSearch className={`text-2xl sm:text-3xl ${
                isDarkMode ? 'text-purple-400' : 'text-purple-500'
              }`} />
            </div>
            <h3 className={`text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>No Rice Found</h3>
            <p className={`max-w-xs sm:max-w-sm mx-auto mb-4 sm:mb-6 text-sm sm:text-base ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
                setShowFilters(false);
              }}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-full hover:shadow-xl transition text-sm sm:text-base"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <>
            {/* Mobile Results Info */}
            <div className="lg:hidden flex items-center justify-between mb-4 sm:mb-6">
              <div className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {sortedRice.length} {sortedRice.length === 1 ? 'item' : 'items'}
              </div>
              <div className={`${themeClasses.goldText} text-sm flex items-center`}>
                <FaFire className="mr-1" />
                Best Sellers
              </div>
            </div>

            {/* Rice Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {sortedRice.map((rice, index) => (
                <motion.div
                  key={rice.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`group backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isDarkMode
                      ? `${themeClasses.cardGradient} border border-gray-800 hover:border-gold/30`
                      : 'bg-white border border-gray-200 hover:border-yellow-300 shadow-light hover:shadow-xl'
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-40 sm:h-48 md:h-56">
                    <img 
                      src={rice.image} 
                      alt={rice.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Tags */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-wrap gap-0.5 sm:gap-1">
                      {rice.tags.slice(0, 2).map((tag, i) => (
                        <span 
                          key={i} 
                          className={`px-1.5 sm:px-2 py-0.5 sm:py-1 backdrop-blur-sm text-xs font-medium rounded-full ${
                            isDarkMode
                              ? 'bg-black/70 text-white'
                              : 'bg-white/90 text-gray-800'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Rating */}
                    <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 backdrop-blur-sm rounded-full px-2 sm:px-3 py-0.5 sm:py-1 flex items-center ${
                      isDarkMode ? 'bg-black/70' : 'bg-white/90'
                    }`}>
                      <FaStar className="text-yellow-400 mr-0.5 sm:mr-1 text-xs sm:text-sm" />
                      <span className={`font-bold text-sm sm:text-base ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>{rice.rating}</span>
                    </div>
                    
                    {/* Price */}
                    <div className={`absolute bottom-2 sm:bottom-3 left-2 sm:left-3 ${
                      themeClasses.goldBg
                    } text-black font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg text-sm sm:text-base`}>
                      {rice.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                    <div className="flex justify-between items-start mb-2 sm:mb-3">
                      <h3 className={`text-lg sm:text-xl font-bold group-hover:${
                        isDarkMode ? 'text-gold' : 'text-yellow-600'
                      } transition-colors ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {rice.name}
                      </h3>
                      <span className={`text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded ${
                        isDarkMode
                          ? 'text-gray-400 bg-gray-800'
                          : 'text-gray-500 bg-gray-100'
                      }`}>
                        {rice.weight}
                      </span>
                    </div>
                    
                    <p className={`mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {rice.description}
                    </p>
                    
                    {/* Details */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className={`flex items-center text-xs sm:text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <span className={`mr-1.5 sm:mr-2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>📍</span>
                        <span className="truncate">{rice.origin}</span>
                      </div>
                      <div className={`flex items-center text-xs sm:text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <span className={`mr-1.5 sm:mr-2 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>⏱️</span>
                        {rice.cookingTime}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-between items-center">
                      <Link 
                        to={`/rice/${rice.id}`} 
                        className={`font-medium flex items-center group text-sm sm:text-base ${
                          isDarkMode
                            ? 'text-gold hover:text-yellow-400'
                            : 'text-yellow-600 hover:text-yellow-700'
                        }`}
                      >
                        View Details
                        <svg className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                      <button className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-gold/10 to-gold/5 text-gold hover:bg-gold hover:text-black'
                          : 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      }`}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More (Optional) */}
            {sortedRice.length > 8 && (
              <div className="text-center mt-8 sm:mt-10 md:mt-12">
                <button className={`px-6 sm:px-8 py-2.5 sm:py-3 border-2 font-semibold rounded-full transition-all duration-300 hover:scale-105 text-sm sm:text-base ${
                  isDarkMode
                    ? 'border-gold text-gold hover:bg-gold hover:text-black'
                    : 'border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white'
                }`}>
                  Load More Rice Varieties
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 md:mt-16">
        <div className={`backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border ${
          isDarkMode
            ? 'bg-gradient-to-br from-purple-900/20 to-gold/10 border-purple-900/30'
            : 'bg-gradient-to-br from-purple-50 to-yellow-50 border-yellow-200'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: '🍚', title: 'Premium Quality', desc: 'Carefully selected grains from trusted farms', color: 'from-purple-600 to-purple-400' },
              { icon: '💰', title: 'Best Price', desc: 'Competitive pricing with volume discounts', color: 'from-emerald-600 to-emerald-400' },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Free delivery on orders over ₦10,000', color: 'from-amber-600 to-amber-400' },
              { icon: '⭐', title: 'Loyalty Rewards', desc: 'Earn points with every purchase', color: 'from-gold to-yellow-500' },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                  <span className="text-xl sm:text-2xl">{feature.icon}</span>
                </div>
                <h3 className={`font-bold mb-1.5 sm:mb-2 text-base sm:text-lg ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{feature.title}</h3>
                <p className={`text-xs sm:text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}