"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <main className="px-6 md:px-20 py-20 max-w-4xl">

      {/* TITLE */}
      <motion.h1
        className="text-4xl md:text-5xl font-semibold mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h1>

      {/* CONTENT */}
      <motion.div
        className="space-y-6 text-gray-600 leading-relaxed text-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p>
          I'm a frontend-focused developer passionate about building clean,
          modern web applications that solve real problems. I enjoy working
          with technologies like Next.js, TypeScript, and Tailwind to create
          scalable and user-friendly experiences.
        </p>

        <p>
          Outside of coding, I’m deeply interested in basketball, guitar tone
          engineering, and technology. I enjoy building PCs, keeping up with
          the latest tech releases, and helping others find the best solutions—
          something I actively do through my work at Micro Center.
        </p>

        <p>
          I'm constantly improving my workflow, expanding my skills, and exploring
          new tools like WordPress to grow as both a developer and problem solver.
        </p>
      </motion.div>

      {/* DIVIDER */}
      <div className="my-16 border-t border-[var(--border)]" />

      {/* BIBLE VERSE (FEATURED BLOCK) */}
      <motion.div
        className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 mt-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <p className="text-xl italic text-[var(--accent-dark)] mb-4">
          “So whether you eat or drink or whatever you do, do it all for the glory of God.”
        </p>

        <p className="text-sm text-gray-500">
          1 Corinthians 10:31 (NIV)
        </p>
      </motion.div>

    </main>
  );
}