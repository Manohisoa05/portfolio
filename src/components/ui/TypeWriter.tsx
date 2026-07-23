"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Props {
  phrases: string[];
  className?: string;
}

/** Texte animé qui s'écrit puis s'efface, phrase après phrase. */
export default function TypeWriter({ phrases, className }: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setText(phrases[0]);
      return;
    }
    const current = phrases[index % phrases.length];
    const speed = deleting ? 35 : 70;

    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1600);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIndex((i) => (i + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, reduced]);

  return (
    <span className={className}>
      {text}
      <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-neon" />
    </span>
  );
}
