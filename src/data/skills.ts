import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFigma,
  SiFirebase,
  SiGit,
  SiPython,
  SiGithub,
  SiNodedotjs,
  SiSupabase,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiFlask,
  SiPostgresql,
  SiTensorflow,
  SiKeras,
  SiOpencv,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiCanva,
  SiDocker,
  SiGooglecloud,
} from "react-icons/si";
import { CapCutIcon } from "../components/icons/capcut-icon";

export type Skill = {
  name: string;
  iconComponent: IconType;
};

export type SkillCategory = {
  id: string;
  number: string;
  name: string;
  skills: Skill[];
};

export const devSkillCategories: SkillCategory[] = [
  {
    id: "ai-ml",
    number: "01",
    name: "AI / ML",
    skills: [
      { name: "Python", iconComponent: SiPython },
      { name: "TensorFlow", iconComponent: SiTensorflow },
      { name: "Keras", iconComponent: SiKeras },
      { name: "OpenCV", iconComponent: SiOpencv },
    ],
  },
  {
    id: "frontend",
    number: "02",
    name: "Frontend",
    skills: [
      { name: "JavaScript", iconComponent: SiJavascript },
      { name: "TypeScript", iconComponent: SiTypescript },
      { name: "React", iconComponent: SiReact },
      { name: "Next.js", iconComponent: SiNextdotjs },
      { name: "Tailwind CSS", iconComponent: SiTailwindcss },
      { name: "HTML5", iconComponent: SiHtml5 },
      { name: "CSS3", iconComponent: SiCss3 },
    ],
  },
  {
    id: "backend",
    number: "03",
    name: "Backend",
    skills: [
      { name: "Node.js", iconComponent: SiNodedotjs },
      { name: "Flask", iconComponent: SiFlask },
      { name: "PostgreSQL", iconComponent: SiPostgresql },
      { name: "Supabase", iconComponent: SiSupabase },
      { name: "Firebase", iconComponent: SiFirebase },
    ],
  },
  {
    id: "devops-cloud",
    number: "04",
    name: "DevOps / Cloud",
    skills: [
      { name: "Docker", iconComponent: SiDocker },
      { name: "Google Cloud", iconComponent: SiGooglecloud },
      { name: "Git", iconComponent: SiGit },
      { name: "GitHub", iconComponent: SiGithub },
    ],
  },
];

export const designSkillCategories: SkillCategory[] = [
  {
    id: "ui-ux",
    number: "01",
    name: "UI / UX Design",
    skills: [
      { name: "Figma", iconComponent: SiFigma },
      { name: "Canva", iconComponent: SiCanva },
    ],
  },
  {
    id: "graphic-design",
    number: "02",
    name: "Graphic Design",
    skills: [
      { name: "Photoshop", iconComponent: SiAdobephotoshop },
      { name: "Canva", iconComponent: SiCanva },
    ],
  },
  {
    id: "video-motion",
    number: "03",
    name: "Video & Motion",
    skills: [
      { name: "Premiere Pro", iconComponent: SiAdobepremierepro },
      { name: "After Effects", iconComponent: SiAdobeaftereffects },
      { name: "CapCut", iconComponent: CapCutIcon },
    ],
  },
];

// Flat lists for backwards compatibility
export const programmingSkills: Skill[] = devSkillCategories.flatMap(c => c.skills);
export const creativeSkills: Skill[] = designSkillCategories.flatMap(c => c.skills);

