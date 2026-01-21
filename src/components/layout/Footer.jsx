// src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-dark border-t border-gray-700 py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Uchebest Store. All rights reserved.</p>
        <p className="mt-2 text-gold">Premium Rice & Beans | Loyalty Rewards | Smart Budgeting</p>
      </div>
    </footer>
  );
}