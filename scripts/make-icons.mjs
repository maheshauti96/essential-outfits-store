/**
 * Generates the favicon and app icons in /public from one SVG.
 * Run with: npm run icons
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const GREEN = '#2F4A3A';
const CREAM = '#F6F3EE';
const TEE =
  'M156 70 Q200 58 244 70 L296 86 L370 166 L326 196 L300 168 L302 440 Q200 448 98 440 L100 168 L74 196 L30 166 L104 86 Z';
const NECK = 'M168 72 Q200 62 232 72 Q200 100 168 72 Z';

const icon = (radius) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${radius}" fill="${GREEN}"/>
  <g transform="translate(76 34) scale(0.9)">
    <path d="${TEE}" fill="${CREAM}"/>
    <path d="${NECK}" fill="${GREEN}"/>
  </g>
</svg>`;

const out = new URL('../public/', import.meta.url);
const png = (svg, size, name) => sharp(Buffer.from(svg)).resize(size, size).png().toFile(fileURLToPath(new URL(name, out)));

await writeFile(new URL('favicon.svg', out), icon(112));
await png(icon(112), 32, 'favicon-32.png');
await png(icon(0), 180, 'apple-touch-icon.png'); // iOS rounds the corners itself
await png(icon(0), 192, 'icon-192.png');
await png(icon(0), 512, 'icon-512.png');
console.log('Icons written to public/');
