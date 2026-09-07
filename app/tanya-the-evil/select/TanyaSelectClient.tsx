"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Search, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

import { TanyaVolumeData } from "@/data/tanya-the-evil";
import { UserMenu } from "@/components/auth/UserMenu";
import { BackgroundSlideshow } from "@/components/landing/BackgroundSlideshow";
import dynamic from "next/dynamic";

const AuthModal = dynamic(() => import("@/components/auth/AuthModal").then(mod => mod.AuthModal), { ssr: false });
const ProfileModal = dynamic(() => import("@/components/auth/ProfileModal").then(mod => mod.ProfileModal), { ssr: false });

interface TanyaSelectClientProps {
  volumes: TanyaVolumeData[];
}

const tanyaBackgrounds = [
  "/assets/images/tanya-the-evil/v1/cover.jpg",
  "/assets/images/tanya-the-evil/v4/cover.jpg",
  "/assets/images/tanya-the-evil/v6/cover.jpg",
  "/assets/images/tanya-the-evil/v8/cover.jpg"
];

export default function TanyaSelectClient({ volumes }: TanyaSelectClientProps) {
  const [viewMode, setViewMode] = useState<"detailed" | "compact">("compact");
  const [progressMap, setProgressMap] = useState<Record<string, { percentage: number; chapterTitle: string; chapterIndex?: number }>>({});
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("global-view-mode") as "detailed" | "compact" | null;
      setTimeout(() => {
        if (saved === "detailed" || saved === "compact") {
          setViewMode(saved);
        } else if (window.innerWidth >= 768) {
          setViewMode("detailed");
        } else {
          setViewMode("compact");
        }
      }, 0);
    }

    const progress: Record<string, { percentage: number; chapterTitle: string; chapterIndex?: number }> = {};
    volumes.forEach(vol => {
      const savedMeta = localStorage.getItem(`tanya-progress-meta-${vol.id}`);
      if (savedMeta) {
        try {
          progress[vol.id] = JSON.parse(savedMeta);
        } catch {}
      } else {
        const savedCfi = localStorage.getItem(`tanya-progress-${vol.id}`);
        if (savedCfi) {
          progress[vol.id] = { percentage: 0, chapterTitle: "Continue Reading", chapterIndex: parseInt(savedCfi) || 1 };
        }
      }
    });
    setTimeout(() => {
      setProgressMap(progress);
    }, 0);

    const handleViewModeChange = (e: Event) => {
      const customEvent = e as CustomEvent<"detailed" | "compact">;
      if (customEvent.detail === "detailed" || customEvent.detail === "compact") {
        setViewMode(customEvent.detail);
      }
    };
    window.addEventListener('change-view-mode', handleViewModeChange);
    return () => {
      window.removeEventListener('change-view-mode', handleViewModeChange);
    };
  }, [volumes]);

  const handleResetVolume = (volId: string) => {
    localStorage.removeItem(`tanya-progress-meta-${volId}`);
    localStorage.removeItem(`tanya-progress-${volId}`);
    
    const readKey = "tanya-read-chapters";
    const readData = localStorage.getItem(readKey);
    if (readData) {
      try {
        const readMap = JSON.parse(readData);
        const prefix = `${volId}-`;
        Object.keys(readMap).forEach(key => {
          if (key.startsWith(prefix)) {
            delete readMap[key];
          }
        });
        localStorage.setItem(readKey, JSON.stringify(readMap));
      } catch {}
    }
    setProgressMap(prev => {
      const copy = { ...prev };
      delete copy[volId];
      return copy;
    });
  };

  const handleGlobalViewModeToggle = () => {
    const nextMode = viewMode === "detailed" ? "compact" : "detailed";
    setViewMode(nextMode);
    localStorage.setItem("global-view-mode", nextMode);
    window.dispatchEvent(new CustomEvent('change-view-mode', { detail: nextMode }));
  };

  const displayedVolumes = useMemo(() => {
    return volumes.filter(v => 
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      v.volumeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.synopsis.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [volumes, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0e6d6] flex flex-col relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[#0a0a0f]/60 z-0 pointer-events-none" />
      <BackgroundSlideshow images={tanyaBackgrounds} imageOpacity={0.7} />

      <header className="sticky top-0 left-0 w-full z-50 p-6 bg-[#0a0a0f]/80 backdrop-blur-md flex items-center justify-between border-b border-amber-950/25">
        <div className="flex items-center">
          <Link href="/tanya-the-evil">
            <Button variant="ghost" size="icon" className="text-amber-300 hover:text-white hover:bg-amber-950/40 rounded-full transition-all cursor-pointer">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div className="ml-4 flex items-center gap-2">
            <span className="text-xl select-none">⚔️</span>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-extralight tracking-[0.15em] uppercase text-zinc-100 truncate max-w-[200px] sm:max-w-none">
              Saga of Tanya the Evil
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <UserMenu onSignIn={() => setAuthModalOpen(true)} onProfile={() => setProfileModalOpen(true)} />
        </div>
      </header>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10 relative">
        {/* Top bar controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 select-none">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-3xl font-bold font-serif bg-gradient-to-r from-amber-300 via-orange-200 to-amber-400 bg-clip-text text-transparent tracking-wide">
              Volume Select
            </h1>
            <p className="text-xs text-zinc-500 font-mono tracking-wider uppercase">
              Saga of Tanya the Evil
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-zinc-950/60 border border-zinc-800/80 rounded-full text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            {/* Layout Toggle */}
            <Button
              onClick={handleGlobalViewModeToggle}
              variant="outline"
              size="icon"
              className="rounded-full border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/60 hover:text-white cursor-pointer"
              title={viewMode === "detailed" ? "Switch to Compact View" : "Switch to Detailed View"}
            >
              {viewMode === "detailed" ? <LayoutGrid className="w-4 h-4" /> : <List className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Volume List Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${searchQuery}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-6 ${
              viewMode === "detailed"
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7"
            }`}
          >
            {displayedVolumes.map((vol) => {
              const progress = progressMap[vol.id];
              const isStarted = !!progress;

              if (viewMode === "detailed") {
                return (
                  <div
                    key={vol.id}
                    className="relative border border-zinc-800/80 bg-zinc-950/40 hover:border-amber-500/25 rounded-2xl p-4 flex gap-5 hover:bg-zinc-950/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.06)] transition-all duration-300 group"
                  >
                    <Link href={`/tanya-the-evil/select/${vol.id}`} className="block shrink-0 relative aspect-[2/3] w-[110px] sm:w-[130px] rounded-xl overflow-hidden shadow-2xl border border-zinc-900">
                      <Image
                        src={vol.coverImage}
                        alt={vol.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="130px"
                      />
                    </Link>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                            Volume {vol.volumeNumber}
                          </span>
                          <div className="flex items-center gap-2">
                            {isStarted && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleResetVolume(vol.id);
                                }}
                                className="text-[9px] font-semibold text-red-400/70 hover:text-red-400 transition-colors uppercase tracking-wider bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 px-2.5 py-0.5 rounded-full cursor-pointer select-none"
                              >
                                Reset
                              </button>
                            )}
                          </div>
                        </div>

                        <Link href={`/tanya-the-evil/select/${vol.id}`} className="hover:text-amber-300 transition-colors">
                          <h2 className="text-lg font-serif font-bold text-white leading-snug">
                            {vol.title.replace("Saga of Tanya the Evil, ", "")}
                          </h2>
                        </Link>

                        <p className="text-xs text-zinc-400/80 line-clamp-3 leading-relaxed font-light font-sans max-w-xl">
                          {vol.synopsis}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 mt-4">
                        {/* Progress Bar */}
                        {isStarted && (
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                              <span className="truncate max-w-[200px] text-amber-400/80">
                                {progress.chapterTitle}
                              </span>
                              <span>{Math.round(progress.percentage * 100)}% completed</span>
                            </div>
                            <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-600 to-orange-400 rounded-full"
                                style={{ width: `${Math.round(progress.percentage * 100)}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2.5 select-none">
                          <Link href={`/tanya-the-evil/read/${vol.id}/${isStarted ? (progress.chapterIndex || 1) : 1}`}>
                            <Button size="sm" className="rounded-full bg-amber-700/20 border border-amber-500/35 hover:bg-amber-600/40 hover:border-amber-500/60 text-white font-semibold text-[10px] tracking-wider uppercase px-4 cursor-pointer">
                              {isStarted ? "Continue" : "Start"}
                            </Button>
                          </Link>
                          <Link href={`/tanya-the-evil/select/${vol.id}`}>
                            <Button size="sm" variant="ghost" className="rounded-full text-zinc-400 hover:text-white text-[10px] tracking-wider uppercase px-3 cursor-pointer">
                              Chapters
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Compact view
              return (
                <div key={vol.id} className="relative group flex flex-col gap-2">
                  <Link href={`/tanya-the-evil/select/${vol.id}`} className="block relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-xl border border-zinc-900 hover-scale duration-300">
                    <Image
                      src={vol.coverImage}
                      alt={vol.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 150px, 200px"
                    />
                    
                    {/* Progress indicator overlays */}
                    {isStarted && (
                      <>
                        <div className="absolute top-2 left-2 bg-amber-950/80 backdrop-blur-sm px-2 py-0.5 rounded border border-amber-500/30 text-[9px] font-mono font-bold text-amber-300 z-20 pointer-events-none">
                          RESUME
                        </div>
                        <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-sm border border-white/10 w-9 h-9 rounded-full flex items-center justify-center z-20 shadow-md pointer-events-none">
                          <span className="text-[9px] font-mono font-bold text-amber-400">
                            {Math.round(progress.percentage * 100)}%
                          </span>
                          <svg className="absolute w-8 h-8 transform -rotate-90 text-amber-500" viewBox="0 0 36 36">
                            <path
                              className="text-zinc-800"
                              strokeWidth="3.5"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-amber-400 transition-all duration-300"
                              strokeDasharray={`${Math.round(progress.percentage * 100)}, 100`}
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                        </div>
                      </>
                    )}
                  </Link>

                  <div className="flex flex-col px-1 select-none">
                    <span className="text-[8px] font-mono font-bold text-amber-400 tracking-widest uppercase">
                      Vol. {vol.volumeNumber}
                    </span>
                    <Link href={`/tanya-the-evil/select/${vol.id}`} className="hover:text-amber-300 transition-colors">
                      <h4 className="text-xs font-serif font-bold text-white truncate leading-tight mt-0.5">
                        {vol.title.replace("Saga of Tanya the Evil, ", "")}
                      </h4>
                    </Link>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </div>
  );
}
