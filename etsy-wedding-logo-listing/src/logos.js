// Original wedding logo designs, drawn as SVG on a 1000x1000 canvas.
// Every style takes couple details `d` and a palette `p` ({ink, accent, paper}).

const D = Math.PI / 180;
let UID = 0;

const FONT = {
  serif: "'Cormorant Garamond'",
  script: "'Pinyon Script'",
  vibes: "'Great Vibes'",
  play: "'Playfair Display'",
  ital: "'Italiana'",
  sans: "'Montserrat'",
  cinzel: "'Cinzel'",
  bodoni: "'Bodoni Moda'",
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// Text helper. `max` squeezes long names into the available width.
function T(x, y, txt, o = {}) {
  const size = o.size || 40;
  const est = String(txt).length * size * (o.w || 0.6) + String(txt).length * (o.ls || 0);
  const fit = o.max && est > o.max ? ` textLength="${o.max}" lengthAdjust="spacingAndGlyphs"` : '';
  return `<text x="${x}" y="${y}" text-anchor="${o.anchor || 'middle'}" font-family="${o.font || FONT.serif}" font-size="${size}"
    font-weight="${o.weight || 400}" font-style="${o.style || 'normal'}" letter-spacing="${o.ls || 0}"
    fill="${o.fill || '#000'}"${fit}>${esc(txt)}</text>`;
}

function leaf(x, y, rot, L, W, fill) {
  return `<path d="M0,0 Q${L * 0.45},${-W} ${L},0 Q${L * 0.45},${W} 0,0Z" transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)})" fill="${fill}"/>`;
}

// A leafy branch that follows a circular arc from angle a0 to a1 (degrees, SVG coords).
function branch(cx, cy, r, a0, a1, n, L, W, col, sw = 3) {
  const pt = (a) => [cx + r * Math.cos(a * D), cy + r * Math.sin(a * D)];
  const dir = Math.sign(a1 - a0);
  const [x0, y0] = pt(a0), [x1, y1] = pt(a1);
  let s = `<path d="M${x0},${y0} A${r},${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 1 : 0} ${x1},${y1}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"/>`;
  const step = (a1 - a0) / n;
  for (let i = 0; i < n; i++) {
    const t = i / n, k = 1 - 0.45 * t;
    const a = a0 + step * i, b = a + step / 2;
    s += leaf(...pt(a), a + 90 * dir - 40 * dir, L * k, W * k, col);
    s += leaf(...pt(b), b + 90 * dir + 40 * dir, L * k, W * k, col);
  }
  s += leaf(x1, y1, a1 + 90 * dir, L * 0.55, W * 0.55, col);
  return s;
}

function flower(x, y, r, petal, center) {
  let s = '';
  for (let i = 0; i < 5; i++) s += `<ellipse cx="0" cy="${-r * 0.55}" rx="${r * 0.38}" ry="${r * 0.55}" transform="translate(${x},${y}) rotate(${i * 72})" fill="${petal}"/>`;
  return s + `<circle cx="${x}" cy="${y}" r="${r * 0.22}" fill="${center}"/>`;
}

const diamond = (x, y, s, f) => `<path d="M${x},${y - s} L${x + s},${y} L${x},${y + s} L${x - s},${y}Z" fill="${f}"/>`;
const line = (x1, y1, x2, y2, c, w = 2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}"/>`;
const up = (s) => String(s).toUpperCase();

const STYLES = {
  laurel: { name: 'Classic Laurel', draw(d, p) {
    return branch(500, 400, 270, 100, 238, 11, 74, 21, p.accent) + branch(500, 400, 270, 80, -58, 11, 74, 21, p.accent) +
      T(392, 478, d.a, { size: 250, fill: p.ink, weight: 400 }) +
      T(500, 470, '&', { font: FONT.vibes, size: 170, fill: p.accent }) +
      T(608, 478, d.b, { size: 250, fill: p.ink, weight: 400 }) +
      T(500, 775, `${up(d.n1)} & ${up(d.n2)}`, { font: FONT.cinzel, size: 54, ls: 10, fill: p.ink, max: 820, w: 0.72 }) +
      line(330, 818, 470, 818, p.accent) + diamond(500, 818, 9, p.accent) + line(530, 818, 670, 818, p.accent) +
      T(500, 878, d.date, { font: FONT.sans, size: 30, ls: 12, fill: p.ink, weight: 500 });
  } },

  laurelMark: { name: 'Monogram Mark', draw(d, p) {
    return branch(500, 500, 330, 100, 238, 12, 88, 25, p.accent) + branch(500, 500, 330, 80, -58, 12, 88, 25, p.accent) +
      T(375, 600, d.a, { size: 300, fill: p.ink }) +
      T(500, 590, '&', { font: FONT.vibes, size: 200, fill: p.accent }) +
      T(625, 600, d.b, { size: 300, fill: p.ink });
  } },

  arch: { name: 'Botanical Arch', draw(d, p) {
    const archPath = (x0, x1, top, bot) => { const r = (x1 - x0) / 2; return `M${x0},${bot} L${x0},${top + r} A${r},${r} 0 0 1 ${x1},${top + r} L${x1},${bot}Z`; };
    return `<path d="${archPath(265, 735, 120, 890)}" fill="none" stroke="${p.ink}" stroke-width="3.5"/>` +
      `<path d="${archPath(287, 713, 142, 868)}" fill="none" stroke="${p.accent}" stroke-width="1.6"/>` +
      branch(500, 665, 520, 243, 266, 7, 52, 15, p.accent, 2.5) + branch(500, 665, 520, 297, 274, 7, 52, 15, p.accent, 2.5) +
      flower(500, 122, 26, p.accent, p.ink) +
      T(500, 450, d.n1, { font: FONT.script, size: 128, fill: p.ink, max: 400, w: 0.45 }) +
      T(500, 560, '&', { font: FONT.vibes, size: 130, fill: p.accent }) +
      T(500, 660, d.n2, { font: FONT.script, size: 128, fill: p.ink, max: 400, w: 0.45 }) +
      line(420, 720, 580, 720, p.accent, 1.6) +
      T(500, 780, d.date, { font: FONT.sans, size: 26, ls: 10, fill: p.ink, weight: 500 });
  } },

  minimal: { name: 'Modern Minimal', draw(d, p) {
    return T(368, 560, d.a, { size: 380, fill: p.ink, weight: 300 }) +
      line(500, 270, 500, 590, p.accent, 2.5) +
      T(632, 560, d.b, { size: 380, fill: p.ink, weight: 300 }) +
      T(500, 700, `${up(d.n1)} + ${up(d.n2)}`, { font: FONT.sans, size: 36, ls: 16, fill: p.ink, weight: 400, max: 760, w: 0.7 }) +
      line(465, 742, 535, 742, p.accent, 2) +
      T(500, 795, d.date, { font: FONT.sans, size: 26, ls: 12, fill: p.accent, weight: 500 });
  } },

  seal: { name: 'Circle Seal', draw(d, p) {
    const id = 'sealPath' + UID++, r = 340;
    const txt = `${up(d.n1)} & ${up(d.n2)}  ✦  ${d.date}  ✦  `;
    return `<defs><path id="${id}" d="M${500 - r},500 a${r},${r} 0 1 1 ${2 * r},0 a${r},${r} 0 1 1 ${-2 * r},0"/></defs>` +
      `<circle cx="500" cy="500" r="405" fill="none" stroke="${p.ink}" stroke-width="5"/>` +
      `<circle cx="500" cy="500" r="388" fill="none" stroke="${p.accent}" stroke-width="1.6"/>` +
      `<circle cx="500" cy="500" r="292" fill="none" stroke="${p.accent}" stroke-width="1.6"/>` +
      `<text font-family="${FONT.cinzel}" font-size="52" fill="${p.ink}" font-weight="500" dy="18"><textPath href="#${id}" textLength="${(2 * Math.PI * r * 0.985).toFixed(0)}" lengthAdjust="spacing">${esc(txt)}</textPath></text>` +
      T(448, 590, d.a, { size: 300, style: 'italic', weight: 500, fill: p.ink }) +
      T(560, 625, d.b, { size: 300, style: 'italic', weight: 500, fill: p.accent }) +
      leaf(500, 690, 160, 70, 16, p.accent) + leaf(500, 690, 20, 70, 16, p.accent) +
      diamond(500, 260, 8, p.accent);
  } },

  deco: { name: 'Art Deco', draw(d, p) {
    const oct = (x0, y0, x1, y1, c) => `M${x0 + c},${y0} L${x1 - c},${y0} L${x1},${y0 + c} L${x1},${y1 - c} L${x1 - c},${y1} L${x0 + c},${y1} L${x0},${y1 - c} L${x0},${y0 + c}Z`;
    let rays = '';
    for (let a = 200; a <= 340; a += 10) {
      const len = a % 20 === 0 ? 150 : 105;
      rays += line(500 + 90 * Math.cos(a * D), 420 + 90 * Math.sin(a * D), 500 + (90 + len) * Math.cos(a * D), 420 + (90 + len) * Math.sin(a * D), p.accent, a % 20 === 0 ? 2.4 : 1.4);
    }
    return `<path d="${oct(235, 120, 765, 880, 70)}" fill="none" stroke="${p.ink}" stroke-width="4"/>` +
      `<path d="${oct(255, 140, 745, 860, 60)}" fill="none" stroke="${p.accent}" stroke-width="1.5"/>` + rays +
      `<path d="M410,420 A90,90 0 0 1 590,420" fill="none" stroke="${p.accent}" stroke-width="2.4"/>` +
      T(385, 600, d.a, { font: FONT.ital, size: 230, fill: p.ink }) + diamond(500, 530, 16, p.accent) +
      T(615, 600, d.b, { font: FONT.ital, size: 230, fill: p.ink }) +
      T(500, 700, `${up(d.n1)} & ${up(d.n2)}`, { font: FONT.cinzel, size: 42, ls: 10, fill: p.ink, max: 440, w: 0.75 }) +
      line(300, 765, 390, 765, p.accent) + line(610, 765, 700, 765, p.accent) +
      T(500, 775, d.date, { font: FONT.sans, size: 24, ls: 8, fill: p.ink, weight: 500 }) +
      diamond(500, 120, 12, p.accent) + diamond(500, 880, 12, p.accent);
  } },

  script: { name: 'Romantic Script', draw(d, p) {
    return T(470, 420, d.n1, { font: FONT.vibes, size: 200, fill: p.ink, max: 640, w: 0.42 }) +
      T(500, 545, '&', { font: FONT.vibes, size: 170, fill: p.accent }) +
      T(540, 690, d.n2, { font: FONT.vibes, size: 200, fill: p.ink, max: 640, w: 0.42 }) +
      `<path d="M210,745 C380,700 560,790 790,725" fill="none" stroke="${p.accent}" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M790,725 c 30,-10 40,-35 15,-40 c-20,-4 -25,25 5,30" fill="none" stroke="${p.accent}" stroke-width="2.5" stroke-linecap="round"/>` +
      line(250, 830, 360, 830, p.accent, 1.6) + line(640, 830, 750, 830, p.accent, 1.6) +
      T(500, 840, d.date, { font: FONT.sans, size: 28, ls: 10, fill: p.ink, weight: 500 });
  } },

  crest: { name: 'Heritage Crest', draw(d, p) {
    const shield = (s) => `M${500 - 200 * s},${250 - 60 * s} Q500,${250 - 150 * s} ${500 + 200 * s},${250 - 60 * s} L${500 + 200 * s},560 Q${500 + 200 * s},${560 + 170 * s} 500,${560 + 240 * s} Q${500 - 200 * s},${560 + 170 * s} ${500 - 200 * s},560Z`;
    const ribbon = `M190,705 L270,705 L270,665 L730,665 L730,705 L810,705 L780,740 L810,775 L700,775 L700,750 L300,750 L300,775 L190,775 L220,740Z`;
    return branch(500, 470, 300, 110, 200, 7, 64, 18, p.accent) + branch(500, 470, 300, 70, -20, 7, 64, 18, p.accent) +
      `<path d="${shield(1)}" fill="none" stroke="${p.ink}" stroke-width="4"/>` +
      `<path d="${shield(0.9)}" fill="none" stroke="${p.accent}" stroke-width="1.6"/>` +
      diamond(450, 160, 7, p.accent) + diamond(500, 150, 10, p.accent) + diamond(550, 160, 7, p.accent) +
      T(500, 375, d.a, { font: FONT.cinzel, size: 150, fill: p.ink, weight: 500 }) +
      T(500, 470, '&', { font: FONT.vibes, size: 120, fill: p.accent }) +
      T(500, 600, d.b, { font: FONT.cinzel, size: 150, fill: p.ink, weight: 500 }) +
      `<path d="${ribbon}" fill="${p.accent}"/>` +
      `<path d="M270,705 L300,750 M730,705 L700,750" stroke="${p.ink}" stroke-opacity=".35" stroke-width="2"/>` +
      T(500, 722, `${up(d.n1)} & ${up(d.n2)}`, { font: FONT.cinzel, size: 38, ls: 8, fill: p.paper, weight: 600, max: 400, w: 0.75 }) +
      T(500, 880, d.date, { font: FONT.sans, size: 28, ls: 12, fill: p.ink, weight: 500 });
  } },

  wreath: { name: 'Floral Wreath', draw(d, p) {
    let fl = '';
    for (const a of [35, 145, 215, 325, 270]) fl += flower(500 + 265 * Math.cos(a * D), 420 + 265 * Math.sin(a * D), a === 270 ? 34 : 26, p.accent, p.ink);
    return branch(500, 420, 265, 92, 268, 14, 62, 18, p.ink, 2.5) + branch(500, 420, 265, 88, -88, 14, 62, 18, p.ink, 2.5) + fl +
      T(405, 500, d.a, { font: FONT.script, size: 210, fill: p.ink }) +
      T(500, 495, '&', { font: FONT.vibes, size: 140, fill: p.accent }) +
      T(605, 500, d.b, { font: FONT.script, size: 210, fill: p.ink }) +
      T(500, 790, `${d.n1} & ${d.n2}`, { size: 66, style: 'italic', weight: 500, fill: p.ink, max: 700, w: 0.45 }) +
      T(500, 860, d.date, { font: FONT.sans, size: 26, ls: 12, fill: p.accent, weight: 500 });
  } },

  coastal: { name: 'Coastal Sun', draw(d, p) {
    let rays = '';
    for (let a = 195; a <= 345; a += 15) rays += line(500 + 175 * Math.cos(a * D), 450 + 175 * Math.sin(a * D), 500 + 235 * Math.cos(a * D), 450 + 235 * Math.sin(a * D), p.accent, 3);
    const wave = (y, amp) => `<path d="M300,${y} q25,-${amp} 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0" fill="none" stroke="${p.ink}" stroke-width="3" stroke-linecap="round"/>`;
    return `<path d="M350,450 A150,150 0 0 1 650,450" fill="none" stroke="${p.ink}" stroke-width="3.5"/>` + rays +
      line(260, 450, 740, 450, p.ink, 3) + wave(490, 16) + wave(530, 16) +
      T(500, 680, `${d.n1} & ${d.n2}`, { font: FONT.play, size: 84, style: 'italic', fill: p.ink, max: 760, w: 0.5 }) +
      T(500, 755, up(d.place || 'Amalfi Coast · Italy'), { font: FONT.sans, size: 26, ls: 12, fill: p.ink, weight: 500, max: 640, w: 0.75 }) +
      T(500, 820, d.date, { font: FONT.sans, size: 26, ls: 12, fill: p.accent, weight: 500 });
  } },
};

// Horizontal lockup: monogram mark on the left, names on the right (1600x700 canvas).
function horizontalLogo(d, p) {
  return `<svg viewBox="0 0 1600 700" xmlns="http://www.w3.org/2000/svg"><g transform="translate(40,50) scale(0.6)">${STYLES.laurelMark.draw(d, p)}</g>` +
    line(690, 200, 690, 500, p.accent, 2) +
    T(760, 360, `${up(d.n1)} & ${up(d.n2)}`, { font: FONT.cinzel, size: 74, ls: 12, fill: p.ink, anchor: 'start', max: 800, w: 0.72 }) +
    T(762, 440, d.date, { font: FONT.sans, size: 34, ls: 14, fill: p.accent, anchor: 'start', weight: 500 }) + '</svg>';
}

function logoSVG(style, d, p) {
  return `<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">${STYLES[style].draw(d, p)}</svg>`;
}
