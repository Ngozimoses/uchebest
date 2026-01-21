// src/components/BotanicalDecor.jsx
import { motion } from 'framer-motion';

export default function BotanicalDecor() {
  return (
    <>
      {/* Top-Right Fern (Large, Fixed) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.5, duration: 2 }}
        className="fixed top-0 right-0 w-full h-full -z-10 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3981821/pexels-photo-3981821.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          backgroundSize: '30%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top right',
        }}
      />

      {/* Bottom-Left Leaf Stem (Large, Fixed) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ delay: 1, duration: 2 }}
        className="fixed bottom-0 left-0 w-full h-full -z-10 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1170623/pexels-photo-1170623.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          backgroundSize: '25%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom left',
        }}
      />
    </>
  );
}