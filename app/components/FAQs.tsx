'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: 'What makes Elevate Bootcamp different from other UI/UX events?',
      answer: 'Elevate Bootcamp is a hands-on, skills-focused event designed to equip attendees with practical knowledge, bridging the gap between theory and real-world applications in UI/UX and emerging technologies.',
    },
    {
      question: 'Who is Elevate Bootcamp designed for?',
      answer: 'Elevate Bootcamp is designed for UI/UX professionals, designers, developers, product managers, and anyone interested in learning about design systems, AI tools, and modern design practices.',
    },
    {
      question: 'What will I learn at Elevate Bootcamp?',
      answer: 'You will learn UI/UX fundamentals, design systems, AI-powered design tools, hands-on techniques, and best practices from industry experts. The bootcamp covers both theoretical concepts and practical applications.',
    },
    {
      question: 'How will Elevate Bootcamp benefit my career?',
      answer: 'The bootcamp will enhance your skills, expand your professional network, provide industry insights, and give you hands-on experience with cutting-edge tools and techniques that are highly valued in the industry.',
    },
    {
      question: 'Who are the speakers, and why are they important?',
      answer: 'Our speakers are industry leaders from top companies like Google, DELL, HFI, and Infosys. They bring real-world experience, practical insights, and proven expertise that you can directly apply to your work.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2 
          className="text-5xl md:text-6xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Common Questions
        </motion.h2>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1, 
                ease: "easeOut" 
              }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-white pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <svg 
                      className="w-8 h-8 text-white transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  ) : (
                    <svg 
                      className="w-8 h-8 text-white transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <motion.div 
                        className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <p className="text-lg text-white leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
