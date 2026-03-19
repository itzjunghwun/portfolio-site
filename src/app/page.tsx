"use client";

import { motion } from "framer-motion";
import { ImageCarousel } from "../components/ImageCarousel";

export default function Home() {
  return (
    <main className="min-h-screen pb-16 overflow-x-hidden">

      {/* HERO WRAPPER */}
      <div className="relative w-full mb-40">

        {/* BACKDROP */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <motion.img
            src="/images/backdrop2.jpg"
            initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay:0.1 }}
            className="w-full h-full object-cover"
          />

          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* left fade for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent" />
        </div>

        {/* HERO CONTENT */}
        <motion.section 
          className="max-w-6xl mx-auto px-6 md:px-20 pt-28 pb-16 flex items-center justify-between"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          {/* TEXT */}
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight mb-6">
              Daniel Seog.<br />
              Frontend Developer.
            </h1>

            <p className="text-gray-800 text-lg leading-relaxed">
              I build modern, scalable web applications with a focus on clean UI,
              intuitive UX, and real-world impact.
            </p>
          </div>

          {/* HEADSHOT */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 rounded-2xl bg-white/40 blur-2xl scale-110" />
            
            <img
              src="/images/headshot.jpg"
              className="relative w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl 
                         shadow-[0_30px_80px_rgba(0,0,0,0.25)] 
                         border border-white/40"
            />
          </div>

        </motion.section>

      </div>

      {/* PROJECTS */}
      <motion.section 
        className="max-w-6xl mx-auto px-6 md:px-20 mb-32"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >

        <h2 className="text-2xl font-semibold mb-8 tracking-tight">
          Featured Work
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* PROJECT CARD */}
          <motion.div 
            className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl hover:shadow-md hover:-translate-y-1 transition duration-300"
            whileHover={{ scale: 1.01 }}
          >

            {/* IMAGE */}
            <ImageCarousel
              slides={[
                {
                  image: "/images/landing.png",
                  title: "Landing Page",
                  description: 
                    "Clean, modern landing page designed to introduce the product and guide users toward onboarding.",
                },
                {
                  image: "/images/login.png",
                  title: "Authentication System",
                  description: 
                    "Secure login system with user authentication and protected access to personalized dashboards.",
                },
                {
                  image: "/images/signup.png",
                  title: "Account Creation",
                  description: 
                    "User-friendly signup flow with validation and secure credential handling.",
                },
                {
                  image: "/images/dashboard.png",
                  title: "Invoice Dashboard",
                  description: 
                    "Interactive dashboard allowing users to create, manage, and track invoices in real time.",
                },
                {
                  image: "/images/darkmode.png",
                  title: "Dark Mode Support",
                  description: 
                    "Implemented a dark mode interface to enhance user comfort and accessibility.",
                },
              ]}
            />

            {/* CONTENT */}
            <div className="p-6 pt-4">

              <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--accent)] transition">
                LedgerOne
              </h3>

              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Built a full-stack SaaS platform with secure authentication, per-user data isolation, and a responsive dashboard.
              </p>

              <p className="text-xs text-gray-500 mb-4">
                Next.js · TypeScript · Tailwind · Supabase
              </p>

              <a 
                href="https://github.com/itzjunghwun/ledgerone"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[var(--accent)] hover:text-[var(--accent-dark)] text-sm transition"
              >
                View Project
              </a>

            </div>

          </motion.div>

        </div>

      </motion.section>

    </main>
  );
}