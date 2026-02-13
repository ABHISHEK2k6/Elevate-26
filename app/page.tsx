import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Speakers from './components/Speakers';
import WhyAttend from './components/WhyAttend';
import Agenda from './components/Agenda';
import Venue from './components/Venue';
import TicketPrice from './components/TicketPrice';
// import FAQs from './components/FAQs';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#000000] via-[#1883ca] to-[#000000] relative z-0">
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(50deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '25px 25px'
        }}
      ></div>
      
      <div className="relative z-20">
        <Navbar />
        
        <main>
        <Hero />

        <About />

        <Speakers />

        <WhyAttend />

        <Agenda />

        <Venue />

        <TicketPrice />

        {/* <FAQs /> */}
        </main>

        <Footer />
      </div>
    </div>
  );
}

