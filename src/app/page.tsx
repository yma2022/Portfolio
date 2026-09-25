import Script from 'next/script';

import { About } from '@/components/about';
import { Bio } from '@/components/bio';
import { Experience } from '@/components/experience';
import { Footer } from '@/components/footer';
import { Intro } from '@/components/intro';
import { Projects } from '@/components/projects';
import { projectsData } from '@/lib/data';

const Home = async () => {
  const starsCount = await Promise.all(
    projectsData.map(async ({ links }) => {
      if (!links.githubApi) return 0;
      try {
        const res = await fetch(links.githubApi, {
          signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) return 0;
        const data = await res.json();
        return typeof data.stargazers_count === 'number'
          ? data.stargazers_count
          : 0;
      } catch {
        // Repository statistics are optional; keep the portfolio available.
        return 0;
      }
    })
  );

  return (
    <>
      {/* Umami Analytics */}
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="89e3cea4-922d-41db-ae7f-ccf75a6310bd"
        strategy="afterInteractive"
      />
      {/* Google Analytics */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-E98RBPVL3W"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-E98RBPVL3W');
        `}
      </Script>
      <main className="container flex flex-col items-center px-4 sm:px-8">
        <Intro />
        <Bio />
        <Projects starsCount={starsCount} />
        <Experience />
        <About />
        <Footer />
      </main>
    </>
  );
};

export default Home;
