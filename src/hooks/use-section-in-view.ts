import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useActiveSection } from '@/components/active-section-provider';
import type { SectionName } from '@/lib/types';

export const useSectionInView = (
  sectionName: SectionName,
  threshold = 0.75
) => {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSection();

  useEffect(() => {
    if (!inView) return;

    // Reconcile after a navigation click even if scrolling has already stopped.
    const timer = window.setTimeout(
      () => setActiveSection(sectionName),
      Math.max(0, 1000 - (Date.now() - timeOfLastClick))
    );
    return () => window.clearTimeout(timer);
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return {
    ref,
  };
};
