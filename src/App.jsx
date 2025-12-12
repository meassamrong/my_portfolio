import React, { useMemo, useState } from "react";
import { Database, Layout, Server, Terminal } from "lucide-react";
import AchievementsSection from "./components/AchievementsSection";
import ExperienceSection from "./components/ExperienceSection";
import FooterCTA from "./components/FooterCTA";
import GithubSection, { githubDefaultStats } from "./components/GithubSection";
import Hero, { defaultSocials } from "./components/Hero";
import Navbar from "./components/Navbar";
import ProjectsSection, {
  projectTechIcons,
} from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import ScrollReveal from "./components/ScrollReveal";
import TechIcons from "./components/TechIcons";
import HobbySection from "./components/HobbySection";
import MyPhoto from "./assets/meassamrong_photo.jpg";
import MyDSECert from "./assets/samrong_is_DSE_Cert.jpg";
import MyCyberCert from "./assets/Samrong_Cyber_Certificate.jpg";
import MyFinanceCert from "./assets/Samrong_Meas_page-0001_Cert.jpg";

const buildSkills = () => [
  { name: "Node.js", icon: TechIcons.Node, color: "text-green-500" },
  { name: "JavaScript", icon: TechIcons.JavaScript, color: "text-yellow-400" },
  { name: "TypeScript", icon: TechIcons.TypeScript, color: "text-sky-500" },
  { name: "React", icon: TechIcons.React, color: "text-cyan-400" },
  { name: "Vue.js", icon: TechIcons.Vue, color: "text-green-400" },
  { name: "Nuxt.js", icon: TechIcons.Nuxt, color: "text-green-400" },
  { name: "Python", icon: TechIcons.Python, color: "text-blue-400" },
  { name: "FastAPI", icon: Server, color: "text-teal-400" },
  { name: "ExpressJS", icon: TechIcons.Express, color: "text-gray-50" },
  { name: "WordPress", icon: TechIcons.wordpress, color: "text-sky-700" },
  { name: "Tailwind", icon: TechIcons.Tailwind, color: "text-cyan-400" },
  { name: "Bootstrap", icon: Layout, color: "text-purple-500" },
  { name: "Linux/Unix", icon: Terminal, color: "text-gray-300" },
  { name: "Github", icon: TechIcons.Github, color: "text-gray-50" },
  { name: "Git/CICD", icon: TechIcons.Git, color: "text-orange-500" },
  { name: "Docker", icon: TechIcons.Docker, color: "text-sky-500" },
  { name: "Vmware", icon: TechIcons.Vmware, color: "text-slate-200" },
  { name: "Networking", icon: Database, color: "text-blue-500" },
  { name: "MongoDB", icon: TechIcons.Mongodb, color: "text-green-500" },
  { name: "MySQL", icon: TechIcons.MySql, color: "text-blue-500" },
  { name: "Redis", icon: TechIcons.Redis, color: "text-red-500" },
];

