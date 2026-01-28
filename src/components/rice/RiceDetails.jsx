import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data with more details
// Mock data with more details
const mockRiceData = [
  { 
    id: '1', 
    name: 'OPPI Rice', 
    description: 'Traditional Nigerian short-grain rice with earthy aroma and natural brown color. Grown organically in Ogun State.', 
    image: 'https://shopaffordablegroceries.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-02-at-11.37.44-AM.jpeg',
    price: '₦70,000',
    weight: '5kg bag',
    origin: 'Ogun State, Nigeria',
    cookingTime: '25-30 minutes',
    preparation: `1. Rinse the rice thoroughly until water runs clear\n2. Soak for 30 minutes (optional)\n3. Cook in boiling water for 25-30 minutes\n4. Serve with ofada stew (ayamase)`,
    nutrition: ['High in fiber', 'Rich in B-vitamins', 'Contains essential minerals', 'Low glycemic index'],
    shelfLife: '12 months'
  },
  { 
    id: '3', 
    name: 'My choice Rice', 
    description: 'Premium long-grain aromatic rice. Perfect for biryanis, pilafs, and special occasions.', 
    image: 'https://www-konga-com-res.cloudinary.com/f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/R/P/239256_1748276924.jpg',
    price: '₦75,000',
    weight: '5kg bag',
    origin: 'Nigeria',
    cookingTime: '15-20 minutes',
    preparation: `1. Wash rice gently\n2. Soak for 20 minutes for longer grains\n3. Use 1:1.5 rice to water ratio\n4. Cook on low heat for 15-20 minutes`,
    nutrition: ['Low in fat', 'Gluten-free', 'Easy to digest', 'Good energy source'],
    shelfLife: '18 months'
  },
  // ... other rice products
];

export default function RiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rice = mockRiceData.find(r => r.id === id);

  if (!rice) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark to-card flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gold mb-4">Rice not found</h2>
          <p className="text-gray-400 mb-6">The rice variety you're looking for doesn't exist.</p>
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
    <div className="min-h-screen bg-gradient-to-b from-dark to-card text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 pt-8">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/rice')} 
          className="flex items-center text-gold hover:text-yellow-400 transition mb-8 group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Rice Gallery
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Image */}
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={rice.image} 
                  alt={rice.name} 
                  className="w-full h-64 md:h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Price</div>
                  <div className="text-xl font-bold text-gold">{rice.price}</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Weight</div>
                  <div className="text-xl font-bold text-white">{rice.weight}</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Cook Time</div>
                  <div className="text-xl font-bold text-white">{rice.cookingTime}</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-400 mb-1">Shelf Life</div>
                  <div className="text-xl font-bold text-white">{rice.shelfLife}</div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-1 bg-gold/20 text-gold rounded-full text-sm font-medium mb-4">
                  Premium Quality
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{rice.name}</h1>
                <p className="text-gray-300 text-lg leading-relaxed">{rice.description}</p>
              </div>

              {/* Origin & Nutrition */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Origin
                  </h3>
                  <p className="text-gray-300">{rice.origin}</p>
                </div>

                <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Nutrition
                  </h3>
                  <div className="space-y-2">
                    {rice.nutrition.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preparation Guide */}
              <div className="bg-gradient-to-br from-purple-900/20 to-gold/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-900/30">
                <h2 className="text-2xl font-bold mb-4 text-white">How to Prepare</h2>
                <div className="bg-black/30 rounded-xl p-6">
                  <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                    {rice.preparation}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="flex-1 px-8 py-4 bg-gold text-black font-bold rounded-xl hover:bg-yellow-500 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart - {rice.price}
                </button>
                <button className="flex-1 px-8 py-4 border-2 border-gold text-gold font-bold rounded-xl hover:bg-gold hover:text-black transition-all duration-300">
                  Save for Later
                </button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockRiceData
                .filter(item => item.id !== id)
                .slice(0, 4)
                .map(item => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ y: -5 }}
                    onClick={() => navigate(`/rice/${item.id}`)}
                    className="bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer group"
                  >
                    <div className="h-32 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white group-hover:text-gold transition">{item.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{item.price}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}