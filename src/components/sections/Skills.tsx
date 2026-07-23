"use client";

import { motion } from "framer-motion";
import { Code2, Server, Database, Plug, Wrench, type LucideIcon } from "lucide-react";
import { skillCategories, type SkillLevel } from "@/data/portfolio";
import { skillIcons } from "@/data/skillIcons";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  api: Plug,
  tools: Wrench,
};

const accentText = {
  electric: "text-electric",
  pulse: "text-pulse",
  neon: "text-neon",
};

// Largeur de la barre de niveau selon la maîtrise (sans pourcentage affiché)
const levelWidth: Record<SkillLevel, string> = {
  "Avancé": "w-[92%]",
  "Bonne maîtrise": "w-[78%]",
  "Intermédiaire": "w-[60%]",
  "En perfectionnement": "w-[42%]",
};

export default function Skills() {
  return (
    <section id="competences" className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Compétences"
          title="Ma boîte à outils technique"
          description="Du front-end au back-end, en passant par les bases de données et les intégrations d'API."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = icons[cat.id] ?? Code2;
            return (
              <motion.article
                key={cat.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
                className="glass glow-border glass-hover p-7"
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className={cn("glass flex h-11 w-11 items-center justify-center rounded-xl", accentText[cat.accent])}>
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {cat.title}
                  </h3>
                </div>

                <ul className="divide-y divide-white/[0.06]">
                  {cat.skills.map((skill, j) => {
                    const logo = skillIcons[skill.name];
                    const Logo = logo?.Icon ?? Icon;
                    return (
                      <li key={skill.name} className="group py-3 first:pt-0 last:pb-0">
                        <div className="mb-2 flex items-center gap-3">
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:ring-white/20"
                            style={{ color: logo?.color ?? "currentColor" }}
                          >
                            <Logo size={16} />
                          </span>
                          <div className="flex flex-1 items-center justify-between text-sm">
                            <span className="text-slate-300">{skill.name}</span>
                            <span className={cn("font-mono text-[11px]", accentText[cat.accent])}>
                              {skill.level}
                            </span>
                          </div>
                        </div>
                        <div className="h-[5px] overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.15 + j * 0.06, ease: [0.22, 1, 0.36, 1] }}
                            className={cn(
                              "h-full origin-left rounded-full bg-gradient-to-r",
                              levelWidth[skill.level],
                              cat.accent === "electric" && "from-electric to-pulse",
                              cat.accent === "pulse" && "from-pulse to-neon",
                              cat.accent === "neon" && "from-neon to-electric"
                            )}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
