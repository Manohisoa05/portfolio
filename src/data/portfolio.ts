/**
 * ============================================================
 *  FICHIER DE DONNÉES CENTRAL
 *  Modifiez UNIQUEMENT ce fichier pour personnaliser le site :
 *  nom, textes, compétences, projets, liens, images, vidéos…
 * ============================================================
 */

import {
  Globe,
  LayoutDashboard,
  Database,
  Plug,
  Wrench,
  Code2,
  Server,
  RefreshCcw,
  type LucideIcon,
} from "lucide-react";

/* ---------- Identité ---------- */
export const profile = {
  name: "RAMIARINARIVO Manohisoa Faniriana", // ← votre nom complet
  title: "Étudiant en Informatique — Développeur Full Stack",
  tagline:
    "Étudiant en Informatique à l'IT University , à la recherche d'un stage de fin d'études, je transforme des idées en applications web concrètes.",
  // Phrases affichées par le texte animé du Hero
  rotatingTitles: [
    "Étudiant en Informatique",
    "Développeur Full Stack",
    "Créateur d'applications web",
    "Développeur React, PHP et Java",
  ],
  about: {
    intro:
      "Étudiant en Informatique à l'IT University (Antananarivo), passionné par le développement logiciel et les nouvelles technologies, je recherche un stage de fin d'études pour mettre en pratique mes connaissances en développement Full Stack.",
    body: "Au cours de ma formation, j'ai développé des compétences aussi bien sur la partie visible par l'utilisateur que sur la logique serveur, la base de données et l'intégration avec des services externes. Je recherche un environnement professionnel dynamique à Antananarivo pour continuer à apprendre et contribuer à des projets concrets.",
  },
  location: "Antananarivo, Madagascar", // ← votre localisation
  email: "mramiarinarivo@gmail.com",
  phone: "+261 38 29 241 12",
  cvUrl: "/cv.pdf", // placez votre CV dans /public/cv.pdf
  photo: "/images/pdp.jpeg", // placez votre photo dans /public/images/
  socials: {
    github: "https://github.com/Manohisoa05",
    whatsapp: "https://wa.me/261382924112",
    email: "mailto:mramiarinarivo@gmail.com",
  },
};

/* ---------- Formation ---------- */
export const formation = [
  {
    degree: "Licence en Informatique (en cours)",
    place: "IT University, Andoharanofotsy, Antananarivo",
    period: "2023 – 2026",
  },
  {
    degree: "Baccalauréat — Série D, Mention Bien",
    place: "Saint Michel Amparibe, Antananarivo",
    period: "2023",
  },
];

/* ---------- Compétences ---------- */
export type SkillLevel =
  | "Avancé"
  | "Bonne maîtrise"
  | "Intermédiaire"
  | "En perfectionnement";

export interface SkillCategory {
  id: string;
  title: string;
  accent: "electric" | "pulse" | "neon";
  skills: { name: string; level: SkillLevel }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Front-end",
    accent: "electric",
    skills: [
      { name: "JavaScript", level: "Bonne maîtrise" },
      { name: "React", level: "Avancé" },
      { name: "HTML5 / CSS3", level: "Bonne maîtrise" },
      { name: "Bootstrap", level: "Bonne maîtrise" },
    ],
  },
  {
    id: "backend",
    title: "Back-end",
    accent: "pulse",
    skills: [
      { name: "PHP", level: "Bonne maîtrise" },
      { name: "Java", level: "Bonne maîtrise" },
      { name: "Spring Boot", level: "Intermédiaire" },
      { name: "Micro-frameworks PHP (Flight)", level: "Intermédiaire" },
      { name: "API REST", level: "Bonne maîtrise" },
    ],
  },
  {
    id: "database",
    title: "Bases de données",
    accent: "neon",
    skills: [
      { name: "MySQL", level: "Avancé" },
      { name: "PostgreSQL", level: "Intermédiaire" },
    ],
  },
  {
    id: "tools",
    title: "Outils",
    accent: "pulse",
    skills: [
      { name: "Git / GitHub", level: "Bonne maîtrise" },
      { name: "VS Code", level: "Bonne maîtrise" },
      { name: "Maven", level: "Intermédiaire" },
      { name: "Postman", level: "Intermédiaire" },
    ],
  },
];

