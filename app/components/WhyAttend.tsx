'use client';
import { motion } from 'framer-motion';

export default function WhyAttend() {
  const themes = [
    {
      title: '',
      subtitle: 'Shaping the Future: Leading through the Human–AI Nexus',
      description: 'Harnessing Artificial Intelligence to Humanize the Workplace. AI is no longer on the horizon—it\'s here, redefining every facet of HR from talent acquisition to workforce planning. This keynote explores the duality of AI\'s impact: automating routine tasks while augmenting human intelligence, and how enterprises can balance efficiency with empathy.',
      takeaways: [
        'How AI transforms core HR functions without losing the human touch',
        'Frameworks to integrate \'human-in-the-loop\' decision-making',
        'Balancing innovation, fairness, and trust in AI-enabled HR systems',
        'The evolving role of HR as an AI strategist, not just a user',
      ],
    },
    {
      title: '',
      subtitle: 'Learning Rewired: The Skill-Shelf-Life Crisis Management',
      description: 'Redefining Upskilling and Learning Agility for a Rapidly Evolving Workforce. The shelf life of skills has dropped to less than three years—yet the appetite for learning must be lifelong. This session explores how organizations can rewire learning ecosystems to build adaptive, self-directed, and tech-enabled skill cultures.',
      takeaways: [
        'Designing learning architectures powered by AI and predictive analytics',
        'Moving from training programs to personalized learning journeys',
        'Approaches to measure learning agility and business impact',
      ],
    },
    {
      title: '',
      subtitle: 'The Talent Reset: Repurposing People for the New Work Order',
      description: 'Strategic Redeployment and Human Infrastructure for the Future of Work. As automation evolves, the focus shifts from redundancy to redeployment. Organizations must cultivate \'talent fluidity\'—the ability to move people where the value moves.',
      takeaways: [
        'How to build internal talent marketplaces and reskilling pathways',
        'Identifying adjacent skills and career pivot strategies',
        'Role of AI in predicting future skill demand and workforce readiness',
        'HR as the architect of a dynamic, borderless workforce',
      ],
    },
    {
      title: '',
      subtitle: 'AI + HI: Creating a Future-Ready HR Function',
      description: 'Discover how human intelligence and artificial intelligence can work hand in hand to build a smarter, more agile HR function. Learn about practical AI tools, the HR adoption journey, and real-world use cases balancing augmentation and automation — along with insights on prompt engineering, governance, and change management.',
      takeaways: [
        'Understanding AI tools and tech in HR',
        'The AI Adoption Journey for HR',
        'Augmentation vs. Automation: Practical Use Cases',
        'Prompt Engineering & Maximizing AI Tools',
        'Corporate AI Governance and Change Management',
      ],
    },
    {
      title: '',
      subtitle: 'The Future of Work – Bridging the Human–AI Continuum-Panel Discussion',
      description: 'A dialogue among People Leaders from leading technology services organizations, examining workforce transformation challenges across skill obsolescence, AI ethics, and organizational agility.',
      takeaways: [
        'Aligning business and talent priorities for AI-led transformation',
        'Designing human networks for learning and innovation',
        'Building resilience amid skill disruption',
        'Bridging the human–machine interface through empathy and design thinking',
      ],
    },
  ];

  return (
    <section className="py-8 sm:py-4 md:py-4 px-4" data-framer-name="Why Attend" id="why-attend">
      <div className="max-w-6xl mx-auto px-2 sm:px-4" data-framer-name="Container" id="why-attend-1">

        {/* Detailed Sessions Content - Using Original Themes */}
        <div className="mb-8 sm:mb-12">
          <motion.h3 
            className="text-center mb-4 sm:mb-6"
            style={{
              fontFamily: '"Sora", "Sora Placeholder", sans-serif',
              fontSize: 'clamp(22px, 5vw, 28px)',
              fontWeight: 600,
              color: 'white'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            What You&apos;ll Learn
          </motion.h3>
          {/* Grid Layout optimized for 5 containers - All Equal Height */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {themes.slice(0, 3).map((theme, index) => (
              <motion.div 
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 flex flex-col"
                style={{ 
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  minHeight: '380px'
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2, 
                  ease: "easeOut" 
                }}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.3 } 
                }}
              >
                {/* Theme Number and Title */}
                <div className="mb-3">
                  <h4 
                    className="mb-2 text-justify"
                    style={{
                      fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'rgb(168, 85, 247)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {theme.title}
                  </h4>
                  <h5 
                    className="mb-3 text-justify"
                    style={{
                      fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                      fontSize: 'clamp(16px, 4vw, 18px)',
                      fontWeight: 600,
                      color: 'white',
                      lineHeight: '1.3em'
                    }}
                  >
                    {theme.subtitle}
                  </h5>
                </div>

                {/* Description */}
                <div className="mb-4 text-justify" style={{ minHeight: '100px' }}>
                  <p 
                    style={{
                      fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                      fontSize: 'clamp(12px, 3vw, 13px)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: '1.4em'
                    }}
                  >
                    {theme.description}
                  </p>
                </div>

                {/* Key Takeaways */}
                <div className="flex flex-col">
                  <h6 
                    className="mb-2"
                    style={{
                      fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                      fontSize: 'clamp(13px, 3.5vw, 14px)',
                      fontWeight: 600,
                      color: 'rgb(239, 200, 38)'
                    }}
                  >
                    Key {index === 4 ? 'Discussion Points' : 'Takeaways'}:
                  </h6>
                  <div className="space-y-1.5" style={{ minHeight: '120px' }}>
                    {theme.takeaways.slice(0, 4).map((takeaway, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span 
                          className="flex-shrink-0"
                          style={{ 
                            color: 'rgb(168, 85, 247)',
                            fontSize: '10px'
                          }}
                        >
                          •
                        </span>
                        <span 
                          style={{
                            fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                            fontSize: 'clamp(11px, 2.8vw, 12px)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            lineHeight: '1.3em'
                          }}
                        >
                          {takeaway}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row for last 2 containers - Equal Height */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {themes.slice(3, 5).map((theme, index) => (
              <motion.div 
                key={index + 3}
                className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 flex flex-col"
                style={{ 
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  minHeight: '380px'
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6 + (index * 0.2), 
                  ease: "easeOut" 
                }}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.3 } 
                }}
              >
                {/* Theme Number and Title */}
                <div className="mb-3">
                  <h4 
                    className="mb-2"
                    style={{
                      fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'rgb(168, 85, 247)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {theme.title}
                  </h4>
                  <h5 
                    className="mb-3"
                    style={{
                      fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                      fontSize: 'clamp(16px, 4vw, 18px)',
                      fontWeight: 600,
                      color: 'white',
                      lineHeight: '1.3em'
                    }}
                  >
                    {theme.subtitle}
                  </h5>
                </div>

                {/* Description */}
                <div className="mb-3" style={{ minHeight: '90px' }}>
                  <p 
                    style={{
                      fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                      fontSize: 'clamp(12px, 3vw, 13px)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: '1.4em'
                    }}
                  >
                    {theme.description}
                  </p>
                </div>

                {/* Key Takeaways */}
                <div className="flex flex-col">
                  <h6 
                    className="mb-2"
                    style={{
                      fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                      fontSize: 'clamp(13px, 3.5vw, 14px)',
                      fontWeight: 600,
                      color: 'rgb(239, 200, 38)'
                    }}
                  >
                    Key {index === 1 ? 'Discussion Points' : 'Takeaways'}:
                  </h6>
                  <div className="space-y-1.5" style={{ minHeight: '120px' }}>
                    {theme.takeaways.slice(0, 4).map((takeaway, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span 
                          className="flex-shrink-0"
                          style={{ 
                            color: 'rgb(168, 85, 247)',
                            fontSize: '10px'
                          }}
                        >
                          •
                        </span>
                        <span 
                          style={{
                            fontFamily: '"Sora", "Sora Placeholder", sans-serif',
                            fontSize: 'clamp(11px, 2.8vw, 12px)',
                            color: 'rgba(255, 255, 255, 0.9)',
                            lineHeight: '1.3em'
                          }}
                        >
                          {takeaway}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Infinite Sliding Text Section */}
      <div className="mt-12 sm:mt-16  overflow-hidden relative" style={{ height: '180px' }}>
        {/* SVG Definitions */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <g id="svg-star-917">
              <path
                d="M49 0C49 0 49 49 49 49C49 49 98 49 98 49C98 49 49 49 49 49C49 49 49 98 49 98C49 98 49 49 49 49C49 49 0 49 0 49C0 49 49 49 49 49C49 49 49 0 49 0Z"
                fill="white"
              />
            </g>
          </defs>
        </svg>

        {/* Seamless sliding content */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center whitespace-nowrap animate-slide-seamless" style={{ willChange: 'transform' }}>
          {/* First set */}
          <div className="flex items-center gap-10 pr-10">
            <div className="flex-shrink-0">
              <p className="text-6xl md:text-8xl font-semibold text-transparent text-stroke-white font-sora">
                Shaping the Future
              </p>
            </div>
            
            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16" style={{ transform: 'rotate(279.545deg)' }}>
              <svg className="w-full h-full" viewBox="0 0 98 98" fill="white">
                <use href="#svg-star-917" />
              </svg>
            </div>

            <div className="flex-shrink-0">
              <p className="text-6xl md:text-8xl font-semibold text-transparent text-stroke-white font-sora">
                Shaping the Future
              </p>
            </div>

            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16" style={{ transform: 'rotate(279.321deg)' }}>
              <svg className="w-full h-full" viewBox="0 0 98 98" fill="white">
                <use href="#svg-star-917" />
              </svg>
            </div>

            <div className="flex-shrink-0">
              <p className="text-6xl md:text-8xl font-semibold text-transparent text-stroke-white font-sora">
                Shaping the Future
              </p>
            </div>

            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16" style={{ transform: 'rotate(279.321deg)' }}>
              <svg className="w-full h-full" viewBox="0 0 98 98" fill="white">
                <use href="#svg-star-917" />
              </svg>
            </div>
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex items-center gap-32">
            <div className="flex-shrink-0">
              <p className="text-6xl md:text-8xl font-semibold text-transparent text-stroke-white font-sora">
                Shaping the Future
              </p>
            </div>
            
            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16" style={{ transform: 'rotate(279.545deg)' }}>
              <svg className="w-full h-full" viewBox="0 0 98 98" fill="white">
                <use href="#svg-star-917" />
              </svg>
            </div>

            <div className="flex-shrink-0">
              <p className="text-6xl md:text-8xl font-semibold text-transparent text-stroke-white font-sora">
                Shaping the Future
              </p>
            </div>

            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16" style={{ transform: 'rotate(279.321deg)' }}>
              <svg className="w-full h-full" viewBox="0 0 98 98" fill="white">
                <use href="#svg-star-917" />
              </svg>
            </div>

            <div className="flex-shrink-0">
              <p className="text-6xl md:text-8xl font-semibold text-transparent text-stroke-white font-sora">
                Shaping the Future
              </p>
            </div>

            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16" style={{ transform: 'rotate(279.321deg)' }}>
              <svg className="w-full h-full" viewBox="0 0 98 98" fill="white">
                <use href="#svg-star-917" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
