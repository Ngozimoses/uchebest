// src/pages/BeansGallery.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const beansData = [
  { id: '1', name: 'Honey Beans', description: 'Sweet, soft beans cooked with palm oil and peppers.', image: 'https://www.heynutritionlady.com/wp-content/uploads/2023/05/How_to_Cook_Kidney_Beans-SQ.jpg' },
  { id: '2', name: 'Black-eyed Peas', description: 'Protein-rich legume used in stews and salads.', image: 'https://www.spendwithpennies.com/wp-content/uploads/2024/07/The-Best-Baked-Beans-SpendWithPennies-6.jpg' },
  { id: '3', name: 'Brown Beans', description: 'Nutritious local beans ideal for porridge or stew.', image: 'https://cdn.britannica.com/36/245936-050-B227C955/Adzuki-beans.jpg' },
  { id: '4', name: 'Lima Beans', description: 'Buttery-textured beans perfect for soups and side dishes.', image: 'https://www.nescafe.com/au/sites/default/files/2024-04/Untitled-5%20copy_6_0.jpg' },
];

export default function BeansGallery() {
  const [search, setSearch] = useState('');

  const filteredBeans = beansData.filter(bean =>
    bean.name.toLowerCase().includes(search.toLowerCase()) ||
    bean.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark text-text pb-16">
      {/* Beans Farm Background Overlay */}
      <div 
        className="fixed inset-0 -z-10 opacity-15"
        style={{
          backgroundImage: `url('https://www.spendwithpennies.com/wp-content/uploads/2024/07/The-Best-Baked-Beans-SpendWithPennies-6.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Hero Banner with Background Image */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
      <div className="absolute inset-0">
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfh7gn45uZ-XB_QZmDmv-LBl_d71x6uUWKGQ&s')`,
      }}
    />
    
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-purple-900/40"></div>
  </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 via-emerald-900/50 to-gold/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
          >
            Our Nutritious <span className="text-gold">Beans</span> Selection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8"
          >
            Explore traditional and modern beans with expert preparation methods.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/shop"
              className="px-8 py-3 bg-gold text-black font-semibold rounded-full hover:bg-yellow-500 transition-transform hover:scale-105"
            >
              Shop Now
            </Link>
            <Link
              to="/recipes"
              className="px-8 py-3 border-2 border-gold text-gold font-semibold rounded-full hover:bg-gold hover:text-black transition-all"
            >
              View Recipes
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="container mx-auto px-4 mt-8 max-w-md relative z-10">
        <div className="relative">
          <svg 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search beans by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-card/80 backdrop-blur-sm border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
        </div>
      </div>

      {/* Beans Grid */}
      <div className="container mx-auto px-4 mt-12 relative z-10">
        {filteredBeans.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-block p-8 bg-card/50 backdrop-blur-sm rounded-2xl">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">No beans found</h3>
              <p className="text-gray-400">Try a different search term</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBeans.map((bean, index) => (
              <motion.div
                key={bean.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-gold/30"
              >
                <div className="relative overflow-hidden h-56">
                  <img 
                    src={bean.image} 
                    alt={bean.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-gold text-black px-3 py-1 rounded-full text-sm font-bold">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">{bean.name}</h3>
                  <p className="text-gray-300 mb-4">{bean.description}</p>
                  <div className="flex justify-between items-center">
                    <Link 
                      to={`/beans/${bean.id}`} 
                      className="text-gold hover:text-yellow-400 font-medium flex items-center group"
                    >
                      View Details
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                    <button className="px-4 py-2 bg-gold/10 text-gold hover:bg-gold hover:text-black rounded-full text-sm font-medium transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* More Beans Info Section */}
      <section className="container mx-auto px-4 mt-20 relative z-10">
        <div className="bg-gradient-to-r from-emerald-900/20 to-gold/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Beans?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">100% organic and locally sourced</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Rich in protein and essential nutrients</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-gold mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Perfect for traditional Nigerian recipes</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="inline-block p-6 bg-dark/50 rounded-2xl">
                <div className="text-4xl font-bold text-gold mb-2">4.8/5</div>
                <div className="text-gray-300 mb-2">Customer Rating</div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}