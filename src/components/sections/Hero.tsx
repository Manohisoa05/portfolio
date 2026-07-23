"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import TypeWriter from "@/components/ui/TypeWriter";
import MagneticButton from "@/components/ui/MagneticButton";
import { scrollToSection } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// La scène 3D est chargée uniquement côté client, sans bloquer le rendu
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Révèle un texte lettre par lettre, SANS couper les mots :
 * chaque mot est un bloc insécable (whitespace-nowrap), donc les
 * retours à la ligne ne se font qu'entre les mots.
 * Un "\n" dans le texte force un retour à la ligne à cet endroit précis
 * (utile pour éviter qu'un nom long ne force la colonne photo à rétrécir).
 */
function RevealText({ text, delay = 0 }: { text: string; delay?: number }) {
  const lines = text.split("\n");
  let letterIndex = 0;

  return (
    <span aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word, wi) => {
            const start = letterIndex;
            letterIndex += word.length;
            return (
              // Fragment : l'espace doit rester HORS du inline-block du mot,
              // sinon un espace final dans une boîte inline-block à largeur
              // automatique est supprimé par le navigateur (fin de ligne interne).
              <span key={wi} className="inline whitespace-nowrap">
                <span className="inline-block" aria-hidden>
                  {word.split("").map((char, ci) => (
                    <motion.span
                      key={ci}
                      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        delay: delay + (start + ci) * 0.03,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                {/* Espace normal entre les mots : autorise le retour à la ligne */}
                {wi < line.split(" ").length - 1 && " "}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

// Force le dernier mot du nom sur sa propre ligne (voir RevealText).
const nameParts = profile.name.split(" ");
const nameWithLineBreak =
  nameParts.length > 1
    ? `${nameParts.slice(0, -1).join(" ")}\n${nameParts[nameParts.length - 1]}`
    : profile.name;

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const [videoOk, setVideoOk] = useState(true);
  const [show3D, setShow3D] = useState(false);

  // Charge la 3D après le préchargement, et seulement sur des écrans capables
  useEffect(() => {
    const t = setTimeout(() => {
      const capable =
        window.innerWidth >= 1024 &&
        !reduced &&
        (navigator.hardwareConcurrency ?? 4) >= 4;
      setShow3D(capable);
    }, 2000);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* --- Arrière-plan vidéo (optionnel) avec image de secours --- */}
      <div className="absolute inset-0 -z-10">
        {videoOk && !reduced && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/images/hero-poster.jpg"
            onError={() => setVideoOk(false)}
            className="h-full w-full object-cover opacity-[0.16]"
          >
            {/* Placez vos vidéos dans /public/videos/ */}
            <source src="/videos/hero-bg.webm" type="video/webm" />
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        )}
        {/* Dégradés + grille technologique par-dessus la vidéo */}
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/60 via-night-950/40 to-night-950" />
        <div className="absolute inset-0 tech-grid" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pt-28 pb-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pt-24">
        {/* --- Colonne texte --- */}
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/[0.06] px-4 py-1.5 font-mono text-xs text-neon"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" />
            Disponible pour un stage de fin d&apos;études
          </motion.p>

          <h1 className="font-display font-bold leading-tight text-white">
            <span className="block text-2xl text-slate-300 sm:text-3xl lg:text-4xl">
              <RevealText text="Bonjour, je suis" delay={2.3} />
            </span>
            {/* Taille adaptée aux noms longs + retours à la ligne propres.
                Le dernier mot du nom passe sur sa propre ligne pour éviter
                qu'un nom long ne force la colonne photo à rétrécir. */}
            <span className="text-gradient mt-2 block text-balance text-[clamp(1.7rem,6vw,3.6rem)] leading-[1.15]">
              <RevealText text={nameWithLineBreak} delay={2.8} />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.4, duration: 0.6 }}
            className="mt-5 min-h-8 font-mono text-lg text-slate-300 sm:text-xl"
          >
            <TypeWriter phrases={profile.rotatingTitles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 0.6 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.9, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              onClick={() => scrollToSection("projets")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-pulse px-7 py-3.5 font-medium text-white shadow-glow transition-all hover:shadow-glow-lg"
            >
              Voir mes projets
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollToSection("contact")}
              className="glass glass-hover inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium text-slate-200"
            >
              <Mail size={18} className="text-neon" />
              Me contacter
            </MagneticButton>
          </motion.div>
        </div>

        {/* --- Colonne photo + 3D (photo visible sur TOUS les écrans) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 mx-auto flex aspect-square w-56 items-center justify-center sm:w-72 lg:order-2 lg:w-full lg:max-w-[460px]"
        >
          {/* Sphère 3D en arrière-plan (desktop uniquement) */}
          {show3D && <HeroScene />}

          {/* Halo lumineux derrière la photo */}
          <div className="absolute inset-[12%] animate-float-slow rounded-full bg-glow-conic opacity-25 blur-3xl" />

          {/* Photo de profil avec anneau dégradé lumineux */}
          <motion.div
            animate={reduced ? {} : { y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 h-[72%] w-[72%] rounded-full bg-gradient-to-br from-electric via-pulse to-neon p-[3px] shadow-glow-lg"
          >
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-night-950">
              <Image
                src={profile.photo}
                alt={`Photo de ${profile.name}`}
                fill
                priority
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 340px"
                className="object-cover"
              />
            </div>
            {/* Anneau en pointillés qui tourne lentement */}
            <div className="absolute -inset-4 animate-spin-slow rounded-full border border-dashed border-electric/40" />
          </motion.div>
        </motion.div>
      </div>

      {/* --- Indicateur de défilement --- */}
      <motion.button
        onClick={() => scrollToSection("a-propos")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.4 }}
        aria-label="Faire défiler vers la section suivante"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 transition-colors hover:text-neon"
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="font-mono text-[10px] tracking-[0.3em]">DÉFILER</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
