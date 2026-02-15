import Image from 'next/image';

export default function Venue() {
  return (
    <section id="venue" className="min-h-screen flex flex-col items-center justify-center px-4 py-5 relative">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 text-center mb-16">
          Venue
        </h2>

        {/* Venue Images Container */}
        <div className="relative flex flex-col lg:flex-row gap-4 mb-12 items-center justify-center">
          {/* Park Centre Image - Left */}
          <div className="relative w-full lg:w-[500px] h-[280px] rounded-[40px] overflow-hidden">
            <Image
              src="/hall1.avif"
              alt="Athulya Building"
              fill
              className="object-cover"
            />
          </div>

          {/* Travancore Hall Interior Image - Right */}
          {/* <div className="relative w-full lg:w-[500px] h-[280px] rounded-[40px] overflow-hidden">
            <Image
              src="/hall2.avif"
              alt="Travancore Hall"
              fill
              className="object-cover"
            />
          </div> */}
        </div>

        {/* Venue Details - Centered */}
        <div className="text-center mb-8">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Athulya Building,
          </h3>
          <p className="text-xl md:text-2xl text-gray-700/90">
            Infopark, Kochi, Kerala
          </p>
        </div>

        {/* View in Map Button - Centered */}
        <div className="flex justify-center">
          <a
            href="https://maps.app.goo.gl/bb578djMmwGUtUdo6"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-r from-cyan-400 to-green-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3 whitespace-nowrap"
          >
            View in Map
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
