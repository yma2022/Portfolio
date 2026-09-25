'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useReducedMotion } from '@/hooks/use-reduced-motion';

const EarthScene = dynamic(() => import('@/components/EarthScene'), {
  ssr: false,
});

export const Intro = () => {
  const [showGlobe, setShowGlobe] = useState(false);
  const [globePaused, setGlobePaused] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const idle = window.requestIdleCallback(() => setShowGlobe(true), {
        timeout: 1500,
      });
      return () => window.cancelIdleCallback(idle);
    }
    const timer = setTimeout(() => setShowGlobe(true), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section id="home" aria-labelledby="intro-title" className="hero">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="small-node" />
          Youlong Ma / Software engineer
        </p>
        <h1 id="intro-title">
          Connecting
          <br /> ideas.
          <br />
          <span>
            Building
            <br className="desktop-break" /> systems.
          </span>
        </h1>
        <p className="hero-description">
          I build AI-powered tools and the systems behind them. Turning complex
          problems into software people can use.
        </p>
        <Link href="/work/" className="primary-link">
          Explore my work <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="hero-atlas">
        <div className="atlas-globe">
          <svg
            viewBox="0 0 600 600"
            className="atlas-fallback"
            aria-hidden="true"
          >
            <g fill="none" stroke="currentColor">
              <circle cx="300" cy="300" r="215" />
              <ellipse cx="300" cy="300" rx="105" ry="215" />
              <ellipse cx="300" cy="300" rx="180" ry="215" />
              <path d="M85 300H515M112 195H488M112 405H488M300 85V515" />
              <ellipse
                cx="300"
                cy="300"
                rx="260"
                ry="110"
                transform="rotate(-32 300 300)"
                strokeDasharray="2 8"
              />
            </g>
          </svg>
          {showGlobe && <EarthScene paused={globePaused} />}
        </div>
        <svg
          className="atlas-routes"
          viewBox="0 0 600 600"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="300"
            cy="300"
            r="269"
            stroke="currentColor"
            opacity=".2"
          />
          <path
            d="M25 170H133L205 242M405 185L490 100H575M350 410L430 490H574"
            stroke="currentColor"
            opacity=".6"
          />
          <g fill="#b1c2ff">
            <circle cx="205" cy="242" r="4" />
            <circle cx="405" cy="185" r="4" />
            <circle cx="350" cy="410" r="4" />
          </g>
          <path
            d="M290 24H310M300 14V34M290 576H310M300 566V586M14 300H34M24 290V310M566 300H586M576 290V310"
            stroke="currentColor"
            opacity=".5"
          />
        </svg>
        <span className="atlas-label atlas-label-one">01 / Intelligence</span>
        <span className="atlas-label atlas-label-two">02 / Systems</span>
        <span className="atlas-label atlas-label-three">03 / Connection</span>
        <div className="atlas-caption">
          <span>FIELD STUDY — CONNECTED SYSTEMS</span>
          {showGlobe && !reducedMotion && (
            <button
              type="button"
              aria-pressed={globePaused}
              onClick={() => setGlobePaused((value) => !value)}
            >
              {globePaused ? 'Resume globe' : 'Pause globe'}
            </button>
          )}
        </div>
      </div>
      <div className="hero-bottom">
        <span>Full-stack development · AI · Backend systems</span>
        <Link href="#selected-work">
          A few things I’ve built <span aria-hidden="true">↓</span>
        </Link>
      </div>
    </section>
  );
};
