import type { Metadata } from 'next';

import { siteConfig } from '@/lib/site-config';

export function pageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}${path}` },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_US',
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}${path}`,
      images: [
        { url: `${siteConfig.url}/social-image.png`, width: 1200, height: 630 },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [`${siteConfig.url}/social-image.png`],
    },
  };
}
