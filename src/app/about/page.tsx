import Link from 'next/link';

import EmailReveal from '@/components/email';
import { Skills } from '@/components/skills';
import { SkillsExplorer } from '@/components/skills-explorer';
import { assetPath } from '@/lib/asset-path';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'About',
  'Meet Youlong Ma, a software engineer drawn to challenging problems, AI-driven tools, and the systems behind them.',
  '/about/'
);

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell inner-page">
      <header className="page-heading">
        <p className="eyebrow">The person behind the systems</p>
        <h1>
          Curiosity is
          <br />
          <span className="quiet-text">the common thread.</span>
        </h1>
      </header>
      <section className="about-story" aria-labelledby="about-title">
        <div className="portrait-study">
          <div className="portrait-orbits" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath('/avatar.webp')}
            width={224}
            height={224}
            alt="Illustrated portrait of Youlong Ma"
            fetchPriority="high"
          />
          <p className="eyebrow">Youlong Ma / Always learning</p>
        </div>
        <div>
          <h2 id="about-title">
            I like the part where
            <br />
            the pieces start to fit.
          </h2>
          <p>
            I’m Youlong, a full-stack engineer drawn to challenging problems and
            the work of turning them into robust software.
          </p>
          <p>
            My work spans AI-driven education platforms, compiler development,
            and backend systems. I enjoy moving between the details of an
            implementation and the larger system it belongs to.
          </p>
          <p>
            I’m always exploring emerging technologies and sharing what I learn.
            That curiosity runs through the projects here: agents that teach,
            tools that retrieve, and systems that make information useful.
          </p>
          <div className="inline-links">
            <Link className="text-link" href="/experience/">
              My professional path <span aria-hidden="true">↗</span>
            </Link>
            <EmailReveal />
          </div>
        </div>
      </section>
      <section className="chapter" aria-labelledby="skills-title">
        <div className="section-intro">
          <p className="eyebrow">A working toolkit</p>
          <div>
            <h2 id="skills-title">Tools, in context.</h2>
            <p className="muted-copy">
              The languages, frameworks, and infrastructure I connect to build
              things.
            </p>
          </div>
        </div>
        <Skills />
        <SkillsExplorer />
      </section>
    </main>
  );
}
