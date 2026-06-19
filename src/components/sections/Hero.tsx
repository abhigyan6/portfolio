export default function Hero() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative z-10 px-6">
      <div className="text-center max-w-5xl mx-auto">
        {/* Name — massive and immediate */}
        <div className="mb-4">
          <h1
            className="text-8xl md:text-[12rem] font-extrabold tracking-tighter leading-none pb-4 text-gradient-animated opacity-0"
            style={{ animation: "fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards" }}
          >
            Abhigyan
          </h1>
        </div>

        {/* Role */}
        <div
          className="text-lg md:text-2xl text-neutral-300 font-mono tracking-wide opacity-0"
          style={{ animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards" }}
        >
          UI/UX Designer &bull; Graphic Designer &bull; Frontend Developer
        </div>

        {/* Tagline */}
        <div
          className="mt-8 max-w-xl mx-auto opacity-0"
          style={{ animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards" }}
        >
          <p className="text-base md:text-lg text-neutral-300 font-medium">
            I design intuitive digital experiences and write the code that brings them to life.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 opacity-0"
          style={{ animation: "fadeIn 1s ease 2s forwards" }}
        >
          <div className="w-[1px] h-16 bg-neutral-800 mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-neutral-400 origin-top animate-scroll-down" />
          </div>
          <span className="text-xs text-neutral-400 font-mono mt-3 block">scroll</span>
        </div>
      </div>
    </section>
  );
}
