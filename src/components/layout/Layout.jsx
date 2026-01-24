// src/components/layout/Layout.jsx
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../../context/ThemeContext'; // Add this import

export default function Layout({ children }) {
  const { isDarkMode, toggleTheme } = useTheme(); // Get theme from context

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-dark text-text' 
        : 'bg-light text-textLight'
    } relative`}>
      {/* Background System */}
      <div className="fixed inset-0 -z-10">
        {isDarkMode ? (
          <>
            {/* Dark Mode Background */}
            <div className="hidden lg:block absolute inset-0 opacity-20">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1583744946570-2a674c5245d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundAttachment: 'fixed',
                }}
              />
            </div>
            <div className="lg:hidden absolute inset-0 opacity-15">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-dark/95 to-black/90"></div>
          </>
        ) : (
          <>
            {/* Light Mode Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-light via-gray-50 to-gray-100"></div>
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </>
        )}
      </div>

   

      {/* Content */}
      <div className="relative z-10">
        {/* Pass theme props to Header */}
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        
        {/* Main content with responsive padding */}
        <main className="pb-8 md:pb-12 lg:pb-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            {children}
          </div>
        </main>
        
        <Footer isDarkMode={isDarkMode} />
      </div>

     
    </div>
  );
}