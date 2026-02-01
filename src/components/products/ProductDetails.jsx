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
  FaMinus,
  FaTruck,
  FaShieldAlt,
  FaMoneyBillWave
} from 'react-icons/fa';

// Combined fallback data in case product is accessed directly via URL
const fallbackProductsData = [
  // Rice Products
  { 
    id: "1", 
    name: "OPPI Rice", 
    description: "Traditional short-grain with earthy aroma and excellent nutritional value.", 
    fullDescription: "Premium Nigerian short-grain rice known for its traditional earthy aroma and excellent nutritional profile. Perfect for daily family meals and special occasions.",
    image: "https://shopaffordablegroceries.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-02-at-11.37.44-AM.jpeg", 
    price: "₦70,000", 
    weight: "50kg bag",
    origin: "Nigeria",
    cookingTime: "25-30 mins",
    preparation: "1. Rinse rice thoroughly under cold water\n2. Use 2:1 water to rice ratio\n3. Bring to boil then simmer for 20 minutes\n4. Let stand covered for 5 minutes before serving",
    nutrition: ["High in fiber", "Rich in B vitamins", "Good source of iron", "Low glycemic index"],
    healthBenefits: ["Supports digestion", "Sustained energy release", "Heart healthy", "Gluten-free"],
    shelfLife: "12 months",
    rating: 4.8,
    tags: ["Earthy", "Traditional", "Organic", "Local"],
    category: "Rice",
    bestFor: ["Daily meals", "Jollof rice", "Fried rice", "Porridge"]
  },
  { 
    id: "2", 
    name: "Honey Beans", 
    description: "Sweet, soft-textured beans that cook perfectly with palm oil for a rich taste.", 
    fullDescription: "Premium Nigerian honey beans known for their naturally sweet flavor and creamy texture. These beans are perfect for traditional Nigerian dishes and provide excellent nutritional value.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR4FYp64AQMWLuqt-ChrMuMJrWpXlT7jeV5g&s", 
    price: "₦4,800", 
    weight: "Paint bucket/Small bag",
    origin: "Nigeria (Northern Region)",
    cookingTime: "45-60 mins",
    preparation: "1. Sort and wash beans thoroughly\n2. Soak overnight for faster cooking\n3. Cook with fresh water until soft\n4. Add palm oil and seasonings to taste",
    nutrition: ["High protein content", "Rich in iron", "Good source of folate", "High in fiber"],
    healthBenefits: ["Muscle building", "Anemia prevention", "Digestive health", "Heart healthy"],
    shelfLife: "8-12 months",
    rating: 4.7,
    tags: ["Sweet", "Protein", "Soft Texture", "Traditional"],
    category: "Beans",
    bestFor: ["Bean porridge", "Akara", "Moin moin", "Stews"]
  },
  // Add more products as needed...
  { 
    id: "3", 
    name: "My Choice Rice", 
    description: "Premium Indian long-grain aromatic parboiled rice, perfect for biryanis and Jollof.", 
    fullDescription: "Premium quality Indian long-grain aromatic parboiled rice. Known for its distinct aroma and non-sticky texture, making it perfect for biryanis, Jollof rice, and other special dishes.",
    image: "https://www-konga-com-res.cloudinary.com/f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/R/P/239256_1748276924.jpg", 
    price: "₦75,000", 
    weight: "50kg bag",
    origin: "India",
    cookingTime: "20-25 mins",
    preparation: "1. Rinse once to remove excess starch\n2. Use 1.5:1 water to rice ratio\n3. Cook on low heat for perfect texture\n4. Fluff with fork before serving",
    nutrition: ["Enriched with vitamins", "Low in fat", "Good carbohydrate source", "Gluten-free"],
    healthBenefits: ["Easy to digest", "Energy providing", "Low cholesterol", "Versatile cooking"],
    shelfLife: "18 months",
    rating: 4.9,
    tags: ["Aromatic", "Long Grain", "Non-sticky", "Imported"],
    category: "Rice",
    bestFor: ["Biryani", "Jollof rice", "Fried rice", "Pilaf"]
  }
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Get product data from location state (passed from ProductsPage) OR fallback data
  const product = location.state?.product || fallbackProductsData.find(p => p.id === id);

  // Theme classes
  const themeClasses = {
    background: isDarkMode ? 'bg-dark' : 'bg-light',
    text: isDarkMode ? 'text-text' : 'text-textLight',
    card: isDarkMode ? 'bg-card' : 'bg-white',
    border: isDarkMode ? 'border-gray-800' : 'border-gray-200',
    textPrimary: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-700',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    accentColor: product?.category === "Rice" 
      ? isDarkMode ? 'text-purple-400' : 'text-purple-600'
      : isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
    accentBg: product?.category === "Rice"
      ? isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'
      : isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-100',
    accentBorder: product?.category === "Rice"
      ? isDarkMode ? 'border-purple-500/30' : 'border-purple-200'
      : isDarkMode ? 'border-emerald-500/30' : 'border-emerald-200',
    gradientBg: product?.category === "Rice"
      ? isDarkMode ? 'from-purple-900/20 to-purple-800/10' : 'from-purple-50 to-purple-100'
      : isDarkMode ? 'from-emerald-900/20 to-emerald-800/10' : 'from-emerald-50 to-emerald-100'
  };

  if (!product) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${themeClasses.background}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className={`w-20 h-20 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          } rounded-full flex items-center justify-center mx-auto mb-6`}>
            <FaLeaf className={`text-3xl ${themeClasses.accentColor}`} />
          </div>
          <h2 className={`text-3xl font-bold ${themeClasses.accentColor} mb-4`}>Product Not Found</h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            The product you're looking for doesn't exist in our collection.
          </p>
          <button 
            onClick={() => navigate('/products')} 
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Browse All Products
          </button>
        </motion.div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsInCart(true);
    alert(`Added ${quantity} ${product.weight} of ${product.name} to cart!`);
    // In real app, you would dispatch to cart context/state
  };

  const handleSaveForLater = () => {
    setIsSaved(!isSaved);
    alert(`${!isSaved ? 'Saved' : 'Removed'} ${product.name} ${!isSaved ? 'for later' : 'from saved items'}`);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const relatedProducts = fallbackProductsData
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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
              {/* Main Image */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className={`rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ${themeClasses.border}`}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover transition-transform duration-700"
                />
              </motion.div>
              
              {/* Quick Stats */}
              <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl ${themeClasses.card}`}>
                <div className="text-center">
                  <div className={`text-sm ${themeClasses.textMuted} mb-1`}>Price</div>
                  <div className={`text-lg sm:text-xl font-bold ${themeClasses.accentColor}`}>
                    {product.price}
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-sm ${themeClasses.textMuted} mb-1`}>Weight</div>
                  <div className="text-lg sm:text-xl font-bold">{product.weight}</div>
                </div>
                <div className="text-center">
                  <div className={`flex items-center justify-center text-sm ${themeClasses.textMuted} mb-1`}>
                    <FaClock className="mr-1" size={12} />
                    Cook Time
                  </div>
                  <div className="text-lg sm:text-xl font-bold">{product.cookingTime}</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm ${themeClasses.textMuted} mb-1`}>Rating</div>
                  <div className="flex items-center justify-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-lg sm:text-xl font-bold">{product.rating}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full ${themeClasses.accentBg}`}
                  >
                    <FaTag className="inline mr-1.5" size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6 sm:space-y-8">
              {/* Header */}
              <div>
                <div className={`inline-flex items-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-sm font-medium mb-4 ${themeClasses.accentBg} ${themeClasses.accentColor}`}>
                  <FaSeedling className="mr-1.5 sm:mr-2" />
                  {product.category === "Rice" ? "Premium Rice" : "Premium Beans"}
                </div>
                
                <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 ${themeClasses.accentColor}`}>
                  {product.name}
                </h1>
                
                <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${themeClasses.textSecondary}`}>
                  {product.fullDescription || product.description}
                </p>
              </div>

              {/* Product Details Grid */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* Origin & Shelf Life */}
                <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${themeClasses.card}`}>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center ${themeClasses.textPrimary}`}>
                    <FaMapMarkerAlt className="mr-2" />
                    Product Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={themeClasses.textMuted}>Origin:</span>
                      <span className={themeClasses.textSecondary}>{product.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={themeClasses.textMuted}>Shelf Life:</span>
                      <span className={themeClasses.textSecondary}>{product.shelfLife}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={themeClasses.textMuted}>Category:</span>
                      <span className={`font-medium ${themeClasses.accentColor}`}>{product.category}</span>
                    </div>
                  </div>
                </div>

                {/* Nutrition */}
                {product.nutrition && (
                  <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${themeClasses.card}`}>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center ${themeClasses.textPrimary}`}>
                      <FaFire className="mr-2" />
                      Nutrition Facts
                    </h3>
                    <div className="space-y-2">
                      {product.nutrition.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <FaCheck className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className={themeClasses.textSecondary}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Health Benefits */}
              {product.healthBenefits && (
                <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${themeClasses.accentBorder}`}>
                  <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                    Health Benefits
                  </h2>
                  <div className={`rounded-xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 ${themeClasses.card}`}>
                    {product.healthBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${themeClasses.accentColor.replace('text', 'bg')}`}></div>
                        <span className={themeClasses.textSecondary}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Best For */}
              {product.bestFor && (
                <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${themeClasses.card}`}>
                  <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${themeClasses.textPrimary}`}>
                    Best For These Dishes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.bestFor.map((dish, index) => (
                      <span 
                        key={index} 
                        className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full ${themeClasses.accentBg}`}
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Preparation Guide */}
              {product.preparation && (
                <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${themeClasses.accentBorder}`}>
                  <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                    Preparation Guide
                  </h2>
                  <div className={`rounded-xl p-4 sm:p-6 whitespace-pre-line leading-relaxed text-sm sm:text-base ${themeClasses.card}`}>
                    {product.preparation}
                  </div>
                </div>
              )}

              {/* Add to Cart Section */}
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${themeClasses.accentBorder}`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className={`text-2xl font-bold mb-1 ${themeClasses.accentColor}`}>
                      {product.price}
                    </div>
                    <div className={themeClasses.textMuted}>
                      {product.weight}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <button 
                        onClick={() => handleQuantityChange(-1)}
                        className={`w-10 h-10 flex items-center justify-center ${
                          isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <FaMinus />
                      </button>
                      <span className={`w-12 text-center text-lg font-semibold ${themeClasses.textPrimary}`}>
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
                      className={`px-6 sm:px-8 py-3 text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center ${
                        product.category === "Rice"
                          ? 'bg-gradient-to-r from-purple-600 to-purple-500'
                          : 'bg-gradient-to-r from-emerald-600 to-emerald-500'
                      }`}
                    >
                      <FaShoppingCart className="mr-2" />
                      {isInCart ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Features */}
              <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl ${themeClasses.card}`}>
                <h3 className={`text-lg sm:text-xl font-semibold mb-4 ${themeClasses.textPrimary}`}>
                  Product Features
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className={`w-10 h-10 ${themeClasses.accentBg} rounded-full flex items-center justify-center mx-auto mb-2`}>
                      <FaTruck className={themeClasses.accentColor} />
                    </div>
                    <div className="text-xs sm:text-sm">Free Delivery Available</div>
                  </div>
                  <div className="text-center">
                    <div className={`w-10 h-10 ${themeClasses.accentBg} rounded-full flex items-center justify-center mx-auto mb-2`}>
                      <FaShieldAlt className={themeClasses.accentColor} />
                    </div>
                    <div className="text-xs sm:text-sm">Quality Guarantee</div>
                  </div>
                  <div className="text-center">
                    <div className={`w-10 h-10 ${themeClasses.accentBg} rounded-full flex items-center justify-center mx-auto mb-2`}>
                      <FaMoneyBillWave className={themeClasses.accentColor} />
                    </div>
                    <div className="text-xs sm:text-sm">Secure Payment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-16 pt-8 border-t border-gray-800/30"
            >
              <h2 className={`text-2xl font-bold mb-6 ${themeClasses.textPrimary}`}>
                You Might Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map(item => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ y: -5 }}
                    onClick={() => navigate(`/products/${item.id}`, { state: { product: item } })}
                    className={`${themeClasses.card} rounded-xl overflow-hidden cursor-pointer group border ${themeClasses.border}`}
                  >
                    <div className="h-32 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className={`font-semibold group-hover:${themeClasses.accentColor.replace('text', 'text')} transition mb-1 ${themeClasses.textPrimary}`}>
                        {item.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className={`font-bold ${themeClasses.accentColor}`}>{item.price}</span>
                        <span className="text-xs text-gray-400">{item.category}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}