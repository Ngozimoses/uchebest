import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext'; // Import your theme context
import { FaArrowLeft, FaShoppingCart, FaHeart, FaTag, FaClock, FaLeaf, FaMapMarkerAlt, FaFire } from 'react-icons/fa';

export default function RiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme(); // Get theme if needed
  
  // Get rice data from location state OR fallback to finding by ID
  const rice = location.state?.rice || riceData.find(r => r.id === id);
  
  // Theme classes
  const themeClasses = {
    background: isDarkMode ? 'bg-dark' : 'bg-light',
    text: isDarkMode ? 'text-text' : 'text-textLight',
    card: isDarkMode ? 'bg-card' : 'bg-white',
    border: isDarkMode ? 'border-gray-800' : 'border-gray-200',
    goldText: 'text-gold',
  };

  if (!rice) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${themeClasses.background}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className={`text-3xl font-bold ${themeClasses.goldText} mb-4`}>Rice not found</h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
            The rice variety you're looking for doesn't exist.
          </p>
          <button 
            onClick={() => navigate('/rice')} 
            className="px-6 py-3 bg-gold text-black font-semibold rounded-full hover:bg-yellow-500 transition"
          >
            Browse Rice Gallery
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background} ${themeClasses.text}`}>
      {/* Navigation */}
      <div className="container mx-auto px-4 pt-6 sm:pt-8">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)} 
          className={`flex items-center ${themeClasses.goldText} hover:opacity-80 transition mb-6 sm:mb-8 group text-sm sm:text-base`}
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Gallery
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
                  src={rice.image} 
                  alt={rice.name} 
                  className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {rice.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-300' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <FaTag className="inline mr-1.5" size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className={`inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 backdrop-blur-sm rounded-full text-sm font-medium mb-4 ${
                  isDarkMode
                    ? 'bg-gold/20 text-gold'
                    : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                }`}>
                  <FaLeaf className="mr-1.5 sm:mr-2" />
                  Premium Quality
                </div>
                
                <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${themeClasses.goldText}`}>
                  {rice.name}
                </h1>
                
                <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {rice.description}
                </p>
              </div>

              {/* Quick Stats */}
              <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
                isDarkMode ? 'bg-card/50 backdrop-blur-sm' : 'bg-gray-50'
              }`}>
                <div className="text-center">
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  } mb-1`}>Price</div>
                  <div className={`text-lg sm:text-xl font-bold ${themeClasses.goldText}`}>
                    {rice.price}
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  } mb-1`}>Weight</div>
                  <div className="text-lg sm:text-xl font-bold">{rice.weight}</div>
                </div>
                <div className="text-center">
                  <div className={`flex items-center justify-center text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  } mb-1`}>
                    <FaClock className="mr-1" size={12} />
                    Cook Time
                  </div>
                  <div className="text-lg sm:text-xl font-bold">{rice.cookingTime}</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  } mb-1`}>Shelf Life</div>
                  <div className="text-lg sm:text-xl font-bold">{rice.shelfLife}</div>
                </div>
              </div>

              {/* Origin & Nutrition */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
                  isDarkMode ? 'bg-card/50 backdrop-blur-sm' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <FaMapMarkerAlt className="mr-2 text-gold" />
                    Origin
                  </h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {rice.origin}
                  </p>
                </div>

                <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
                  isDarkMode ? 'bg-card/50 backdrop-blur-sm' : 'bg-gray-50'
                }`}>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <FaFire className="mr-2 text-gold" />
                    Nutrition Benefits
                  </h3>
                  <div className="space-y-2">
                    {rice.nutrition.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preparation Guide */}
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-purple-900/20 to-gold/10 border-purple-900/30' 
                  : 'bg-gradient-to-br from-purple-50 to-yellow-50 border-yellow-200'
              }`}>
                <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Preparation Guide
                </h2>
                <div className={`rounded-xl p-4 sm:p-6 whitespace-pre-line leading-relaxed text-sm sm:text-base ${
                  isDarkMode ? 'bg-black/30 text-gray-300' : 'bg-white text-gray-700'
                }`}>
                  {rice.preparation}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gold to-yellow-500 text-black font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center text-sm sm:text-base">
                  <FaShoppingCart className="mr-2" />
                  Add to Cart - {rice.price}
                </button>
                <button className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center text-sm sm:text-base ${
                  isDarkMode
                    ? 'border-gold text-gold hover:bg-gold hover:text-black'
                    : 'border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white'
                }`}>
                  <FaHeart className="mr-2" />
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}