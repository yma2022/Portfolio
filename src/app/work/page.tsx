import { WorkEntry } from '@/components/work-entry';
import { pageMetadata } from '@/lib/page-metadata';
import { work } from '@/lib/work';

export const metadata = pageMetadata(
  'Selected work',
  'Projects by Youlong Ma: multi-agent education, document retrieval, financial research, and mobile system design.',
  '/work/'
);

export default function WorkPage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell inner-page">
      <header className="page-heading">
        <p className="eyebrow">The project atlas / 01—04</p>
        <h1>
          Different questions.
          <br />
          <span className="quiet-text">A builder’s mindset.</span>
        </h1>
        <p className="page-lede">
          Experiments in AI, information, and useful software. Each project is a
          different way of connecting the pieces.
        </p>
      </header>
      <section aria-label="Selected projects" className="work-index">
        {work.map((project) => (
          <WorkEntry key={project.slug} project={project} headingAs="h2" />
        ))}
      </section>
    </main>
  );
}