/* ---------- Projets ---------- */
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  disclaimer?: string;
  image: string; // capture d'écran principale (dans /public/images/)
  video?: string; // vidéo de démonstration (dans /public/videos/)
  gallery: string[];
  technologies: string[];
  codeUrl: string;
  adminFeatures: string[];
  clientFeatures?: string[];
  details: {
    problem: string;
    solution: string;
    goals: string[];
    challenges: string[];
    technicalSolutions: string[];
    results: string[];
    architecture: string; // description du schéma d'architecture
    learned: string;
  };
}

export const projects: Project[] = [
  {
    id: "bibliotheque",
    title: "Gestion de bibliothèque en ligne",
    subtitle: "Plateforme complète — espace administrateur & espace client",
    description:
      "Application web permettant de gérer une bibliothèque complète : catalogue, emprunts, retours, pénalités, utilisateurs et statistiques, avec un espace administrateur et un espace client.",
    image: "/images/projet-bibliotheque.png",
    video: "/videos/demo-bibliotheque.mp4",
    gallery: [
      "/images/projet-bibliotheque.png",
      "/images/projet-bibliotheque-2.png",
    ],
    technologies: ["Java", "Spring Boot", "Maven", "HTML", "CSS", "MySQL", "API REST"],
    codeUrl: "https://github.com/Manohisoa05/Biblioth-que",
    adminFeatures: [
      "Ajout, modification et suppression des livres",
      "Gestion des catégories et des auteurs",
      "Gestion des utilisateurs, rôles et autorisations",
      "Gestion des emprunts, retours et pénalités",
      "Tableau de bord avec statistiques",
      "Suivi des livres disponibles et empruntés",
      "Recherche et filtrage avancés",
    ],
    clientFeatures: [
      "Création de compte et connexion sécurisée",
      "Consultation et recherche dans le catalogue",
      "Filtrage par catégorie ou auteur",
      "Réservation d'un livre en ligne",
      "Suivi des emprunts et historique personnel",
      "Notifications et gestion du profil",
    ],
    details: {
      problem:
        "La gestion manuelle d'une bibliothèque (registres papier, suivi des retards à la main) entraîne des erreurs, des pertes de temps et une mauvaise visibilité sur le stock de livres.",
      solution:
        "Une application web centralisée avec deux espaces distincts : un back-office complet pour les bibliothécaires et un portail simple pour les lecteurs, reliés par une API REST sécurisée.",
      goals: [
        "Digitaliser l'ensemble du cycle emprunt / retour / pénalité",
        "Offrir aux lecteurs un catalogue consultable 24h/24",
        "Donner aux administrateurs une vision statistique en temps réel",
      ],
      challenges: [
        "Gérer les conflits de réservation sur un même exemplaire",
        "Calculer automatiquement les pénalités de retard",
        "Séparer proprement les autorisations administrateur / client",
      ],
      technicalSolutions: [
        "Verrouillage des réservations côté base de données (transactions SQL)",
        "Tâche planifiée de calcul des pénalités et notifications",
        "Middleware de vérification des rôles sur chaque route de l'API",
      ],
      results: [
        "Suivi des emprunts fiable et sans double réservation",
        "Temps de traitement d'un emprunt réduit à quelques secondes",
        "Tableau de bord clair pour piloter la bibliothèque",
      ],
      architecture:
        "Pages HTML/CSS → API REST Spring Boot (Java, projet géré avec Maven) → Base MySQL. Authentification par session/token, rôles vérifiés côté serveur, notifications générées par le back-end.",
      learned:
        "Ce projet m'a appris à concevoir un vrai système de rôles avec Spring Boot, à modéliser des relations complexes (livres, exemplaires, emprunts, pénalités) et à structurer une API propre et documentée.",
    },
  },
  {
    id: "banque",
    title: "Bankintsika",
    subtitle: "Back-office de gestion de prêts pour un établissement financier",
    description:
      "Application de gestion de prêts pour un établissement financier : fonds disponibles, types de prêts, clients emprunteurs, simulation et validation de prêts, remboursements et statistiques d'intérêts.",
    disclaimer:
      "Projet académique réalisé en groupe (3 étudiants) : outil de gestion interne pour un établissement financier fictif, à usage unique (pas d'espace client séparé ni d'authentification), sans données réelles.",
    image: "/images/projet-banque.png",
    video: "/videos/demo-banque.mp4",
    gallery: ["/images/projet-banque.png", "/images/projet-banque-2.png"],
    technologies: ["PHP", "Flight (micro-framework)", "HTML", "JavaScript", "Bootstrap 5", "MySQL", "Chart.js"],
    codeUrl: "https://github.com/Manohisoa05/Bankintsika",
    adminFeatures: [
      "Gestion des fonds de l'établissement (ajout, historique, solde disponible)",
      "Configuration des types de prêts (taux, taux d'assurance, durée maximale)",
      "Gestion des clients emprunteurs (ajout, modification, suppression)",
      "Simulation de prêt avec calcul automatique de la mensualité",
      "Comparateur de simulations (comparaison côte à côte de deux simulations)",
      "Validation d'une simulation en prêt réel",
      "Suivi des remboursements mensuels par client",
      "Génération d'une fiche de prêt en PDF",
      "Statistiques des intérêts gagnés par mois, avec graphique",
    ],
    details: {
      problem:
        "Un établissement de microfinance qui suit ses prêts manuellement (fonds disponibles, mensualités, remboursements) risque des erreurs de calcul et perd la visibilité sur les intérêts réellement générés.",
      solution:
        "Un back-office unique qui centralise la gestion des fonds, des types de prêts, des clients, des simulations et des remboursements, avec calcul automatique des mensualités et des intérêts.",
      goals: [
        "Empêcher qu'un prêt ou un remboursement dépasse les montants autorisés",
        "Fiabiliser le calcul des mensualités (formule d'amortissement)",
        "Donner une vision claire des intérêts générés par période",
      ],
      challenges: [
        "Calculer une mensualité correcte à partir du montant, du taux et de la durée",
        "Empêcher qu'un nouveau prêt dépasse les fonds disponibles de l'établissement",
        "Permettre de comparer deux simulations de prêt avant validation",
      ],
      technicalSolutions: [
        "Formule d'amortissement (mensualité constante) calculée côté serveur PHP",
        "Vérification du solde disponible avant tout ajout de prêt (fonds − prêts validés)",
        "Endpoints PHP dédiés à la simulation, la comparaison et la validation d'un prêt",
      ],
      results: [
        "Calcul de mensualité fiable et cohérent sur toutes les pages",
        "Impossible d'ajouter un prêt ou un remboursement qui dépasse le montant autorisé",
        "Suivi clair des intérêts gagnés par mois, avec graphique",
      ],
      architecture:
        "Pages HTML/JavaScript (Bootstrap) → API PHP (micro-framework Flight, dossier ws/) → Base MySQL. Un script PHP indépendant gère la simulation, l'enregistrement et la validation des prêts.",
      learned:
        "Ce projet m'a appris à structurer une API PHP avec un micro-framework, à implémenter une formule financière (amortissement) et à garder les données cohérentes (fonds, prêts, remboursements) sans jamais dépasser les montants autorisés.",
    },
  },
  {
    id: "dolibarr",
    title: "New App connectée à Dolibarr",
    subtitle: "Application métier RH & salaires synchronisée par API",
    description:
      "Nouvelle application métier connectée à Dolibarr par API : gestion des employés et des salaires, génération mensuelle automatique, paiements fractionnés et synchronisation bidirectionnelle des données.",
    image: "/images/projet-dolibarr.png",
    video: "/videos/demo-dolibarr.mp4",
    gallery: ["/images/projet-dolibarr.png", "/images/projet-dolibarr-2.png"],
    technologies: ["React", "JavaScript", "PHP / Node.js", "API REST", "Dolibarr", "MySQL", "Import CSV", "Authentification"],
    codeUrl: "https://github.com/Manohisoa05/NewappDolibar",
    adminFeatures: [
      "Récupération et envoi de données vers Dolibarr",
      "Synchronisation bidirectionnelle des deux applications",
      "Gestion des employés et des salaires",
      "Génération mensuelle des salaires (jours fériés et week-ends pris en compte)",
      "Paiement en plusieurs fois et calcul automatique du reste à payer",
      "Priorisation des paiements",
      "Importation de fichiers CSV et d'images",
      "Tableau de bord avec statistiques",
      "Gestion des erreurs de connexion et sécurisation des routes API",
    ],
    details: {
      problem:
        "Dolibarr est souvent utilisé comme ERP de gestion, mais ses fonctions standard ne permettent pas de gérer une paie sur mesure (paiements fractionnés, priorisation, jours fériés).",
      solution:
        "Une application indépendante avec sa propre interface moderne, connectée à Dolibarr via son API REST : les données de référence restent dans Dolibarr, la logique de paie vit dans la nouvelle application, et tout se synchronise automatiquement.",
      goals: [
        "Ne jamais dupliquer manuellement les données entre les deux systèmes",
        "Automatiser la génération mensuelle des salaires",
        "Suivre précisément le reste à payer de chaque employé",
      ],
      challenges: [
        "Fiabiliser les échanges avec l'API Dolibarr (pannes, délais, formats)",
        "Calculer les salaires en tenant compte des jours fériés et week-ends",
        "Gérer les paiements partiels et leur ordre de priorité",
      ],
      technicalSolutions: [
        "Couche d'abstraction API avec nouvelles tentatives et journal des erreurs",
        "Calendrier des jours fériés paramétrable + moteur de calcul dédié",
        "Modèle de données « salaire → échéances → paiements » avec solde calculé",
      ],
      results: [
        "Synchronisation fiable, sans ressaisie manuelle",
        "Génération des salaires du mois en un clic",
        "Visibilité immédiate du reste à payer et des priorités",
      ],
      architecture:
        "Front-end React → API interne (PHP/Node.js) → MySQL, avec un connecteur dédié qui dialogue avec l'API REST de Dolibarr (lecture/écriture + synchronisation planifiée).",
      learned:
        "J'ai appris à intégrer proprement un ERP existant, à concevoir une synchronisation robuste entre deux systèmes et à traduire des règles métier complexes (paie, priorités, échéances) en code fiable.",
    },
  },
];

