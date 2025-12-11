import { ExternalLink, Github } from "lucide-react";

const ProjectCard = ({
  title,
  description,
  image,
  demoLink,
  gitLink,
  techIcons,
  ctaLabels = { demo: "Live Demo", code: "GitHub" },
}) => (
  <div className="group rounded-xl overflow-hidden border border-blue-500/20 bg-gray-900/20 hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full">
    <div className="aspect-video overflow-hidden relative">
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
    </div>
    <div className="p-6 flex flex-col grow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-3 text-gray-400">{techIcons}</div>
      </div>
      <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3 text-sm grow">{description}</p>
      <div className="flex items-center gap-4 mt-auto">
        <a
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium hover:underline decoration-blue-400/30 underline-offset-4"
        >
          <ExternalLink className="w-4 h-4" /> {ctaLabels.demo}
        </a>
        <a
          href={gitLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium hover:underline decoration-gray-400/30 underline-offset-4"
        >
          <Github className="w-4 h-4" /> {ctaLabels.code}
        </a>
      </div>
    </div>
  </div>
);

export default ProjectCard;
