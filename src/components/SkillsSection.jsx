import { Code2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SkillCard from "./SkillCard";

const SkillsSection = ({ skills, title = "Tech Arsenal" }) => (
  <section>
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
          <Code2 className="w-6 h-6 text-cyan-400" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-white">{title}</h2>
      </div>
      <div className="h-px bg-linear-to-r from-cyan-500/50 via-blue-500/50 to-transparent w-full" />
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {skills.map((skill, idx) => (
        <ScrollReveal key={skill.name} delay={idx * 40} className="h-full">
          <SkillCard {...skill} />
        </ScrollReveal>
      ))}
    </div>
  </section>
);

export default SkillsSection;