/* ---------- Services ---------- */
export const services: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Globe, title: "Sites & applications web", text: "Création de sites vitrines et développement d'applications web complètes, du cahier des charges à la mise en ligne." },
  { icon: LayoutDashboard, title: "Tableaux de bord & systèmes de gestion", text: "Back-offices, dashboards et systèmes de gestion sur mesure pour piloter votre activité." },
  { icon: Server, title: "API REST", text: "Conception d'API REST sécurisées, documentées et prêtes à connecter vos applications." },
  { icon: Plug, title: "Intégration Dolibarr & connexions", text: "Connexion entre plusieurs applications et intégration avec Dolibarr : synchronisation fiable de vos données." },
  { icon: Code2, title: "Front-end React / Back-end PHP & Java", text: "Développement front-end moderne avec React et back-end robuste avec PHP ou Java." },
  { icon: Database, title: "Bases de données", text: "Conception, modélisation, optimisation et sécurisation de bases MySQL et PostgreSQL." },
  { icon: RefreshCcw, title: "Reprise d'applications existantes", text: "Correction, amélioration et modernisation d'applications déjà en production." },
];

/* ---------- Navigation ---------- */
export const navLinks = [
  { id: "accueil", label: "Accueil" },
  { id: "a-propos", label: "À propos" },
  { id: "competences", label: "Compétences" },
  { id: "projets", label: "Projets" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

/* ---------- SEO ---------- */
export const seo = {
  siteUrl: "https://votre-portfolio.vercel.app",
  title: `${profile.name} — Développeur Full Stack`,
  description:
    "Portfolio de développeur Full Stack : applications web, API REST, systèmes de gestion, intégration Dolibarr, React, PHP, Java, MySQL.",
  ogImage: "/images/og-image.jpg",
};
