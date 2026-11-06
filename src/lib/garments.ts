/**
 * Flat-lay garment illustrations, drawn as SVG in any colour.
 * They stand in for product photos until real ones are added (see products.ts).
 * Canvas: 400 x 500 (4:5 portrait).
 */

export type GarmentType =
  | 'tee'
  | 'tee-pocket'
  | 'polo'
  | 'shirt'
  | 'hoodie'
  | 'sweatshirt'
  | 'jacket'
  | 'jacket-zip'
  | 'trousers'
  | 'joggers'
  | 'shorts';

type LayerKind = 'body' | 'part' | 'inside' | 'detail' | 'soft' | 'cord' | 'button';
type Layer = [LayerKind, string];

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0`;

const buttons = (x: number, ys: number[], r = 4): Layer[] => ys.map((y) => ['button', circle(x, y, r)] as Layer);

/* ---------- shared pieces ---------- */

const TEE_BODY =
  'M156 70 Q200 58 244 70 L296 86 L370 166 L326 196 L300 168 L302 440 Q200 448 98 440 L100 168 L74 196 L30 166 L104 86 Z';

const TEE_SLEEVES: Layer[] = [
  ['detail', 'M361 157 L318 186'],
  ['detail', 'M39 157 L82 186'],
  ['soft', 'M293 89 Q291 130 300 168'],
  ['soft', 'M107 89 Q109 130 100 168'],
  ['detail', 'M100 427 Q200 436 300 427'],
];

const LONG_BODY =
  'M160 74 L240 74 L300 90 Q342 206 364 392 L322 404 Q312 288 302 180 L300 440 L100 440 L98 180 Q88 288 78 404 L36 392 Q58 206 100 90 Z';

const LONG_CUFFS: Layer[] = [
  ['part', 'M322 404 L364 392 L360 366 L319 378 Z'],
  ['part', 'M78 404 L36 392 L40 366 L81 378 Z'],
  ['soft', 'M296 92 Q296 136 302 180'],
  ['soft', 'M104 92 Q104 136 98 180'],
];

const RIB_HEM: Layer[] = [['part', 'M100 440 L300 440 L300 412 L100 412 Z']];

const SHIRT_BODY =
  'M162 62 L238 62 L300 82 Q340 200 364 388 L322 400 Q312 280 302 176 L300 436 Q296 462 250 460 Q200 470 150 460 Q104 462 100 436 L98 176 Q88 280 78 400 L36 388 Q60 200 100 82 Z';

const PANTS_DETAILS: Layer[] = [
  ['detail', 'M116 76 L284 76'],
  ['soft', 'M140 50 L140 78'],
  ['soft', 'M260 50 L260 78'],
  ['detail', 'M207 78 L207 150 Q207 172 198 182'],
  ['detail', 'M152 78 Q140 122 117 140'],
  ['detail', 'M248 78 Q260 122 283 140'],
  ...buttons(200, [63], 5),
];

/* ---------- garments ---------- */

const garments: Record<GarmentType, { layers: Layer[]; offsetY?: number }> = {
  tee: {
    layers: [
      ['body', TEE_BODY],
      ['inside', 'M168 72 Q200 62 232 72 Q200 100 168 72 Z'],
      ['detail', 'M156 70 Q200 114 244 70'],
      ...TEE_SLEEVES,
    ],
  },

  'tee-pocket': {
    layers: [
      ['body', TEE_BODY],
      ['inside', 'M168 72 Q200 62 232 72 Q200 100 168 72 Z'],
      ['detail', 'M156 70 Q200 114 244 70'],
      ...TEE_SLEEVES,
      ['part', 'M238 150 L284 150 L284 200 Q261 207 238 200 Z'],
      ['soft', 'M238 160 L284 160'],
    ],
  },

  polo: {
    layers: [
      ['body', TEE_BODY],
      ['inside', 'M170 72 Q180 94 198 106 L202 106 Q220 94 230 72 Q200 62 170 72 Z'],
      ['part', 'M188 104 L212 104 L212 176 L188 176 Z'],
      ...buttons(200, [124, 146, 166], 3.5),
      ['part', 'M152 66 Q148 94 164 126 L198 106 Q180 94 170 70 Z'],
      ['part', 'M248 66 Q252 94 236 126 L202 106 Q220 94 230 70 Z'],
      ...TEE_SLEEVES,
    ],
  },

  shirt: {
    layers: [
      ['body', SHIRT_BODY],
      ['part', 'M322 400 L364 388 L360 364 L319 375 Z'],
      ['part', 'M78 400 L36 388 L40 364 L81 375 Z'],
      ['soft', 'M296 84 Q296 130 302 176'],
      ['soft', 'M104 84 Q104 130 98 176'],
      ['detail', 'M193 96 L193 466'],
      ['detail', 'M207 96 L207 466'],
      ...buttons(200, [134, 184, 234, 284, 334, 384, 430], 3.5),
      ['part', 'M234 150 L274 150 L274 192 L254 200 L234 192 Z'],
      ['inside', 'M166 60 Q200 50 234 60 L203 94 L197 94 Z'],
      ['part', 'M162 56 L154 78 L176 114 L198 94 Z'],
      ['part', 'M238 56 L246 78 L224 114 L202 94 Z'],
      ...buttons(170, [104], 2.5),
      ...buttons(230, [104], 2.5),
    ],
  },

  hoodie: {
    layers: [
      ['part', 'M146 100 Q130 24 200 16 Q270 24 254 100 Z'],
      ['body', LONG_BODY],
      ['inside', 'M160 76 Q164 38 200 34 Q236 38 240 76 Q224 110 200 130 Q176 110 160 76 Z'],
      ['detail', 'M160 76 Q176 112 206 134'],
      ['detail', 'M240 76 Q224 112 194 134'],
      ['cord', 'M188 122 Q186 160 184 204'],
      ['cord', 'M212 122 Q214 160 216 198'],
      ['part', 'M150 318 L250 318 L278 404 L122 404 Z'],
      ['soft', 'M150 318 Q144 360 122 404'],
      ['soft', 'M250 318 Q256 360 278 404'],
      ...RIB_HEM,
      ...LONG_CUFFS,
    ],
  },

  sweatshirt: {
    layers: [
      ['body', 'M156 80 Q200 66 244 80 L300 94 Q342 208 364 392 L322 404 Q312 288 302 182 L300 440 L100 440 L98 182 Q88 288 78 404 L36 392 Q58 208 100 94 Z'],
      ['inside', 'M168 82 Q200 72 232 82 Q200 106 168 82 Z'],
      ['detail', 'M156 80 Q200 124 244 80'],
      ['soft', 'M190 104 L200 116 L210 104'],
      ...RIB_HEM,
      ...LONG_CUFFS,
    ],
  },

  jacket: {
    layers: [
      ['body', 'M162 62 L238 62 L300 82 Q340 200 364 388 L322 400 Q312 280 302 176 L302 444 L98 444 L98 176 Q88 280 78 400 L36 388 Q60 200 100 82 Z'],
      ['part', 'M322 400 L364 388 L360 362 L319 373 Z'],
      ['part', 'M78 400 L36 388 L40 362 L81 373 Z'],
      ['soft', 'M296 84 Q296 130 302 176'],
      ['soft', 'M104 84 Q104 130 98 176'],
      ['detail', 'M200 98 L200 444'],
      ['detail', 'M212 98 L212 444'],
      ...buttons(206, [136, 196, 256, 316, 376, 424], 5),
      ['part', 'M122 162 L176 162 L176 216 L122 216 Z'],
      ['part', 'M118 150 L180 150 L180 172 L149 180 L118 172 Z'],
      ['part', 'M224 162 L278 162 L278 216 L224 216 Z'],
      ['part', 'M220 150 L282 150 L282 172 L251 180 L220 172 Z'],
      ...buttons(149, [170], 3),
      ...buttons(251, [170], 3),
      ['inside', 'M166 60 Q200 50 234 60 L203 98 L197 98 Z'],
      ['part', 'M160 54 L138 84 L172 124 L198 98 Z'],
      ['part', 'M240 54 L262 84 L228 124 L202 98 Z'],
    ],
  },

  'jacket-zip': {
    layers: [
      ['body', 'M160 66 L240 66 L300 86 Q342 204 364 392 L322 404 Q312 286 302 180 L300 440 L100 440 L98 180 Q88 286 78 404 L36 392 Q58 204 100 86 Z'],
      ['inside', 'M166 64 Q200 54 234 64 L204 96 L196 96 Z'],
      ['part', 'M160 60 L150 84 L182 112 L198 96 Z'],
      ['part', 'M240 60 L250 84 L218 112 L202 96 Z'],
      ['detail', 'M200 98 L200 412'],
      ['part', 'M195 104 L205 104 L205 124 L195 124 Z'],
      ['detail', 'M126 300 L148 352'],
      ['detail', 'M274 300 L252 352'],
      ...RIB_HEM,
      ...LONG_CUFFS,
    ],
  },

  trousers: {
    layers: [
      ['body', 'M120 50 L280 50 L284 76 Q294 260 276 470 L210 470 L202 196 L198 196 L190 470 L124 470 Q106 260 116 76 Z'],
      ...PANTS_DETAILS,
      ['soft', 'M158 200 L157 466'],
      ['soft', 'M242 200 L243 466'],
      ['detail', 'M125 455 L190 455'],
      ['detail', 'M210 455 L275 455'],
    ],
  },

  joggers: {
    layers: [
      ['body', 'M118 50 L282 50 L286 82 Q302 250 270 448 L272 474 L214 474 L212 448 L202 204 L198 204 L188 448 L186 474 L128 474 L130 448 Q98 250 114 82 Z'],
      ['detail', 'M114 82 L286 82'],
      ...[132, 150, 168, 186, 214, 232, 250, 268].map((x) => ['soft', `M${x} 56 L${x} 76`] as Layer),
      ['cord', 'M194 70 Q190 100 186 126'],
      ['cord', 'M206 70 Q210 100 214 122'],
      ['detail', 'M122 110 Q132 140 124 178'],
      ['detail', 'M278 110 Q268 140 276 178'],
      ['detail', 'M130 448 L188 448'],
      ['detail', 'M212 448 L270 448'],
    ],
  },

  shorts: {
    offsetY: 80,
    layers: [
      ['body', 'M120 50 L280 50 L284 76 Q296 190 302 296 L212 308 L202 190 L198 190 L188 308 L98 296 Q104 190 116 76 Z'],
      ...PANTS_DETAILS,
      ['detail', 'M102 280 L189 292'],
      ['detail', 'M298 280 L211 292'],
    ],
  },
};

/* ---------- colour helpers ---------- */

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(hex: string, target: [number, number, number], amount: number): string {
  const [r, g, b] = parseHex(hex);
  const m = (a: number, t: number) => Math.round(a + (t - a) * amount);
  return `rgb(${m(r, target[0])} ${m(g, target[1])} ${m(b, target[2])})`;
}

function luminance(hex: string): number {
  const [r, g, b] = parseHex(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const BLACK: [number, number, number] = [0, 0, 0];
const WHITE: [number, number, number] = [255, 255, 255];

/** Returns a complete, standalone SVG document. */
export function garmentSvg(type: GarmentType, hex: string): string {
  const g = garments[type];
  const dark = luminance(hex) < 0.06;
  const line = dark ? mix(hex, WHITE, 0.22) : mix(hex, BLACK, 0.3);
  const inside = dark ? mix(hex, BLACK, 0.45) : mix(hex, BLACK, 0.2);
  const button = dark ? mix(hex, WHITE, 0.45) : mix(hex, WHITE, 0.6);
  const cord = dark ? mix(hex, WHITE, 0.55) : mix(hex, WHITE, 0.75);

  const paint: Record<LayerKind, string> = {
    body: `fill="${hex}" stroke="${line}" stroke-width="2.5" stroke-linejoin="round"`,
    part: `fill="${hex}" stroke="${line}" stroke-width="2.5" stroke-linejoin="round"`,
    inside: `fill="${inside}" stroke="${line}" stroke-width="2.5" stroke-linejoin="round"`,
    detail: `fill="none" stroke="${line}" stroke-width="2" stroke-linecap="round" stroke-dasharray="5 4" opacity="0.85"`,
    soft: `fill="none" stroke="${line}" stroke-width="2" stroke-linecap="round" opacity="0.55"`,
    cord: `fill="none" stroke="${cord}" stroke-width="4.5" stroke-linecap="round"`,
    button: `fill="${button}" stroke="${line}" stroke-width="1.5"`,
  };

  const shapes = g.layers
    .map(([kind, d]) => {
      const el = `<path d="${d}" ${paint[kind]}/>`;
      // Soft light-to-shade overlay on the main body so it doesn't look flat.
      return kind === 'body'
        ? `${el}<path d="${d}" fill="url(#light)"/><path d="${d}" fill="url(#shadow)"/>`
        : el;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
<defs>
<linearGradient id="light" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#fff" stop-opacity="${dark ? 0.1 : 0.2}"/>
<stop offset="1" stop-color="#fff" stop-opacity="0"/>
</linearGradient>
<linearGradient id="shadow" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#000" stop-opacity="0"/>
<stop offset="1" stop-color="#000" stop-opacity="${dark ? 0.2 : 0.12}"/>
</linearGradient>
<filter id="drop" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000" flood-opacity="0.14"/></filter>
</defs>
<g filter="url(#drop)" transform="translate(0 ${g.offsetY ?? 0})">${shapes}</g>
</svg>`;
}

/** Turns a colour name into a URL-safe slug, e.g. 'Grey Melange' -> 'grey-melange'. */
export function colorSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
