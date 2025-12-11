import { useEffect, useMemo, useState } from "react";
import myPhoto from '../assets/meassamrong_photo.jpg'

const Navbar = ({ language = "en", onToggleLanguage }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const nextLanguageLabel = useMemo(() => (language === "en" ? "ខ្មែរ" : "English"), [language]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-6 py-3 bg-black/50 backdrop-blur-md font-mono border-b border-gray-800/50">
      <nav className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <a
          className="flex gap-2 items-center text-white hover:opacity-80 transition-opacity"
          href="/"
        >
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 p-0.5">
            <img
              src={myPhoto}
              alt="logo"
              className="w-full h-full rounded-full object-cover border-2 border-black"
            />
          </div>
          <span className="text-lg font-bold tracking-tight">Meas Samrong Portfolio</span>
        </a>
        <div className="flex items-center gap-3">
          {/* <div className="text-gray-400 text-sm hidden sm:block font-variant-numeric tabular-nums">
            {time}
          </div> */}
          <button
            type="button"
            onClick={onToggleLanguage}
            className="px-3 py-1.5 rounded-full border border-blue-500/40 text-sm text-gray-100 hover:bg-blue-600/20 transition-colors"
            aria-label="Toggle language"
          >
            {nextLanguageLabel}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
