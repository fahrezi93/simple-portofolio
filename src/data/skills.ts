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
  SiCanva
} from "react-icons/si";
import { CapCutIcon } from "../components/icons/capcut-icon";

export type Skill = {
  name: string;
  iconComponent: IconType;
};

export const programmingSkills: Skill[] = [
  { name: "React", iconComponent: SiReact },
  { name: "Next.js", iconComponent: SiNextdotjs },
  { name: "TypeScript", iconComponent: SiTypescript },
  { name: "JavaScript", iconComponent: SiJavascript },
  { name: "HTML", iconComponent: SiHtml5 },
  { name: "CSS", iconComponent: SiCss3 },
  { name: "Tailwind CSS", iconComponent: SiTailwindcss },
  { name: "Node.js", iconComponent: SiNodedotjs },
  { name: "Python", iconComponent: SiPython },
  { name: "Flask", iconComponent: SiFlask },
  { name: "Firebase", iconComponent: SiFirebase },
  { name: "Supabase", iconComponent: SiSupabase },
  { name: "PostgreSQL", iconComponent: SiPostgresql },
  { name: "TensorFlow", iconComponent: SiTensorflow },
  { name: "Keras", iconComponent: SiKeras },
  { name: "OpenCV", iconComponent: SiOpencv },
  { name: "Git", iconComponent: SiGit },
  { name: "GitHub", iconComponent: SiGithub },
];

export const creativeSkills: Skill[] = [
  { name: "Figma", iconComponent: SiFigma },
  { name: "Photoshop", iconComponent: SiAdobephotoshop },
  { name: "Premiere Pro", iconComponent: SiAdobepremierepro },
  { name: "Canva", iconComponent: SiCanva },
  { name: "After Effect", iconComponent: SiAdobeaftereffects },
  { name: "CapCut", iconComponent: CapCutIcon },
];
