import Link from "next/link";
import { MoveLeft } from "lucide-react";

/* Page 404 personnalisée */
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 tech-grid">
      <p className="font-mono text-neon text-sm mb-4">ERREUR 404</p>
      <h1 className="font-display text-7xl sm:text-9xl font-bold text-gradient">404</h1>
      <p className="mt-6 text-slate-400 max-w-md">
        Cette page n&apos;existe pas ou a été déplacée. Revenez à l&apos;accueil
        pour continuer la visite.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 bg-electric/10 border border-electric/40 text-electric hover:bg-electric/20 hover:shadow-glow transition-all"
      >
        <MoveLeft size={18} /> Retour à l&apos;accueil
      </Link>
    </main>
  );
}
