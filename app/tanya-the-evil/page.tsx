"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { BackgroundSlideshow } from "@/components/landing/BackgroundSlideshow";

const tanyaSlides = [
  "/assets/images/tanya-the-evil/v1/cover.jpg",
  "/assets/images/tanya-the-evil/v3/cover.jpg",
  "/assets/images/tanya-the-evil/v5/cover.jpg",
  "/assets/images/tanya-the-evil/v7/cover.jpg",
];

export default function TanyaLanding() {
  return (
    <main className="flex min-h-screen flex-col relative overflow-x-hidden bg-[#0a0a0f] text-white">
      {/* Background Slideshow */}
      <BackgroundSlideshow images={tanyaSlides} imageOpacity={0.7} />

      {/* Header */}
      <SiteHeader showBack={true} backLink="/" />

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-x-hidden px-4 py-16 md:py-24 z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24 max-w-6xl mx-auto w-full z-10 relative">
          
          {/* Left Column: Text & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start text-center md:text-left gap-6 max-w-xl z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center md:items-start"
            >
              <h1 className="sr-only">Saga of Tanya the Evil</h1>
              <div className="text-5xl sm:text-6xl md:text-7xl font-serif font-extralight tracking-[0.22em] bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500 bg-clip-text text-transparent uppercase select-none drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                Tanya
              </div>
              <p className="text-xs sm:text-sm tracking-[0.4em] uppercase text-amber-400/60 mt-2 font-mono">
                The Evil
              </p>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="relative mt-2 max-w-2xl bg-black/45 backdrop-blur-[3px] border border-amber-950/30 p-5 rounded-xl shadow-xl"
            >
              <p className="font-serif text-base italic text-zinc-150 md:text-lg leading-relaxed drop-shadow-md">
                &ldquo;Curse you, Being X! I will survive on reason alone, even as a little girl on the blood-soaked Rhine.&rdquo;
              </p>
              <p className="mt-2 text-xs text-amber-400 font-bold tracking-widest uppercase font-mono drop-shadow-md">- Tanya von Degurechaff</p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-4"
            >
              <Link href="/tanya-the-evil/select">
                <Button size="lg" className="group text-lg px-10 py-6 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.55)] transition-all duration-200 cursor-pointer border border-amber-400/25">
                  Start Reading
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating Character */}
          <div className="relative md:relative mt-8 md:mt-0 opacity-100 z-10 w-[200px] sm:w-[280px] md:w-[380px] lg:w-[440px] aspect-[1/1.4] select-none pointer-events-none md:pointer-events-auto mx-auto md:mx-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
              className="w-full h-full"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full h-full"
              >
                <Image
                  src="/assets/images/tanya-the-evil/character.png"
                  alt="Tanya von Degurechaff"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_10px_50px_rgba(245,158,11,0.25)]"
                  sizes="(max-width: 768px) 240px, (max-width: 1024px) 380px, 440px"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-10 z-10 animate-bounce hidden md:block"
        >
          <span className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
        </motion.div>
      </section>

      {/* Thematic Footer */}
      <footer className="w-full py-8 flex flex-col items-center justify-center gap-2 text-center text-xs text-zinc-500 border-t border-white/5 bg-black/20 backdrop-blur-sm z-10">
        <Link href="/" className="hover:text-white transition-colors duration-300 flex items-center gap-1.5 font-medium">
          &larr; Return to Library
        </Link>
        <p>&copy; 2026 Novels Reader. Not affiliated with the official franchise.</p>
      </footer>
    </main>
  );
}
