'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { links } from '@/lib/navigation';

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link href="/" className="identity" aria-label="Youlong Ma — Home">
        <span className="identity-mark" aria-hidden="true">
          ym<span>·</span>
        </span>
        <span className="identity-name">
          Youlong Ma<span>Software engineer</span>
        </span>
      </Link>
      <nav aria-label="Main navigation" className="site-nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={
              pathname.startsWith(link.href.replace(/\/$/, ''))
                ? 'page'
                : undefined
            }
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <Link className="header-contact" href="#contact">
        Let&apos;s talk <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
};
