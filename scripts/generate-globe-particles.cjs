// Run after changing the world map. Sampling belongs here, not on a visitor's CPU.
const fs = require('node:fs');
const path = require('node:path');
const { feature } = require('topojson-client');

async function main() {
  const { geoContains } = await import('d3-geo');
  const root = path.resolve(__dirname, '..');
  const world = JSON.parse(
    fs.readFileSync(path.join(root, 'public/world-110m.json'), 'utf8')
  );
  const countries = feature(world, world.objects.countries).features;
  let seed = 2022;
  const random = () => {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  const particles = [];
  for (let attempt = 0; particles.length < 500 && attempt < 10000; attempt++) {
    const lon = random() * 360 - 180;
    const lat = (Math.acos(2 * random() - 1) * 180) / Math.PI - 90;
    if (countries.some((country) => geoContains(country, [lon, lat]))) {
      particles.push([Number(lon.toFixed(4)), Number(lat.toFixed(4))]);
    }
  }
  if (particles.length !== 500)
    throw new Error('Unable to generate all land particles');
  fs.writeFileSync(
    path.join(root, 'src/lib/globe-particles.json'),
    JSON.stringify(particles) + '\n'
  );
  console.log(`Generated ${particles.length} deterministic land particles.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
