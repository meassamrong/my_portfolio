const ExperienceItem = ({ role, company, date, description, points }) => (
  <div className="space-y-6 relative border-l border-blue-500/20 ml-3 pl-8 pb-12 last:pb-0">
    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-black shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2">
      <div>
        <h3 className="text-2xl font-bold text-white">{company}</h3>
        <p className="text-blue-400 font-medium text-lg">{role}</p>
      </div>
      <span className="text-gray-400 font-mono text-sm bg-gray-900/50 px-3 py-1 rounded-full border border-gray-800">
        {date}
      </span>
    </div>
    <p className="text-lg text-gray-300 mb-2 leading-relaxed">{description}</p>
    <ul className="space-y-3">
      {points.map((point, idx) => (
        <li key={idx} className="flex items-start gap-3 text-gray-400 text-base">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2.5 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
          <span className="leading-relaxed">{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ExperienceItem;
