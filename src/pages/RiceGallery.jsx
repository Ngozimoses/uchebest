// src/pages/RiceGallery.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const riceData = [
  { id: '1', name: 'Ofada Rice', description: 'Traditional Nigerian short-grain rice with earthy aroma.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfWcXHdfPHmBkKtn-_-CmmBhMvo8XXMM9l1g&s' },
  { id: '2', name: 'Basmati Rice', description: 'Long-grain aromatic rice perfect for biryanis and pilafs.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTheFqFyuO-U0HID3WD-HlB85HwnA7ZMuO1LQ&s' },
  { id: '3', name: 'Abakaliki Rice', description: 'Premium locally grown white rice from Ebonyi State.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1frLEPcCcQJjxkGocPkQ5KxTatokgQUfCUA&s' },
  { id: '4', name: 'Brown Rice', description: 'Unpolished whole grain rice rich in fiber and nutrients.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwcBTlBJEWG0sItgqiJRJy__y01RZl0ryn3Q&s' },
];

export default function RiceGallery() {
  const [search, setSearch] = useState('');

  const filteredRice = riceData.filter(rice =>
    rice.name.toLowerCase().includes(search.toLowerCase()) ||
    rice.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark text-text pb-16">
      {/* Rice Field Background Overlay */}
      <div 
        className="fixed inset-0 -z-10 opacity-15"
        style={{
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1pOtVfgnWwANZfBLkU27KV7n43v2tWLtGKA&s')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-purple-900/30 to-gold/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Our Premium <span className="text-gold">Rice</span> Collection
          </motion.h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover authentic Nigerian and international rice varieties with detailed preparation guides.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="container mx-auto px-4 mt-8 max-w-md">
        <input
          type="text"
          placeholder="Search rice varieties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 bg-card border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>

      {/* Rice Grid */}
      <div className="container mx-auto px-4 mt-12">
        {filteredRice.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            No rice matches your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRice.map((rice, index) => (
              <motion.div
                key={rice.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card backdrop-blur rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <img 
                  src={rice.image} 
                  alt={rice.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white">{rice.name}</h3>
                  <p className="text-gray-400 mt-2 text-sm">{rice.description}</p>
                  <Link 
                    to={`/rice/${rice.id}`} 
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