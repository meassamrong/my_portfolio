import ScrollReveal from "./ScrollReveal";

const HobbySection = ({ hobbies = [], title = "Hobbies" }) => (
  <section>
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-linear-to-br from-emerald-500/15 to-cyan-400/15 rounded-xl border border-emerald-500/30">
          <span className="text-emerald-300 text-lg font-bold">🙂</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-white">{title}</h2>
      </div>
      <div className="h-px bg-linear-to-r from-emerald-500/40 via-cyan-400/40 to-transparent w-full" />
    </div>

    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-px bg-linear-to-b from-emerald-500/40 via-cyan-400/25 to-transparent pointer-events-none" />
      <div className="space-y-10">
        {hobbies.map((hobby, idx) => (
          <ScrollReveal key={hobby.name} delay={idx * 80}>
            <div className="relative pl-12">
              <div className="absolute left-4 top-2 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]" />
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-lg">
                    {hobby.emoji || "⭐"}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{hobby.name}</h3>
                </div>
                {hobby.description && (
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {hobby.description}
                  </p>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default HobbySection;
