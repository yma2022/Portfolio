import { Icons } from '@/components/icons';

export const Footer = () => {
  return (
    <footer className="text-muted-foreground my-6 flex flex-col items-center gap-4 text-sm">
      <div className="flex items-center gap-5">
        <a
          href="https://github.com/yma2022"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-brand transition-colors"
        >
          <Icons.github className="size-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/youlong-ma/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-brand transition-colors"
        >
          <Icons.linkedin className="size-5" />
        </a>
        <a
          href="mailto:youlong.ma@gmail.com"
          aria-label="Email"
          className="hover:text-brand transition-colors"
        >
          <Icons.mail className="size-5" />
        </a>
      </div>
      <p>© {new Date().getFullYear()} Youlong Ma. All rights reserved.</p>
    </footer>
  );
};
