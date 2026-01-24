// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaLeaf, FaShieldAlt, FaTruck } from 'react-icons/fa';

export default function Footer({ isDarkMode }) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      { name: 'All Rice', path: '/rice' },
      { name: 'All Beans', path: '/beans' },
      { name: 'Premium Packs', path: '/products?category=premium' },
      { name: 'Best Sellers', path: '/products?sort=bestselling' },
      { name: 'New Arrivals', path: '/products?sort=newest' },
    ],
    Support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Story', path: '/story' },
      { name: 'Sustainability', path: '/sustainability' },
      { name: 'Careers', path: '/careers' },
      { name: 'Blog', path: '/blog' },
    ],
  };

  const socialLinks = [
    { icon: FaFacebook, name: 'Facebook', url: '#' },
    { icon: FaTwitter, name: 'Twitter', url: '#' },
    { icon: FaInstagram, name: 'Instagram', url: '#' },
    { icon: FaWhatsapp, name: 'WhatsApp', url: '#' },
  ];

  const features = [
    { icon: FaLeaf, title: '100% Organic', desc: 'Premium quality' },
    { icon: FaShieldAlt, title: 'Secure Payment', desc: 'Safe & encrypted' },
    { icon: FaTruck, title: 'Free Delivery', desc: 'Orders over ₦10,000' },
  ];

  return (
    <footer className={`pt-12 pb-8 mt-20 border-t transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-dark border-gray-800' 
        : 'bg-gradient-to-b from-white to-gray-50 border-gray-200'
    }`}>
      {/* Top Section */}
      <div className="container mx-auto px-4">
        {/* Features Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`rounded-2xl p-6 text-center border transition-colors backdrop-blur-sm ${
                isDarkMode
                  ? 'bg-gradient-to-br from-card to-dark/50 border-gray-800 hover:border-gold/30'
                  : 'bg-white/80 border-gray-200 hover:border-yellow-300 shadow-lg'
              }`}
            >
              <div className="w-14 h-14 bg-gradient-to-r from-gold to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="text-2xl text-black" />
              </div>
              <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-black font-bold text-xl">U</span>
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Uchebest Store
                </h2>
                <p className="text-gold text-sm">Premium Rice & Beans</p>
              </div>
            </Link>
            <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Providing premium Nigerian rice and beans, grown with care and delivered to your table with loyalty rewards and smart budgeting tools.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                    isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gold hover:text-black'
                      : 'bg-gray-100 text-gray-600 hover:bg-gold hover:text-black'
                  }`}
                  aria-label={social.name}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className={`rounded-xl p-4 mb-6 ${
              isDarkMode ? 'bg-card/50' : 'bg-gray-50'
            }`}>
              <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Stay Updated
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className={`flex-1 px-3 py-2 border rounded-l-lg text-sm focus:outline-none focus:ring-1 focus:ring-gold ${
                    isDarkMode
                      ? 'bg-dark border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <button className="px-4 py-2 bg-gold text-black font-medium rounded-r-lg hover:bg-yellow-500 transition text-sm">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="md:col-span-1">
              <h3 className={`text-lg font-bold mb-4 pb-2 border-b ${
                isDarkMode ? 'text-white border-gray-800' : 'text-gray-900 border-gray-300'
              }`}>
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className={`transition flex items-center group ${
                        isDarkMode 
                          ? 'text-gray-400 hover:text-gold' 
                          : 'text-gray-600 hover:text-yellow-600'
                      }`}
                    >
                      <span className={`w-1 h-1 bg-gold rounded-full mr-3 opacity-0 group-hover:opacity-100 transition`}></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-800">
          <div className="text-center md:text-left">
            <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>📞 Contact Us</h4>
            <a href="tel:+2348012345678" className={isDarkMode ? 'text-gray-400 hover:text-gold' : 'text-gray-600 hover:text-yellow-600'}>
              +234 801 234 5678
            </a>
          </div>
          <div className="text-center md:text-left">
            <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>✉️ Email</h4>
            <a href="mailto:hello@uchebest.com" className={isDarkMode ? 'text-gray-400 hover:text-gold' : 'text-gray-600 hover:text-yellow-600'}>
              hello@uchebest.com
            </a>
          </div>
          <div className="text-center md:text-left">
            <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>📍 Location</h4>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Lagos, Nigeria</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-8 pt-8 border-t ${
          isDarkMode ? 'border-gray-800' : 'border-gray-300'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                &copy; {currentYear} Uchebest Store. All rights reserved.
              </p>
              <p className="text-gold text-sm mt-1">
                Premium Rice & Beans | Loyalty Rewards | Smart Budgeting
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className={isDarkMode ? 'text-gray-400 hover:text-gold' : 'text-gray-600 hover:text-yellow-600'}>
                Terms
              </a>
              <a href="#" className={isDarkMode ? 'text-gray-400 hover:text-gold' : 'text-gray-600 hover:text-yellow-600'}>
                Privacy
              </a>
              <a href="#" className={isDarkMode ? 'text-gray-400 hover:text-gold' : 'text-gray-600 hover:text-yellow-600'}>
                Cookies
              </a>
              <div className="flex items-center text-emerald-400">
                <FaLeaf className="mr-2" />
                <span>Eco-Friendly Packaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}