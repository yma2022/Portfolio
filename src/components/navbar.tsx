'use client';

import { motion } from 'framer-motion';

import { useActiveSection } from '@/components/active-section-provider';
import { links } from '@/lib/data';

export const Navbar = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSection();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="bg-background/70 mx-auto mt-4 flex max-w-fit items-center gap-1 rounded-full border border-white/10 px-4 py-2 shadow-lg shadow-black/20 backdrop-blur-md">
        {links.map((link) => (
          <a
            key={link.hash}
            href={link.hash}
            onClick={() => {
              setActiveSection(link.name);
              setTimeOfLastClick(Date.now());
            }}
            className="relative px-3 py-1.5 text-sm font-medium outline-none transition-colors duration-200"
          >
            {activeSection === link.name && (
              <motion.span
                layoutId="activeSection"
                className="bg-brand/20 absolute inset-0 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={
                activeSection === link.name
                  ? 'text-brand relative'
                  : 'text-muted-foreground hover:text-foreground relative'
              }
            >
              {link.name}
            </span>
          </a>
        ))}
      </nav>
    </header>
  );
};
