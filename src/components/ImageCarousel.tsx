"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
    queueMicrotask(() => setMounted(true));
  }, []);

  // =========================
  // CAROUSEL NAVIGATION
  // =========================
  const prev = useCallback(() => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const next = useCallback(() => {
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  // =========================
  // KEYBOARD CONTROLS
  // =========================
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, next, prev]);

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
        <div className="relative overflow-hidden rounded-2xl border border-[rgba(204,190,177,0.42)] bg-white/34 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_18px_60px_rgba(102,73,48,0.1)] group">

          {/* GLASS LAYERS */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/58 via-white/12 to-transparent" />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.72),inset_0_-1px_1px_rgba(204,190,177,0.18)] rounded-2xl" />

          {/* IMAGE */}
          <div className="relative w-full aspect-[16/10]">
            <AnimatePresence mode="wait">
              <motion.img
                key={slides[index].image}
                src={slides[index].image}
                alt={slides[index].title}
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
            bg-white/44 backdrop-blur-xl backdrop-saturate-150 border border-[rgba(204,190,177,0.42)] 
            p-2 rounded-full 
            shadow-[0_8px_28px_rgba(102,73,48,0.14),inset_0_1px_0_rgba(255,255,255,0.72)] 
            hover:bg-white/62 hover:scale-105"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            className="opacity-0 group-hover:opacity-100 transition duration-300 absolute right-4 top-1/2 -translate-y-1/2 
            bg-white/44 backdrop-blur-xl backdrop-saturate-150 border border-[rgba(204,190,177,0.42)] 
            p-2 rounded-full 
            shadow-[0_8px_28px_rgba(102,73,48,0.14),inset_0_1px_0_rgba(255,255,255,0.72)] 
            hover:bg-white/62 hover:scale-105"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>

          {/* ENLARGE BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="opacity-0 group-hover:opacity-100 transition duration-300 absolute bottom-4 right-4 
            bg-black/36 backdrop-blur-xl backdrop-saturate-150 border border-white/20 text-white text-xs px-3 py-1.5 rounded-full 
            shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] hover:bg-black/50"
          >
            Click to enlarge
          </button>
        </div>

        {/* TEXT */}
        <div className="mt-6 text-center flex flex-col items-center backdrop-blur-sm">
          <h4 className="font-semibold text-lg tracking-tight text-[var(--foreground)]">
            {slides[index].title}
          </h4>

          <p className="text-[var(--muted)] text-sm mt-2 leading-relaxed max-w-md">
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
                  ? "bg-[var(--espresso)] scale-110 shadow-sm"
                  : "bg-[rgba(153,126,103,0.28)]"
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
                className="fixed inset-0 z-[99999] flex items-center justify-center bg-[rgba(23,18,15,0.76)] backdrop-blur-2xl backdrop-saturate-150"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              >
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-black/20" />

                {/* CLOSE */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="fixed right-5 top-5 md:right-8 md:top-8 z-[100000] grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-white/24 text-white shadow-[0_12px_36px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-2xl backdrop-saturate-150 transition hover:bg-white/38 hover:scale-105"
                  aria-label="Close enlarged image"
                >
                  <X size={20} />
                </button>

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
                    alt={slides[index].title}
                    className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/25 shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
                  />

                  {/* LEFT */}
                  <button
                    onClick={prev}
                    className="fixed left-5 md:left-8 top-1/2 -translate-y-1/2 bg-white/24 text-white p-3 rounded-full border border-white/35 shadow-[0_12px_36px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-2xl backdrop-saturate-150 hover:bg-white/38 hover:scale-105 transition"
                    aria-label="Previous enlarged image"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  {/* RIGHT */}
                  <button
                    onClick={next}
                    className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 bg-white/24 text-white p-3 rounded-full border border-white/35 shadow-[0_12px_36px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-2xl backdrop-saturate-150 hover:bg-white/38 hover:scale-105 transition"
                    aria-label="Next enlarged image"
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
