// src/context/ThemeContext.jsx
import { createContext, useState, useContext as useReactContext, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// Provider component
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme from localStorage or user preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('uchebest-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else if (prefersDark) {
      setIsDarkMode(true);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('uchebest-theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('uchebest-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export const useTheme = () => useReactContext(ThemeContext);

// Named export for context (if you need to import directly)
export { ThemeContext };