'use client';

import { motion } from 'framer-motion';

import { useActiveSection } from '@/components/active-section-provider';
import { links } from '@/lib/data';

export const Navbar = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSection();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Main navigation"
        className="bg-background/70 mx-auto mt-4 flex w-fit max-w-[calc(100%-1rem)] items-center rounded-full border border-white/10 px-1 py-2 shadow-lg shadow-black/20 backdrop-blur-md sm:gap-1 sm:px-4"
      >
        {links.map((link) => (
          <a
            key={link.hash}
            href={link.hash}
            aria-current={activeSection === link.name ? 'location' : undefined}
            onClick={() => {
              setActiveSection(link.name);
              setTimeOfLastClick(Date.now());
            }}
            className="focus-visible:ring-brand relative rounded-full p-2 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 sm:px-3 sm:py-1.5 sm:text-sm"
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
