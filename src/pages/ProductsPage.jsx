import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaFilter, FaFire, FaLeaf, FaStar, FaSeedling } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

// Combined products data (rice + beans)
const productsData = [
  { 
    id: "1", 
    name: "OPPI Rice", 
    description: "Traditional short-grain with earthy aroma and excellent nutritional value.", 
    image: "https://shopaffordablegroceries.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-02-at-11.37.44-AM.jpeg", 
    price: "₦70,000", 
    weight: "50kg bag",
    origin: "Nigeria",
    cookingTime: "25-30 mins",
    rating: 4.8,
    tags: ["Earthy", "Traditional", "Organic"],
    category: "Rice"
  },
  { 
    id: "2", 
    name: "Honey Beans", 
    description: "Sweet, soft-textured beans that cook perfectly with palm oil for a rich taste.", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR4FYp64AQMWLuqt-ChrMuMJrWpXlT7jeV5g&s", 
    price: "₦4,800", 
    weight: "Paint bucket/Small bag",
    origin: "Nigeria (North)",
    cookingTime: "45-60 mins",
    rating: 4.7,
    tags: ["Sweet", "Protein", "Soft Texture"],
    category: "Beans"
  },
  { 
    id: "3", 
    name: "My Choice Rice", 
    description: "Premium Indian long-grain aromatic parboiled rice, perfect for biryanis and Jollof.", 
    image: "https://www-konga-com-res.cloudinary.com/f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/R/P/239256_1748276924.jpg", 
    price: "₦75,000", 
    weight: "50kg bag",
    origin: "India",
    cookingTime: "20-25 mins",
    rating: 4.9,
    tags: ["Aromatic", "Long Grain", "Non-sticky"],
    category: "Rice"
  },
  { 
    id: "4", 
    name: "Abakaliki Rice", 
    description: "Traditional Nigerian short-grain rice with earthy aroma and natural brown color.", 
    image: "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    price: "₦45,000 - ₦57,000",
    weight: "50kg bag",
    origin: "Ebonyi State",
    cookingTime: "25-30 mins",
    rating: 4.8,
    tags: ["Traditional", "Organic", "Best Seller"],
    category: "local"
  },
  { 
    id: "5", 
    name: "My Chop Rice", 
    description: "Premium long-grain parboiled rice known for its non-sticky texture and clean grains.", 
    image: "https://i0.wp.com/cfoodstuffmarket.com/wp-content/uploads/2024/11/MY-CHOP-BROWN-RICE-50KG.png?resize=320%2C320&ssl=1",
    price: "₦55,000",
    weight: "50kg bag",
    origin: "Nigeria/Imported Blend",
    cookingTime: "20-25 mins",
    rating: 4.9,
    tags: ["Premium", "Aromatic", "Long Grain"],
    category: "imported"
  },
  { 
    id: "6", 
    name: "Ma's Choice Rice", 
    description: "Premium Nigerian parboiled rice produced by Olam Group, known for its stone-free and clean grains.", 
    image: "https://www.buildrestfoods.com/wp-content/uploads/2020/08/Mamas-Choice.jpg",
    price: "₦70,000",
    weight: "50kg bag",
    origin: "Nigeria",
    cookingTime: "20-25 mins",
    rating: 4.7,
    tags: ["Local", "Fluffy", "Olam Group"],
    category: "local"
  },
  { 
    id: "7", 
    name: "Simba Rice", 
    description: "High-quality short or long grain rice options, often sought for its versatility and low starch content.", 
    image: "https://api.cloudmall.africa/files/download/18110.jpg",
    price: "₦55,000",
    weight: "50kg bag",
    origin: "Thailand/Multiple",
    cookingTime: "20-25 mins",
    rating: 4.6,
    tags: ["Healthy", "Versatile", "Imported Quality"],
    category: "healthy"
  },
  { 
    id: "8", 
    name: "Maa Rice (Mama Gold)", 
    description: "Highly popular long-grain parboiled rice that 'swells' significantly after cooking, making it a favorite for vendors.", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJXZXjDA4RS44WJ1Oq5NezwmJvv6w4y4MWEw&s",
    price: "₦55,000",
    weight: "50kg bag",
    origin: "Thailand/Nigeria",
    cookingTime: "18-22 mins",
    rating: 4.7,
    tags: ["Swells Well", "Popular", "Imported"],
    category: "imported"
  },
  { 
    id: "9", 
    name: "Pretty Lady Rice", 
    description: "Produced by Kaira Rice Mills, this rice is famous for its pink packaging and non-sticky texture.", 
    image: "https://pp-new-node-medusa-prod-bucket.s3.us-east-1.amazonaws.com/Pretty%20Lady%20Rice%2050kg%20(1)-1718821326413.jpeg",
    price: "₦55,000",
    weight: "50kg bag",
    origin: "Nigeria",
    cookingTime: "25-30 mins",
    rating: 4.5,
    tags: ["Pink Bag", "Non-Sticky", "Premium Local"],
    category: "local"
  },
  { 
    id: "10", 
    name: "Mama's Pride Rice", 
    description: "Top-tier Nigerian parboiled rice by Olam Nigeria; stone-free, nutritious, and easy to cook.", 
    image: "https://www.supermart.ng/cdn/shop/files/spar3219.png?v=1689101915",
    price: "₦55,000",
    weight: "50kg bag",
    origin: "Nigeria",
    cookingTime: "20-25 mins",
    rating: 4.4,
    tags: ["Stone-Free", "Nutritious", "Local"],
    category: "local"
  },
  { 
    id: "11", 
    name: "Vitali Rice", 
    description: "Premium Thai parboiled rice known for its consistent quality and excellent results in Jollof rice.", 
    image: "https://24hoursmarket.com/wp-content/uploads/2025/03/1742766875681.jpg",
    price: "₦70,000",
    weight: "50kg pack",
    origin: "Thailand",
    cookingTime: "25 mins",
    rating: 4.9,
    tags: ["Thai Parboiled", "Chef Choice", "Premium"],
    category: "imported"
  }
];

