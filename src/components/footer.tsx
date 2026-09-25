import Link from 'next/link';

import { assetPath } from '@/lib/asset-path';

export const Footer = () => (
  <footer id="contact" className="site-footer">
    <div className="page-shell">
      <p className="eyebrow">An open line</p>
      <div className="footer-invitation">
        <h2>
          Good things start
          <br />
          with a conversation.
        </h2>
        <a
          href="mailto:youlong.ma@gmail.com"
          className="contact-arrow"
          aria-label="Email Youlong Ma"
        >
          ↗
        </a>
      </div>
      <div className="footer-links">
        <a href="mailto:youlong.ma@gmail.com" className="footer-email">
          youlong.ma@gmail.com
        </a>
        <div>
          <a href="https://github.com/yma2022">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/youlong-ma/">LinkedIn ↗</a>
          <a href={assetPath('/yma2022.pdf')} download>
            Download CV ↓
          </a>
        </div>
      </div>
      <div className="footer-colophon">
        <Link href="/" aria-label="Youlong Ma — back to home">
          Youlong Ma <span>· A work in progress, by nature.</span>
        </Link>
        <Link href="#top">Back to top ↑</Link>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  </footer>
);
