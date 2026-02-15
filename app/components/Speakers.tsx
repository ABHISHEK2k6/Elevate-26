'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { fetchSpeakersFromGoogleSheets, Speaker, getSpeakerImageUrls, getFallbackSpeakerImage } from '../../lib/speakersData';

// Robust Speaker Image Component with fallback support
interface SpeakerImageProps {
  speaker: Speaker;
  className?: string;
  priority?: boolean;
}

function SpeakerImage({ speaker, className = '', priority = false }: SpeakerImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageUrls] = useState(() => getSpeakerImageUrls(speaker.image));

  const handleImageError = () => {
    if (currentImageIndex < imageUrls.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const currentImageUrl = currentImageIndex < imageUrls.length
    ? imageUrls[currentImageIndex]
    : getFallbackSpeakerImage();

  return (
    <img
      src={currentImageUrl}
      alt={speaker.name}
      onError={handleImageError}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
  );
}

export default function Speakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forceRefresh, setForceRefresh] = useState(false);

  useEffect(() => {
    const loadSpeakers = async () => {
      try {
        setLoading(true);
        setError(null);
        const speakersData = await fetchSpeakersFromGoogleSheets(forceRefresh);
        setSpeakers(speakersData);
      } catch (err) {
        console.error('Failed to load speakers:', err);
        setError('Failed to load speakers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadSpeakers();
  }, [forceRefresh]);

  const handleRefresh = () => {
    setForceRefresh(prev => !prev);
  };

  return (
    <section id="speakers" className="flex flex-col items-center justify-center px-4 py-6 sm:py-12 md:py-20">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Speakers
        </motion.h2>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={handleRefresh}
              className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Speakers Grid */}
        {!loading && !error && speakers.length > 0 && (
          <div>
            {/* Mobile: Horizontal scroll container */}
            <div className="lg:hidden md:hidden">
              {/* Slide indicator for mobile */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600/70 text-sm">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  <span>Swipe to see more speakers</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

              <div className="flex overflow-x-auto gap-4 pb-4 pl-4 pr-4 snap-x snap-mandatory scrollbar-hide">
                {speakers.map((speaker, index) => {
                  const CardContent = (
                    <motion.div
                      key={`mobile-${index}`}
                      className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-cyan-600/20 to-green-800/30 border border-cyan-400/30 flex-shrink-0 w-72 h-90 snap-center cursor-pointer"
                      initial={{
                        opacity: 0,
                        y: 30,
                        scale: 0.95
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1
                      }}
                      viewport={{
                        once: true,
                        margin: "-50px"
                      }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                      whileHover={{
                        scale: 1.02,
                        y: -5,
                        transition: {
                          duration: 0.2,
                          ease: "easeOut"
                        }
                      }}
                    >
                      {/* Speaker Image Container */}
                      <motion.div
                        className="h-70 relative bg-gradient-to-b from-cyan-500/10 to-transparent overflow-hidden"
                        initial={{ scale: 1.1, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.05 + 0.1,
                          ease: "easeOut"
                        }}
                      >
                        {/* Speaker image */}
                        <SpeakerImage speaker={speaker} className="object-cover object-center" />

                        {/* Decorative background shape */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/5 to-green-600/10 pointer-events-none"></div>
                      </motion.div>

                      {/* Speaker Info */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-500 via-[#00BCD4] to-green-600 p-4 text-center h-24 flex flex-col justify-center"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05 + 0.2,
                          ease: "easeOut"
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.05 + 0.3
                          }}
                        >
                          <h3 className="text-lg font-bold text-white mb-1 leading-tight">
                            {speaker.name}
                          </h3>
                          <p className="text-white/90 text-sm font-medium leading-tight">
                            {speaker.title} {speaker.company}
                          </p>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );

                  return speaker.linkedin ? (
                    <a
                      key={`mobile-${index}`}
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {CardContent}
                    </a>
                  ) : (
                    CardContent
                  );
                })}
              </div>
            </div>

            {/* Desktop/Tablet: Grid layout */}
            <div className="hidden md:flex md:flex-wrap md:justify-center gap-12">
              {speakers.map((speaker, index) => {
                const CardContent = (
                  <motion.div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-cyan-600/20 to-green-800/30 border border-cyan-400/30 h-96 cursor-pointer w-[260px]"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                  >
                    {/* Speaker image box */}
                    <motion.div
                      className="aspect-[3/4] relative overflow-hidden"
                    >
                      <SpeakerImage speaker={speaker} className="object-cover" />
                    </motion.div>

                    {/* Info bar */}
                    <div className="absolute bottom-0 left-0 right-0 
  bg-gradient-to-r from-emerald-400 via-teal-500 to-green-500
  p-4 text-center h-24 flex flex-col justify-center">

                      <h3 className="text-lg font-bold text-white mb-1">
                        {speaker.name}
                      </h3>
                      <p className="text-white/90 text-sm font-medium">
                        {speaker.title} {speaker.company}
                      </p>
                    </div>
                  </motion.div>
                );

                return speaker.linkedin ? (
                  <a
                    key={index}
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div key={index}>{CardContent}</div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}