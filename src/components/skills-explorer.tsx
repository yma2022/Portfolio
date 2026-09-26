'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import { skillGraph } from '@/lib/skill-graph';

const TechSkillsTree = dynamic(() => import('@/components/SkillTree'), {
  ssr: false,
  loading: () => (
    <p role="status" className="p-6 text-sm text-muted-foreground">
      Loading skill map&hellip;
    </p>
  ),
});

export const SkillsExplorer = () => {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="group mt-12 w-full border-t pt-6"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="w-fit cursor-pointer rounded py-2 text-sm font-medium text-brand">
        Explore my skill connections
      </summary>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        An interactive map of the tools I work with. Drag a node to explore its
        connections.
      </p>
      {open && <TechSkillsTree />}
      <details className="mt-4">
        <summary className="w-fit cursor-pointer rounded py-2 text-sm text-muted-foreground">
          Read the connections as text
        </summary>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          {skillGraph.links.map(({ source, target }) => (
            <li key={`${source}-${target}`}>
              {source} &rarr; {target}
            </li>
          ))}
        </ul>
      </details>
      <noscript>
        <p className="mt-4 text-muted-foreground">
          Enable JavaScript to explore the interactive map. My core skills are
          listed above.
        </p>
      </noscript>
    </details>
  );
};
