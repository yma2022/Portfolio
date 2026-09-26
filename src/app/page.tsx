import Link from 'next/link';

import { Intro } from '@/components/intro';
import { WorkEntry } from '@/components/work-entry';
import { work } from '@/lib/work';

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell">
      <Intro />
      <section
        id="selected-work"
        aria-labelledby="work-title"
        className="chapter"
      >
        <div className="section-intro">
          <p className="eyebrow">01 / Selected work</p>
          <div>
            <h2 id="work-title">Ideas, made real.</h2>
            <p className="muted-copy">
              A few explorations in intelligence, information, and the systems
              that connect them.
            </p>
          </div>
          <Link href="/work/" className="text-link">
            All work <span aria-hidden="true">↗</span>
          </Link>
        </div>
        {work.slice(0, 2).map((project) => (
          <WorkEntry key={project.slug} project={project} />
        ))}
        <div className="other-work">
          {work.slice(2).map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}/`}>
              <span className="eyebrow">
                {project.number} / {project.focus}
              </span>
              <span>
                {project.title}
                <span aria-hidden="true">↗</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section aria-labelledby="focus-title" className="chapter focus-chapter">
        <div className="section-intro">
          <p className="eyebrow">02 / Engineering focus</p>
          <h2 id="focus-title">
            From the interface
            <br />
            to the infrastructure.
          </h2>
        </div>
        <div className="focus-list">
          <article>
            <span className="focus-symbol" aria-hidden="true">
              ↗
            </span>
            <h3>Applied intelligence</h3>
            <p>
              Agents that retrieve, reason, and teach. Exploring how language
              models become useful tools through structured workflows.
            </p>
            <span className="eyebrow">LangGraph / Python / OpenAI</span>
          </article>
          <article>
            <span className="focus-symbol" aria-hidden="true">
              ⌘
            </span>
            <h3>Connected systems</h3>
            <p>
              The backend work that holds an experience together: services, data
              processing, and reliable platforms.
            </p>
            <span className="eyebrow">Go / PostgreSQL / AWS</span>
          </article>
          <article>
            <span className="focus-symbol" aria-hidden="true">
              ↔
            </span>
            <h3>End-to-end products</h3>
            <p>
              Bringing the pieces into a usable whole, from web interfaces to
              mobile applications and the services behind them.
            </p>
            <span className="eyebrow">TypeScript / React / Node.js</span>
          </article>
        </div>
      </section>
      <section
        aria-labelledby="journey-title"
        className="chapter journey-teaser"
      >
        <p className="eyebrow">03 / The path so far</p>
        <div>
          <h2 id="journey-title">
            Always building.
            <br />
            <span className="quiet-text">Still curious.</span>
          </h2>
          <p className="muted-copy">
            From computer science at Georgia Tech to data platforms at Amazon,
            AI education at EduPolaris, and financial technology at Numo.
          </p>
          <div className="inline-links">
            <Link href="/experience/" className="text-link">
              Explore my experience <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/about/" className="text-link">
              The person behind the work <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
