"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Target,
  Lightbulb,
  ListChecks,
  AlertTriangle,
  Wrench,
  TrendingUp,
  Network,
  GraduationCap,
  ShieldAlert,
  Users,
  UserCog,
} from "lucide-react";
import type { Project } from "@/data/portfolio";

/** Bloc titré réutilisable dans la modale. */
function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass p-6">
      <h4 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-white">
        <Icon size={18} className="text-neon" /> {title}
      </h4>
      {children}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-slate-400">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // Fermer avec Échap + bloquer le scroll de fond
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-night-950/80 backdrop-blur-md sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Détails du projet ${project.title}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border-electric/20 sm:rounded-3xl"
          >
            {/* En-tête */}
            <div className="relative aspect-[21/9] overflow-hidden rounded-t-3xl bg-night-800">
              <Image
                src={project.image}
                alt={`Capture d'écran — ${project.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-transparent" />
              <button
                onClick={onClose}
                aria-label="Fermer la fenêtre"
                className="glass absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-white transition-colors hover:border-electric/50"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-5 left-6 right-6">
                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-neon">{project.subtitle}</p>
              </div>
            </div>

            <div className="space-y-5 p-6 sm:p-8">
              {project.disclaimer && (
                <p className="flex items-start gap-2 rounded-xl border border-amber-400/30 bg-amber-400/[0.06] p-4 text-sm text-amber-200">
                  <ShieldAlert size={18} className="mt-0.5 shrink-0" />
                  {project.disclaimer}
                </p>
              )}

              {/* Vidéo de démonstration */}
              {project.video && (
                <video
                  controls
                  muted
                  playsInline
                  preload="none"
                  poster={project.image}
                  className="w-full rounded-2xl border border-white/10"
                >
                  <source src={project.video} type="video/mp4" />
                  Votre navigateur ne peut pas lire cette vidéo.
                </video>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <Block icon={Target} title="Le problème de départ">
                  <p className="text-sm text-slate-400">{project.details.problem}</p>
                </Block>
                <Block icon={Lightbulb} title="La solution proposée">
                  <p className="text-sm text-slate-400">{project.details.solution}</p>
                </Block>
              </div>

              <Block icon={ListChecks} title="Objectifs">
                <List items={project.details.goals} />
              </Block>

              <div className="grid gap-5 sm:grid-cols-2">
                <Block
                  icon={UserCog}
                  title={
                    project.clientFeatures
                      ? "Fonctionnalités administrateur"
                      : "Fonctionnalités"
                  }
                >
                  <List items={project.adminFeatures} />
                </Block>
                {project.clientFeatures && (
                  <Block icon={Users} title="Fonctionnalités client">
                    <List items={project.clientFeatures} />
                  </Block>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Block icon={AlertTriangle} title="Difficultés rencontrées">
                  <List items={project.details.challenges} />
                </Block>
                <Block icon={Wrench} title="Solutions techniques">
                  <List items={project.details.technicalSolutions} />
                </Block>
              </div>

              <Block icon={TrendingUp} title="Résultats obtenus">
                <List items={project.details.results} />
              </Block>

              {/* Schéma simple d'architecture */}
              <Block icon={Network} title="Architecture">
                <p className="mb-4 text-sm text-slate-400">
                  {project.details.architecture}
                </p>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  {["Front-end React", "API REST", "Base de données"].map(
                    (node, i, arr) => (
                      <span key={node} className="flex items-center gap-2">
                        <span className="rounded-lg border border-electric/40 bg-electric/[0.08] px-3 py-2 text-electric">
                          {node}
                        </span>
                        {i < arr.length - 1 && (
                          <span className="text-pulse">⇄</span>
                        )}
                      </span>
                    )
                  )}
                </div>
              </Block>

              <Block icon={GraduationCap} title="Ce que j'ai appris">
                <p className="text-sm text-slate-400">{project.details.learned}</p>
              </Block>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
