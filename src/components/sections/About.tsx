"use client";

import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";
import { profile, formation } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="a-propos" className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="À propos"
          title="Un développeur, une mission"
          description="Transformer un besoin concret en une solution simple, rapide et efficace."
        />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Texte de présentation */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass glow-border relative p-8 sm:p-10"
          >
            <Sparkles className="mb-5 text-neon" size={28} />
            <p className="text-lg leading-relaxed text-slate-200">
              {profile.about.intro}
            </p>
            <p className="mt-4 leading-relaxed text-slate-400">
              {profile.about.body}
            </p>
            <p className="mt-6 font-mono text-sm text-electric">
              📍 {profile.location}
            </p>
          </motion.div>

          {/* Formation */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {formation.map((f, i) => (
              <motion.div
                key={f.degree}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass glass-hover flex items-start gap-4 p-6 sm:p-8"
              >
                <span className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-neon">
                  <GraduationCap size={20} />
                </span>
                <div>
                  <p className="font-display text-base font-semibold text-white sm:text-lg">
                    {f.degree}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{f.place}</p>
                  <p className="mt-1 font-mono text-xs text-electric">{f.period}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
