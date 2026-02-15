'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    // { name: 'Speakers', href: '#speakers' },
    { name: 'About', href: '#about' },
    { name: 'Speakers', href: '#speakers' },
    { name: 'Why Attend', href: '#why-attend' },
    { name: 'Agenda', href: '#agenda' },
    { name: 'Venue', href: '#venue' },
    // { name: 'FAQs', href: '#faqs' },
  ];

  const handleClick = (href: string) => {
    setActiveSection(href);
    setIsMobileMenuOpen(false); // Close mobile menu on click
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="sticky top-0 left-0 right-0 z-50 flex flex-col items-center pt-4 pb-4 bg-gradient-to-b from-[#00BCD4]/50 to-transparent backdrop-blur-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Navigation */}
      <nav className="w-full max-w-6xl flex items-center justify-between px-4 md:px-8">
        <div>
          <Link href="/" className="text-gray-800 text-xl sm:text-2xl font-bold">
            <Image src="/logo.png" alt="Logo" width={120} height={120} className="sm:w-[150px] sm:h-[30px]" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex rounded-full px-8 py-4 shadow-2xl" style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)'
        }}>
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.href);
                  }}
                  className={`text-gray-700 font-medium text-base transition-all duration-300 hover:text-cyan-600 ${activeSection === item.href ? 'text-cyan-600' : ''
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation Toggle & CTA */}
        <div className="flex items-center gap-3">
          {/* Desktop CTA with SOLD OUT marquee floating in front */}
          <div className="hidden lg:block relative">
            {/* Buy Button - Enabled */}
            <Link href="https://konfhub.com/hrevolveelevate26">
              <button className="group bg-gradient-to-r from-cyan-400 to-green-500 text-white px-4 py-2 rounded-full text-md font-bold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-3">
                Buy Ticket
                <svg
                  className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
            
            {/* SOLD OUT Marquee floating over button */}
            {/* <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-30" style={{ transform: 'rotate(-8deg)' }}>
              <div className="overflow-hidden bg-gradient-to-r from-red-500 to-red-600 shadow-xl" style={{ width: '250px', height: '25px', borderRadius: '0px' }}>
                <div className="flex items-center h-full px-3">
                  <div className="animate-marquee-soldout-small flex items-center whitespace-nowrap">
                    {[...Array(100)].map((_, index) => (
                      <div key={index} className="flex items-center mx-6">
                        <span
                          className="text-white font-bold uppercase tracking-wide"
                          style={{
                            fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                            fontSize: '14px',
                            fontWeight: 700,
                            transform: 'skewX(-15deg)'
                          }}
                        >
                          SOLD OUT
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-800 p-2 rounded-lg shadow-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)'
            }}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu - Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          className="lg:hidden fixed top-20 left-0 right-0 z-40 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-2xl p-6 shadow-2xl mx-auto max-w-md" style={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)'
          }}>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(item.href);
                    }}
                    className={`block text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-cyan-100/50 ${activeSection === item.href ? 'text-cyan-600 bg-cyan-100/50' : ''
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile CTA Button */}
            <div className="mt-6 pt-4 border-t border-cyan-400/30">
              <div className="relative inline-block w-full">
                {/* Mobile Buy Button - Enabled */}
                <Link href="https://konfhub.com/hrevolveelevate26">
                  <button className="w-full bg-gradient-to-r from-cyan-400 to-green-500 text-white py-3 px-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3">
                    Buy Ticket
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
                
                {/* SOLD OUT Marquee floating over mobile button */}
                {/* <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-20" style={{ transform: 'rotate(6deg)' }}>
                  <div className="overflow-hidden bg-gradient-to-r from-red-500 to-red-600 shadow-xl" style={{ width: '220px', height: '38px', borderRadius: '0px' }}>
                    <div className="flex items-center h-full px-3">
                      <div className="animate-marquee-soldout-small flex items-center whitespace-nowrap">
                        {[...Array(100)].map((_, index) => (
                          <div key={index} className="flex items-center mx-6">
                            <span
                              className="text-white font-bold uppercase tracking-wide"
                              style={{
                                fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                                fontSize: '15px',
                                fontWeight: 700,
                                transform: 'skewX(-15deg)'
                              }}
                            >
                              SOLD OUT
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

{/* SOLD OUT Marquee Animations */}
const soldOutStyles = `
  @keyframes marquee-soldout-fast {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @keyframes marquee-soldout-mobile {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .animate-marquee-soldout-fast {
    animation: marquee-soldout-fast 8s linear infinite;
  }

  .animate-marquee-soldout-mobile {
    animation: marquee-soldout-mobile 10s linear infinite;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = soldOutStyles;
  document.head.appendChild(style);
}
