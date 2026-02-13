'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Speaker {
  name: string;
  title: string;
  company: string;
  image: string;
  linkedIn?: string;
}

export default function Speakers() {
  const speakers: Speaker[] = [
    {
      name: 'Seeram Sambasiva Rao IAS',
      title: 'Special Secretary (E & ITD) / Chairman,',
      company: 'Kerala State IT Mission',
      image: '/speakers/speaker_1.jpg',
    },
    {
      name: 'Dr.Jayasankar Prasad C',
      title: 'Director,',
      company: 'CMD',
      image: '/speakers/speaker_15.jpg',
      linkedIn: 'https://www.linkedin.com/in/jayasankar-prasad-c-b5459bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Anoop Ambika',
      title: 'CEO,',
      company: 'Kerala Start-up Mission',
      image: '/speakers/speaker_2.jpg',
      linkedIn: 'https://www.linkedin.com/in/anoopambika?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Sreekumar V',
      title: 'Secretary, GTech & Centre Head,',
      company: 'Tata Elxsi',
      image: '/speakers/speaker_3.jpg',
      linkedIn: 'https://www.linkedin.com/in/sreekumarv?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Col. Sanjeev Nair (Retd.)',
      title: 'CEO,',
      company: 'Technopark',
      image: '/speakers/speaker_4.jpg',
      linkedIn: 'https://www.linkedin.com/in/sanjeevnair13?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Deepu S Nath',
      title: 'Managing Director,',
      company: 'Faya',
      image: '/speakers/speaker_5.jpg',
      linkedIn: 'https://www.linkedin.com/in/deepusnath?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Raj Gopal R',
      title: 'Deputy Vice President & Regional Head,',
      company: 'Federal Bank',
      image: '/speakers/speaker_16.jpg',
    },
    {
      name: 'Nisha Gopinath',
      title: 'Vice President and Head of HR,',
      company: 'IBM India and South Asia',
      image: '/speakers/speaker_6.jpg',
      linkedIn: 'https://www.linkedin.com/in/nisha-gopinath-4087651?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Charles Godwin',
      title: 'HR Leader,',
      company: 'Zoho Corporation',
      image: '/speakers/speaker_7.jpg',
      linkedIn: 'https://www.linkedin.com/in/charlesgodwin?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Magical Rafi',
      title: 'Founder & Chief Mentor,',
      company: 'Magic of Change',
      image: '/speakers/speaker_8.jpg',
      linkedIn: 'https://www.linkedin.com/in/mohammedrafinlptrainer?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Saurabh Singh',
      title: 'Consulting and Capability,',
      company: 'SHRM India',
      image: '/speakers/speaker_9.jpg',
      linkedIn: 'https://www.linkedin.com/in/learnsingh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Karthika Nair S',
      title: 'Associate Director',
      company: '',
      image: '/speakers/speaker_13.jpg',
    },
    {
      name: 'Jayan Nair',
      title: 'Chief People Officer,',
      company: 'IBS Software',
      image: '/speakers/speaker_10.jpg',
      linkedIn: 'https://www.linkedin.com/in/jayan-nair-0b11874?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Manoj Elanjickal',
      title: 'Director - People & Culture,',
      company: 'H&R Block India',
      image: '/speakers/speaker_11.jpg',
      linkedIn: 'https://www.linkedin.com/in/manojelanjickal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Varun Palat',
      title: 'Deputy Vice President - HR,',
      company: 'Federal Bank',
      image: '/speakers/speaker_12.jpg',
      linkedIn: 'https://www.linkedin.com/in/varun-palat-18312912b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
    {
      name: 'Aditi Radhakrishnan',
      title: 'Consultant & Coach,',
      company: 'Mitara Consulting Services',
      image: '/speakers/speaker_14.jpg',
      linkedIn: 'https://www.linkedin.com/in/aditiradhakrishnan?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    },
    {
      name: 'Dr. Thomas George K ',
      title: 'Director,',
      company: 'LEAD College (Autonomous)',
      image: '/speakers/speaker_17.jpg',
      linkedIn: 'https://www.linkedin.com/in/thomasgeorgek?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    },
  ];

  return (
    <section id="speakers" className="flex flex-col items-center justify-center px-4 py-6 sm:py-12 md:py-20">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Speakers
        </motion.h2>

        {/* Speakers Grid */}
        <div>
          {/* Mobile: Horizontal scroll container */}
          <div className="lg:hidden md:hidden">
            {/* Slide indicator for mobile */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center gap-2 text-white/60 text-sm">
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
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-600/20 to-blue-800/30 border border-blue-500/30 flex-shrink-0 w-72 h-90 snap-center cursor-pointer"
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
                      className="h-70 relative bg-gradient-to-b from-blue-500/10 to-transparent overflow-hidden"
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
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 288px, (max-width: 1024px) 50vw, 25vw"
                      />

                      {/* Decorative background shape */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-blue-600/10 pointer-events-none"></div>
                    </motion.div>

                    {/* Speaker Info */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 via-[#1883ca] to-blue-700 p-4 text-center h-24 flex flex-col justify-center"
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

                return speaker.linkedIn ? (
                  <a
                    key={`mobile-${index}`}
                    href={speaker.linkedIn}
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
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-600/20 to-blue-800/30 border border-blue-500/30 h-96 cursor-pointer w-[260px]"
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
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  {/* Info bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#229bd3] p-4 text-center h-24 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {speaker.name}
                    </h3>
                    <p className="text-white/90 text-sm font-medium">
                      {speaker.title} {speaker.company}
                    </p>
                  </div>
                </motion.div>
              );

              return speaker.linkedIn ? (
                <a
                  key={index}
                  href={speaker.linkedIn}
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
      </div>
    </section>
  );
}