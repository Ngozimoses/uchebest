// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import FloatingActions from '../components/FloatingActions';
import BotanicalDecor from '../components/BotanicalDecor';
import { useTheme } from '../context/ThemeContext'; // Use the hook
import { 
  FaLeaf, FaChartLine, FaQrcode, FaTruck, FaShieldAlt, FaSeedling,
  FaChevronLeft, FaChevronRight, FaFire, FaStar, FaShoppingCart
} from 'react-icons/fa';

export default function Home() {
  const { isDarkMode } = useTheme(); // Use the hook instead of useContext
  
  
  // Define carousel slides with better images
  const carouselSlides = [
    {
      id: 'rice',
      title: 'Nourish with Nigerian Rice',
      subtitle: 'Rich in Energy & Essential Minerals',
      description: 'Ofada and Basmati rice varieties are packed with magnesium, B-vitamins, and complex carbs for sustained energy. Perfect for active families and growing children.',
      image: 'https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      badges: ['High in Fiber', 'Energy Sustaining', 'Low Fat'],
      ctaText: 'Explore Rice Varieties',
      ctaLink: '/rice',
      color: 'from-purple-900/30 to-purple-700/20'
    },
    {
      id: 'beans',
      title: 'Fuel Your Day with Healthy Beans',
      subtitle: 'Plant-Based Protein Powerhouse',
      description: 'Honey beans and black-eyed peas deliver complete plant protein, iron, and fiber — supporting digestion, heart health, and muscle repair without cholesterol.',
      image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      badges: ['High Protein', 'Heart Healthy', 'Rich in Iron'],
      ctaText: 'Discover Bean Recipes',
      ctaLink: '/beans',
      color: 'from-emerald-900/30 to-emerald-700/20'
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

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
      ? 'bg-gradient-to-br from-black/70 via-black/50 to-purple-900/40' 
      : 'bg-gradient-to-br from-black/40 via-black/30 to-purple-900/20',
    featuresBg: isDarkMode 
      ? 'bg-gradient-to-br from-card to-dark/80' 
      : 'bg-gradient-to-br from-white to-gray-50',
  };

  // Featured products with better organization
  const featuredProducts = [
    { 
      name: "Ofada Rice", 
      img: "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", 
      desc: "Traditional short-grain with earthy aroma",
      category: "Rice",
      price: "₦5,500",
      rating: 4.8
    },
    { 
      name: "Honey Beans", 
      img: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", 
      desc: "Sweet, soft, cooked with palm oil",
      category: "Beans",
      price: "₦4,800",
      rating: 4.7
    },
    { 
      name: "Basmati Rice", 
      img: "https://images.pexels.com/photos/12737658/pexels-photo-12737658.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", 
      desc: "Long-grain aromatic for biryanis",
      category: "Rice",
      price: "₦6,200",
      rating: 4.9
    },
    { 
      name: "Black-eyed Peas", 
      img: "https://images.pexels.com/photos/7358698/pexels-photo-7358698.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", 
      desc: "Protein-rich legume for stews",
      category: "Beans",
      price: "₦3,900",
      rating: 4.6
    },
  ];

  // Features data
  const features = [
    {
      icon: FaLeaf,
      title: "Premium Quality",
      description: "Sourced from trusted local farms and global suppliers.",
      color: "text-emerald-500"
    },
    {
      icon: FaChartLine,
      title: "Smart Budgeting",
      description: "Plan your meals and track spending with our budget tool.",
      color: "text-blue-500"
    },
    {
      icon: FaQrcode,
      title: "Loyalty Rewards",
      description: "Scan QR codes in-store to earn points and redeem rewards.",
      color: "text-purple-500"
    },
    {
      icon: FaTruck,
      title: "Fast Delivery",
      description: "Free delivery on orders over ₦10,000 within Lagos.",
      color: "text-amber-500"
    },
    {
      icon: FaShieldAlt,
      title: "Secure Payment",
      description: "100% secure transactions with multiple payment options.",
      color: "text-green-500"
    },
    {
      icon: FaSeedling,
      title: "Organic & Fresh",
      description: "All products are organic and delivered fresh to you.",
      color: "text-teal-500"
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background} ${themeClasses.text}`}>
      <BotanicalDecor />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd6kH6oVxQMjahTmhFsXiC-R2OVGkf_AniPg&s')`,
            }}
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 ${themeClasses.gradientOverlay}`}></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-gold/20 backdrop-blur-sm rounded-full text-gold text-sm font-medium mb-6">
              <FaLeaf className="mr-2" />
              Premium Nigerian Groceries
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-gold">
              Welcome to <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Uchebest Store</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-lg sm:text-xl md:text-2xl mb-6 md:mb-10 max-w-2xl md:max-w-3xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Premium Nigerian rice & beans, grown with care — delivered to your table with loyalty rewards and smart budgeting.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/rice"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gold to-yellow-500 text-black font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                <FaShoppingCart className="mr-2" />
                Explore Rice
              </Link>
              <Link
                to="/beans"
                className={`px-6 sm:px-8 py-3 sm:py-4 border-2 font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center ${
                  isDarkMode
                    ? 'border-gold text-gold hover:bg-gold hover:text-black'
                    : 'border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white'
                }`}
              >
                Explore Beans
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className={`absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t ${
          isDarkMode ? 'from-dark' : 'from-white'
        } to-transparent pointer-events-none`}></div>
      </section>

      {/* Features Section */}
      <section className={`py-12 md:py-16 lg:py-20 ${themeClasses.featuresBg}`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${themeClasses.goldText}`}>
              Why Choose Uchebest?
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Experience premium quality with innovative features designed for modern living
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-card to-dark/80 border border-gray-800'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className={`w-14 h-14 ${feature.color} bg-opacity-20 rounded-2xl flex items-center justify-center mb-5`}>
                  <feature.icon className="text-2xl" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Carousel Section */}
      <section className={`py-12 md:py-16 lg:py-20 relative overflow-hidden ${
        isDarkMode ? 'bg-dark' : 'bg-gray-50'
      }`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
            {/* Text Content */}
            <div className="lg:w-1/2 space-y-6 md:space-y-8">
              <motion.div
                key={carouselSlides[currentSlide].id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-3 ${
                    isDarkMode
                      ? 'bg-gold/20 text-gold'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {carouselSlides[currentSlide].subtitle}
                  </span>
                  <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold leading-tight ${
                    isDarkMode ? 'text-gold' : 'text-yellow-600'
                  }`}>
                    {carouselSlides[currentSlide].title}
                  </h2>
                </div>
                
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {carouselSlides[currentSlide].description}
                </p>
                
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {carouselSlides[currentSlide].badges.map((badge, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        isDarkMode
                          ? 'bg-card text-gold border border-gold/30'
                          : 'bg-gray-100 text-yellow-700 border border-yellow-200'
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                
                <Link
                  to={carouselSlides[currentSlide].ctaLink}
                  className="inline-block px-6 md:px-8 py-3 bg-gradient-to-r from-gold to-yellow-500 text-black font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {carouselSlides[currentSlide].ctaText}
                </Link>
              </motion.div>

              {/* Carousel Controls */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={prevSlide}
                    className={`p-2 md:p-3 rounded-full transition ${
                      isDarkMode
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-label="Previous slide"
                  >
                    <FaChevronLeft />
                  </button>
                  
                  <div className="flex space-x-2">
                    {carouselSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition ${
                          index === currentSlide 
                            ? 'bg-gold' 
                            : isDarkMode 
                              ? 'bg-gray-600' 
                              : 'bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={nextSlide}
                    className={`p-2 md:p-3 rounded-full transition ${
                      isDarkMode
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-label="Next slide"
                  >
                    <FaChevronRight />
                  </button>
                </div>
                
                <div className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {currentSlide + 1} / {carouselSlides.length}
                </div>
              </div>
            </div>

            {/* Circular Food Image */}
            <div className="lg:w-1/2 relative">
              <motion.div
                key={carouselSlides[currentSlide].id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src={carouselSlides[currentSlide].image}
                  alt={carouselSlides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${
                  carouselSlides[currentSlide].color
                }`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Featured Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-gold to-yellow-500 text-black text-sm font-bold rounded-full flex items-center">
                    <FaFire className="mr-1" />
                    Featured
                  </span>
                </div>
              </motion.div>
              
              {/* Decorative Elements */}
              <div className="hidden lg:block absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-xl"></div>
              <div className="hidden lg:block absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className={`py-12 md:py-16 lg:py-20 ${
        isDarkMode ? 'bg-dark' : 'bg-white'
      }`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${themeClasses.goldText}`}>
              Our Signature Products
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Hand-picked premium selections for your kitchen
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-card to-dark/80 border border-gray-800'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="relative overflow-hidden h-48 md:h-56">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      product.category === "Rice" 
                        ? 'bg-purple-600 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}>
                      {product.category}
                    </span>
                  </div>
                  
                  {/* Rating */}
                  <div className={`absolute top-3 right-3 backdrop-blur-sm rounded-full px-3 py-1 flex items-center ${
                    isDarkMode ? 'bg-black/70' : 'bg-white/90'
                  }`}>
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{product.rating}</span>
                  </div>
                  
                  {/* Price */}
                  <div className="absolute bottom-3 left-3 bg-gradient-to-r from-gold to-yellow-500 text-black font-bold px-4 py-2 rounded-full shadow-lg">
                    {product.price}
                  </div>
                </div>
                
                <div className="p-5 md:p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`text-xl font-bold group-hover:${
                      isDarkMode ? 'text-gold' : 'text-yellow-600'
                    } transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {product.name}
                    </h3>
                    <span className={`text-sm px-2 py-1 rounded ${
                      isDarkMode
                        ? 'text-gray-400 bg-gray-800'
                        : 'text-gray-500 bg-gray-100'
                    }`}>
                      {product.category}
                    </span>
                  </div>
                  
                  <p className={`mb-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {product.desc}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/${product.category.toLowerCase()}`} 
                      className={`font-medium flex items-center group ${
                        isDarkMode
                          ? 'text-gold hover:text-yellow-400'
                          : 'text-yellow-600 hover:text-yellow-700'
                      }`}
                    >
                      View Details
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                    <button className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
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
          
          {/* View All Button */}
          <div className="text-center mt-10 md:mt-16">
            <Link
              to="/products"
              className={`inline-block px-8 py-3 border-2 font-semibold rounded-full transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? 'border-gold text-gold hover:bg-gold hover:text-black'
                  : 'border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white'
              }`}
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-12 md:py-16 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-purple-900/20 to-gold/10' 
          : 'bg-gradient-to-br from-purple-50 to-yellow-50'
      }`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: '500+', label: 'Happy Customers', icon: '😊' },
              { number: '50+', label: 'Products', icon: '🛒' },
              { number: '24/7', label: 'Support', icon: '🕒' },
              { number: '98%', label: 'Satisfaction', icon: '⭐' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`text-center p-6 rounded-2xl ${
                  isDarkMode
                    ? 'bg-card/50 backdrop-blur-sm'
                    : 'bg-white/80 backdrop-blur-sm'
                }`}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.number}
                </div>
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-12 md:py-16 lg:py-20 ${
        isDarkMode ? 'bg-card' : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${themeClasses.goldText}`}>
              Ready to Elevate Your Meals?
            </h2>
            <p className={`text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover the finest rice and beans, plan your budget, and earn rewards with every purchase.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/budget"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gold to-yellow-500 text-black font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                Start Planning Your Budget
              </Link>
              <Link
                to="/scan"
                className={`px-6 sm:px-8 py-3 sm:py-4 border-2 font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center ${
                  isDarkMode
                    ? 'border-gold text-gold hover:bg-gold hover:text-black'
                    : 'border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white'
                }`}
              >
                Scan & Earn Rewards
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 md:mt-12">
              {[
                { text: '✓ Secure Payment', icon: '🔒' },
                { text: '✓ Free Delivery', icon: '🚚' },
                { text: '✓ 100% Organic', icon: '🌿' },
                { text: '✓ 24/7 Support', icon: '📞' },
              ].map((badge, index) => (
                <div key={index} className={`flex items-center px-4 py-2 rounded-full ${
                  isDarkMode
                    ? 'bg-gray-800 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  <span className="mr-2">{badge.icon}</span>
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <FloatingActions />
    </div>
  );
}