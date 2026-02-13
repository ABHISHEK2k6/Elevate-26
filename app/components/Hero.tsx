'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-3 sm:px-4 md:px-6 lg:px-8">
      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center max-w-7xl mx-auto px-2 sm:px-4 md:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >

        {/* Federal Bank Logo and Presents */}
        <motion.div
          className="mb-1 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <div className="mb-0.5 -mt-4 md:-mt-10">
            <Image
              src="/Federal_Bank.png"
              alt="Federal Bank"
              width={112}
              height={112}
              className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-42 lg:h-42 object-contain drop-shadow-xl"
            />
          </div>
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-medium tracking-wider -mt-4 md:-mt-10">
            Presents
          </h2>
        </motion.div>
        <motion.h2
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white/80 leading-tight mb-1 sm:mb-2 tracking-wider"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          HR CONCLAVE
        </motion.h2>
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-2 sm:mb-0 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          ELEVATE<span className="text-blue-500">26</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-1 sm:mb-2 leading-tight tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          SHAPING THE FUTURE
        </motion.h2>

        <motion.h3
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-white/90 mb-4 sm:mb-6 md:mb-8 leading-tight tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
        >
          LEADING THROUGH THE HUMAN-AI NEXUS
        </motion.h3>
        <motion.div
          className="mb-3 sm:mb-5 md:mb-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        >
          <div className='flex flex-row justify-center items-center sm:items-end gap-4 sm:gap-12 md:gap-16 lg:gap-20'>
            <motion.div
              className='flex flex-col items-center group'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
            >
              <div className="text-xs sm:text-sm md:text-base text-white/70 mb-2 sm:mb-3 md:mb-4 font-medium tracking-wide uppercase text-center h-8 sm:h-10 flex items-center justify-center">
                Powered By
              </div>
              <motion.div
                className="transition-transform duration-200 group-hover:scale-105 flex items-center justify-center"
                whileHover={{
                  filter: "brightness(1.1)",
                  transition: { duration: 0.2 }
                }}
              >
                <Image
                  src="/Lead_logo.png"
                  alt="Lead College Autonomous"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain drop-shadow-lg"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className='flex flex-col items-center group'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
            >
              <div className="text-xs sm:text-sm md:text-base text-white/70 mb-2 sm:mb-3 md:mb-4 font-medium tracking-wide uppercase text-center h-8 sm:h-10 flex items-center justify-center">
                In Association with
              </div>
              <motion.div
                className="transition-transform duration-200 group-hover:scale-105 flex items-center justify-center"
                whileHover={{
                  filter: "brightness(1.1)",
                  transition: { duration: 0.2 }
                }}
              >
                <Image
                  src="/TOI_logo.jpg"
                  alt="The Times of India"
                  width={120}
                  height={80}
                  className="w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-24 lg:w-36 lg:h-32 object-contain drop-shadow-lg md:-mt-4"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-purple-200 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0 text-justify"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Elevate&apos;25 is a one-day conclave for People Leaders organized by HR Evolve, on 20th November 2025 at Technopark.
          As organizations stand at the threshold of intelligent transformation, leadership itself is being redefined.
          Elevate 2025, &apos;Shaping the Future: Leading through the Human&ndash;AI Nexus&apos; explores how People Leaders can architect
          agile, ethical, and purpose-driven workplaces in an era of intelligent machines. The conclave brings together thinkers,
          technologists, and HR visionaries to discuss how human insight, emotional intelligence, and adaptive learning can
          amplify &mdash; not compete with &mdash; AI. Together, we will decode how to reimagine work, redeploy talent, and design
          governance frameworks that ensure technology serves humanity, not the other way around.
        </motion.p>

        {/* Join Us On */}
        <motion.div
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <span className="text-lg sm:text-xl md:text-2xl text-white font-semibold">
            JOIN US ON
          </span>
        </motion.div>

        {/* Date */}
        <motion.p
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-500 font-bold mb-6 sm:mb-8 px-2 sm:px-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        >
          20<sup className="text-lg sm:text-xl">th</sup> NOVEMBER 2025
        </motion.p>

        {/* HR Conclave text */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
        >
          <span className="text-base sm:text-lg md:text-xl text-white">
            Stay tuned for the ultimate <span className="text-blue-500 font-semibold">HR Conclave!</span>
          </span>
        </motion.div>

        {/* CTA Button with floating SOLD OUT marquee */}
        <div className="relative inline-block">
          {/* Register Button - Disabled */}
          <motion.button
            className="group bg-gray-500 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full text-lg sm:text-xl font-bold shadow-2xl transition-all duration-300 flex items-center gap-2 sm:gap-3 mx-auto cursor-not-allowed opacity-60"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 0.3, delay: 1.2 },
              scale: { duration: 0.4, delay: 1.2, ease: "backOut" }
            }}
            disabled
          >
            Register Now
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>

          {/* SOLD OUT Marquee floating over button */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center pointer-events-none z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 1.3,
              ease: "easeOut"
            }}
            style={{ transform: 'translate(-50%, 0) rotate(12deg) skewX(-20deg)', width: '600px', height: '60px' }}
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-30" style={{ transform: 'rotate(-8deg)' }}>
              <div className="overflow-hidden bg-gradient-to-r from-red-500 to-red-600 shadow-xl" style={{ width: '300px', height: '40px', borderRadius: '0px' }}>
                <div className="flex items-center h-full px-4">
                  <div className="animate-marquee-soldout-small flex items-center whitespace-nowrap">
                    {[...Array(100)].map((_, index) => (
                      <div key={index} className="flex items-center mx-8">
                        <span
                          className="text-white font-bold uppercase tracking-wide"
                          style={{
                            fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                            fontSize: '16px',
                            fontWeight: 700,
                            lineHeight: '40px'
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
        </div>
      </motion.div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        @keyframes marquee-soldout {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes marquee-soldout-small {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee-soldout {
          animation: marquee-soldout 15s linear infinite;
        }

        .animate-marquee-soldout-small {
          animation: marquee-soldout-small 150s linear infinite;
        }
      `}</style>
    </section>
  );
}
