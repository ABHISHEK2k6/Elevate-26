'use client';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      className="relative border-t border-purple-500/20 py-6 sm:py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p 
            className="text-purple-200"
            style={{
              fontSize: 'clamp(12px, 3vw, 16px)',
              lineHeight: '1.5em'
            }}
          >
            © {new Date().getFullYear()} All rights reserved to{' '}
            <a 
              href="https://hrevolve.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-100 font-semibold transition-colors duration-300"
            >
              HR Evolve
            </a>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
