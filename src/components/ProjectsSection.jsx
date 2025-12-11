import { Box, Database, Github, Server } from "lucide-react";
import TechIcons from "./TechIcons";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./ScrollReveal";

const ProjectsSection = ({ projects, title = "Featured Projects", ctaLabels }) => (
  <section>
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
          <Box className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-white">{title}</h2>
      </div>
      <div className="h-px bg-linear-to-r from-purple-500/50 via-pink-500/50 to-transparent w-full" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, idx) => (
        <ScrollReveal key={project.title} delay={idx * 100} className="h-full">
          <ProjectCard {...project} ctaLabels={ctaLabels} />
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export const projectTechIcons = {
  nodeReact: (
    <>
      <TechIcons.Node className="w-5 h-5 text-green-500" />
      <TechIcons.React className="w-5 h-5 text-cyan-400" />
    </>
  ),
  nodeVue: (
    <>
      <TechIcons.Node className="w-5 h-5 text-green-500" />
      <TechIcons.Vue className="w-5 h-5 text-green-400" />
    </>
  ),
  nodeNuxtMongo: (
    <>
      <TechIcons.Nuxt className="w-5 h-5 text-green-400" />
      <TechIcons.Node className="w-5 h-5 text-green-500" />
      <TechIcons.Mongodb className="w-5 h-5 text-green-400" />
    </>
  ),
  vueJs: (
    <>
      <TechIcons.Vue className="w-5 h-5 text-green-400" />
      <TechIcons.JavaScript className="w-5 h-5 text-yellow-400" />
    </>
  ),
  nodeDb: (
    <>
      <TechIcons.Node className="w-5 h-5 text-green-500" />
      <Database className="w-5 h-5 text-gray-400" />
    </>
  ),
  serverPython: (
    <>
      <Server className="w-5 h-5 text-gray-400" />
      <TechIcons.Python className="w-5 h-5 text-blue-400" />
    </>
  ),
  placeholder: (
    <>
      <Github className="w-5 h-5 text-white" />
    </>
  ),
};

export default ProjectsSection;
