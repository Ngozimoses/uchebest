import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Enhanced mock data with more details
const mockBeansData = [
  { 
    id: '1', 
    name: 'Honey Beans', 
    description: 'Premium Nigerian honey beans with a naturally sweet flavor and creamy texture. Perfect for traditional Nigerian bean porridge (ewa riro).', 
    image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    price: '₦4,800',
    weight: '1kg pack',
    origin: 'Southwest Nigeria',
    cookingTime: '45-60 minutes',
    preparation: `1. Sort and pick through beans to remove any stones or debris
2. Rinse thoroughly under cold water
3. Soak overnight (or for at least 6 hours) for faster cooking
4. Drain and place in a pot with fresh water (1:3 beans to water ratio)
5. Boil for 45-60 minutes until tender
6. For ewa riro: Add palm oil, pepper mix, crayfish, and seasonings
7. Cook for additional 15 minutes to absorb flavors
8. Serve hot with plantain or bread`,
    nutrition: ['High in protein', 'Rich in fiber', 'Iron source', 'Low in fat', 'Complex carbs'],
    healthBenefits: ['Supports digestion', 'Heart healthy', 'Energy sustaining', 'Blood sugar control'],
    shelfLife: '12 months',
    bestFor: ['Bean porridge', 'Moimoi', 'Akara', 'Stews'],
    rating: 4.7
  },
  { 
    id: '2', 
    name: 'Black-eyed Peas', 
    description: 'Versatile protein-rich legumes with a mild flavor. Excellent for salads, stews, and traditional Nigerian dishes.', 
    image: 'https://images.pexels.com/photos/7358698/pexels-photo-7358698.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    price: '₦3,900',
    weight: '1kg pack',
    origin: 'Northern Nigeria',
    cookingTime: '30-45 minutes',
    preparation: `1. Sort and rinse the peas thoroughly
2. Soak for 2-4 hours to reduce cooking time
3. Place in pot with water (1:2 peas to water ratio)
4. Add a piece of onion and bay leaf for flavor (optional)
5. Boil for 30-45 minutes until soft but not mushy
6. Drain and use in your preferred recipe
7. For salads: Toss with vegetables and vinaigrette
8. For stews: Add to tomato-based sauce with spices`,
    nutrition: ['High protein content', 'Rich in folate', 'Potassium source', 'Low cholesterol', 'Antioxidants'],
    healthBenefits: ['Muscle building', 'Pregnancy nutrition', 'Blood pressure control', 'Anti-inflammatory'],
    shelfLife: '18 months',
    bestFor: ['Salads', 'Stews', 'Rice & peas', 'Akara'],
    rating: 4.5
  },
  { 
    id: '3', 
    name: 'Brown Beans', 
    description: 'Traditional Nigerian brown beans with earthy flavor. Ideal for porridge and makes excellent moimoi.', 
    image: 'https://images.pexels.com/photos/580615/pexels-photo-580615.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    price: '₦4,300',
    weight: '1kg pack',
    origin: 'Middle Belt Nigeria',
    cookingTime: '50-70 minutes',
    preparation: `1. Sort beans carefully to remove impurities
2. Rinse until water runs clear
3. Soak overnight for best results
4. Cook with ample water until very soft
5. For porridge: Blend some beans for thickness
6. Add palm oil, pepper, and seasonings
7. Simmer until oil floats to the top
8. Serve with garri or bread`,
    nutrition: ['Complete protein', 'High in fiber', 'Magnesium rich', 'B vitamins', 'Plant-based iron'],
    healthBenefits: ['Digestive health', 'Weight management', 'Bone health', 'Energy production'],
    shelfLife: '12 months',
    bestFor: ['Bean porridge', 'Moimoi', 'Soups', 'Side dishes'],
    rating: 4.6
  },
  { 
    id: '4', 
    name: 'White Beans', 
    description: 'Creamy white beans perfect for porridge and traditional Nigerian recipes. Known for their smooth texture.', 
    image: 'https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    price: '₦4,200',
    weight: '1kg pack',
    origin: 'Multiple regions',
    cookingTime: '40-55 minutes',
    preparation: `1. Sort and wash beans thoroughly
2. Soak for 4-6 hours
3. Cook with fresh water until tender
4. For porridge: Blend portion of cooked beans
5. Add palm oil, pepper, onions, and fish/meat
6. Season with salt, crayfish, and seasoning cubes
7. Cook until thickened to desired consistency
8. Garnish with scent leaves (efirin)`,
    nutrition: ['High protein', 'Low glycemic', 'Rich in iron', 'Calcium source', 'Folate'],
    healthBenefits: ['Heart health', 'Blood sugar balance', 'Anemia prevention', 'Prenatal health'],
    shelfLife: '12 months',
    bestFor: ['Porridge', 'Baked beans', 'Soups', 'Stews'],
    rating: 4.4
  },
];

