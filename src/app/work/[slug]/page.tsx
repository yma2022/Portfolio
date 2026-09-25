import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProjectArt } from '@/components/project-art';
import { pageMetadata } from '@/lib/page-metadata';
import { work } from '@/lib/work';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return work.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = work.find((item) => item.slug === slug);
  return project
    ? pageMetadata(project.title, project.summary, `/work/${slug}/`)
    : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = work.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = work[index];
  const next = work[(index + 1) % work.length];
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="page-shell inner-page case-page"
    >
      <Link href="/work/" className="text-link back-link">
        <span aria-hidden="true">←</span> All work
      </Link>
      <header className="case-heading">
        <p className="eyebrow">
          Project {project.number} / {project.focus}
        </p>
        <h1>{project.title}</h1>
        <p className="case-thesis">{project.thesis}</p>
        <div className="case-meta">
          <div>
            <span className="eyebrow">Contribution</span>
            <p>{project.role}</p>
          </div>
          <div>
            <span className="eyebrow">Explore the original</span>
            <div className="inline-links">
              <a className="text-link" href={project.links.preview}>
                {project.links.github
                  ? 'Project documentation'
                  : 'View on the App Store'}{' '}
                <span aria-hidden="true">↗</span>
              </a>
              {project.links.github && (
                <a className="text-link" href={project.links.github}>
                  Source code <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>
      <figure className="case-art">
        <ProjectArt kind={project.art} />
        <figcaption>
          <span className="eyebrow">
            Study {project.number} / Abstract interpretation
          </span>
          <span>{project.artCaption}</span>
        </figcaption>
      </figure>
      <div className="case-body">
        <aside className="case-index">
          <span className="eyebrow">In this project</span>
          <nav aria-label="Project sections">
            <Link href="#context">01 Context</Link>
            <Link href="#approach">02 Approach</Link>
            <Link href="#detail">03 In focus</Link>
            <Link href="#outcome">04 Outcome</Link>
          </nav>
        </aside>
        <div className="case-narrative">
          <section id="context">
            <p className="eyebrow">01 / Context</p>
            <h2>The starting point.</h2>
            <p>{project.context}</p>
          </section>
          <section id="approach">
            <p className="eyebrow">02 / Approach</p>
            <h2>How the pieces connect.</h2>
            <p>{project.approach}</p>
            <figure className="flow-figure">
              <ol>
                {project.flow.map((step, i) => (
                  <li key={step}>
                    <span className="eyebrow">0{i + 1}</span>
                    <span>{step}</span>
                    {i < project.flow.length - 1 && (
                      <span className="flow-arrow" aria-hidden="true">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
              <figcaption>{project.flowNote}</figcaption>
            </figure>
          </section>
          <section id="detail">
            <p className="eyebrow">03 / In focus</p>
            <h2>{project.detailTitle}</h2>
            <p>{project.detail}</p>
            <ul className="case-technologies" aria-label="Technologies">
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </section>
          <section id="outcome">
            <p className="eyebrow">04 / Outcome</p>
            <h2>What came together.</h2>
            <p>{project.outcome}</p>
            <a className="text-link" href={project.links.preview}>
              {project.links.github
                ? 'Read the project documentation'
                : 'Explore Ask Eddie'}{' '}
              <span aria-hidden="true">↗</span>
            </a>
          </section>
        </div>
      </div>
      <Link href={`/work/${next.slug}/`} className="next-project">
        <span className="eyebrow">Next connection / {next.number}</span>
        <span>
          {next.title}
          <span aria-hidden="true">↗</span>
        </span>
      </Link>
    </main>
  );
}
