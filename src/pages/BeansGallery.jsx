// src/pages/BeansGallery.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaLeaf, FaStar, FaFire, FaCheck, FaSeedling } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

import { usePersistedState, useSessionState } from '../hooks/usePersistedState';
const mockBeansData = [
  { 
    id: 'b1', 
    name: 'Honey Beans (Oloyin Grade 1)', 
    description: 'The "Oloyin" (Honey) variety is highly prized for its unique naturally sweet taste and creamy texture. Sourced primarily from Maiduguri, this Grade 1 selection is thoroughly cleaned and stone-free.', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTekntu-uNpJ_UN-LXJuFGkqvi5ZHzjNNPXIA&s',
    price: '₦50,000', // Reflects current 2026 market range per 50kg bag
    weight: '50kg bag',
    origin: 'Maiduguri, Borno State',
    cookingTime: '45-60 mins',
    preparation: `1. Rinse grains 2-3 times to remove dust.\n2. No picking required for Grade 1.\n3. Boil with enough water to cover the beans by 2 inches.\n4. Cook until soft and creamy.\n5. Perfect for Ewa Agoyin, Gbegiri soup, or simple bean porridge.`,
    nutrition: ['Naturally high in protein (24g/100g)', 'Rich in dietary fiber for digestion', 'Low glycemic index suitable for diabetics', 'High in Folate and Iron'],
    shelfLife: '8-12 months',
    tags: ['Sweet', 'Premium', 'Fast Cooking'],
    category: 'brown'
  },
  { 
    id: 'b2', 
    name: 'Iron Beans (White)', 
    description: 'A premium variety of white beans known as "Iron Beans" due to their high mineral content. These large, clean grains stay firm when cooked, making them ideal for commercial use.', 
    image: 'https://i0.wp.com/www.africopanigeria.com/wp-content/uploads/2021/02/Pure-white-beans.png?fit=600%2C600&ssl=1',
    price: '₦75,000', // Current market pricing for 100kg/50kg variants
    weight: '50kg bag',
    origin: 'Northern Nigeria',
    cookingTime: '50-70 mins',
    preparation: `1. Wash thoroughly to remove surface starch.\n2. Soaking for 4 hours reduces gas and cooking time.\n3. Simmer on medium heat until tender.\n4. Excellent for Akara (fried cakes) and Moin-Moin (steamed pudding) as they peel easily.`,
    nutrition: ['Exceptionally high Iron content', 'Rich in Magnesium and Potassium', 'High plant-based protein', 'Zero saturated fats'],
    shelfLife: '18 months',
    tags: ['Stone-Free', 'Firm Texture', 'Akara/Moin-Moin'],
    category: 'white'
  },
  { 
    id: 'b3', 
    name: 'Brown Beans (Drum)', 
    description: 'Commonly known as "Drum" beans, this variety is a Nigerian staple. It is less sweet than Oloyin but has a hearty, earthy flavor that complements rice perfectly.', 
    image: 'https://www.foodlocker.com.ng/public/product/brown-beans.jpg',
    price: '₦48,000', // Reflects pricing for premium brown varieties
    weight: '50kg bag',
    origin: 'Benue State (Food Basket)',
    cookingTime: '60-80 mins',
    preparation: `1. Pick through grains to remove potential stones.\n2. Wash and parboil for 10 minutes, then drain the water (reduces bloating).\n3. Add fresh water and cook until soft.\n4. Best for Rice & Beans, Adalu (corn and beans), or bean stews.`,
    nutrition: ['Rich in complex carbohydrates', 'High Fiber for heart health', 'Source of Vitamin B1 (Thiamine)', 'Cholesterol-free'],
    shelfLife: '12 months',
    tags: ['Earthy Flavor', 'Staple', 'Versatile'],
    category: 'brown'
  },
  { 
    id: 'b4', 
    name: 'Potasco Beans', 
    description: 'A popular variety of small honey beans often exported. Known for their fast cooking time and sweet profile, they are a favorite among professional food vendors.', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTprGwBlq1EyW5tDx5b-QuLvGcm4k7ET8o4EQ&s',
    price: '₦70,000',
    weight: '50kg bag',
    origin: 'Niger / Maiduguri',
    cookingTime: '40-50 mins',
    preparation: `1. Rinse once (usually very clean).\n2. Cook directly without soaking to maintain sweetness.\n3. Add a pinch of salt only when beans are already soft.\n4. Ideal for commercial bean porridge.`,
    nutrition: ['Easier to digest', 'Rich in antioxidants', 'High caloric energy', 'Contains essential amino acids'],
    shelfLife: '10 months',
    tags: ['Small Grain', 'Quick Cook', 'High Yield'],
    category: 'specialty'
  }
];
const beansData = mockBeansData; // In real scenario, fetch from API or database
const categories = [
  { id: 'all', name: 'All Beans', icon: '🫘' },
  { id: 'local', name: 'Local', icon: '🇳🇬' },
  { id: 'imported', name: 'Imported', icon: '🌍' },
  { id: 'best', name: 'Best Sellers', icon: '🔥' },
  { id: 'organic', name: 'Organic', icon: '🌿' },
  { id: 'protein', name: 'High Protein', icon: '💪' },
];

