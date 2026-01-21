// src/pages/BeansGallery.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const beansData = [
  { id: '1', name: 'Honey Beans', description: 'Sweet, soft beans cooked with palm oil and peppers.', image: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Honey+Beans' },
  { id: '2', name: 'Black-eyed Peas', description: 'Protein-rich legume used in stews and salads.', image: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Black-eyed' },
  { id: '3', name: 'Brown Beans', description: 'Nutritious local beans ideal for porridge or stew.', image: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Brown+Beans' },
  { id: '4', name: 'Lima Beans', description: 'Buttery-textured beans perfect for soups and side dishes.', image: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Lima' },
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
          backgroundImage: `url('https://images.unsplash.com/photo-1606312619070-d48b4c715922?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-emerald-900/30 to-gold/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Our Nutritious <span className="text-gold">Beans</span> Selection
          </motion.h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore traditional and modern beans with expert preparation methods.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="container mx-auto px-4 mt-8 max-w-md">
        <input
          type="text"
          placeholder="Search beans..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 bg-card border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>

      {/* Beans Grid */}
      <div className="container mx-auto px-4 mt-12">
        {filteredBeans.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            No beans match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBeans.map((bean, index) => (
              <motion.div
                key={bean.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card backdrop-blur rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <img 
                  src={bean.image} 
                  alt={bean.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white">{bean.name}</h3>
                  <p className="text-gray-400 mt-2 text-sm">{bean.description}</p>
                  <Link 
                    to={`/beans/${bean.id}`} 
                    className="mt-4 inline-block text-gold hover:text-yellow-400 font-medium text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}