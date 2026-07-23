"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn, scrollToSection } from "@/lib/utils";

const sectionIds = navLinks.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  // Change l'apparence de la barre après un léger défilement
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-night-950/70 backdrop-blur-xl border-b border-white/[0.06] py-3 shadow-card"
          : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <button
          onClick={() => go("accueil")}
          className="font-display text-lg font-bold tracking-tight"
          aria-label="Retour à l'accueil"
        >
          <span className="text-gradient">{"<"}</span>
          {profile.name.split(" ")[1]}
          <span className="text-gradient">{" />"}</span>
        </button>

        {/* Liens desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors hover:text-white",
                  active === link.id ? "text-white" : "text-slate-400"
                )}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] border border-electric/30"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* CV + burger */}
        <div className="flex items-center gap-3">
          <a
            href={profile.cvUrl}
            download
            className="group hidden items-center gap-2 rounded-full border border-electric/40 bg-electric/10 px-5 py-2 text-sm font-medium text-electric transition-all hover:bg-electric/20 hover:shadow-glow sm:inline-flex"
          >
            <Download size={16} className="transition-transform group-hover:-translate-y-0.5" />
            Télécharger le CV
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="glass flex h-10 w-10 items-center justify-center rounded-xl lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile animé */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-white/[0.06] bg-night-950/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className={cn(
                      "w-full rounded-xl px-4 py-3 text-left text-base transition-colors",
                      active === link.id
                        ? "bg-white/[0.07] text-white border border-electric/30"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                    )}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <li className="pt-2">
                <a
                  href={profile.cvUrl}
                  download
                  className="flex items-center justify-center gap-2 rounded-xl border border-electric/40 bg-electric/10 px-4 py-3 text-sm font-medium text-electric"
                >
                  <Download size={16} /> Télécharger le CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