export default function BeansGallery() {
  const { isDarkMode } = useTheme();

  const [search, setSearch] = useSessionState('beans-search', '');
  const [selectedCategory, setSelectedCategory] = useSessionState('beans-category', 'all');
  const [showFilters, setShowFilters] = useSessionState('beans-show-filters', false);

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
    emeraldBg: isDarkMode 
      ? 'bg-gradient-to-br from-emerald-900/70 via-emerald-900/50 to-gold/40' 
      : 'bg-gradient-to-br from-emerald-900/40 via-emerald-900/20 to-gold/30',
    cardGradient: isDarkMode 
      ? 'bg-gradient-to-br from-card to-dark/50' 
      : 'bg-gradient-to-br from-white to-gray-50',
  };

  // Filter beans based on search and category
  const filteredBeans = beansData.filter(bean => {
    const matchesSearch = 
      bean.name.toLowerCase().includes(search.toLowerCase()) ||
      bean.description.toLowerCase().includes(search.toLowerCase()) ||
      bean.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'best' && bean.rating >= 4.7) ||
      (selectedCategory === 'organic' && bean.tags.includes('Organic')) ||
      (selectedCategory === 'protein' && bean.tags.some(tag => tag.includes('Protein'))) ||
      bean.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen pb-16 transition-colors duration-300 ${themeClasses.background} ${themeClasses.text}`}>
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden">
        {/* Background Image with Gradient */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://cdn.loveandlemons.com/wp-content/uploads/2020/03/beans-480x270.jpg')`,
            }}
          />
          
          {/* Gradient Overlays */}
          <div className={`absolute inset-0 ${themeClasses.emeraldBg}`}></div>
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
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}>
              <FaSeedling className="mr-2" />
              100% Organic & Fresh
            </div>
            
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Our Nutritious <span className="text-emerald-400">Beans</span> Selection
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl md:max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Explore traditional and modern beans varieties with expert preparation methods and nutritional benefits.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <Link
                to="#shop"
                className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center text-sm sm:text-base"
              >
                <FaShoppingCart className="mr-2" />
                Shop Premium Beans
              </Link>
              <Link
                to="/recipes"
                className={`px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 border-2 font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center text-sm sm:text-base ${
                  isDarkMode
                    ? 'border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white'
                    : 'border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white'
                }`}
              >
                View Bean Recipes
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="max-w-md mx-auto relative z-10">
          <div className="relative">
            <FaSearch className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search beans by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 backdrop-blur-sm rounded-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                isDarkMode
                  ? 'bg-card/80 border border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white/80 border border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
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
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg'
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

      {/* Beans Grid */}
      <div id="shop" className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        {filteredBeans.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16"
          >
            <div className={`inline-block p-6 sm:p-8 backdrop-blur-sm rounded-xl sm:rounded-2xl ${
              isDarkMode
                ? 'bg-card/50'
                : 'bg-white/80 border border-gray-200'
            }`}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FaSearch className={`text-2xl sm:text-3xl ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-500'
                }`} />
              </div>
              <h3 className={`text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>No beans found</h3>
              <p className={`text-sm sm:text-base ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Try a different search term</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredBeans.map((bean, index) => (
              <motion.div
                key={bean.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`group backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${
                  isDarkMode
                    ? `${themeClasses.cardGradient} border border-gray-800 hover:border-emerald-500/30`
                    : 'bg-white border border-gray-200 hover:border-emerald-300 shadow-light hover:shadow-xl'
                }`}
              >
                <div className="relative overflow-hidden h-40 sm:h-48 md:h-56">
                  <img 
                    src={bean.image} 
                    alt={bean.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                    Featured
                  </div>
                  
                  {/* Rating */}
                  <div className={`absolute bottom-2 sm:bottom-3 right-2 sm:right-3 backdrop-blur-sm rounded-full px-2 sm:px-3 py-0.5 sm:py-1 flex items-center ${
                    isDarkMode ? 'bg-black/70' : 'bg-white/90'
                  }`}>
                    <FaStar className="text-yellow-400 mr-0.5 sm:mr-1 text-xs sm:text-sm" />
                    <span className={`font-bold text-sm sm:text-base ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{bean.rating}</span>
                  </div>
                  
                  {/* Price */}
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg text-sm sm:text-base">
                    {bean.price}
                  </div>
                </div>
                <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                  <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {bean.name}
                  </h3>
                  <p className={`mb-3 sm:mb-4 text-sm sm:text-base ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {bean.description}
                  </p>
                  
                  {/* Details */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className={`flex items-center text-xs sm:text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span className={`mr-1.5 sm:mr-2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>📍</span>
                      <span className="truncate">{bean.origin}</span>
                    </div>
                    <div className={`flex items-center text-xs sm:text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span className={`mr-1.5 sm:mr-2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>⏱️</span>
                      {bean.cookingTime}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                    {bean.tags.slice(0, 3).map((tag, i) => (
                      <span 
                        key={i} 
                        className={`px-2 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                          isDarkMode
                            ? 'bg-emerald-900/40 text-emerald-300'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    {/* UPDATED LINK COMPONENT - Passes entire bean object via state */}
                    <Link 
                      to={`/beans/${bean.id}`} 
                      state={{ bean }} // Pass the entire bean object
                      className={`font-medium flex items-center group text-sm sm:text-base ${
                        isDarkMode
                          ? 'text-emerald-400 hover:text-emerald-300'
                          : 'text-emerald-600 hover:text-emerald-700'
                      }`}
                    >
                      View Details
                      <svg className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                    <button className={`px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 text-emerald-400 hover:bg-emerald-500 hover:text-white'
                        : 'bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    }`}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 md:mt-16 lg:mt-20 relative z-10">
        <div className={`backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border ${
          isDarkMode
            ? 'bg-gradient-to-r from-emerald-900/20 to-gold/10 border-emerald-800/30'
            : 'bg-gradient-to-r from-emerald-50 to-yellow-50 border-emerald-200'
        }`}>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Why Choose Our Beans?
              </h2>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  '100% organic and locally sourced',
                  'Rich in protein and essential nutrients',
                  'Perfect for traditional Nigerian recipes',
                  'Freshly harvested and properly stored',
                  'Affordable premium quality',
                  'Eco-friendly packaging'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 mr-2 sm:mr-3 flex-shrink-0 ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-500'
                    }`} />
                    <span className={`text-sm sm:text-base ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <div className={`inline-block p-4 sm:p-6 backdrop-blur-sm rounded-xl sm:rounded-2xl ${
                isDarkMode ? 'bg-dark/50' : 'bg-white/80 border border-gray-200'
              }`}>
                <div className={`text-3xl sm:text-4xl font-bold mb-1.5 sm:mb-2 ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  4.8/5
                </div>
                <div className={`mb-1.5 sm:mb-2 text-sm sm:text-base ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Customer Rating
                </div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < 4 ? 'text-yellow-400' : 'text-gray-400'
                    }`} />
                  ))}
                </div>
                <div className={`mt-3 sm:mt-4 text-xs sm:text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Based on 500+ reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}