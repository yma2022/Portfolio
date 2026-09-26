import '@/styles/globals.css';

import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { assetPath } from '@/lib/asset-path';
import { fonts } from '@/lib/fonts';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: `${siteConfig.url}/` },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${siteConfig.url}/`,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/social-image.png`,
        width: 1200,
        height: 630,
        alt: 'Youlong Ma — Full-Stack Engineer & AI Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/social-image.png`],
  },
  keywords: siteConfig.keywords,
  robots: { index: true, follow: true },
  icons: {
    icon: assetPath('/favicon/favicon.ico'),
    shortcut: assetPath('/favicon/favicon-16x16.png'),
    apple: assetPath('/favicon/apple-touch-icon.png'),
  },
  verification: {
    google: siteConfig.googleSiteVerificationId,
  },
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className="dark">
      <body id="top" className={cn('min-h-screen font-sans', fonts)}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: siteConfig.name,
              url: `${siteConfig.url}/`,
              jobTitle: 'Software Engineer',
              sameAs: [
                'https://github.com/yma2022',
                'https://www.linkedin.com/in/youlong-ma/',
              ],
            }).replace(/</g, '\\u003c'),
          }}
        />
        <Link
          href="#main-content"
          className="fixed left-4 top-4 z-[60] -translate-y-24 rounded border bg-background px-4 py-3 text-foreground focus:translate-y-0"
        >
          Skip to content
        </Link>
        <Navbar />
        {children}
        <Footer />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="89e3cea4-922d-41db-ae7f-ccf75a6310bd"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E98RBPVL3W"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-E98RBPVL3W');`}</Script>
      </body>
    </html>
  );
};

export default RootLayout;
