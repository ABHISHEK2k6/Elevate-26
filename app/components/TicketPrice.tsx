'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const TicketPrice = () => {
  return (
    <section className="py-8 sm:py-16 px-2 sm:px-4 relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* SOLD OUT Marquee floating over entire section */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: 0.5,
          ease: "easeOut"
        }}
        style={{ transform: 'translate(-50%, -50%) rotate(-15deg)', width: '1500px', height: '30px' }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-30" style={{ transform: 'rotate(-15deg)' }}>
          <div className="overflow-hidden bg-gradient-to-r from-red-500 to-red-600 shadow-xl" style={{ width: '1200px', height: '30px', borderRadius: '0px' }}>
            <div className="flex items-center h-full px-4">
              <div className="animate-marquee-soldout-small flex items-center whitespace-nowrap">
                {[...Array(100)].map((_, index) => (
                  <div key={index} className="flex items-center mx-8">
                    <span
                      className="text-white font-bold uppercase tracking-wide"
                      style={{
                        fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                        fontSize: '18px',
                        fontWeight: 700,
                        lineHeight: '50px'
                      }}
                    >
                      SOLD OUT
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto flex flex-col items-center justify-center">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            className="text-white capitalize font-medium"
            style={{
              fontFamily: '"Sora", "Sora Placeholder", sans-serif',
              fontSize: 'clamp(28px, 6vw, 40px)',
              fontWeight: 500,
              letterSpacing: '-0.05em',
              marginBottom: 'clamp(24px, 4vw, 24px)'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Ticket Price
          </motion.h2>
        </div>

        {/* Container Group with Hover Effect */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {/* Left Side Container - Hidden on mobile */}
          <div
            className="hidden lg:block absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform -translate-x-8 group-hover:-translate-x-24 blur-[1px]"
            style={{
              width: '380px',
              minHeight: '480px',
              background: 'linear-gradient(135deg, rgba(15,20,35,0.6) 0%, rgba(20,25,40,0.6) 50%, rgba(18,23,38,0.6) 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              zIndex: 1
            }}
          >
            {/* Left Container Content - Slightly visible */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h2 className="text-4xl font-semibold text-white/60">₹299</h2>
                  </div>
                </div>
                <div className="px-3 py-1.5">
                  <Image src="/logo1.png" alt="logo" width={100} height={40} />
                </div>
              </div>

              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/20"></div>
                    <div className="h-3 bg-white/20 rounded flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Container - Hidden on mobile */}
          <div
            className="hidden lg:block absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform translate-x-8 group-hover:translate-x-24 blur-[1px]"
            style={{
              width: '380px',
              minHeight: '480px',
              background: 'linear-gradient(135deg, rgba(15,20,35,0.6) 0%, rgba(20,25,40,0.6) 50%, rgba(18,23,38,0.6) 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              zIndex: 1
            }}
          >
            {/* Right Container Content - Slightly visible */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h2 className="text-4xl font-semibold text-white/60">₹299</h2>
                  </div>
                </div>
                <div className="px-3 py-1.5">
                  <Image src="/logo1.png" alt="logo" width={100} height={40} />
                </div>
              </div>

              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/20"></div>
                    <div className="h-3 bg-white/20 rounded flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Pricing Card - Clean Design */}
          <div
            className="relative rounded-2xl overflow-hidden border border-white/16 shadow-2xl transition-transform duration-500 ease-in-out lg:group-hover:scale-105 w-full max-w-xs sm:max-w-sm lg:max-w-none"
            style={{
              width: 'clamp(320px, 90vw, 420px)',
              minHeight: 'clamp(400px, 70vh, 480px)',
              background: 'linear-gradient(135deg, rgba(20,30,48,0.98) 0%, rgba(30,42,62,0.98) 50%, rgba(25,35,55,0.98) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: 'rgba(255, 255, 255, 0.06) 0px 12px 40px 0px',
              borderRadius: '16px',
              zIndex: 10
            }}
          >
            {/* Content */}
            <div className="relative z-10 p-4 sm:p-6">
              {/* Price Section */}
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h2
                      className="font-semibold text-white"
                      style={{
                        fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                        fontSize: 'clamp(28px, 7vw, 40px)',
                        fontWeight: 600,
                        lineHeight: '0.9em',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      ₹299
                    </h2>
                  </div>
                </div>

                {/* Badge */}
                <div
                  className="px-2 sm:px-3 py-1 sm:py-1.5"
                  style={{ borderRadius: '8px' }}
                >
                  <Image src="/logo1.png" alt="logo" width={100} height={40} />
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {[
                  'Access to all insightful sessions',
                  'Hands-on training & interactive challenges',
                  'Panel discussions on cutting-edge HR topics',
                  'Exclusive event materials & takeaways',
                  'Lunch & refreshments included',
                  'Certificate of Participation',
                  'Networking with 200+ HRs & industry leaders',
                  'Insights from top HR practitioners',
                  'Exposure to emerging HR Tech & trends',
                  'Ready-to-use frameworks & best practices',
                  'Exclusive ELEVATE’25 goodies'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 26 27" fill="none">
                        <path
                          d="M 13 26.5 C 20.18 26.5 26 20.68 26 13.5 C 26 6.32 20.18 0.5 13 0.5 C 5.82 0.5 0 6.32 0 13.5 C 0 20.68 5.82 26.5 13 26.5 Z"
                          fill="rgba(255, 255, 255, 0.02)"
                        />
                        <path
                          d="M 7.117 14.341 L 10.479 17.702 L 18.883 9.298"
                          fill="transparent"
                          strokeWidth="2"
                          stroke="rgb(255,255,255)"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p
                      className="text-white"
                      style={{
                        fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        letterSpacing: '-0.02em',
                        lineHeight: '1.5em'
                      }}
                    >
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              {/* Buy Button - Disabled */}
              <div className="text-center">
                <button
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-500 text-white font-semibold rounded-full border border-gray-500 transition-colors duration-300 flex items-center gap-2 mx-auto cursor-not-allowed opacity-60"
                  style={{
                    fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                    fontSize: 'clamp(14px, 3.5vw, 16px)',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    lineHeight: '150%',
                    borderRadius: '100px'
                  }}
                  disabled
                >
                  Buy Ticket
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center"
                    style={{ borderRadius: '50px' }}
                  >
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>

                <p
                  className="text-white/44 mt-2 sm:mt-3"
                  style={{
                    fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                    fontSize: 'clamp(10px, 2.5vw, 12px)',
                    fontWeight: 300,
                    lineHeight: '1.6em'
                  }}
                >
                  *No refunds after purchase.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TicketPrice;