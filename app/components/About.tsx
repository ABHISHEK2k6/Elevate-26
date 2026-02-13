export default function About() {
  return (
    <section id="about" className=" flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center my-12">
          About HR Evolve
        </h2>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 md:p-10">
          <p className="text-lg md:text-xl text-purple-100 leading-relaxed text-justify">
            <a 
              href="https://hrevolve.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline"
            >
              HR Evolve
            </a>
            &nbsp; is vibrant voluntary community for HR professionals and enthusiasts dedicated to reshaping 
            the future of human resources at Technopark. This forum is exclusively initiated for HR 
            professionals in Technopark.The community meets every third Thursday in-person at Park Centre, Technopark and hosts 
            interactive, expert-led sessions that tackle evolving HR challenges and opportunities. This 
            platform encourages networking, learning, collaboration and open dialogue, allowing members 
            to exchange ideas and insights on the latest industry trends. With a focus on networking and 
            continuous learning, we empower HR professionals to stay ahead in a rapidly changing landscape.
          </p>
        </div>
      </div>
    </section>
  );
}