const translations = {
  en: {
    profile: {
      name: "Samrong Meas",
      title: "Full-Stack Web Developer",
      location: "Phnom Penh, Cambodia",
      email: "meassamrong99@gmail.com",
      avatar: MyPhoto,
      bio: "Freelance web developer with 3 years of experience, including collaborating with teams on diverse projects. Skilled in creating user-focused interfaces, optimizing workflows, and delivering efficient solutions for eCommerce and other industries. Proficient in modern tools like Node.js, Vue, React, and Tailwind CSS.",
    },
    experiences: [
      {
        company: "Freelance Developer",
        role: "Founder & Lead Developer, OsCorp-Dev",
        date: "2023 - Present",
        description:
          "Deliver modern websites, applications, bots, and custom tools for businesses of all sizes.",
        points: [
          "Design and build high-performance websites and web apps with a focus on clean UI, scalability, and business-specific needs.",
          "Develop automation bots and smart scripts to streamline operations and reduce manual workload.",
          "Create custom internal tools and utility software to address clients’ unique technical and workflow challenges.",
          "Oversee the full development lifecycle—from client discovery and architecture planning to deployment and long-term support.",
        ],
      },
      {
        company: "Jacques Daniels Solutions Itd",
        role: "IT-Infra and Automaton System Administrator",
        date: "2022 - Present",
        description: "Managing IT infrastructure and automation systems.",
        points: [
          "Setup, Installation, Cloning Virtual machines (VM) with VMware and VCenter, and windows server.",
          "Support, Maintain and Monitor systems to make sure the Automation system is running smoothly.",
          "Install and configure VM environments for Windows, Windows Server, Mac, Linux/Unix (Centos, Debian, Ubuntu, Raspberry Pi OS).",
        ],
      },
      {
        company: "Dr. Phone Mobile Service Co., Ltd.",
        role: "Junior Developer",
        date: "2020 - 2022",
        description: "Worked on company website and internal systems.",
        points: [
          "Managing and enhancing the company website and customer service tracker for mobile phones while in servicing.",
          "Updating and developing the company's internal inventory system.",
        ],
      },
      {
        company: "Dr. Phone Mobile Service Co., Ltd.",
        role: "Graphics Designer & Video Editor",
        date: "2019 - 2020",
        description: "Responsible for multimedia content creation.",
        points: [
          "Handle Company Production Design and Commercial Videos.",
          "Designing promotional posters for discounts and events during festivals and public holidays.",
          "Shooting videos for new product and service advertisements.",
          "Analyzing and monitoring social platform insights to enhance poster and video effectiveness.",
        ],
      },
    ],
    projects: [
      {
        title: "Computer Store",
        description:
          "Developed a robust PC Store e-commerce platform capable of handling large user bases as part of a. Focus on scalable architecture and user-friendly interface.",
        image:
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/pc-store-head.png",
        images: [
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/pc-store-head.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/pc-store-feature-product.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/pc-store-brand-search.png",
        ],
        demoLink: "#",
        gitLink: "https://github.com/meassamrong/",
        techIcons: projectTechIcons.nodeNuxtExMongo,
      },
      {
        title: "Mobile Repair Tracking System",
        description:
          "Managed and enhanced a customer service tracking system for mobile phone servicing at Dr. Phone Mobile Service Co., Ltd. Improved workflow efficiency and customer status visibility.",
        image:
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/dr_phone_web_image_1.jpg",
        images: [
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/dr_phone_web_image_1.jpg",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/dr_phone_web_image.jpg",
        ],
        demoLink: "#",
        gitLink: "https://github.com/meassamrong/",
        techIcons: projectTechIcons.phpMySql,
      },
      {
        title: "Kanhchrong Sor Course System",
        description:
          "Making a website for Kanhchrong Sor community. Get direct insights into the Forex and Crypto markets through real-world experience and analysis.",
        image:
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/kcs_account_manage.png",
        images: [
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/kcs_account_manage.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/kcs_head_public.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/kcs_course_main.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/kcs_lesson_and_admin_system.png",
        ],
        demoLink: "https://kanhchrongsor.com",
        gitLink: "https://kanhchrongsor.com",
        techIcons: projectTechIcons.vueNodeExpressMongo,
      },
      {
        title: "JDemy Free Course",
        description:
          "I built a website that allows everyone to access Udemy courses for free when 100% discount coupons are available. The system uses multiple bots, workers, and backend services working together. It scrapes Udemy coupons, validates them through the Udemy API using worker services, and stores coupon metadata and expiration data in Redis cache.",
        image:
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/jdemy_main_page.png",
        images: [
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/jdemy_main_page.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/jdemy_category_light_mode_page.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/jdemy_cours_discover_page.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/jdemy_cours_main_page.png",
        ],
        demoLink: "https://jdemy.store",
        gitLink: "https://jdemy.store",
        techIcons: projectTechIcons.vueNodeExpressMongo,
      },
      {
        title: "Express API Boilerplate",
        description:
          "Modern, security-focused starter kit for building Express.js APIs with JWT auth, MongoDB persistence, Redis caching, and structured logging.",
        image:
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/boilerplate_swagger_page_readme.png",
        images: [
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/boilerplate_swagger_page_readme.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/boilerplate_swagger_express_api_docs.png",
        ],
        demoLink: "https://github.com/meassamrong/express-api-boilerplate",
        gitLink: "https://github.com/meassamrong/express-api-boilerplate",
        techIcons: projectTechIcons.nodeExpressMongo,
      },
      {
        title: "Twitter Clone API",
        description:
          "A collaborative project developed with a TFD instructor and fellow TFD students as part of the Full Stack Developer Bootcamp. The project is a Twitter-inspired CRUD system.",
        image:
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/tw_clon_tdf_comllap_code_view.png",
        images: [
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/tw_clon_tdf_comllap_code_view.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/tw_clon_tdf_comllap_commit.png",
        ],
        demoLink: "https://github.com/tfd-ed/tw-clone-api",
        gitLink: "https://github.com/tfd-ed/tw-clone-api",
        techIcons: projectTechIcons.nodeExpressMongo,
      },
    ],
    achievements: [
      {
        title: "Full-Stack Developer",
        subtitle: "TFD Bootcamps (2024)",
        tone: "developer",
      },
      {
        title: "Graphics Design and Video Editor",
        subtitle: "Life Design (2019)",
        tone: "media",
      },
      {
        title: "ASEAN Data Science Explorers Trainer",
        subtitle: "SAP (2024)",
        tone: "data",
        image: MyDSECert,
      },
      {
        title: "Cyber Security Essentials",
        subtitle: "Sunrise Institute (2022)",
        tone: "security",
        image: MyCyberCert,
      },
      {
        title: "DevOps Foundations: Microservices",
        subtitle: "LinkedIn Learning Certificate",
        tone: "developer",
        certificate:
          "https://www.linkedin.com/learning/certificates/15f23a10a8dd47f82aea82c895ec66a28d9e9f0990bd7d41ed736bbc65944f32?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQE5suMKtCQFVg/feedshare-shrink_1280/B56ZqCanVIJQAs-/0/1763124606567?e=1767225600&v=beta&t=oednbj1xCrMxhz6qnx78-pROsnVPasAxOfDlsa7zJdw",
      },
      {
        title: "Using Python for Automation",
        subtitle: "LinkedIn Learning Certificate",
        tone: "developer",
        certificate:
          "https://www.linkedin.com/learning/certificates/eb86cccf93a9f98d4e93bbe424a9007b6c30cca1515f6ceb7dbabdf3d6ba4a76?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQEVqMIqosp3qg/feedshare-shrink_1280/B56ZqxHZ9zJYAs-/0/1763908100193?e=1767225600&v=beta&t=qnEXfEDCAjKfygwDcGpbd0m6t8TPvY3TIre8OVyhQJM",
      },
      {
        title: "Learning Docker",
        subtitle: "LinkedIn Learning Certificate",
        tone: "developer",
        certificate:
          "https://www.linkedin.com/learning/certificates/4936c6028cf9b9c59e5e00d085b4e1d481cfd3f7cf835a39d3a3024497313682?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQEfk5oJRBXHnQ/feedshare-shrink_1280/B56ZojrZssJwAs-/0/1761535171832?e=1767225600&v=beta&t=Qq3-KladSruVDRh0td-Y66fN0MlTRkTaiWEEe1pnLwY",
      },
      {
        title: "Personal Financial Management",
        subtitle: "Profiles Asia Pacific Inc.",
        tone: "financial",
        image: MyFinanceCert,
      },
      {
        title: "Strategic Thinking",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/f999bd49ce3ba44a4fb83e3473c7b778a858cf326409b77db75be76072b32c66?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQEt3Ynbpohc5g/feedshare-shrink_1280/B56ZoOpLKBKIAs-/0/1761182266294?e=1767225600&v=beta&t=7fJj-CF4hr2roDFA9oW2xU7IaI_l7YODPjLqGjkN9Js",
      },
      {
        title: "Applied Curiosity",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/d10754322927e6566dd1efaaf47b66896377f081da683d352f68b6a6d05890dc?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQFQKAKLxL9x8w/feedshare-shrink_1280/B56ZpVR_RzG0As-/0/1762367370649?e=1767225600&v=beta&t=XZR3WxJlC4S25mEvtAHd00g2uVxwcXOLWGtJToyr1Vw",
      },
      {
        title: "Counterintuitive Leadership Strategies for a VUCA",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/ed8e3e1c4c931c0ed62aab362e0c9ebcf2743367a83258d5c20f8a1b811e3ef5?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQEXYIUDazklAQ/feedshare-shrink_1280/B56ZqxHfRmI0As-/0/1763908121958?e=1767225600&v=beta&t=NS3DJ1h-Lrqvp594HOgBTaDnFazpwpfrD1zRmAzKEF8",
      },
      {
        title: "Developing a Learning Mindset",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/ac13ede550b13131ca0dc5093438ef81c07632bb434c9116a32d57b2aca4bb11?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQERfj3sWshlOQ/feedshare-shrink_1280/B56ZpVOBQhHYA0-/0/1762366330183?e=1767225600&v=beta&t=NtNo4pzCR63_nt7_CUxKBZPe2b3kjmTJWFpveV6pa7Y",
      },
      {
        title: "Getting Things Done",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/ae15e9dec2bc99bfb64414328a0dda577a51e7ec29db80f0d5ef84b7f72b55a9?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQE9CHuOK-KjtQ/feedshare-shrink_1280/B56ZpV5PNUIcAs-/0/1762377659468?e=1767225600&v=beta&t=ZUAV6tJDB_mvVortV1A0wr80Ek-ne1wW1j1ksq79zG0",
      },
      {
        title: "Navigating Ambiguity",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/e57c9f29b1a1aa0da688c648cab30c9ee5eba9dad0e55b4aaf603284367b3632?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D4E22AQGQJeKAyIU17Q/feedshare-shrink_1280/B4EZpZxwxHKYAs-/0/1762442808668?e=1767225600&v=beta&t=S3HCcEPltqVxLvM7Wgm34gwLqdnvfrQMPyoinzet5wg",
      },
      {
        title: "Setting a Vision: How to Gain Clarity on Your Goals",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/17e99166099f8fb9f740deff9960a3a2375d0b7ab6f0134fd616d04a328d68d9?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQE78SsRt7226g/feedshare-shrink_1280/B56ZpAps4cHAAs-/0/1762021265165?e=1767225600&v=beta&t=ua253B6lc8LIobmxLkCNGk4X-5MpNlWN1T6XK1xcv4s",
      },
      {
        title: "The Six Skills of Proactive Professionals",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/321ea5fb83104390f9415188faadb7e18e67776998c82f7d6870ccffb535bfec?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQH4j9F_K9njrg/feedshare-shrink_1280/B56ZpVvGGlJkAw-/0/1762375000760?e=1767225600&v=beta&t=kDH6lHT_GOfZxWPPiwIK7yuBT-NjJKdoBVfPorwNhHQ",
      },
      {
        title: "Delivering Results Effectively",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/a048f090f82ab871dda6d7e042f059d2d8160267985614336ce0fd405e3640bc?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQELEbvLQ8Tk8g/feedshare-shrink_1280/B56Zo1NVKeJQAw-/0/1761829278618?e=1767225600&v=beta&t=T7Rr7Cg0jzTIoM60ithzfaP04I0t5lOEnnC-C3hCTQM",
      },
      {
        title: "Developing Business Acumen (2016)",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/ec08bab3a981f037e968e14ccdd7ed54fd59bcda7dbc675611c74c458da1f375?u=343535298&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlRvtVhn2TXyyJ6%2FR%2Br5obw%3D%3D",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQEiYRUg7jI1jA/feedshare-shrink_1280/B56ZoeFGSBIcAw-/0/1761441244539?e=1767225600&v=beta&t=SGtweE39PjzZk8-TvQcEYMFZYun0NMKdsbl8VTlVeIA",
      },
      {
        title: "Executive Decision-Making",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/48344bc92185a1acfa7d31a8ddf625fc4a83d415974457e0e2bf6c15ea7e5704?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQEVhiaunz6RVg/feedshare-shrink_1280/B56ZoTnGZNKIAs-/0/1761265609655?e=1767225600&v=beta&t=kYCQPTaaE--HxXzq1anLaYw_K860cfte5je7uKrbniA",
      },
      {
        title: "Improving Your Judgment for Better Decision-Making",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/a3cca6ed3d5bef65e89f566978c1ad8653626bdbccf21bd8cfd721265ef25b3f?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D4E22AQGhoGBLRd25kA/feedshare-shrink_1280/B4EZpZ9f6aKoAs-/0/1762445885408?e=1767225600&v=beta&t=nlB6rAiePh6vG-cIVobuMNpqXjWoz-e0mJoNBWv-9VA",
      },
    ],
    hobbies: [
      {
        name: "Coding",
        emoji: "💻",
        description: "Building side projects and experimenting with new frameworks.",
        image: "https://placehold.co/600x400/0f172a/22c55e?text=Code+Playground",
      },
      {
        name: "Tech Research",
        emoji: "🔬",
        description: "Reading about emerging technologies and testing new tools.",
        image: "https://placehold.co/600x400/111827/3b82f6?text=Research+Notes",
      },
      {
        name: "Gaming",
        emoji: "🎮",
        description: "Competitive matches and cooperative adventures with friends.",
        image: "https://placehold.co/600x400/0b1120/f97316?text=Gaming+Session",
      },
      {
        name: "Football",
        emoji: "⚽",
        description: "Weekend matches to stay active and enjoy team play.",
        image: "https://placehold.co/600x400/0f172a/22c55e?text=Football+Field",
      },
      {
        name: "Bicycle",
        emoji: "🚴",
        description: "City rides to explore new streets and clear my head.",
        image: "https://placehold.co/600x400/111827/38bdf8?text=City+Ride",
      },
      {
        name: "Camping & Riding Trips",
        emoji: "🏕️",
        description: "Outdoor trips, campfires, and long rides to unwind.",
        image: "https://placehold.co/600x400/0b1120/a855f7?text=Camping+Trail",
      },
    ],
    labels: {
      heroContact: "Contact Me",
      experienceTitle: "Professional Journey",
      skillsTitle: "Tech Arsenal",
      projectsTitle: "Featured Projects",
      hobbiesTitle: "Hobbies & Interests",
      achievementsTitle: "Achievements & Certifications",
    },
    projectCtas: { demo: "Live Demo", code: "GitHub" },
    achievementsCta: { certificate: "Certificate" },
    footer: {
      title: "Let's Build Something Amazing",
      description:
        "Ready to bring your ideas to life? I'm always excited to collaborate on innovative projects and help transform your vision into reality.",
      resume: "View Full Resume",
    },
    github: {
      title: "GitHub Contributions",
      subtitle: (username) => `Live data from GitHub GraphQL API • ${username}`,
      contributionMessages: {
        loading: "Loading contributions...",
        sampleFallback: "Showing sample data.",
        success: "Live contributions fetched successfully.",
      },
      statsMessages: {
        loading: "Loading GitHub stats...",
        fallback: "Showing default stats.",
        success: "Live GitHub stats loaded.",
      },
      statLabels: {
        followers: "Followers",
        following: "Following",
        repositories: "Repositories",
        commits: "Commits",
      },
      graphCopy: {
        locale: "en-US",
        weekdays: ["Mon", "Wed", "Fri"],
        less: "Less",
        more: "More",
        sampleLabel: "Sample contributions shown",
        contributionsLabel: "contributions",
        inLabel: "in",
        sampleTag: "sample",
        unknownDate: "N/A",
      },
    },
    resumeUrl: "https://jcorpdev.online/mycv",
  },
  km: {
    profile: {
      name: "Samrong Meas",
      title: "អ្នកអភិវឌ្ឍវេបសាយ Full-Stack",
      location: "ភ្នំពេញ កម្ពុជា",
      email: "meassamrong99@gmail.com",
      avatar: MyPhoto,
      bio: "អ្នកអភិវឌ្ឍវេបសាយឯករាជ្យដែលមានបទពិសោធន៍ ៣ ឆ្នាំ រួមទាំងការសហការជាមួយក្រុមលើគម្រោងចម្រុះ។ មានជំនាញច្បាស់លាស់ក្នុងការបង្កើតចំណុចប្រទាក់ដែលផ្តោតលើអ្នកប្រើប្រាស់ បង្កើនប្រសិទ្ធភាពលំហូរការងារ និងផ្តល់ដំណោះស្រាយប្រកបដោយប្រសិទ្ធភាពសម្រាប់ eCommerce និងឧស្សាហកម្មផ្សេងៗ។ ស្ទាត់ជំនាញក្នុងការប្រើប្រាស់ឧបករណ៍ទំនើបដូចជា Node.js, Vue, React និង Tailwind CSS។",
    },
    experiences: [
      {
        company: "Freelance Developer",
        role: "ស្ថាបនិក និងអ្នកដឹកនាំផ្នែកអភិវឌ្ឍន៍កម្មវិធី, OsCorp-Dev",
        date: "2023 - បច្ចុប្បន្ន",
        description:
          "ផ្តល់ជូនវេបសាយទំនើប កម្មវិធីទូរស័ព្ទ បូត(Bots) និងឧបករណ៍ឌីជីថលតាមតម្រូវការសម្រាប់អាជីវកម្មគ្រប់ទំហំ។",
        points: [
          "រចនា និងបង្កើតវេបសាយ និងវេបអាប់(Web Apps) ដែលមានដំណើរការខ្ពស់ ដោយផ្តោតលើ UI ស្អាត អាចពង្រីកវិសាលភាពបាន និងឆ្លើយតបតាមតម្រូវការអាជីវកម្ម។",
          "អភិវឌ្ឍបូតស្វ័យប្រវត្តិ និងស្គ្រីបឆ្លាតវៃ ដើម្បីកាត់បន្ថយការងារដោយដៃ និងធ្វើឲ្យប្រតិបត្តិការកាន់តែរលូន។",
          "បង្កើតឧបករណ៍ប្រើប្រាស់ផ្ទៃក្នុង និងកម្មវិធីជំនួយ ដើម្បីដោះស្រាយបញ្ហាបច្ចេកទេស និងលំហូរការងារពិសេសរបស់អតិថិជន។",
          "គ្រប់គ្រងដំណើរការអភិវឌ្ឍន៍ទាំងមូល ចាប់ពីការស្វែងយល់ពីអតិថិជន និងការរៀបចំស្ថាបត្យកម្ម រហូតដល់ការដាក់ឱ្យដំណើរការ និងការគាំទ្ររយៈពេលវែង។",
        ],
      },
      {
        company: "Jacques Daniels Solutions Itd",
        role: "អ្នកគ្រប់គ្រងប្រព័ន្ធ IT-Infra និង Automation",
        date: "2022 - បច្ចុប្បន្ន",
        description:
          "គ្រប់គ្រងហេដ្ឋារចនាសម្ព័ន្ធ IT និងប្រព័ន្ធស្វ័យប្រវត្តិកម្ម។",
        points: [
          "ដំឡើង ចម្លង(Clone) និងកំណត់រចនាសម្ព័ន្ធម៉ាស៊ីននិម្មិត (VM) ដោយប្រើ VMware, VCenter និង Windows Server។",
          "គាំទ្រ ថែទាំ និងត្រួតពិនិត្យប្រព័ន្ធ ដើម្បីធានាថាប្រព័ន្ធស្វ័យប្រវត្តិកម្មដំណើរការដោយរលូន។",
          "ដំឡើង និងកំណត់បរិស្ថាន VM សម្រាប់ Windows, Windows Server, Mac, Linux/Unix (CentOS, Debian, Ubuntu, Raspberry Pi OS)។",
        ],
      },
      {
        company: "Dr. Phone Mobile Service Co., Ltd.",
        role: "អ្នកអភិវឌ្ឍជំនួយការ (Junior Developer)",
        date: "2020 - 2022",
        description:
          "ធ្វើការលើវេបសាយរបស់ក្រុមហ៊ុន និងប្រព័ន្ធគ្រប់គ្រងផ្ទៃក្នុង។",
        points: [
          "គ្រប់គ្រង និងបង្កើនប្រសិទ្ធភាពវេបសាយ និងប្រព័ន្ធតាមដានសេវាកម្មជួសជុលទូរស័ព្ទដៃ។",
          "ធ្វើបច្ចុប្បន្នភាព និងអភិវឌ្ឍប្រព័ន្ធគ្រប់គ្រងស្តុកទំនិញផ្ទៃក្នុងរបស់ក្រុមហ៊ុន។",
        ],
      },
      {
        company: "Dr. Phone Mobile Service Co., Ltd.",
        role: "អ្នករចនាក្រាហ្វិក និងកាត់តវីដេអូ",
        date: "2019 - 2020",
        description: "ទទួលខុសត្រូវលើការបង្កើតមាតិកាមេឌៀ។",
        points: [
          "រចនាសម្ភារៈផលិតកម្ម និងវីដេអូពាណិជ្ជកម្មរបស់ក្រុមហ៊ុន។",
          "រចនាផ្ទាំងផ្សាយពាណិជ្ជកម្ម(Poster) សម្រាប់ប្រូម៉ូសិន និងព្រឹត្តិការណ៍ផ្សេងៗក្នុងឱកាសបុណ្យទាន។",
          "ថត និងកាត់តវីដេអូសម្រាប់ការផ្សព្វផ្សាយផលិតផល និងសេវាកម្មថ្មីៗ។",
          "វិភាគ និងតាមដានស្ថិតិលើបណ្តាញសង្គម ដើម្បីបង្កើនប្រសិទ្ធភាពនៃរូបភាពនិងវីដេអូ។",
        ],
      },
    ],
    projects: [
      {
        title: "ហាងលក់ កុំព្យូទ័រ",
        description:
          "បានអភិវឌ្ឍវេបសា ហាងលក់ កុំព្យូទ័រ (E-Commerce) ដ៏រឹងមាំមួយដែលមានសមត្ថភាពដោះស្រាយអ្នកប្រើប្រាស់ចំនួនច្រើន។ ផ្តោតលើស្ថាបត្យកម្មដែលអាចពង្រីកបាន និងចំណុចប្រទាក់ងាយស្រួលប្រើ។",
        image:
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/pc-store-head.png",
        images: [
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/pc-store-head.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/pc-store-feature-product.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/pc-store-brand-search.png",
        ],
        demoLink: "#",
        gitLink: "https://github.com/meassamrong/",
        techIcons: projectTechIcons.nodeNuxtExMongo,
      },
      {
        title: "ប្រព័ន្ធតាមដានសេវាកម្មអតិថិជន",
        description:
          "បានគ្រប់គ្រង និងកែលម្អប្រព័ន្ធតាមដានសេវាកម្មជួសជុលទូរស័ព្ទដៃនៅ Dr. Phone Mobile Service Co., Ltd. ជួយបង្កើនប្រសិទ្ធភាពលំហូរការងារ និងផ្តល់ភាពច្បាស់លាស់នៃស្ថានភាពជួសជុលជូនអតិថិជន។",
        image:
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/dr_phone_web_image_1.jpg",
        images: [
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/dr_phone_web_image_1.jpg",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/dr_phone_web_image.jpg",
        ],
        demoLink: "#",
        gitLink: "https://github.com/meassamrong/",
        techIcons: projectTechIcons.vueJs,
      },
      {
        title: "Kanhchrong Sor Course System",
        description:
          "បង្កើតគេហទំព័រសម្រាប់សហគមន៍កញ្ជ្រោងស។ ទទួលបានព័ត៌មានដោយផ្ទាល់អំពីទីផ្សារ Forex និង Crypto តាមរយៈបទពិសោធន៍ និងការវិភាគក្នុងពិភពពិត។",
        image:
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/kcs_account_manage.png",
        images: [
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/kcs_account_manage.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/kcs_head_public.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/kcs_course_main.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/kcs_lesson_and_admin_system.png",
        ],
        demoLink: "#",
        gitLink: "https://github.com/meassamrong/",
        techIcons: projectTechIcons.serverPython,
      },
      {
        title: "JDemy Free Course",
        description:
          "ខ្ញុំបានបង្កើតគេហទំព័រមួយដែលអនុញ្ញាតឱ្យអ្នករាល់គ្នាចូលមើលវគ្គសិក្សា Udemy ដោយឥតគិតថ្លៃនៅពេលដែលមានប័ណ្ណបញ្ចុះតម្លៃ 100%។ ប្រព័ន្ធនេះប្រើប្រាស់បូត កម្មករ និងសេវាកម្ម backend ច្រើនដែលធ្វើការជាមួយគ្នា។ វាកោសប័ណ្ណ Udemy ផ្ទៀងផ្ទាត់ពួកវាតាមរយៈ Udemy API ដោយប្រើសេវាកម្មកម្មករ និងរក្សាទុកទិន្នន័យមេតាប័ណ្ណ និងទិន្នន័យផុតកំណត់នៅក្នុងឃ្លាំងសម្ងាត់ Redis។",
        image:
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/jdemy_main_page.png",
        images: [
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/jdemy_main_page.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/jdemy_category_light_mode_page.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/jdemy_cours_discover_page.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/jdemy_cours_main_page.png",
        ],
        demoLink: "https://jdemy.store",
        gitLink: "https://jdemy.store",
        techIcons: projectTechIcons.vueNodeExpressMongo,
      },
      {
        title: "Express API Boilerplate",
        description:
          "APIទំនើប និងផ្តោតលើសុវត្ថិភាពសម្រាប់ការកសាង Express.js APIs ជាមួយ JWT auth, MongoDB persistence, Redis caching និងការកត់ត្រាដែលមានរចនាសម្ព័ន្ធ។",
        image:
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/boilerplate_swagger_page_readme.png",
        images: [
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/boilerplate_swagger_page_readme.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/boilerplate_swagger_express_api_docs.png",
        ],
        demoLink: "https://github.com/meassamrong/express-api-boilerplate",
        gitLink: "https://github.com/meassamrong/express-api-boilerplate",
        techIcons: projectTechIcons.nodeExpressMongo,
      },
      {
        title: "Twitter Clone API",
        description:
          "ជាProejct ដែកធ្វើឡើងជាមួយលោកគ្រូ TFD និង សិស្សរួមជំនាន់ TDF Bootcam Full Stack Developer, ដែលជា CRUD System យកលំនាមតាមរយះ Twitter",
        image:
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/tw_clon_tdf_comllap_code_view.png",
        images: [
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/tw_clon_tdf_comllap_code_view.png",
          "https://raw.githubusercontent.com/meassamrong/meassamrong/refs/heads/Develop/assets/tw_clon_tdf_comllap_commit.png",
        ],
        demoLink: "https://github.com/tfd-ed/tw-clone-api",
        gitLink: "https://github.com/tfd-ed/tw-clone-api",
        techIcons: projectTechIcons.nodeExpressMongo,
      },
    ],
    achievements: [
      {
        title: "អ្នកអភិវឌ្ឍ Full-Stack",
        subtitle: "TFD Bootcamps (2024)",
        tone: "developer",
      },
      {
        title: "អ្នករចនាក្រាហ្វិក និងកាត់តវីដេអូ",
        subtitle: "Life Design (2019)",
        tone: "media",
      },
      {
        title: "គ្រូបង្រៀន ASEAN Data Science Explorers",
        subtitle: "SAP (2024)",
        tone: "data",
        image: MyDSECert,
      },
      {
        title: "មូលដ្ឋានគ្រឹះសន្តិសុខសាយប័រ (Cyber Security)",
        subtitle: "Sunrise Institute (2022)",
        tone: "security",
        image: MyCyberCert,
      },
      {
        title: "មូលដ្ឋានគ្រឹះ DevOps: Microservices",
        subtitle: "LinkedIn Learning Certificate",
        tone: "developer",
        certificate:
          "https://www.linkedin.com/learning/certificates/15f23a10a8dd47f82aea82c895ec66a28d9e9f0990bd7d41ed736bbc65944f32?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQE5suMKtCQFVg/feedshare-shrink_1280/B56ZqCanVIJQAs-/0/1763124606567?e=1767225600&v=beta&t=oednbj1xCrMxhz6qnx78-pROsnVPasAxOfDlsa7zJdw",
      },
      {
        title: "ការប្រើប្រាស់ Python សម្រាប់ស្វ័យប្រវត្តិកម្ម",
        subtitle: "LinkedIn Learning Certificate",
        tone: "developer",
        certificate:
          "https://www.linkedin.com/learning/certificates/eb86cccf93a9f98d4e93bbe424a9007b6c30cca1515f6ceb7dbabdf3d6ba4a76?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQEVqMIqosp3qg/feedshare-shrink_1280/B56ZqxHZ9zJYAs-/0/1763908100193?e=1767225600&v=beta&t=qnEXfEDCAjKfygwDcGpbd0m6t8TPvY3TIre8OVyhQJM",
      },
      {
        title: "ការសិក្សាអំពី Docker",
        subtitle: "LinkedIn Learning Certificate",
        tone: "developer",
        certificate:
          "https://www.linkedin.com/learning/certificates/4936c6028cf9b9c59e5e00d085b4e1d481cfd3f7cf835a39d3a3024497313682?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQEfk5oJRBXHnQ/feedshare-shrink_1280/B56ZojrZssJwAs-/0/1761535171832?e=1767225600&v=beta&t=Qq3-KladSruVDRh0td-Y66fN0MlTRkTaiWEEe1pnLwY",
      },
      {
        title: "ការគ្រប់គ្រងហិរញ្ញវត្ថុផ្ទាល់ខ្លួន",
        subtitle: "Profiles Asia Pacific Inc.",
        tone: "financial",
        image: MyFinanceCert,
      },
      {
        title: "ការគិតបែបយុទ្ធសាស្ត្រ (Strategic Thinking)",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/f999bd49ce3ba44a4fb83e3473c7b778a858cf326409b77db75be76072b32c66?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQEt3Ynbpohc5g/feedshare-shrink_1280/B56ZoOpLKBKIAs-/0/1761182266294?e=1767225600&v=beta&t=7fJj-CF4hr2roDFA9oW2xU7IaI_l7YODPjLqGjkN9Js",
      },
      {
        title: "ការប្រើប្រាស់គំនិតចង់ស្រាវជ្រាវ (Applied Curiosity)",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/d10754322927e6566dd1efaaf47b66896377f081da683d352f68b6a6d05890dc?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQFQKAKLxL9x8w/feedshare-shrink_1280/B56ZpVR_RzG0As-/0/1762367370649?e=1767225600&v=beta&t=XZR3WxJlC4S25mEvtAHd00g2uVxwcXOLWGtJToyr1Vw",
      },
      {
        title: "យុទ្ធសាស្ត្រដឹកនាំសម្រាប់ពិភព VUCA",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/ed8e3e1c4c931c0ed62aab362e0c9ebcf2743367a83258d5c20f8a1b811e3ef5?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQEXYIUDazklAQ/feedshare-shrink_1280/B56ZqxHfRmI0As-/0/1763908121958?e=1767225600&v=beta&t=NS3DJ1h-Lrqvp594HOgBTaDnFazpwpfrD1zRmAzKEF8",
      },
      {
        title: "ការអភិវឌ្ឍផ្នត់គំនិតនៃការរៀនសូត្រ",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/ac13ede550b13131ca0dc5093438ef81c07632bb434c9116a32d57b2aca4bb11?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQERfj3sWshlOQ/feedshare-shrink_1280/B56ZpVOBQhHYA0-/0/1762366330183?e=1767225600&v=beta&t=NtNo4pzCR63_nt7_CUxKBZPe2b3kjmTJWFpveV6pa7Y",
      },
      {
        title: "ការបំពេញការងារឱ្យបានសម្រេច (GTD)",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/ae15e9dec2bc99bfb64414328a0dda577a51e7ec29db80f0d5ef84b7f72b55a9?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQE9CHuOK-KjtQ/feedshare-shrink_1280/B56ZpV5PNUIcAs-/0/1762377659468?e=1767225600&v=beta&t=ZUAV6tJDB_mvVortV1A0wr80Ek-ne1wW1j1ksq79zG0",
      },
      {
        title: "ការរុករកភាពមិនច្បាស់លាស់ (Navigating Ambiguity)",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/e57c9f29b1a1aa0da688c648cab30c9ee5eba9dad0e55b4aaf603284367b3632?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D4E22AQGQJeKAyIU17Q/feedshare-shrink_1280/B4EZpZxwxHKYAs-/0/1762442808668?e=1767225600&v=beta&t=S3HCcEPltqVxLvM7Wgm34gwLqdnvfrQMPyoinzet5wg",
      },
      {
        title: "ការកំណត់ចក្ខុវិស័យ៖ ភាពច្បាស់លាស់នៃគោលដៅ",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/17e99166099f8fb9f740deff9960a3a2375d0b7ab6f0134fd616d04a328d68d9?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQE78SsRt7226g/feedshare-shrink_1280/B56ZpAps4cHAAs-/0/1762021265165?e=1767225600&v=beta&t=ua253B6lc8LIobmxLkCNGk4X-5MpNlWN1T6XK1xcv4s",
      },
      {
        title: "ជំនាញទាំង ៦ នៃអ្នកជំនាញសកម្ម",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/321ea5fb83104390f9415188faadb7e18e67776998c82f7d6870ccffb535bfec?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQH4j9F_K9njrg/feedshare-shrink_1280/B56ZpVvGGlJkAw-/0/1762375000760?e=1767225600&v=beta&t=kDH6lHT_GOfZxWPPiwIK7yuBT-NjJKdoBVfPorwNhHQ",
      },
      {
        title: "ការផ្តល់លទ្ធផលប្រកបដោយប្រសិទ្ធភាព",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/a048f090f82ab871dda6d7e042f059d2d8160267985614336ce0fd405e3640bc?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQELEbvLQ8Tk8g/feedshare-shrink_1280/B56Zo1NVKeJQAw-/0/1761829278618?e=1767225600&v=beta&t=T7Rr7Cg0jzTIoM60ithzfaP04I0t5lOEnnC-C3hCTQM",
      },
      {
        title: "ការអភិវឌ្ឍការយល់ដឹងអំពីអាជីវកម្ម (2016)",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/ec08bab3a981f037e968e14ccdd7ed54fd59bcda7dbc675611c74c458da1f375?u=343535298&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlRvtVhn2TXyyJ6%2FR%2Br5obw%3D%3D",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQEiYRUg7jI1jA/feedshare-shrink_1280/B56ZoeFGSBIcAw-/0/1761441244539?e=1767225600&v=beta&t=SGtweE39PjzZk8-TvQcEYMFZYun0NMKdsbl8VTlVeIA",
      },
      {
        title: "ការសម្រេចចិត្តថ្នាក់ដឹកនាំ",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/48344bc92185a1acfa7d31a8ddf625fc4a83d415974457e0e2bf6c15ea7e5704?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D5622AQEVhiaunz6RVg/feedshare-shrink_1280/B56ZoTnGZNKIAs-/0/1761265609655?e=1767225600&v=beta&t=kYCQPTaaE--HxXzq1anLaYw_K860cfte5je7uKrbniA",
      },
      {
        title: "ការកែលម្អការវិនិច្ឆ័យដើម្បីការសម្រេចចិត្តប្រសើរជាងមុន",
        subtitle: "LinkedIn Learning Certificate",
        tone: "linkedin",
        certificate:
          "https://www.linkedin.com/learning/certificates/a3cca6ed3d5bef65e89f566978c1ad8653626bdbccf21bd8cfd721265ef25b3f?u=343535298",
        image:
          "https://media.licdn.com/dms/image/v2/D4E22AQGhoGBLRd25kA/feedshare-shrink_1280/B4EZpZ9f6aKoAs-/0/1762445885408?e=1767225600&v=beta&t=nlB6rAiePh6vG-cIVobuMNpqXjWoz-e0mJoNBWv-9VA",
      },
    ],
    hobbies: [
      {
        name: "Coding",
        emoji: "💻",
        description: "សរសេរកូដ និងសាកល្បងបណ្ណាល័យថ្មីៗ។",
        image: "https://placehold.co/600x400/0f172a/22c55e?text=Code+Playground",
      },
      {
        name: "Tech Research",
        emoji: "🔬",
        description: "ស្វែងយល់អំពីបច្ចេកវិទ្យាថ្មី និងការប្រើប្រាស់ឧបករណ៍ថ្មីៗ។",
        image: "https://placehold.co/600x400/111827/3b82f6?text=Research+Notes",
      },
      {
        name: "Gaming",
        emoji: "🎮",
        description: "លេងហ្គេមជាមួយមិត្តភក្តិ ដើម្បីសម្រាក និងកម្សាន្ត។",
        image: "https://placehold.co/600x400/0b1120/f97316?text=Gaming+Session",
      },
      {
        name: "កីឡាបាល់ទាត់",
        emoji: "⚽",
        description: "លេងបាល់ទាត់ថ្ងៃចុងសប្ដាហ៍ ដើម្បីរក្សាសុខភាព និងសន្និបាតជាក្រុម។",
        image: "https://placehold.co/600x400/0f172a/22c55e?text=Football+Field",
      },
      {
        name: "ជិះកង់",
        emoji: "🚴",
        description: "ជិះកង់ក្នុងទីក្រុង ដើម្បីសិក្សាផ្លូវថ្មីៗ និងសម្រាកខ្លួន។",
        image: "https://placehold.co/600x400/111827/38bdf8?text=City+Ride",
      },
      {
        name: "Camping & Riding Trips",
        emoji: "🏕️",
        description: "ដំណើរកម្សាន្តក្រៅក្រុង បោះជំរុំ និងជិះកង់បន្តិចឆ្ងាយ។",
        image: "https://placehold.co/600x400/0b1120/a855f7?text=Camping+Trail",
      },
    ],
    labels: {
      heroContact: "ទាក់ទងខ្ញុំ",
      experienceTitle: "ដំណើរការងារ",
      skillsTitle: "ជំនាញ & បច្ចេកវិទ្យា",
      projectsTitle: "គម្រោងដែរបានបង្កើត",
      hobbiesTitle: "ចំណង់ចំណូលចិត្ត",
      achievementsTitle: "សមិទ្ធផល និងវិញ្ញាបនបត្រ",
    },
    projectCtas: { demo: "សាកល្បងផ្ទាល់", code: "កូដ GitHub" },
    achievementsCta: { certificate: "វិញ្ញាបនបត្រ" },
    footer: {
      title: "សហការគ្នាបង្កើតអ្វីដែលអស្ចារ្យ",
      description:
        "ត្រៀមខ្លួនដើម្បីធ្វើឱ្យគំនិតរបស់អ្នកក្លាយជាការពិតហើយឬនៅ? ខ្ញុំរីករាយជានិច្ចក្នុងការសហការលើគម្រោងថ្មីៗ និងជួយប្រែក្លាយចក្ខុវិស័យរបស់អ្នកឱ្យចេញជារូបរាង។",
      resume: "មើលប្រវត្តិរូបពេញ",
    },
    github: {
      title: "ការរួមចំណែកលើ GitHub",
      subtitle: (username) =>
        `ទិន្នន័យបន្តផ្ទាល់ពី GitHub GraphQL API • ${username}`,
      contributionMessages: {
        loading: "កំពុងផ្ទុកទិន្នន័យ...",
        sampleFallback: "បង្ហាញទិន្នន័យគំរូ។",
        success: "ទាញយកទិន្នន័យ GitHub រួចរាល់។",
      },
      statsMessages: {
        loading: "កំពុងផ្ទុកស្ថិតិ GitHub...",
        fallback: "បង្ហាញស្ថិតិដើម។",
        success: "ទាញយកស្ថិតិ GitHub រួចរាល់។",
      },
      statLabels: {
        followers: "អ្នកតាមដាន",
        following: "កំពុងតាម",
        repositories: "Repositories",
        commits: "Commits",
      },
      graphCopy: {
        locale: "km-KH",
        weekdays: ["ចន្ទ", "ពុធ", "សុក្រ"],
        less: "តិច",
        more: "ច្រើន",
        sampleLabel: "បង្ហាញទិន្នន័យគំរូ",
        contributionsLabel: "ការចូលរួម",
        inLabel: "ក្នុង",
        sampleTag: "គំរូ",
        unknownDate: "N/A",
      },
    },
    resumeUrl: "https://jcorpdev.online/mycv",
  },
};

