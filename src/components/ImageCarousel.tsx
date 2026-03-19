"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Slide = {
  image: string;
  title: string;
  description: string;
};

export function ImageCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure portal only runs on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // =========================
  // CAROUSEL NAVIGATION
  // =========================
  const prev = () =>
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const next = () =>
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  // =========================
  // KEYBOARD CONTROLS
  // =========================
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // =========================
  // LOCK SCROLL (premium feel)
  // =========================
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {/* ========================================= */}
      {/* MAIN CARD */}
      {/* ========================================= */}
      <div className="relative w-full max-w-xl mx-auto">

        {/* IMAGE CARD */}
        <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/40 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] group">

          {/* GLASS LAYERS */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-transparent" />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] rounded-2xl" />

          {/* IMAGE */}
          <div className="relative w-full aspect-[16/10]">
            <AnimatePresence mode="wait">
              <motion.img
                key={slides[index].image}
                src={slides[index].image}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
          </div>

          {/* LEFT ARROW */}
          <button
            onClick={prev}
            className="opacity-0 group-hover:opacity-100 transition duration-300 absolute left-4 top-1/2 -translate-y-1/2 
            bg-white/30 backdrop-blur-xl border border-white/20 
            p-2 rounded-full 
            shadow-[0_4px_20px_rgba(0,0,0,0.1)] 
            hover:bg-white/50 hover:scale-105"
          >
            <ChevronLeft size={18} />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            className="opacity-0 group-hover:opacity-100 transition duration-300 absolute right-4 top-1/2 -translate-y-1/2 
            bg-white/30 backdrop-blur-xl border border-white/20 
            p-2 rounded-full 
            shadow-[0_4px_20px_rgba(0,0,0,0.1)] 
            hover:bg-white/50 hover:scale-105"
          >
            <ChevronRight size={18} />
          </button>

          {/* ENLARGE BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="opacity-0 group-hover:opacity-100 transition duration-300 absolute bottom-4 right-4 
            bg-black/40 backdrop-blur-lg text-white text-xs px-3 py-1.5 rounded-full 
            hover:bg-black/60"
          >
            Click to enlarge
          </button>
        </div>

        {/* TEXT */}
        <div className="mt-6 text-center flex flex-col items-center backdrop-blur-sm">
          <h4 className="font-semibold text-lg tracking-tight text-black/90">
            {slides[index].title}
          </h4>

          <p className="text-black/60 text-sm mt-2 leading-relaxed max-w-md">
            {slides[index].description}
          </p>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "bg-black scale-110 shadow-sm"
                  : "bg-black/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ========================================= */}
      {/* FULLSCREEN MODAL (PORTAL FIX) */}
      {/* ========================================= */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              >
                {/* MODAL CONTENT */}
                <motion.div
                  className="relative max-w-5xl w-[90vw] max-h-[85vh] flex items-center justify-center"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* IMAGE */}
                  <img
                    src={slides[index].image}
                    className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                  />

                  {/* CLOSE */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 bg-white text-black px-3 py-1 rounded-full shadow hover:scale-110 transition"
                  >
                    ✕
                  </button>

                  {/* LEFT */}
                  <button
                    onClick={prev}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-lg hover:scale-110 transition"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  {/* RIGHT */}
                  <button
                    onClick={next}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-lg hover:scale-110 transition"
                  >
                    <ChevronRight size={22} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}