export default function BeansDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const bean = mockBeansData.find(b => b.id === id);

  if (!bean) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-950/20 to-dark flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.17 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-emerald-400 mb-4">Beans Not Found</h2>
          <p className="text-gray-400 mb-8">The bean variety you're looking for doesn't exist in our collection.</p>
          <button 
            onClick={() => navigate('/beans')} 
            className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-500 transition hover:scale-105"
          >
            Explore Beans Gallery
          </button>
        </motion.div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // In a real app, you would dispatch to cart context/state
    alert(`Added ${quantity} pack(s) of ${bean.name} to cart!`);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950/20 to-dark text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 pt-8">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/beans')} 
          className="flex items-center text-emerald-400 hover:text-emerald-300 transition mb-8 group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Beans Gallery
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Image & Basic Info */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={bean.image} 
                  alt={bean.name} 
                  className="w-full h-64 md:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-emerald-900/30 backdrop-blur-sm rounded-xl p-4 text-center border border-emerald-800/30">
                  <div className="text-sm text-emerald-300 mb-1">Price</div>
                  <div className="text-2xl font-bold text-white">{bean.price}</div>
                </div>
                <div className="bg-emerald-900/30 backdrop-blur-sm rounded-xl p-4 text-center border border-emerald-800/30">
                  <div className="text-sm text-emerald-300 mb-1">Weight</div>
                  <div className="text-xl font-bold text-white">{bean.weight}</div>
                </div>
                <div className="bg-emerald-900/30 backdrop-blur-sm rounded-xl p-4 text-center border border-emerald-800/30">
                  <div className="text-sm text-emerald-300 mb-1">Rating</div>
                  <div className="flex items-center justify-center">
                    <span className="text-xl font-bold text-white mr-2">{bean.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(bean.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="inline-flex items-center px-4 py-1.5 bg-emerald-900/40 rounded-full text-emerald-300 text-sm font-medium mb-4">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Premium Quality
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">{bean.name}</h1>
                <p className="text-gray-300 text-lg leading-relaxed">{bean.description}</p>
              </div>

              {/* Key Information Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nutrition */}
                <div className="bg-emerald-900/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-800/30">
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-emerald-300">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    Nutrition Facts
                  </h3>
                  <div className="space-y-2">
                    {bean.nutrition.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Benefits */}
                <div className="bg-emerald-900/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-800/30">
                  <h3 className="text-xl font-semibold mb-4 flex items-center text-emerald-300">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Health Benefits
                  </h3>
                  <div className="space-y-2">
                    {bean.healthBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-emerald-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Usage & Origin */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">Best For</h3>
                  <div className="flex flex-wrap gap-2">
                    {bean.bestFor.map((use, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1.5 bg-emerald-900/40 text-emerald-300 rounded-full text-sm"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">Origin & Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Origin:</span>
                      <span className="text-white">{bean.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cooking Time:</span>
                      <span className="text-white">{bean.cookingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shelf Life:</span>
                      <span className="text-white">{bean.shelfLife}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preparation Guide */}
              <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-800/30">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                  <svg className="w-6 h-6 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  How to Prepare
                </h2>
                <div className="bg-black/40 rounded-xl p-6">
                  <div className="whitespace-pre-line text-gray-300 leading-relaxed space-y-4">
                    {bean.preparation.split('\n').map((step, index) => (
                      <div key={index} className="flex">
                        <span className="text-emerald-400 font-bold mr-3 min-w-[24px]">{step.match(/^\d+/)?.[0] || index + 1}.</span>
                        <span>{step.replace(/^\d+\.\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="bg-emerald-900/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-800/30">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">{bean.price}</div>
                    <div className="text-gray-400">{bean.weight}</div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-black/40 rounded-full">
                      <button 
                        onClick={() => handleQuantityChange(-1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    
                    <button 
                      onClick={handleAddToCart}
                      className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Beans */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16 pt-8 border-t border-emerald-800/30"
          >
            <h2 className="text-2xl font-bold mb-6 text-white">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockBeansData
                .filter(item => item.id !== id)
                .slice(0, 4)
                .map(item => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ y: -5 }}
                    onClick={() => navigate(`/beans/${item.id}`)}
                    className="bg-emerald-900/20 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer group border border-emerald-800/30"
                  >
                    <div className="h-32 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white group-hover:text-emerald-300 transition mb-1">{item.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-400 font-bold">{item.price}</span>
                        <span className="text-xs text-gray-400">{item.weight}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}