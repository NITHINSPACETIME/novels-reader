"use client";

import { tanyaVolumes } from "@/data/tanya-the-evil";
import { ArrowLeft, BookOpen, Search, ArrowUpDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MarqueeText } from "@/components/MarqueeText";

import { useAuth } from "@/context/AuthContext";
import { UserMenu } from "@/components/auth/UserMenu";
import dynamic from "next/dynamic";
import { BackgroundSlideshow } from "@/components/landing/BackgroundSlideshow";
import { SupportAuthorCard } from "@/components/ui/SupportAuthorCard";

const AuthModal = dynamic(() => import("@/components/auth/AuthModal").then(mod => mod.AuthModal), { ssr: false });
const ProfileModal = dynamic(() => import("@/components/auth/ProfileModal").then(mod => mod.ProfileModal), { ssr: false });

export function VolumePageClient({ volumeId }: { volumeId: string }) {
    const volume = tanyaVolumes.find((v) => v.id === volumeId);

    if (!volume) {
        notFound();
    }

    useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [hasStarted, setHasStarted] = useState(false);
    const [savedChapterIndex, setSavedChapterIndex] = useState<number>(0);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [readChapters, setReadChapters] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const readKey = "tanya-read-chapters";
        const readData = localStorage.getItem(readKey);
        const volId = volume.id;
        const savedMeta = localStorage.getItem(`tanya-progress-meta-${volId}`);
        const savedProgress = localStorage.getItem(`tanya-progress-${volId}`);
        let chapIndex = 0;
        if (savedMeta) {
            try {
                const meta = JSON.parse(savedMeta);
                chapIndex = meta.chapterIndex || 0;
            } catch {}
        } else if (savedProgress) {
            chapIndex = parseInt(savedProgress) || 0;
        }

        setTimeout(() => {
            if (readData) {
                try {
                    setReadChapters(JSON.parse(readData));
                } catch {}
            }
            if (chapIndex > 0) {
                setHasStarted(true);
                setSavedChapterIndex(chapIndex);
            }
        }, 0);
    }, [volume.id]);

    const filteredChapters = volume.chapters
        .map((ch, idx) => ({ title: ch, index: idx }))
        .filter(ch => ch.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => sortOrder === "asc" ? a.index - b.index : b.index - a.index);

    const volIndex = tanyaVolumes.findIndex((v) => v.id === volumeId);
    const prevVolume = volIndex > 0 ? tanyaVolumes[volIndex - 1] : null;
    const nextVolume = volIndex < tanyaVolumes.length - 1 ? tanyaVolumes[volIndex + 1] : null;

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-[#f0e6d6] flex flex-col relative overflow-x-hidden">
            <div className="absolute inset-0 bg-[#0a0a0f]/60 z-0 pointer-events-none" />
            <BackgroundSlideshow images={[volume.coverImage]} imageOpacity={0.6} />

            {/* Header */}
            <header className="sticky top-0 left-0 w-full z-50 p-4 sm:p-6 bg-[#0a0a0f]/80 backdrop-blur-md flex items-center justify-between border-b border-amber-950/25">
                <div className="flex items-center gap-3 min-w-0">
                    <Link href="/tanya-the-evil/select">
                        <Button variant="ghost" size="icon" className="text-amber-300 hover:text-white hover:bg-amber-950/40 rounded-full transition-all cursor-pointer shrink-0">
                            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="text-lg select-none shrink-0">⚔️</span>
                        <h1 className="text-sm sm:text-base md:text-lg font-serif font-extralight tracking-wider text-zinc-100 truncate">
                            {volume.title.replace("Saga of Tanya the Evil, ", "Vol. ")}
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <UserMenu onSignIn={() => setAuthModalOpen(true)} onProfile={() => setProfileModalOpen(true)} />
                </div>
            </header>

            {/* Marquee */}
            <MarqueeText text={`Saga of Tanya the Evil — Volume ${volume.volumeNumber} — ${volume.title}`} />

            <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10 relative">
                {/* Volume Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row gap-6 md:gap-8 mb-10"
                >
                    {/* Cover Image */}
                    <div className="relative shrink-0 w-full md:w-[280px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-amber-950/30 mx-auto md:mx-0">
                        <Image
                            src={volume.coverImage}
                            alt={volume.title}
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 768px) 60vw, 280px"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-between gap-4 flex-1">
                        <div>
                            <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                              Volume {volume.volumeNumber}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1 leading-snug">
                              {volume.title}
                            </h2>
                            <p className="text-sm text-zinc-400 mt-3 leading-relaxed font-light">
                              {volume.synopsis}
                            </p>
                            <div className="flex flex-wrap gap-3 mt-4 text-[10px] font-mono text-zinc-500">
                                <span>JP: {volume.releaseDateJP}</span>
                                <span className="text-zinc-700">|</span>
                                <span>EN: {volume.releaseDateEN}</span>
                            </div>
                        </div>

                        {/* Start / Continue Reading */}
                        <div className="flex flex-col gap-2">
                            <Link href={`/tanya-the-evil/read/${volume.id}/${hasStarted ? savedChapterIndex : 1}`}>
                                <Button className="w-full sm:w-auto rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold px-8 py-3 shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all cursor-pointer border border-amber-400/20">
                                    {hasStarted ? "Continue Reading" : "Start Reading"}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Chapter List Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search chapters..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-zinc-950/60 border border-zinc-800/80 rounded-full text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                    </div>
                    <Button
                        onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
                        variant="outline"
                        size="sm"
                        className="rounded-full border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/60 text-zinc-400 hover:text-white cursor-pointer self-end sm:self-auto"
                    >
                        <ArrowUpDown className="w-3.5 h-3.5 mr-1.5" />
                        {sortOrder === "asc" ? "1 → Last" : "Last → 1"}
                    </Button>
                </div>

                {/* Chapter List */}
                <div className="flex flex-col gap-1">
                    {filteredChapters.map((ch) => {
                        const isRead = readChapters[`${volume.id}-${ch.index + 1}`];
                        const isCurrent = hasStarted && savedChapterIndex === ch.index + 1;
                        return (
                            <motion.div
                                key={ch.index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: ch.index * 0.02, duration: 0.2 }}
                            >
                                <Link
                                    href={`/tanya-the-evil/read/${volume.id}/${ch.index + 1}`}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 group ${
                                        isCurrent
                                            ? "bg-amber-950/30 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.08)]"
                                            : "bg-zinc-950/30 border-zinc-800/50 hover:bg-zinc-950/50 hover:border-amber-500/20"
                                    }`}
                                >
                                    <span className={`text-xs font-mono font-bold shrink-0 w-8 text-right ${
                                        isRead ? "text-amber-500/50" : isCurrent ? "text-amber-400" : "text-zinc-500"
                                    }`}>
                                        {String(ch.index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`text-sm font-serif truncate ${
                                            isRead ? "text-zinc-500" : isCurrent ? "text-amber-200" : "text-zinc-200 group-hover:text-amber-200"
                                        } transition-colors`}>
                                            {ch.title}
                                        </h3>
                                    </div>
                                    {isRead && (
                                        <BookOpen className="w-3.5 h-3.5 text-amber-500/40 shrink-0" />
                                    )}
                                    {isCurrent && !isRead && (
                                        <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-full shrink-0">
                                            CURRENT
                                        </span>
                                    )}
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Volume Navigation */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
                    {prevVolume ? (
                        <Link href={`/tanya-the-evil/select/${prevVolume.id}`} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-amber-400 transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden sm:inline">Vol. {prevVolume.volumeNumber}</span>
                            <span className="sm:hidden">Prev</span>
                        </Link>
                    ) : <div />}
                    {nextVolume ? (
                        <Link href={`/tanya-the-evil/select/${nextVolume.id}`} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-amber-400 transition-colors group">
                            <span className="hidden sm:inline">Vol. {nextVolume.volumeNumber}</span>
                            <span className="sm:hidden">Next</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ) : <div />}
                </div>

                    <SupportAuthorCard
                        novelSlug="tanya-the-evil"
                        volumeId={volumeId}
                        volumeTitle={volume.title}
                    />
            </div>

            <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
            <ProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
        </div>
    );
}