const App = () => {
  const [language, setLanguage] = useState("en");
  const active = translations[language];
  const isKhmer = language === "km";

  const githubStats = useMemo(
    () => githubDefaultStats(active.github.statLabels),
    [active.github.statLabels]
  );

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "en" ? "km" : "en"));

  return (
    <div
      className={`min-h-screen bg-black text-white selection:bg-blue-500/30 ${
        isKhmer ? "font-khmer lang-km" : ""
      }`}
    >
      <Navbar language={language} onToggleLanguage={toggleLanguage} />

      <main className="max-w-6xl mx-auto p-6 lg:p-8 space-y-24">
        <Hero
          profile={active.profile}
          socials={defaultSocials}
          ctaLabel={active.labels.heroContact}
        />
        <ScrollReveal>
          <ExperienceSection
            experiences={active.experiences}
            title={active.labels.experienceTitle}
          />
        </ScrollReveal>
        <ScrollReveal>
          <SkillsSection
            skills={buildSkills()}
            title={active.labels.skillsTitle}
          />
        </ScrollReveal>
        <ScrollReveal>
          <ProjectsSection
            projects={active.projects}
            title={active.labels.projectsTitle}
            ctaLabels={active.projectCtas}
          />
        </ScrollReveal>
        <ScrollReveal>
          <AchievementsSection
            achievements={active.achievements}
            title={active.labels.achievementsTitle}
            certificateLabel={active.achievementsCta.certificate}
          />
        </ScrollReveal>
        <ScrollReveal>
          <GithubSection stats={githubStats} copy={active.github} />
        </ScrollReveal>
        <ScrollReveal>
          <HobbySection hobbies={active.hobbies} title={active.labels.hobbiesTitle} />
        </ScrollReveal>
        <ScrollReveal>
          <FooterCTA
            email={active.profile.email}
            resumeUrl={active.resumeUrl}
            copy={active.footer}
          />
        </ScrollReveal>
      </main>
    </div>
  );
};

export default App;
