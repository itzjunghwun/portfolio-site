export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full backdrop-blur-xl bg-white/40 hover:bg-white/50 transition">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/40 to-transparent" />
        <div className="flex justify-between items-center py-2.5 px-6 md:px-20">
        
        {/* LEFT */}
        <h1 className="text-base md:text-lg font-semibold tracking-tight text-black/80">
          Daniel Seog's Portfolio
        </h1>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-sm text-black/60">
          <a href="/" className="hover:text-black transition duration-200">
            Home
          </a>
          <a href="/about" className="hover:text-black transition duration-200">
            About
          </a>
        </div>

        </div>

    </nav>
  )
}