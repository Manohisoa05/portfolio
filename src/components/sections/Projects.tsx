"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Info, ShieldAlert } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectModal from "@/components/sections/ProjectModal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Carte projet avec effet 3D au survol + aperçu vidéo. */
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const reduced = usePrefersReducedMotion();

  // Inclinaison 3D suivant la position de la souris
  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    videoRef.current?.pause();
  };

  const onEnter = () => {
    if (!reduced) videoRef.current?.play().catch(() => setVideoFailed(true));
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={onEnter}
        className="glass glow-border group flex h-full flex-col overflow-hidden transition-transform duration-200 will-change-transform"
      >
        {/* Média : image + vidéo de démonstration au survol */}
        <div className="relative aspect-video overflow-hidden bg-night-800">
          <Image
            src={project.image}
            alt={`Aperçu du projet ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
          />
          {project.video && !videoFailed && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              onError={() => setVideoFailed(true)}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            >
              <source src={project.video} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-transparent to-transparent" />
          {project.disclaimer && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-night-950/80 px-3 py-1 text-[11px] text-amber-300 backdrop-blur">
              <ShieldAlert size={12} /> Projet de démonstration
            </span>
          )}
        </div>

        {/* Contenu */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-semibold text-white">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-neon">{project.subtitle}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-slate-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="rounded-full border border-electric/30 px-3 py-1 text-[11px] text-electric">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          {/* Boutons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-electric to-pulse px-4 py-2 text-xs font-medium text-white transition-shadow hover:shadow-glow"
            >
              <Github size={14} /> Voir sur GitHub
            </a>
            <button
              onClick={() => onOpen(project)}
              className="inline-flex items-center gap-1.5 rounded-full border border-neon/40 px-4 py-2 text-xs text-neon transition-colors hover:bg-neon/10"
            >
              <Info size={14} /> Voir les détails
            </button>
          </div>
          <p className="mt-3 text-[11px] italic text-slate-500">
            Captures d&apos;écran à titre d&apos;illustration.
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projets" className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projets"
          title="Des applications concrètes"
          description="Une sélection de projets Full Stack : gestion, banque en ligne et intégration d'API métier."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setSelected}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
