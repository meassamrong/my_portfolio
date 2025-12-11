import { ExternalLink, Mail, Terminal } from "lucide-react";

const FooterCTA = ({
  email,
  resumeUrl,
  copy = {
    title: "Let's Build Something Amazing",
    description:
      "Ready to bring your ideas to life? I'm always excited to collaborate on innovative projects and help transform your vision into reality.",
    resume: "View Full Resume",
  },
}) => (
  <section className="text-center pb-12 bg-gray-900/20 rounded-3xl p-8 border border-gray-800">
    <div className="inline-block p-3 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30 mb-6">
      <Terminal className="w-6 h-6 text-blue-400" />
    </div>
    <h2 className="text-3xl lg:text-5xl font-bold bg-linear-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent pt-4 pb-10">
      {copy.title}
    </h2>
    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-light">
      {copy.description}
    </p>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
      <a
        href={`mailto:${email}`}
        className="w-full flex items-center justify-center gap-2 border border-blue-500/30 text-blue-300 hover:bg-blue-500/10 transition-all duration-300 py-3 px-6 rounded-lg text-sm font-medium"
      >
        <Mail className="w-5 h-5" />
        {email}
      </a>
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 border border-blue-500/30 text-blue-300 hover:bg-blue-500/10 transition-all duration-300 py-3 px-6 rounded-lg text-sm font-medium"
      >
        <ExternalLink className="w-5 h-5" />
        {copy.resume}
      </a>
    </div>
  </section>
);

export default FooterCTA;
