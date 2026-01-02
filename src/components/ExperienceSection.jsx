import { Layout } from "lucide-react";
import ExperienceItem from "./ExperienceItem";

const ExperienceSection = ({ experiences, title = "Professional Journey" }) => (
  <section>
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
          <Layout className="w-6 h-6 text-blue-400" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-white">{title}</h2>
      </div>
      <div className="h-px bg-linear-to-r from-blue-500/50 via-purple-500/50 to-transparent w-full" />
    </div>

    <div className="space-y-4">
      {experiences.map((item, idx) => (
        <div
          key={item.company + item.role}
          data-aos="fade-up"
          data-aos-delay={idx * 80}
        >
          <ExperienceItem {...item} />
        </div>
      ))}
    </div>
  </section>
);

export default ExperienceSection;
