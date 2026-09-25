import { env } from '@/env.mjs';

export const siteConfig = {
  name: 'Youlong Ma',
  title: 'Youlong Ma | Full-Stack Engineer & AI Developer',
  description:
    'Full-stack engineer building AI-powered tools, retrieval agents, and scalable backend systems. Explore my projects, experience, and technical work.',
  keywords: [
    'Youlong Ma',
    'yma2022',
    'Full-stack engineer',
    'AI developer',
    'Software engineering',
  ],
  url: (env.SITE_URL || 'https://mayoulong.dev').replace(/\/+$/, ''),
  googleSiteVerificationId: env.GOOGLE_SITE_VERIFICATION_ID || '',
};
