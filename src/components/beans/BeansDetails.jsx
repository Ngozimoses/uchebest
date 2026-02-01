import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  FaArrowLeft, 
  FaShoppingCart, 
  FaHeart, 
  FaTag, 
  FaClock, 
  FaLeaf, 
  FaMapMarkerAlt, 
  FaFire,
  FaSeedling,
  FaStar,
  FaCheck,
  FaPlus,
  FaMinus
} from 'react-icons/fa';

export default function BeansDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const [quantity, setQuantity] = useState(1);

  // Get bean data from location state (passed from BeansGallery) OR fallback to mock data
  const bean = location.state?.bean;
  
  // Fallback mock data in case user accesses directly via URL
  const fallbackBeansData = [
    { 
      id: 'b1', 
      name: 'Honey Beans (Oloyin Grade 1)', 
      description: 'The "Oloyin" (Honey) variety is highly prized for its unique naturally sweet taste and creamy texture. Sourced primarily from Maiduguri, this Grade 1 selection is thoroughly cleaned and stone-free.', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTekntu-uNpJ_UN-LXJuFGkqvi5ZHzjNNPXIA&s',
      price: '₦60,000 - ₦97,000',
      weight: '50kg bag',
      origin: 'Maiduguri, Borno State',
      cookingTime: '45-60 mins',
      preparation: `1. Rinse grains 2-3 times to remove dust.\n2. No picking required for Grade 1.\n3. Boil with enough water to cover the beans by 2 inches.\n4. Cook until soft and creamy.\n5. Perfect for Ewa Agoyin, Gbegiri soup, or simple bean porridge.`,
      nutrition: ['Naturally high in protein (24g/100g)', 'Rich in dietary fiber for digestion', 'Low glycemic index suitable for diabetics', 'High in Folate and Iron'],
      healthBenefits: ['Supports muscle growth', 'Aids digestion', 'Blood sugar control', 'Anemia prevention'],
      shelfLife: '8-12 months',
      tags: ['Sweet', 'Premium', 'Fast Cooking'],
      category: 'brown',
      bestFor: ['Ewa Agoyin', 'Bean Porridge', 'Gbegiri Soup', 'Stews']
    },
    // ... other beans data
  ];

  // Use the bean from location state or find it from fallback data
  const selectedBean = bean || fallbackBeansData.find(b => b.id === id);

  // Theme classes
  const themeClasses = {
    background: isDarkMode ? 'bg-dark' : 'bg-light',
    text: isDarkMode ? 'text-text' : 'text-textLight',
    card: isDarkMode ? 'bg-card' : 'bg-white',
    border: isDarkMode ? 'border-gray-800' : 'border-gray-200',
    textPrimary: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-700',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    emeraldText: 'text-emerald-400',
    emeraldBg: isDarkMode 
      ? 'bg-gradient-to-br from-emerald-900/70 via-emerald-900/50 to-gold/40' 
      : 'bg-gradient-to-br from-emerald-900/40 via-emerald-900/20 to-gold/30',
  };

  if (!selectedBean) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${themeClasses.background}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className={`w-20 h-20 ${
            isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'
          } rounded-full flex items-center justify-center mx-auto mb-6`}>
            <FaLeaf className={`text-3xl ${themeClasses.emeraldText}`} />
          </div>
          <h2 className={`text-3xl font-bold ${themeClasses.emeraldText} mb-4`}>Beans Not Found</h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            The bean variety you're looking for doesn't exist.
          </p>
          <button 
            onClick={() => navigate('/beans')} 
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Browse Beans Gallery
          </button>
        </motion.div>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} pack(s) of ${selectedBean.name} to cart!`);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background} ${themeClasses.text}`}>
      {/* Navigation */}
      <div className="container mx-auto px-4 pt-6 sm:pt-8">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)} 
          className={`flex items-center ${themeClasses.emeraldText} hover:opacity-80 transition mb-6 sm:mb-8 group text-sm sm:text-base`}
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Beans Gallery
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12 sm:pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Left Column - Image */}
            <div className="space-y-4 sm:space-y-6">
              <div className={`rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl ${themeClasses.border}`}>
                <img 
                  src={selectedBean.image} 
                  alt={selectedBean.name} 
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedBean.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full ${
                      isDarkMode 
                        ? 'bg-emerald-900/40 text-emerald-300' 
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    <FaTag className="inline mr-1.5" size={10} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Stats */}
              <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
                isDarkMode ? 'bg-card/50 backdrop-blur-sm' : 'bg-gray-50'
              }`}>
                <div className="text-center">
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  } mb-1`}>Price</div>
                  <div className={`text-lg sm:text-xl font-bold ${themeClasses.emeraldText}`}>
                    {selectedBean.price}
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  } mb-1`}>Weight</div>
                  <div className="text-lg sm:text-xl font-bold">{selectedBean.weight}</div>
                </div>
                <div className="text-center">
                  <div className={`flex items-center justify-center text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  } mb-1`}>
                    <FaClock className="mr-1" size={12} />
                    Cook Time
                  </div>
                  <div className="text-lg sm:text-xl font-bold">{selectedBean.cookingTime}</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  } mb-1`}>Shelf Life</div>
                  <div className="text-lg sm:text-xl font-bold">{selectedBean.shelfLife}</div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className={`inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 backdrop-blur-sm rounded-full text-sm font-medium mb-4 ${
                  isDarkMode
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                }`}>
                  <FaSeedling className="mr-1.5 sm:mr-2" />
                  Premium Quality
                </div>
                
                <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${themeClasses.emeraldText}`}>
                  {selectedBean.name}
                </h1>
                
                <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {selectedBean.description}
                </p>
              </div>

              {/* Origin & Nutrition */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
                  isDarkMode ? 'bg-card/50 backdrop-blur-sm' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <FaMapMarkerAlt className="mr-2 text-emerald-400" />
                    Origin
                  </h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {selectedBean.origin}
                  </p>
                </div>

                <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
                  isDarkMode ? 'bg-card/50 backdrop-blur-sm' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <FaFire className="mr-2 text-emerald-400" />
                    Nutrition Benefits
                  </h3>
                  <div className="space-y-2">
                    {selectedBean.nutrition?.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <FaCheck className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Health Benefits */}
              {selectedBean.healthBenefits && (
                <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-800/30' 
                    : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200'
                }`}>
                  <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Health Benefits
                  </h2>
                  <div className={`rounded-xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 ${
                    isDarkMode ? 'bg-black/30' : 'bg-white'
                  }`}>
                    {selectedBean.healthBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Best For */}
              {selectedBean.bestFor && (
                <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
                  isDarkMode ? 'bg-card/50 backdrop-blur-sm' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Best For These Dishes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBean.bestFor.map((dish, index) => (
                      <span 
                        key={index} 
                        className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full ${
                          isDarkMode 
                            ? 'bg-emerald-900/40 text-emerald-300' 
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Preparation Guide */}
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-800/30' 
                  : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200'
              }`}>
                <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Preparation Guide
                </h2>
                <div className={`rounded-xl p-4 sm:p-6 whitespace-pre-line leading-relaxed text-sm sm:text-base ${
                  isDarkMode ? 'bg-black/30 text-gray-300' : 'bg-white text-gray-700'
                }`}>
                  {selectedBean.preparation}
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-800/30' 
                  : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200'
              }`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className={`text-2xl font-bold mb-1 ${themeClasses.emeraldText}`}>
                      {selectedBean.price}
                    </div>
                    <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {selectedBean.weight}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center rounded-full overflow-hidden ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      <button 
                        onClick={() => handleQuantityChange(-1)}
                        className={`w-10 h-10 flex items-center justify-center ${
                          isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <FaMinus />
                      </button>
                      <span className={`w-12 text-center text-lg font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {quantity}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(1)}
                        className={`w-10 h-10 flex items-center justify-center ${
                          isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    
                    <button 
                      onClick={handleAddToCart}
                      className="px-6 sm:px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center"
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}