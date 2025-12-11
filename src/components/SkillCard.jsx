const SkillCard = ({ name, icon: Icon, color }) => (
  <div className="group p-4 flex flex-col items-center justify-center rounded-xl border border-blue-500/20 bg-gray-900/20 hover:bg-gray-800/60 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
    <div
      className={`w-12 h-12 mb-3 flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}
    >
      <Icon className="w-8 h-8" />
    </div>
    <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
      {name}
    </span>
  </div>
);

export default SkillCard;
