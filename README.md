# Portfolio Full Stack — Next.js · TypeScript · Tailwind · Framer Motion · GSAP · Three.js

Portfolio moderne, animé et responsive pour développeur Full Stack : Hero cinématographique avec sphère 3D, glassmorphism, particules, curseur personnalisé, timeline GSAP, modales de projets détaillées, formulaire de contact validé, SEO, sitemap et page 404.

## 🚀 Installation

Prérequis : **Node.js 18.17+** (ou 20+) et npm.

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

Ouvrez ensuite <http://localhost:3000>.

```bash
# Vérifier le build de production
npm run build
npm run start
```

## ✏️ Personnalisation (1 seul fichier)

**Tout le contenu du site** se modifie dans :

```
src/data/portfolio.ts
```

Vous y trouverez : nom, titre, présentation, statistiques, compétences, projets (avec tous les détails des modales), méthode de travail, services, coordonnées, réseaux sociaux, lien du CV et réglages SEO.

### Fichiers médias à remplacer (dans `/public`)

| Fichier | Rôle |
|---|---|
| `cv.pdf` | votre CV (bouton « Télécharger le CV ») |
| `images/profile.jpg` | votre photo |
| `images/projet-*.jpg` | captures d'écran des projets |
| `images/hero-poster.jpg` | image de secours de la vidéo du Hero |
| `images/og-image.jpg` | image de partage (Open Graph, 1200×630) |
| `videos/hero-bg.webm` + `hero-bg.mp4` | vidéo d'arrière-plan du Hero (facultative) |
| `videos/demo-*.mp4` | vidéos de démonstration des projets (facultatives) |

Des images de remplacement sont déjà générées : le site fonctionne immédiatement, même sans vos médias. Si la vidéo du Hero est absente ou échoue, l'image `hero-poster.jpg` et les dégradés prennent automatiquement le relais.

> 💡 Compressez vos vidéos (WebM + MP4, < 3 Mo idéalement, sans audio) avec HandBrake ou `ffmpeg -i in.mp4 -an -vf scale=1280:-2 -crf 30 out.webm`.

### Formulaire de contact

Par défaut, l'envoi ouvre le client e-mail du visiteur (`mailto:` — aucun serveur requis). Pour un envoi réel, branchez [Formspree](https://formspree.io), EmailJS ou une route API Next.js dans `src/components/sections/Contact.tsx` (la zone est commentée).

## 📁 Arborescence

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── cv.pdf                  ← à ajouter
│   ├── images/                 ← captures, photo, posters
│   └── videos/                 ← vidéos (facultatives)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # polices, SEO, Open Graph
│   │   ├── page.tsx            # assemblage des sections
│   │   ├── globals.css         # glassmorphism, grille, reduced-motion
│   │   ├── not-found.tsx       # page 404 personnalisée
│   │   ├── sitemap.ts          # sitemap.xml
│   │   └── robots.ts           # robots.txt
│   ├── data/
│   │   └── portfolio.ts        # ⭐ TOUT LE CONTENU MODIFIABLE
│   ├── components/
│   │   ├── layout/   Navbar · Footer · Preloader · ScrollProgress · CustomCursor
│   │   ├── sections/ Hero · About · Skills · Projects · ProjectModal · Process · Services · Contact
│   │   ├── three/    HeroScene (sphère numérique React Three Fiber)
│   │   ├── ui/       SectionHeading · MagneticButton · AnimatedCounter · TypeWriter
│   │   └── effects/  MouseGlow · ParticlesBackground
│   ├── hooks/        useActiveSection · usePrefersReducedMotion
│   └── lib/          utils.ts
├── tailwind.config.ts          # palette bleu nuit / électrique / violet / cyan
└── package.json
```

## ♿ Accessibilité & performances

- La préférence système **« réduction des animations »** est respectée partout (Framer Motion, GSAP, particules, curseur, 3D).
- La **scène 3D** ne se charge que sur desktop avec un matériel suffisant ; sinon, une forme animée légère la remplace.
- Vidéos en `preload="none"`, images via `next/image` (lazy + responsive), navigation au clavier, labels ARIA.

## ☁️ Déploiement sur Vercel

### Méthode 1 — via GitHub (recommandée)

```bash
git init
git add .
git commit -m "Portfolio initial"
git branch -M main
git remote add origin https://github.com/votre-compte/portfolio.git
git push -u origin main
```

1. Créez un compte sur <https://vercel.com> (connexion GitHub).
2. **Add New → Project** → importez le dépôt `portfolio`.
3. Vercel détecte Next.js automatiquement → cliquez **Deploy**.
4. Chaque `git push` redéploie le site automatiquement.

### Méthode 2 — via la CLI

```bash
npm i -g vercel
vercel        # premier déploiement (préproduction)
vercel --prod # mise en production
```

### Après le déploiement

Mettez à jour `seo.siteUrl` dans `src/data/portfolio.ts` avec votre URL Vercel (ou votre domaine personnalisé ajouté dans **Settings → Domains**) pour que le sitemap et l'Open Graph soient corrects.

## 🛠️ Scripts

| Commande | Action |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run build` | build de production |
| `npm run start` | lancer le build |
| `npm run lint` | vérification du code |