const categories = [
  { id: 'all', name: 'All Products', icon: '🛒' },
  { id: 'rice', name: 'Rice', icon: '🍚' },
  { id: 'beans', name: 'Beans', icon: '🫘' },
  { id: 'best', name: 'Best Sellers', icon: '🔥' },
  { id: 'organic', name: 'Organic', icon: '🌿' },
  { id: 'premium', name: 'Premium', icon: '⭐' },
];

export default function ProductsPage() {
  const { isDarkMode } = useTheme();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Theme-based classes
  const themeClasses = {
    background: isDarkMode ? 'bg-dark' : 'bg-light',
    text: isDarkMode ? 'text-text' : 'text-textLight',
    card: isDarkMode ? 'bg-card' : 'bg-white',
    border: isDarkMode ? 'border-gray-800' : 'border-gray-200',
    goldText: 'text-gold',
  };

  // Filter products
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'best' && product.rating >= 4.7) ||
      (selectedCategory === 'organic' && product.tags.includes('Organic')) ||
      (selectedCategory === 'premium' && product.tags.includes('Premium')) ||
      product.category.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
    const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
    
    switch(sortBy) {
      case 'price-low': return priceA - priceB;
      case 'price-high': return priceB - priceA;
      case 'rating': return b.rating - a.rating;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0; // featured
    }
  });

  return (
    <div className={`min-h-screen pb-16 transition-colors duration-300 ${themeClasses.background} ${themeClasses.text}`}>
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br from-purple-900/70 via-purple-900/50 to-gold/40`}></div>
          <div className={`absolute inset-0 bg-gradient-to-t ${
            isDarkMode ? 'from-dark' : 'from-white'
          } via-transparent to-transparent`}></div>
        </div>
        
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
              Premium Quality Collection
            </div>
            
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              All <span className={themeClasses.goldText}>Products</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl md:max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Browse our complete collection of premium Nigerian rice and beans. All products are sourced with care for quality and freshness.
            </motion.p>
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
                  placeholder="Search all products..."
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

            {/* Sort Dropdown */}
            <div className="w-full lg:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`w-full lg:w-auto px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold text-sm sm:text-base ${
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
            <div className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
            </div>
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

      {/* Products Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        {sortedProducts.length === 0 ? (
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
            }`}>No Products Found</h3>
            <p className={`max-w-xs sm:max-w-sm mx-auto mb-4 sm:mb-6 text-sm sm:text-base ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
              }}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-full hover:shadow-xl transition text-sm sm:text-base"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`group backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-card to-dark/50 border border-gray-800 hover:border-gold/30'
                    : 'bg-white border border-gray-200 hover:border-yellow-300 shadow-light hover:shadow-xl'
                }`}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-40 sm:h-48 md:h-56">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      product.category === "Rice" 
                        ? 'bg-purple-600 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}>
                      {product.category}
                    </span>
                  </div>
                  
                  {/* Rating */}
                  <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 backdrop-blur-sm rounded-full px-2 sm:px-3 py-0.5 sm:py-1 flex items-center ${
                    isDarkMode ? 'bg-black/70' : 'bg-white/90'
                  }`}>
                    <FaStar className="text-yellow-400 mr-0.5 sm:mr-1 text-xs sm:text-sm" />
                    <span className={`font-bold text-sm sm:text-base ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{product.rating}</span>
                  </div>
                  
                  {/* Price */}
                  <div className={`absolute bottom-2 sm:bottom-3 left-2 sm:left-3 ${
                    product.category === "Rice" 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-500' 
                      : 'bg-gradient-to-r from-emerald-600 to-emerald-500'
                  } text-white font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg text-sm sm:text-base`}>
                    {product.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <h3 className={`text-lg sm:text-xl font-bold group-hover:${
                      product.category === "Rice" 
                        ? (isDarkMode ? 'text-purple-400' : 'text-purple-600')
                        : (isDarkMode ? 'text-emerald-400' : 'text-emerald-600')
                    } transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {product.name}
                    </h3>
                    <span className={`text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded ${
                      isDarkMode
                        ? 'text-gray-400 bg-gray-800'
                        : 'text-gray-500 bg-gray-100'
                    }`}>
                      {product.weight}
                    </span>
                  </div>
                  
                  <p className={`mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {product.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                    {product.tags.slice(0, 3).map((tag, i) => (
                      <span 
                        key={i} 
                        className={`px-2 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                          product.category === "Rice"
                            ? isDarkMode
                              ? 'bg-purple-900/40 text-purple-300'
                              : 'bg-purple-100 text-purple-700'
                            : isDarkMode
                              ? 'bg-emerald-900/40 text-emerald-300'
                              : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                 <Link 
  to={`/products/${product.id}`} // Change the route to /products/:id
  state={{ product }} // Add this line to pass the product object
  className={`font-medium flex items-center group text-sm sm:text-base ${
    product.category === "Rice"
      ? isDarkMode
        ? 'text-purple-400 hover:text-purple-300'
        : 'text-purple-600 hover:text-purple-700'
      : isDarkMode
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
                      product.category === "Rice"
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-purple-500/10 to-purple-500/5 text-purple-400 hover:bg-purple-500 hover:text-white'
                          : 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 hover:bg-purple-200'
                        : isDarkMode
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 md:mt-16">
        <div className={`backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border ${
          isDarkMode
            ? 'bg-gradient-to-br from-purple-900/20 to-emerald-900/20 border-purple-800/30'
            : 'bg-gradient-to-br from-purple-50 to-emerald-50 border-purple-200'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'On orders over ₦10,000', color: 'from-purple-600 to-purple-400' },
              { icon: '💯', title: '100% Organic', desc: 'Certified organic products', color: 'from-emerald-600 to-emerald-400' },
              { icon: '💰', title: 'Best Price', desc: 'Price match guarantee', color: 'from-amber-600 to-amber-400' },
              { icon: '⭐', title: 'Loyalty Rewards', desc: 'Earn points on every purchase', color: 'from-gold to-yellow-500' },
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