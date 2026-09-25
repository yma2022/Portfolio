import Link from 'next/link';

import { ProjectArt } from '@/components/project-art';
import type { Work } from '@/lib/work';

export function WorkEntry({
  project,
  headingAs: Heading = 'h3',
}: {
  project: Work;
  headingAs?: 'h2' | 'h3';
}) {
  return (
    <article className="work-entry">
      <Link
        href={`/work/${project.slug}/`}
        className="work-art-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProjectArt kind={project.art} />
      </Link>
      <div className="work-copy">
        <p className="eyebrow">
          <span>{project.number}</span>
          <span>{project.focus}</span>
        </p>
        <Heading>
          <Link href={`/work/${project.slug}/`}>
            {project.title}
            <span className="work-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </Heading>
        <p className="work-thesis">{project.thesis}</p>
        <p className="muted-copy">{project.summary}</p>
        <ul
          className="tech-inline"
          aria-label={`${project.title} technologies`}
        >
          {project.technologies.slice(0, 4).map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <Link className="text-link" href={`/work/${project.slug}/`}>
          Explore project <span className="sr-only">{project.title}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
