import { Experience } from '@/components/experience';
import { assetPath } from '@/lib/asset-path';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata(
  'Experience',
  'Youlong Ma’s engineering journey through financial technology, AI education, data platforms, and computer science.',
  '/experience/'
);

export default function ExperiencePage() {
  return (
    <main id="main-content" tabIndex={-1} className="page-shell inner-page">
      <header className="page-heading">
        <p className="eyebrow">Experience / An evolving practice</p>
        <h1>
          Different scales.
          <br />
          <span className="quiet-text">The same curiosity.</span>
        </h1>
        <p className="page-lede">
          Financial platforms, AI-driven education, and data systems. A path
          shaped by building, learning, and taking on the next problem.
        </p>
        <a className="text-link" href={assetPath('/yma2022.pdf')} download>
          Download CV <span aria-hidden="true">↓</span>
        </a>
      </header>
      <Experience />
    </main>
  );
}
