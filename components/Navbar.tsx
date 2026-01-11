
import React from 'react';
import { 
  User, 
  Zap, 
  Terminal, 
  Briefcase, 
  Folder 
} from 'lucide-react';

const Navbar: React.FC = () => {
  const navLinks = [
    { name: 'About', href: '#about', icon: <User size={18} /> },
    { name: 'Expertise', href: '#expertise', icon: <Zap size={18} /> },
    { name: 'Skills', href: '#skills', icon: <Terminal size={18} /> },
    { name: 'Experience', href: '#experience', icon: <Briefcase size={18} /> },
    { name: 'Projects', href: '#projects', icon: <Folder size={18} /> },
  ];

  return (
    <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-auto max-w-fit px-2">
      <div className="glass px-6 md:px-8 py-3 rounded-2xl md:rounded-full border border-white/10 flex items-center gap-8 md:gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="group relative flex flex-col items-center transition-all"
          >
            {/* Icon Wrapper */}
            <div className="text-slate-500 group-hover:text-sky-400 group-hover:scale-110 transition-all duration-300 ease-out">
              {link.icon}
            </div>

            {/* Holographic Hover Label */}
            <div className="absolute top-full pt-2 pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out block whitespace-nowrap mono text-[9px] font-black text-sky-400 tracking-[0.2em] uppercase bg-slate-900/90 px-2 py-0.5 rounded border border-sky-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                {link.name}
              </span>
            </div>

            {/* Invisible expanded hit area for easier clicking */}
            <div className="absolute -inset-2 rounded-full" />
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
