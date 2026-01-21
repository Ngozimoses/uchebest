// src/components/layout/Layout.jsx
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-dark text-text relative">
      {/* Botanical Background Overlay */}
      <div 
        className="fixed inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1583744946570-2a674c5245d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-dark/90 -z-10"></div>

      <div className="relative z-10">
        <Header />
        <main className="pb-16">{children}</main>
        <Footer />
      </div>
    </div>
  );
}