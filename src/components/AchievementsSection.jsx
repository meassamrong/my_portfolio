import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Code2, Database, ExternalLink, Shield, Video, Linkedin, DollarSign, X } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const achievementsIcons = {
  developer: <Code2 className="w-6 h-6 text-blue-400" />,
  data: <Database className="w-6 h-6 text-purple-400" />,
  security: <Shield className="w-6 h-6 text-green-400" />,
  media: <Video className="w-6 h-6 text-pink-400" />,
  linkedin: <Linkedin className="w-6 h-6 text-sky-500" />,
  financial: <DollarSign className="w-6 h-6 text-pink-400" />
};

const AchievementsSection = ({
  achievements = [],
  title = "Achievements & Certifications",
  certificateLabel = "Certificate",
}) => {
  const [lightbox, setLightbox] = useState({ open: false, src: "", alt: "" });
  const [isMobile, setIsMobile] = useState(false);

  const openLightbox = (src, alt) => setLightbox({ open: true, src, alt });
  const closeLightbox = () => setLightbox({ open: false, src: "", alt: "" });

  // Disable per-card reveal animations on mobile to avoid elements staying hidden
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateMatch = () => setIsMobile(mediaQuery.matches);
    updateMatch();
    const subscribe = mediaQuery.addEventListener
      ? () => mediaQuery.addEventListener("change", updateMatch)
      : () => mediaQuery.addListener(updateMatch);
    const unsubscribe = mediaQuery.removeEventListener
      ? () => mediaQuery.removeEventListener("change", updateMatch)
      : () => mediaQuery.removeListener(updateMatch);
    subscribe();
    return unsubscribe;
  }, []);

  // Prevent background scrolling
  useEffect(() => {
    if (lightbox.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightbox.open]);

  // Handle ESC key
  useEffect(() => {
    const onEsc = (event) => {
      if (event.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <section>
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
            <ExternalLink className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">{title}</h2>
        </div>
        <div className="h-px bg-linear-to-r from-green-500/50 via-emerald-500/50 to-transparent w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map(({ title, subtitle, tone, certificate, image }, idx) => {
          const Card = (
            <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/30 flex items-start gap-4 h-full">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                {achievementsIcons[tone] || achievementsIcons.developer}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">{title}</h3>
                <p className="text-gray-400 text-sm">{subtitle}</p>
                {image && (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => openLightbox(image, `${title} certificate`)}
                      className="group block w-full text-left focus:outline-none"
                    >
                      <img
                        src={image}
                        alt={`${title} certificate`}
                        loading="lazy"
                        className="w-full max-h-64 object-cover rounded-lg border border-gray-800 transition-transform duration-300 group-hover:scale-[1.02] group-hover:border-blue-500/40 cursor-zoom-in"
                      />
                    </button>
                  </div>
                )}
                {certificate && (
                  <a
                    href={certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mt-3"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{certificateLabel}</span>
                  </a>
                )}
              </div>
            </div>
          );

          if (isMobile) {
            return (
              <div key={title} className="h-full">
                {Card}
              </div>
            );
          }

          return (
            <ScrollReveal key={title} delay={idx * 80} className="h-full">
              {Card}
            </ScrollReveal>
          );
        })}
      </div>
      {lightbox.open && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 w-screen h-screen top-0 left-0"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-5xl w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-12 right-0 md:-right-4 md:-top-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-md transition-all z-50 border border-white/20"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl bg-black border border-gray-800"
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default AchievementsSection;
