const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const { basePath } = JSON.parse(
  fs.readFileSync(path.join(projectRoot, '.next/routes-manifest.json'), 'utf8')
);
// Keep preview independent of .next, which `next dev` is free to replace.
fs.writeFileSync(
  path.join(projectRoot, 'out/.preview.json'),
  JSON.stringify({ basePath })
);
