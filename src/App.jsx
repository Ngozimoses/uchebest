// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ThemeProvider } from './context/ThemeContext'; // Add this import

// Non-lazy pages (always loaded)
import Home from './pages/Home';
import RiceGallery from './pages/RiceGallery';
import BeansGallery from './pages/BeansGallery';
import BudgetManager from './pages/BudgetManager';
import ScanPoints from './pages/ScanPoints';

// Lazy-loaded detail pages
const RiceDetails = lazy(() => import('./components/rice/RiceDetails'));
const BeansDetails = lazy(() => import('./components/beans/BeansDetails'));

// Fallback component while loading
const LazyFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark">
    <div className="text-purple-600 font-medium">Loading...</div>
  </div>
);

function App() {
  return (
    <ThemeProvider> {/* Wrap everything with ThemeProvider */}
      <Router>
        <Suspense fallback={<LazyFallback />}>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/rice" element={<Layout><RiceGallery /></Layout>} />
            <Route path="/rice/:id" element={<Layout><RiceDetails /></Layout>} />
            <Route path="/beans" element={<Layout><BeansGallery /></Layout>} />
            <Route path="/beans/:id" element={<Layout><BeansDetails /></Layout>} />
            <Route path="/budget" element={<Layout><BudgetManager /></Layout>} />
            <Route path="/scan" element={<Layout><ScanPoints /></Layout>} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;