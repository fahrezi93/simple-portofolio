import type { ExperienceItemType } from "@/components/work-experience"

export const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "",
    companyName: "Badan Standarisasi Nasional",
    companyLogo: "https://media.licdn.com/dms/image/v2/C4D0BAQG4bJWAqtxe9Q/company-logo_200_200/company-logo_200_200/0/1630484505567/national_standardization_agency_of_indonesia_logo?e=2147483647&v=beta&t=xLP85Tr5muK7Q-WfCFbWGRZ0aKjEWII_ZszEbPtqM38",
    companyWebsite: "https://bsn.go.id/",
    isCurrentEmployer: true,
    positions: [
      {
        id: "bsn",
        title: "Application Developer",
        employmentPeriod: {
          start: "09.2026",
          end: "",
        },
        employmentType: "Apprenticeship",
        description: `- Building and maintaining web applications for internal users and external clients.
- Collaborating with design teams to implement user-friendly interfaces and improve user experience.
- Working with backend developers to integrate APIs and ensure seamless data flow.
        `,
        skills: ["Web Development","PHP","SQL Server", "Laravel", "MySQL"],
        isExpanded: true,
      },
    ],
  },

  {
    id: "kreativlabs",
    companyName: "KreativLabs.id",
    companyLogo: "/companies/kreativlabs.webp",
    companyWebsite: "https://kreativlabs.id",
    isCurrentEmployer: true,
    positions: [
      {
        id: "kreativlabs-web-dev",
        title: "Web Developer & Graphic Designer",
        employmentPeriod: {
          start: "11.2025",
        },
        employmentType: "Freelance / Co-founder",
        description: `- Developed a comprehensive internal management system for a Certification Body (LS ISPO) to digitize and automate the end-to-end certification workflow.
- Engineered automated document processing to dynamically generate client certificates and embed government-issued QR codes, streamlining administrative tasks.
- Designed an API-ready architecture within Laravel to ensure seamless future data synchronization with national accreditation portals (SIAP ISPO and Kanmis).
- Implemented robust data validation and SLA tracking features to maintain system compliance with strict KAN K-08.08 accreditation standards.`,
        skills: ["Laravel", "PHP", "MySQL", "API Architecture", "Workflow Automation", "Document Generation"],
        isExpanded: true,
      },
    ],
  },
  {
    id: "tiga-rasa-gemilang",
    companyName: "PT Tiga Rasa Gemilang",
    companyLogo: "/companies/tiga-rasa-gemilang.webp",
    isCurrentEmployer: true,
    positions: [
      {
        id: "trg-graphic-designer",
        title: "Graphic Designer",
        employmentPeriod: {
          start: "02.2026",
        },
        employmentType: "Part-time",
        description: `- Produced high-quality visual designs and marketing materials to support brand campaigns.
- Created engaging Instagram feeds and edited dynamic promotional Reels.
- Collaborated with marketing teams to maintain visual consistency and brand storytelling.`,
        skills: ["Graphic Design", "Social Media Design", "Figma", "Adobe Photoshop", "Video Editing"],
        isExpanded: true,
      },
    ],
  },
  {
    id: "bangkit-academy",
    companyName: "Bangkit Academy led by Google, GoTo, and Traveloka",
    companyWebsite: "https://grow.google/intl/id_id/bangkit",
    companyLogo: "/companies/bangkit.webp",
    positions: [
      {
        id: "bangkit-cloud",
        title: "Cloud Computing Cohort",
        employmentPeriod: {
          start: "09.2024",
          end: "12.2024",
        },
        employmentType: "Apprenticeship",
        description: `- Graduated from an intensive cloud computing curriculum organized by Google, GoTo, and Traveloka.
- Built, containerized, and deployed scalable backend microservices and RESTful APIs using Google Cloud Run, Cloud Storage, and Compute Engine.
- Collaborated in an agile cross-functional capstone team to develop and deploy an end-to-end cloud-native solution.`,
        skills: ["Google Cloud Platform", "Cloud Run", "Docker", "Node.js", "Python", "REST APIs", "Git"],
        isExpanded: true,
      },
    ],
  },
  {
    id: "gdg-unsri",
    companyName: "Google Developer Group UNSRI",
    companyLogo: "/companies/gdg-unsri.webp",
    companyWebsite: "https://gdg.community.dev/gdg-on-campus-universitas-sriwijaya-palembang-indonesia/",
    positions: [
      {
        id: "gdg-creative",
        title: "Media and Creative Member",
        employmentPeriod: {
          start: "10.2023",
          end: "08.2024",
        },
        employmentType: "Community",
        description: `- Established design standards and visual templates for community social media feeds and technical infographics.
- Led creative and documentation teams for developer workshops, including the Computer Security and MERN stack sessions.
- Produced high-engagement promotional materials and handled event coverage for community onboarding.`,
        skills: ["Figma", "Community Management", "Event Branding", "Technical Content", "Graphic Design"],
        isExpanded: true,
      },
    ],
  },
  {
    id: "hmif-unsri",
    companyName: "HMIF UNSRI",
    companyLogo: "/companies/hmif-unsri.webp",
    companyWebsite: "https://www.hmifunsri.com",
    positions: [
      {
        id: "hmif-head-multimedia",
        title: "Head of Multimedia Division",
        employmentPeriod: {
          start: "01.2024",
          end: "12.2024",
        },
        employmentType: "Student Organization",
        description: `- Led a creative division managing all official social media publications, branding identity, and video assets.
- Directed media publication and live documentation for flagship university tech events, including Srifoton 2024 and IF Fest.
- Spearheaded visual design guidelines and collaborated across departments to deliver unified creative campaigns.`,
        skills: ["Leadership", "Project Management", "Figma", "Video Production", "Brand Identity"],
        isExpanded: true,
      },
      {
        id: "hmif-staff-multimedia",
        title: "Multimedia Staff",
        employmentPeriod: {
          start: "02.2023",
          end: "12.2023",
        },
        employmentType: "Student Organization",
        description: `- Created Instagram feed design templates and produced dynamic video trailers for Srifoton 2023 and IF Fest.
- Managed on-site event documentation and post-production video editing for internal staff development programs.`,
        skills: ["Graphic Design", "Video Editing", "Adobe Premiere", "Adobe Photoshop"],
        isExpanded: true,
      },
    ],
  },
  {
    id: "fasco-unsri",
    companyName: "FASCO UNSRI",
    companyWebsite: "https://www.instagram.com/fascounsri/",
    companyLogo: "/companies/fasco-unsri.webp",
    positions: [
      {
        id: "fasco-multimedia",
        title: "Multimedia Staff",
        employmentPeriod: {
          start: "01.2024",
          end: "12.2024",
        },
        employmentType: "Student Organization",
        description: `- Designed informative daily social media feed content and created modular design systems for organizational branding.
- Managed event publication and documentation for university-level debate workshops and FASCO Academy 2024.`,
        skills: ["Social Media Design", "Content Creation", "Figma", "Visual Branding"],
        isExpanded: true,
      },
    ],
  },
  {
    id: "wifi-unsri",
    companyName: "WIFI UNSRI",
    companyLogo: "/companies/wifi-unsri.webp",
    companyWebsite: "https://www.instagram.com/wifi_fasilkom",
    positions: [
      {
        id: "wifi-multimedia",
        title: "Multimedia Staff",
        employmentPeriod: {
          start: "03.2023",
          end: "12.2023",
        },
        employmentType: "Student Organization",
        description: `- Produced engaging visual content, promotional flyers, and event banners for student community programs.
- Served as primary documenter and media coordinator for major events including PTQ WIFI 2023.`,
        skills: ["Graphic Design", "Photography", "Event Documentation", "Adobe Photoshop"],
        isExpanded: true,
      },
    ],
  },
]
