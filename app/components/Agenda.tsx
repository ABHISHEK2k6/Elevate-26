'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { fetchPartnersFromGoogleSheets, Partner, getPartnerImageUrls, getFallbackPartnerImage } from '../../lib/partnersData';
import { fetchSoldOutStatus } from '../../lib/soldOutData';

// Robust Partner Logo Component (same as events system)
interface PartnerLogoProps {
  partner: Partner;
}

function PartnerLogo({ partner }: PartnerLogoProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageUrls] = useState(() => getPartnerImageUrls(partner.logo));

  const handleImageError = () => {
    if (currentImageIndex < imageUrls.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const currentImageUrl = currentImageIndex < imageUrls.length
    ? imageUrls[currentImageIndex]
    : getFallbackPartnerImage();



  return (
    <li style={{ flexShrink: 0 }}>
      <div
        className="hover:scale-105 transition-transform duration-300 overflow-hidden"
        style={{
          flexShrink: 0,
          opacity: 1,
          width: '140px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px',
        }}
      >
        <img
          src={currentImageUrl}
          alt={`${partner.name} logo`}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      </div>
    </li>
  );
}

export default function Agenda() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(true);
  const [isSoldOut, setIsSoldOut] = useState(false);

  // Fetch partners data on component mount
  useEffect(() => {
    const loadPartners = async (forceRefresh = false) => {
      try {
        setPartnersLoading(true);

        const partnersData = await fetchPartnersFromGoogleSheets(forceRefresh);
        setPartners(partnersData);
      } catch (error) {
        console.error('Failed to load partners:', error);
        // Don't crash the component, just log the error
        // Fallback partners will be returned by the fetch function
      } finally {
        setPartnersLoading(false);
      }
    };

    // Check if page was hard refreshed (F5 or Ctrl+F5)
    const wasHardRefresh = typeof window !== 'undefined' &&
      window.performance &&
      window.performance.navigation &&
      window.performance.navigation.type === 1; // TYPE_RELOAD

    if (wasHardRefresh) {
      loadPartners(true); // Force refresh on F5
    } else {
      loadPartners();
    }
  }, []);

  // Fetch sold out status
  useEffect(() => {
    const getSoldOutStatus = async () => {
      const status = await fetchSoldOutStatus();
      setIsSoldOut(status.isSoldOut);
    };
    getSoldOutStatus();
  }, []);

  const scheduleItems = [
    {
      activity: 'Welcome Address',
      speakers: 'Deepa Nair, \n6D Technologies | HR Evolve Member',
      type: 'admin'
    },
    {
      activity: 'Inaugural Function',
      speakers: '• Sushant\nCEO, Infoparks Kerala & Cyberpark Kozhikode\n• Sujas Ali\nFounder ,Aabasoft,Jt Secy.GTech\n• Sunil Balakrishnan\nChief Values Officer(CVO) | Global Head,\nUST GLOBAL\n• Dr. Thomas George K\nChairman, LEAD College',
      type: 'admin'
    },
    // {
    //   activity: 'Keynote Address',
    //   speakers: 'Nisha Gopinath\nVice President and Head of HR IBM, India and South Asia',
    //   topic: 'Shaping the Future: Leading through the Human–AI Nexus',
    //   type: 'keynote'
    // },
    // {
    //   activity: 'Power Talk',
    //   speakers: 'Sreekanth Arimanithaya\nChief Executive Officer, Xarpie Labs',
    //   topic: 'Culture Beyond Policies',
    //   type: 'session'
    // },
    {
      activity: 'Power Talk',
      speakers: 'Sam R Thomas\nAssociate Director EY GDS India',
      topic: 'What HR must unlearn to embrace AI',
      type: 'session'
    },
    {
      activity: 'Power Talk',
      speakers: 'Aravind Warrier\nLead People Partner & Culture | Digital & IT ,Volvo Group',
      topic: 'Building Business Acumen for an AI enabled workplace',
      type: 'session'
    },
    // {
    //   activity: 'Special Address',
    //   speakers: ' Dr.Thomas George K,\nDirector, LEAD College (Autonomous)',
    //   topic: '',
    //   type: 'session'
    // },
    // {
    //   activity: 'Special Address',
    //   speakers: 'Magical Rafi,\nFounder & Chief Mentor, Magic of Change',
    //   topic: 'Perform with Purpose: The Heartbeat Behind High Achievement',
    //   type: 'session'
    // },
    {
      activity: 'Panel Discussion',
      speakers: '• Sujith Unni\nConsultant,SS Consultant\n• Jilu Joseph\nCEO,Webandcrafts\n• Devika Chandrasekharan\nFounder,Fuselage Innovations Pvt Ltd\n• Sunil Balakrishnan\nChief Values Officer(CVO) | Global Head,\nUST Global',
      topic: 'Balancing Innovation, Cost, and Culture',
      type: 'panel'
    },
    {
      activity: 'Special Address',
      speakers: ' Dr.Thomas George K,\nDirector, LEAD College (Autonomous)',
      topic: '',
      type: 'session'
    },
    {
      activity: 'Mentalist',
      speakers: '• Abhijith\nMentalist',
      topic: 'Perception vs Reality in Workplace Communication',
      type: 'session'
    },
    {
      activity: 'Power Talk',
      speakers: 'Binod Krishna\nHead of HR, Impaqtive',
      topic: 'Next-Gen HR: Where Technology Meets Empathy',
      type: 'session'
    },
    {
      activity: 'Power Talk',
      speakers: 'Adv. Mohammed Shameel\nFounder, Advocate, Dictumnet',
      topic: 'Legal Readiness of HR: from Compliance to confidence',
      type: 'session'
    },
    {
      activity: 'Panel Discussion',
      speakers: '• Jithin Chakkalakkal\nHead of People and Culture, Reflections Info Systems\n• Ajish MJ\nVice President People and Culture, NeST Digital\n• Sreeni S Warrier\nFounder & Chief Architect, Mind Architects\n• Jeswin Jose\nSenior Associate Director HR, Big4\n•Rasha kutty\nCo-Founder, Empathy University',
      topic: 'Moving from Transactional to Transformational HR',
      type: 'panel'
    },
  ];

  return (
    <section className="-mt-15 sm:-mt-5 px-4" data-framer-name="Schedule" id="agenda">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">

        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            className="text-gray-800 capitalize font-large font-bold text-center"
            style={{
              fontFamily: '"Sora", "Sora Placeholder", sans-serif',
              fontSize: 'clamp(28px, 6vw, 40px)',
              fontWeight: 500,
              letterSpacing: '-0.05em'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Agenda
          </motion.h2>
        </div>

        <div className="mb-12 sm:mb-16">
          <motion.div
            className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 text-center cursor-pointer group relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 }
            }}
          >
            {/* Animated border effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"
              style={{
                background: 'linear-gradient(45deg, #60a5fa, #3b82f6, #2563eb, #60a5fa)',
                backgroundSize: '300% 300%',
                animation: 'gradientShift 3s ease infinite',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                padding: '2px',
                zIndex: 1
              }}
            />
            <div className="relative z-10">
              <h3
                className="text-white font-extraboldbold"
                style={{
                  fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                  fontSize: 'clamp(16px, 4vw, 18px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  lineHeight: '1.4em'
                }}
              >
                21st February 2026
              </h3>
            </div>
          </motion.div>

          <motion.div
            className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 text-center cursor-pointer group relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 }
            }}
          >
            {/* Animated border effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"
              style={{
                background: 'linear-gradient(45deg, #10b981, #059669, #34d399, #10b981)',
                backgroundSize: '300% 300%',
                animation: 'gradientShift 3s ease infinite',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                padding: '2px',
                zIndex: 1
              }}
            />
            <div className="relative z-10">
              <h3
                className="text-white font-extraboldbold"
                style={{
                  fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                  fontSize: 'clamp(16px, 4vw, 18px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  lineHeight: '1.4em'
                }}
              >
                Registration at 9:00 AM
              </h3>
            </div>
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            {scheduleItems.map((item, index) => (
              <div key={index}>
                <motion.div
                  className="rounded-lg p-4 sm:p-6 transition-all duration-300 hover:shadow-2xl relative overflow-hidden group"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(10px)'
                  }}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + (index * 0.1),
                    ease: "easeOut"
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  {/* Animated glowing border on hover - border only */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"
                    style={{
                      background: `linear-gradient(45deg, 
                        ${item.type === 'keynote' ? '#fbbf24, #f59e0b, #eab308, #fbbf24' :
                          item.type === 'panel' ? '#10b981, #059669, #34d399, #10b981' :
                            item.type === 'session' ? '#3b82f6, #2563eb, #60a5fa, #3b82f6' :
                              item.type === 'admin' ? '#a855f7, #9333ea, #c084fc, #a855f7' : '#60a5fa, #3b82f6, #2563eb, #60a5fa'})`,
                      backgroundSize: '300% 300%',
                      animation: 'gradientShift 3s ease infinite',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      padding: '2px',
                      zIndex: 1
                    }}
                  />

                  {/* Content wrapper to ensure it's above the border */}
                  <div className="relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      {/* Activity Column */}
                      <div className="flex flex-col justify-center">
                        <h3
                          className="font-extrabold text-white"
                          style={{
                            fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                            fontSize: 'clamp(16px, 4vw, 20px)',
                            fontWeight: 700,
                            letterSpacing: '-0.01em',
                            color: '#ffffff !important',
                            filter: 'brightness(1.1) contrast(1.2)'
                          }}
                        >
                          {item.activity}
                        </h3>
                      </div>

                      {/* Speakers Column */}
                      <div className="md:col-span-1">
                        <div className="mb-2">
                          <h4 className="text-white/80 text-xs uppercase font-semibold" style={{ color: 'rgba(255, 255, 255, 0.8) !important' }}>Speakers/ Dignitaries</h4>
                        </div>
                        <div
                          className="text-white font-bold"
                          style={{
                            fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                            fontSize: 'clamp(13px, 3.5vw, 15px)',
                            lineHeight: '1.4em',
                            color: '#ffffff !important'
                          }}
                        >
                          {item.speakers.split('\n').map((speaker, idx) => (
                            <p key={idx} className={idx > 0 ? 'mt-1' : ''}>{speaker}</p>
                          ))}
                        </div>
                      </div>

                      {/* Topic Column */}
                      <div className="md:col-span-1">
                        {item.topic && (
                          <>
                            <div className="mb-2">
                              <h4 className="text-white/80 text-xs uppercase font-semibold" style={{ color: 'rgba(255, 255, 255, 0.8) !important' }}>
                                Topic/ Theme
                              </h4>
                            </div>
                            <p
                              className="text-white font-bold"
                              style={{
                                fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                                fontSize: 'clamp(13px, 3.5vw, 15px)',
                                lineHeight: '1.4em',
                                color: '#ffffff !important'
                              }}
                            >
                              {item.topic}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Add special containers after Inaugural Function */}
                {item.activity === 'Inaugural Function' && (
                  <>
                    {/* <motion.div
                      className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 my-6 sm:my-8 text-center cursor-pointer group relative overflow-hidden"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                      whileTap={{
                        scale: 0.98,
                        transition: { duration: 0.1 }
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"
                        style={{
                          background: 'linear-gradient(45deg, #a855f7, #9333ea, #c084fc, #a855f7)',
                          backgroundSize: '300% 300%',
                          animation: 'gradientShift 3s ease infinite',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'xor',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          padding: '2px',
                          zIndex: 1
                        }}
                      />
                      <div className="relative z-10">
                        <h3
                          className="text-white font-extraboldbold"
                          style={{
                            fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                            fontSize: 'clamp(16px, 4vw, 18px)',
                            fontWeight: 600,
                            letterSpacing: '-0.03em',
                            lineHeight: '1.4em',
                            color: '#ffffff !important'
                          }}
                        >
                          Felicitation to Great Place To Work Certified Organizations
                        </h3>
                      </div>
                    </motion.div> */}
                  </>
                )}
                {item.topic === '' && (
                  <>
                    <motion.div
                      className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 my-6 sm:my-8 text-center cursor-pointer group relative overflow-hidden"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                      whileTap={{
                        scale: 0.98,
                        transition: { duration: 0.1 }
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"
                        style={{
                          background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #eab308, #fbbf24)',
                          backgroundSize: '300% 300%',
                          animation: 'gradientShift 3s ease infinite',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'xor',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          padding: '2px',
                          zIndex: 1
                        }}
                      />
                      <div className="relative z-10">
                        <h3
                          className="text-white font-extraboldbold"
                          style={{
                            fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                            fontSize: 'clamp(16px, 4vw, 18px)',
                            fontWeight: 600,
                            lineHeight: '1.4em',
                            color: '#ffffff !important'
                          }}
                        >
                          Lunch at 1 PM
                        </h3>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            ))}

            <motion.div
              className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 text-center cursor-pointer group relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              {/* Animated border effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"
                style={{
                  background: 'linear-gradient(45deg, #8b5cf6, #7c3aed, #a78bfa, #8b5cf6)',
                  backgroundSize: '300% 300%',
                  animation: 'gradientShift 3s ease infinite',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'xor',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  padding: '2px',
                  zIndex: 1
                }}
              />
              <div className="relative z-10">
                <h3
                  className="text-white font-extraboldbold"
                  style={{
                    fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                    fontSize: 'clamp(16px, 4vw, 18px)',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    lineHeight: '1.4em',
                    color: '#ffffff !important'
                  }}
                >
                  Closing Remarks
                </h3>
              </div>
            </motion.div>
            {/* <motion.div
              className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 text-center cursor-pointer group relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"
                style={{
                  background: 'linear-gradient(45deg, #ec4899, #be185d, #f472b6, #ec4899)',
                  backgroundSize: '300% 300%',
                  animation: 'gradientShift 3s ease infinite',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'xor',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  padding: '2px',
                  zIndex: 1
                }}
              />
              <div className="relative z-10">
                <h3
                  className="text-white font-extraboldbold"
                  style={{
                    fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                    fontSize: 'clamp(16px, 4vw, 18px)',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    lineHeight: '1.4em',
                    color: '#ffffff !important'
                  }}
                >
                  Music fiesta by MuBand
                </h3>
              </div>
            </motion.div> */}
          </div>
        </div>

        <div className="text-center text-white/70 text-lg mt-4">*Last updated on 20th February 2026</div>

        {/* Ticker Section with SOLD OUT marquee */}
        <div className='overflow-hidden'>
          <div className="mb-16 mt-12 relative" style={{ opacity: 1, transform: 'perspective(1200px)' }}>
            {/* SOLD OUT Marquee floating over Reserve Your Spot section */}
            {isSoldOut && (
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-20 "
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5,
                  ease: "easeOut"
                }}
                style={{ transform: 'translate(-50%, -50%) rotate(-8deg)', width: '1500px', height: '30px' }}
              >
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-30" style={{ transform: 'rotate(-8deg)' }}>
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
            )}

            {/* Reserve Your Spot Button - Active when not sold out */}
            {!isSoldOut && (
              <Link href="https://makemypass.com/event/elevate26-hr-conclave-kochi-edition">
                <button className="w-full bg-transparent text-white hover:scale-[1.02] transition-all duration-300">
                  <div style={{ display: 'flex', width: '100%', height: '80px', maxWidth: '100%', maxHeight: '100%', placeItems: 'center', margin: '0px', padding: '0px', listStyleType: 'none', opacity: 1, overflow: 'hidden' }}>
                    <ul
                      className="animate-marquee"
                      style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        placeItems: 'center',
                        margin: '0px',
                        padding: '0px',
                        listStyleType: 'none',
                        gap: '40px',
                        position: 'relative',
                        flexDirection: 'row',
                        willChange: 'transform'
                      }}
                    >
                      {[...Array(10)].map((_, index) => (
                        <li key={index} style={{ flexShrink: 0 }}>
                          <div className="flex items-center gap-4" style={{ flexShrink: 0 }}>
                            <div style={{ display: 'contents' }}>
                              <svg width="24" height="24" strokeWidth="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(0, 188, 212)', width: '28px', height: '28px' }}>
                                <path d="M18.819 13.329l-5.324 5.99a2 2 0 01-2.99 0l-5.324-5.99a2 2 0 010-2.658l5.324-5.99a2 2 0 012.99 0l5.324 5.99a2 2 0 010 2.658z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </div>
                            <p
                              className="text-white uppercase whitespace-nowrap font-bold"
                              style={{
                                fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                                fontSize: '22px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                              }}
                            >
                              Reserve Your Spot
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              </Link>
            )}

            {/* Reserve Your Spot Button - Disabled when sold out */}
            {isSoldOut && (
              <button className="w-full bg-gray-500 text-white opacity-60 cursor-not-allowed" disabled>
                <div style={{ display: 'flex', width: '100%', height: '80px', maxWidth: '100%', maxHeight: '100%', placeItems: 'center', margin: '0px', padding: '0px', listStyleType: 'none', opacity: 1, overflow: 'hidden' }}>
                  <ul
                    className="animate-marquee"
                    style={{
                      display: 'flex',
                      width: '100%',
                      height: '100%',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      placeItems: 'center',
                      margin: '0px',
                      padding: '0px',
                      listStyleType: 'none',
                      gap: '40px',
                      position: 'relative',
                      flexDirection: 'row',
                      willChange: 'transform'
                    }}
                  >
                    {[...Array(10)].map((_, index) => (
                      <li key={index} style={{ flexShrink: 0 }}>
                        <div className="flex items-center gap-4" style={{ flexShrink: 0 }}>
                          <div style={{ display: 'contents' }}>
                            <svg width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(255, 204, 0)', width: '24px', height: '24px' }}>
                              <path d="M18.819 13.329l-5.324 5.99a2 2 0 01-2.99 0l-5.324-5.99a2 2 0 010-2.658l5.324-5.99a2 2 0 012.99 0l5.324 5.99a2 2 0 010 2.658z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </div>
                          <p
                            className="text-white uppercase whitespace-nowrap"
                            style={{
                              fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                              fontSize: '20px',
                              fontWeight: 600,
                              textTransform: 'uppercase'
                            }}
                          >
                            Reserve Your Spot
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Partners Section */}
        <motion.div
          className="mb-16 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className="text-center mb-8">
            <h2
              className="text-gray-800 uppercase font-medium"
              style={{
                fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                fontSize: 'clamp(20px, 5vw, 28px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: '1em'
              }}
            >
              Our Partners
            </h2>
          </div>

          <div
            className="relative overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)'
            }}
          >
            <div
              className="flex items-center"
              style={{
                display: 'flex',
                width: '100%',
                height: '100px',
                maxWidth: '100%',
                maxHeight: '100%',
                placeItems: 'center',
                margin: '0px',
                padding: '10px',
                listStyleType: 'none',
                opacity: 1,
                overflow: 'hidden'
              }}
            >
              <div className="partners-container animate-marquee-partners">
                {/* First set */}
                <ul
                  style={{
                    display: 'flex',
                    width: 'max-content',
                    height: '100%',
                    placeItems: 'center',
                    margin: '0px',
                    padding: '0px',
                    listStyleType: 'none',
                    gap: '60px',
                    position: 'relative',
                    flexDirection: 'row',
                    willChange: 'transform'
                  }}
                >
                  {partnersLoading ? (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <li key={`loading-${i}`} style={{ flexShrink: 0 }}>
                          <div
                            className="flex items-center justify-center bg-white rounded-lg p-3"
                            style={{
                              flexShrink: 0,
                              opacity: 1,
                              width: '140px',
                              height: '70px'
                            }}
                          >
                            <span
                              style={{
                                fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                                fontSize: '12px',
                                fontWeight: 600,
                                color: '#666',
                                textAlign: 'center'
                              }}
                            >
                              Loading...
                            </span>
                          </div>
                        </li>
                      ))}
                    </>
                  ) : (
                    <>
                      {partners.map((partner: Partner, index: number) => (
                        <PartnerLogo
                          key={`set1-${index}`}
                          partner={partner}
                        />
                      ))}
                    </>
                  )}
                </ul>
                {/* Second set for seamless looping */}
                <ul
                  style={{
                    display: 'flex',
                    width: 'max-content',
                    height: '100%',
                    placeItems: 'center',
                    margin: '0px',
                    padding: '0px',
                    listStyleType: 'none',
                    gap: '60px',
                    position: 'relative',
                    flexDirection: 'row',
                    willChange: 'transform',
                    marginLeft: '60px'
                  }}
                >
                  {!partnersLoading && partners.map((partner: Partner, index: number) => (
                    <PartnerLogo
                      key={`set2-${index}`}
                      partner={partner}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </motion.div>


      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}