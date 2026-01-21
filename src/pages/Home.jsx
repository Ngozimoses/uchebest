// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import FloatingActions from '../components/FloatingActions';
import BotanicalDecor from '../components/BotanicalDecor';
export default function Home() {
  // Define carousel slides
  const carouselSlides = [
    {
      id: 'rice',
      title: 'Nourish with Nigerian Rice',
      subtitle: 'Rich in Energy & Essential Minerals',
      description: 'Ofada and Basmati rice varieties are packed with magnesium, B-vitamins, and complex carbs for sustained energy. Perfect for active families and growing children.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1frLEPcCcQJjxkGocPkQ5KxTatokgQUfCUA&s',
      badges: ['High in Fiber', 'Energy Sustaining', 'Low Fat'],
      ctaText: 'Explore Rice Varieties',
      ctaLink: '/rice',
    },
    {
      id: 'beans',
      title: 'Fuel Your Day with Healthy Beans',
      subtitle: 'Plant-Based Protein Powerhouse',
      description: 'Honey beans and black-eyed peas deliver complete plant protein, iron, and fiber — supporting digestion, heart health, and muscle repair without cholesterol.',
      image: 'https://www.spendwithpennies.com/wp-content/uploads/2024/07/The-Best-Baked-Beans-SpendWithPennies-6.jpg',
      badges: ['High Protein', 'Heart Healthy', 'Rich in Iron'],
      ctaText: 'Discover Bean Recipes',
      ctaLink: '/beans',
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

  return (
    <div className="min-h-screen bg-dark text-text">
      <BotanicalDecor />
{/* Hero Section with Working Background */}
<section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
  {/* WORKING RICE FIELD BACKGROUND (Pexels - free & safe) */}
  <div 
    className="absolute inset-0 -z-10"
    style={{
      backgroundImage: `url('https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}
  />

  {/* Gradient Overlay for Readability */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-purple-900/50 z-0"></div>

  {/* Content */}
  <div className="container mx-auto px-4 relative z-10 text-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-gold">
      Welcome to <span className="text-white">Uchebest Store</span>
    </h1>
    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
      Premium Nigerian rice & beans, grown with care — delivered to your table.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        to="/rice"
        className="px-6 py-3 bg-gold text-black font-semibold rounded-full hover:bg-yellow-500 transition"
      >
        Explore Rice
      </Link>
      <Link
        to="/beans"
        className="px-6 py-3 border border-gold text-gold font-semibold rounded-full hover:bg-gold hover:text-black transition"
      >
        Explore Beans
      </Link>
    </div>
  </div>

  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark to-transparent pointer-events-none"></div>
</section>
      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gold">Why Choose Uchebest?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-dark shadow-lg">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mb-4">
                <span className="text-black font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-400">Sourced from trusted local farms and global suppliers.</p>
            </div>
            <div className="p-6 rounded-xl bg-dark shadow-lg">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mb-4">
                <span className="text-black font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Budgeting</h3>
              <p className="text-gray-400">Plan your meals and track spending with our budget tool.</p>
            </div>
            <div className="p-6 rounded-xl bg-dark shadow-lg">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mb-4">
                <span className="text-black font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Loyalty Rewards</h3>
              <p className="text-gray-400">Scan QR codes in-store to earn points and redeem rewards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Carousel Section */}
      <section className="py-20 bg-dark relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-6">
            <motion.div
              key={carouselSlides[currentSlide].id}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gold leading-tight">
                {carouselSlides[currentSlide].title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {carouselSlides[currentSlide].description}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                {carouselSlides[currentSlide].badges.map((badge, i) => (
                  <span
                    key={i}
                    className="bg-card px-3 py-1 rounded-full text-xs font-medium text-gold border border-gold/30"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <Link
                to={carouselSlides[currentSlide].ctaLink}
                className="mt-6 inline-block px-6 py-3 bg-gold text-black font-semibold rounded-full hover:bg-yellow-500 transition"
              >
                {carouselSlides[currentSlide].ctaText}
              </Link>
            </motion.div>

            {/* Carousel Controls */}
            <div className="flex justify-between w-full mt-8">
              <button
                onClick={prevSlide}
                className="bg-black/50 text-white p-3 rounded-full hover:bg-black transition"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex space-x-2">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition ${
                      index === currentSlide ? 'bg-gold' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="bg-black/50 text-white p-3 rounded-full hover:bg-black transition"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Circular Food Image */}
          <div className="lg:w-1/2 relative">
            <motion.div
              key={carouselSlides[currentSlide].id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-96 rounded-full overflow-hidden shadow-2xl border-4 border-gold/20"
            >
              <img
                src={carouselSlides[currentSlide].image}
                alt={carouselSlides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/50"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Showcase (Rice & Beans Grid) */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gold">Our Signature Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Ofada Rice", img: "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Ofada", desc: "Traditional short-grain with earthy aroma" },
              { name: "Honey Beans", img: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Honey+Beans", desc: "Sweet, soft, cooked with palm oil" },
              { name: "Basmati Rice", img: "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Basmati", desc: "Long-grain aromatic for biryanis" },
              { name: "Black-eyed Peas", img: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Black-eyed", desc: "Protein-rich legume for stews" },
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <img src={item.img} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-white">{item.name}</h3>
                  <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
                  <button className="mt-4 text-gold hover:text-yellow-400 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Call-to-Action */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gold">Ready to Elevate Your Meals?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Discover the finest rice and beans, plan your budget, and earn rewards with every purchase.
          </p>
          <Link
            to="/budget"
            className="inline-block px-8 py-3 bg-gold text-black font-semibold rounded-full hover:bg-yellow-500 transition"
          >
            Start Planning Your Budget
          </Link>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <FloatingActions />
    </div>
  );
}