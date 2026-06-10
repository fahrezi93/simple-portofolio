export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: string;
  year: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "Completed" | "In Progress" | "Active" | "Planned";
};

export const projects: Project[] = [
  {
    id: "dev-1",
    title: "Chatbot AI",
    description: "A chatbot AI that can answer questions and help with tasks using natural language processing",
    image: "/images/development/aksara-ai.webp",
    tags: ["Python", "Flask", "Firebase"],
    type: "Full Stack",
    year: "2025",
    technologies: ["HTML", "CSS", "JavaScript", "Python", "Flask", "Firebase"],
    githubUrl: "https://github.com/fahrezi93/aksara-ai",
    liveUrl: "https://aksara-ai.vercel.app",
    status: "Completed"
  },
  {
    id: "dev-2",
    title: "Waste Classifier",
    description: "A waste classifier that can classify waste into different categories using machine learning",
    image: "/images/development/waste-classifier.webp",
    tags: ["TensorFlow", "React", "Python"],
    type: "Full Stack",
    year: "2025",
    technologies: ["Python", "Flask", "TensorFlow", "Keras", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/fahrezi93/waste-classifier",
    liveUrl: "https://waste-classifier-v1.vercel.app",
    status: "Completed"
  },
  {
    id: "dev-3",
    title: "NutriSuggest",
    description: "A food recommendation system that suggests healthy and nutritious foods based on user preferences and health goals",
    image: "/images/development/nutrisuggest.webp",
    tags: ["React", "TypeScript", "Python"],
    type: "Full Stack",
    year: "2025",
    technologies: ["React", "Tailwind CSS", "TypeScript", "Python", "Flask"],
    githubUrl: "https://github.com/fahrezi93/nutrisuggest",
    liveUrl: "https://nutrisuggest.vercel.app/",
    status: "Completed"
  },
  {
    id: "dev-4",
    title: "Thrift Haven",
    description: "A thrift store website that allows users to buy and sell second-hand items with secure payment system",
    image: "/images/development/thrift-haven.webp",
    tags: ["Next.js", "Firebase", "PostgreSQL"],
    type: "Full Stack",
    year: "2025",
    technologies: ["React", "Tailwind CSS", "TypeScript", "Next.js", "Firebase", "PostgreSQL"],
    githubUrl: "https://github.com/fahrezi93/thrifting-ecommerce",
    liveUrl: "https://thrifting-haven.vercel.app",
    status: "Completed"
  },
  {
    id: "dev-6",
    title: "Smart Attendance",
    description: "A smart attendance system that uses face recognition to mark attendance automatically",
    image: "/images/development/smartattedance.webp",
    tags: ["Python", "OpenCV", "React"],
    type: "Full Stack",
    year: "2025",
    technologies: ["Python", "OpenCV", "Flask", "React"],
    githubUrl: "https://github.com/fahrezi93/smart-attendance",
    liveUrl: "#",
    status: "In Progress"
  },
  {
    id: "dev-8",
    title: "Simpan Cepat",
    description: "A note taking app that can help you save your notes and ideas with AI-powered features",
    image: "/images/development/simpancepat.webp",
    tags: ["Next.js", "Firebase", "Genkit"],
    type: "Web App",
    year: "2025",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Firebase", "Genkit"],
    githubUrl: "https://github.com/fahrezi93/simpan-cepat",
    liveUrl: "#",
    status: "In Progress"
  }
];
