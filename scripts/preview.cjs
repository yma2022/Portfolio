// Preview the exported site using the path baked into the build, not today's env.
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const root = path.resolve(__dirname, '../out');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
};

async function main() {
  await fs.access(path.join(root, 'index.html'));
  const { basePath } = JSON.parse(
    await fs.readFile(path.join(root, '.preview.json'), 'utf8')
  );
  const port = Number(process.env.PORT || 3000);
  const server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, 'http://localhost').pathname
      );
      if (pathname === basePath && basePath) {
        res.writeHead(302, { Location: `${basePath}/` }).end();
        return;
      }
      if (!pathname.startsWith(`${basePath}/`)) {
        res.writeHead(404).end('Not found');
        return;
      }
      let file = path.resolve(root, `.${pathname.slice(basePath.length)}`);
      const relative = path.relative(root, file);
      if (relative.startsWith('..') || path.isAbsolute(relative)) {
        res.writeHead(403).end('Forbidden');
        return;
      }
      if ((await fs.stat(file)).isDirectory())
        file = path.join(file, 'index.html');
      const content = await fs.readFile(file);
      res.writeHead(200, {
        'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      });
      res.end(req.method === 'HEAD' ? undefined : content);
    } catch {
      try {
        const content = await fs.readFile(path.join(root, '404.html'));
        res.writeHead(404, { 'Content-Type': types['.html'] });
        res.end(req.method === 'HEAD' ? undefined : content);
      } catch {
        res.writeHead(404).end('Not found');
      }
    }
  });
  server.on('error', (error) => {
    console.error(`Preview server could not start: ${error.message}`);
    process.exitCode = 1;
  });
  server.listen(port, '127.0.0.1', () => {
    console.log(`Portfolio preview: http://localhost:${port}${basePath}/`);
  });
}

main().catch((error) => {
  console.error(
    'Unable to preview the export. Run npm run build first.',
    error.message
  );
  process.exitCode = 1;
});
