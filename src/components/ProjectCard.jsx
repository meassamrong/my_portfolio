import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";

const normalizeImages = (image, images) => {
  if (Array.isArray(images) && images.length) return images;
  if (image) return [image];
  return ["https://placehold.co/600x400/0f172a/3b82f6?text=Project+Preview"];
};

const ProjectCard = ({
  title,
  description,
  image,
  images,
  demoLink,
  gitLink,
  techIcons,
  ctaLabels = { demo: "Live Demo", code: "GitHub" },
}) => {
  const imageList = useMemo(() => normalizeImages(image, images), [image, images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  useEffect(() => {
    if (imageList.length <= 1 || lightbox.open) return undefined;
    const id = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % imageList.length),
      4500
    );
    return () => clearInterval(id);
  }, [imageList, lightbox.open]);

  useEffect(() => {
    if (!lightbox.open || typeof document === "undefined") return undefined;
    const onEsc = (event) => {
      if (event.key === "Escape") setLightbox({ open: false, index: 0 });
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onEsc);
    };
  }, [lightbox.open]);

  const showImage = (index) => {
    setActiveIndex(index);
    setLightbox({ open: true, index });
  };

  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % imageList.length);

  const goPrevLightbox = (event) => {
    event.stopPropagation();
    setLightbox((prev) => {
      const nextIndex = (prev.index - 1 + imageList.length) % imageList.length;
      setActiveIndex(nextIndex);
      return { open: true, index: nextIndex };
    });
  };

  const goNextLightbox = (event) => {
    event.stopPropagation();
    setLightbox((prev) => {
      const nextIndex = (prev.index + 1) % imageList.length;
      setActiveIndex(nextIndex);
      return { open: true, index: nextIndex };
    });
  };

  const currentImage = imageList[activeIndex] || imageList[0];

  return (
    <>
      <div className="group rounded-xl overflow-hidden border border-blue-500/20 bg-gray-900/20 hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full">
        <div className="aspect-video overflow-hidden relative">
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {imageList.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
                {imageList.map((_, idx) => (
                  <button
                    key={`${title}-dot-${idx}`}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === activeIndex ? "bg-white w-6" : "bg-white/50"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          <button
            type="button"
            onClick={() => showImage(activeIndex)}
            className="absolute right-3 top-3 z-20 px-3 py-1.5 text-xs font-medium text-white bg-blue-600/70 hover:bg-blue-600 rounded-full backdrop-blur-sm transition-colors"
          >
            Quick view
          </button>

          <img
            src={currentImage}
            alt={title}
            loading="lazy"
            onClick={() => showImage(activeIndex)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out cursor-zoom-in"
          />
        </div>
        <div className="p-6 flex flex-col grow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-3 text-gray-400">{techIcons}</div>
          </div>
          <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3 text-sm grow">
            {description}
          </p>
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

      {lightbox.open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox({ open: false, index: 0 })}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative max-w-5xl w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightbox({ open: false, index: 0 })}
                className="absolute -top-12 right-0 md:-top-4 md:-right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-md transition-all z-50 border border-white/20"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              {imageList.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrevLightbox}
                    className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-md transition-all border border-white/20"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={goNextLightbox}
                    className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-md transition-all border border-white/20"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              <img
                src={imageList[lightbox.index]}
                alt={`${title} preview ${lightbox.index + 1}`}
                className="w-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl bg-black border border-gray-800"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ProjectCard;
