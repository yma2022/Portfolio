import Script from 'next/script';

import { About } from '@/components/about';
import { Experience } from '@/components/experience';
import { Footer } from '@/components/footer';
import { Intro } from '@/components/intro';
import { Projects } from '@/components/projects';
import { projectsData } from '@/lib/data';

const Home = async () => {
  const starsCount = await Promise.all(
    projectsData.map(async ({ links }) => {
      const res = await fetch(links.githubApi);
      const data = await res.json();
      return data.stargazers_count;
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
      <div className="container flex flex-col items-center">
        <Intro />
        <About />
        <Projects starsCount={starsCount} />
        <Experience />
        <Footer />
      </div>
    </>
  );
};

export default Home;
