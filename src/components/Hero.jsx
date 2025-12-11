import { Calendar, Github, Linkedin, Mail, MapPin } from "lucide-react";

const Hero = ({ profile, socials, ctaLabel = "Contact Me" }) => (
  <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 mt-10 mb-16">
      <div className="flex flex-col items-center lg:items-start shrink-0">
        <div className="relative w-48 h-48 mb-8 rounded-full ring-4 ring-gray-900 overflow-hidden bg-linear-to-br from-blue-900 to-purple-900 shadow-2xl shadow-blue-900/20">
          <img alt={profile.name} className="object-cover w-full h-full scale-110" src={profile.avatar} />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 bg-gray-900/50 px-4 py-1.5 rounded-full border border-gray-800">
          <MapPin className="w-4 h-4 text-blue-400" />
          {profile.location}
        </div>

        <div className="flex w-full items-center gap-6 justify-center lg:justify-start">
          {socials.map(({ Icon, href, color }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${color} transition-transform hover:scale-110 duration-200`}
            >
              <Icon className="w-7 h-7" />
            </a>
          ))}
        </div>
      </div>

      <div className="flex-1 text-center lg:text-left pt-4">
        <div className="flex justify-center lg:justify-start items-center gap-4 mb-6">
          <a
            className="flex items-center gap-2 border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-all duration-300 py-2 px-5 rounded-full text-sm font-medium group"
            href={`mailto:${profile.email}`}
          >
            <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{ctaLabel}</span>
          </a>
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold mb-4 tracking-tight bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          {profile.name}
        </h1>
        <p className="text-xl text-blue-400/90 mb-6 font-medium">{profile.title}</p>
        <p className="text-gray-400 leading-relaxed text-lg max-w-2xl mx-auto lg:mx-0 font-light">
          {profile.bio}
        </p>
      </div>
    </div>
  </section>
);

export const defaultSocials = [
  {
    Icon: Github,
    href: "https://github.com/meassamrong/",
    color: "text-gray-200 hover:text-white",
  },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/samrong-meas",
    color: "text-blue-500 hover:text-blue-400",
  },
  {
    Icon: Mail,
    href: "mailto:meassamrong99@gmail.com",
    color: "text-gray-200 hover:text-white",
  },
];

export default Hero;
