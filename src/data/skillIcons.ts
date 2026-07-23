/**
 * Logos des technologies affichés dans la section Compétences.
 * Associez le nom EXACT du skill (voir portfolio.ts) à son icône + sa couleur de marque.
 * Les skills sans entrée ici affichent une icône générique (voir Skills.tsx).
 */
import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiReact,
  SiHtml5,
  SiBootstrap,
  SiPhp,
  SiSpringboot,
  SiMysql,
  SiPostgresql,
  SiGithub,
  SiApachemaven,
  SiPostman,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

export const skillIcons: Record<string, { Icon: IconType; color: string }> = {
  "JavaScript": { Icon: SiJavascript, color: "#F7DF1E" },
  "React": { Icon: SiReact, color: "#61DAFB" },
  "HTML5 / CSS3": { Icon: SiHtml5, color: "#E34F26" },
  "Bootstrap": { Icon: SiBootstrap, color: "#7952B3" },
  "PHP": { Icon: SiPhp, color: "#777BB4" },
  "Java": { Icon: FaJava, color: "#ED8B00" },
  "Spring Boot": { Icon: SiSpringboot, color: "#6DB33F" },
  "MySQL": { Icon: SiMysql, color: "#4479A1" },
  "PostgreSQL": { Icon: SiPostgresql, color: "#4169E1" },
  "Git / GitHub": { Icon: SiGithub, color: "#F1F5F9" },
  "VS Code": { Icon: VscVscode, color: "#007ACC" },
  "Maven": { Icon: SiApachemaven, color: "#C71A36" },
  "Postman": { Icon: SiPostman, color: "#FF6C37" },
};
