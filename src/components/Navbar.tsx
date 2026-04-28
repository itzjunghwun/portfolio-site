import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-[rgba(204,190,177,0.42)] bg-white/32 shadow-[0_1px_0_rgba(255,255,255,0.65)_inset,0_18px_50px_rgba(102,73,48,0.08)] backdrop-blur-2xl backdrop-saturate-150 transition">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/70 via-white/20 to-transparent" />
      <div className="relative flex justify-between items-center py-2.5 px-6 md:px-20">
        
        {/* LEFT */}
        <Link
          href="/"
          aria-label="Go to home"
          className="font-serif text-xl md:text-2xl font-semibold tracking-normal text-[var(--foreground)] hover:text-[var(--espresso)] hover:opacity-100 transition"
        >
          Daniel Seog&apos;s Portfolio
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--espresso)] hover:opacity-100 transition duration-200">
            Home
          </Link>
          <Link href="/about" className="hover:text-[var(--espresso)] hover:opacity-100 transition duration-200">
            About
          </Link>
        </div>

      </div>

    </nav>
  )
}
