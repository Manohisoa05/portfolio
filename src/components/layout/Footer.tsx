"use client";

import { Github, Mail, MessageCircle, ArrowUp } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-night-900/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:justify-between sm:px-8">
        <p className="text-sm text-slate-500">
          © {year} {profile.name} — Développeur Full Stack. Tous droits réservés.
        </p>

        <div className="flex items-center gap-3">
          {[
            { href: profile.socials.github, icon: Github, label: "GitHub" },
            { href: profile.socials.email, icon: Mail, label: "E-mail" },
            { href: profile.socials.whatsapp, icon: MessageCircle, label: "WhatsApp" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="glass glass-hover flex h-10 w-10 items-center justify-center rounded-xl text-slate-300"
            >
              <Icon size={18} />
            </a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Revenir en haut"
            className="ml-2 flex h-10 w-10 items-center justify-center rounded-xl border border-electric/40 bg-electric/10 text-electric transition-all hover:bg-electric/20 hover:shadow-glow"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
