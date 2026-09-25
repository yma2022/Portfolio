## 🎉 Project Overview

My personal portfolio website built using Next.js, Tailwind CSS and Framer-motion.

## Local development

Run `npm install`, then `npm run dev` and open `http://localhost:3000/`.
No environment file or path edits are required. On Windows PowerShell, use
`npm.cmd` if execution policy blocks `npm.ps1`.

Run `npm run preview` to build and preview the static export, or `npm start`
to preview an existing build. The preview server prints the correct URL,
including the base path saved during the build.

## GitHub Pages

Pushes to `gh-pages` trigger `.github/workflows/nextjs.yml`. The workflow reads
the URL and base path from GitHub Pages settings and passes them into the build:

- Repository URL: `NEXT_PUBLIC_BASE_PATH=/Portfolio` and
  `SITE_URL=https://yma2022.github.io/Portfolio`.
- Custom domain: an empty `NEXT_PUBLIC_BASE_PATH` and
  `SITE_URL=https://mayoulong.dev`.

The same base path is used for Next.js routes, scripts, and public assets.
The build also writes the sitemap and robots file into the uploaded `out/` folder.
`.env.local` is ignored by Git and is not needed in GitHub Actions.

To simulate a repository-path deployment in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/Portfolio'
$env:SITE_URL = 'https://yma2022.github.io/Portfolio'
npm.cmd run preview
```

After stopping the preview, remove the overrides before starting local development:

```powershell
Remove-Item Env:NEXT_PUBLIC_BASE_PATH, Env:SITE_URL -ErrorAction SilentlyContinue
```

Base paths are fixed at build time. Rebuild after changing the target URL/path;
the existing export cannot switch paths at runtime. Keep deployment-specific
overrides out of `.env.local` if local development should always run at `/`.
