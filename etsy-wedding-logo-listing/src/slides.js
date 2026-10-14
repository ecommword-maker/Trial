// Builds the 20 Etsy listing images (thumbnail + 19 mockups). Edit CFG to match your shop policy.
const CFG = {
  proof: '1–3 business days',
  revisions: '3',
};

const PAL = {
  sage:      { name: 'Sage & Ivory',     ink: '#3F4E3A', accent: '#8FA07E', paper: '#F7F2EA', bg: '#F4F1E8' },
  gold:      { name: 'Black & Gold',     ink: '#1E1E1E', accent: '#B08D57', paper: '#FBF8F2', bg: '#FBF8F2' },
  navy:      { name: 'Navy & Champagne', ink: '#1F2A44', accent: '#B79B6C', paper: '#F7F3EC', bg: '#F3F1EC' },
  rose:      { name: 'Dusty Rose',       ink: '#6E4446', accent: '#C49A93', paper: '#FAF3F0', bg: '#F8EEEA' },
  terracotta:{ name: 'Terracotta',       ink: '#7E3F2B', accent: '#C98B6B', paper: '#F8EFE6', bg: '#F6EBE0' },
  forest:    { name: 'Forest Green',     ink: '#22382D', accent: '#9AA98A', paper: '#F4F1E8', bg: '#EEF0E8' },
  burgundy:  { name: 'Burgundy & Blush', ink: '#5E1F2C', accent: '#C9958E', paper: '#FAF2EF', bg: '#F7ECE9' },
  blue:      { name: 'Dusty Blue',       ink: '#34495E', accent: '#93A8BC', paper: '#F3F5F6', bg: '#EDF1F4' },
};
const WHITE = { ink: '#FFFFFF', accent: '#E6D9BF', paper: '#2A2A2A' };
const CHAMP = { ink: '#F3E7CF', accent: '#C9AE7C', paper: '#1F2A44' };
const FOIL = { ink: 'url(#foil)', accent: 'url(#foil)', paper: '#1F2A44' };

const C = {
  emma:  { a: 'E', b: 'J', n1: 'Emma',   n2: 'James',  date: '06.12.2027', place: 'Lake Como · Italy' },
  sofia: { a: 'S', b: 'L', n1: 'Sofia',  n2: 'Liam',   date: '09.18.2027' },
  olivia:{ a: 'O', b: 'N', n1: 'Olivia', n2: 'Noah',   date: '05.22.2027' },
  ava:   { a: 'A', b: 'M', n1: 'Ava',    n2: 'Mateo',  date: '10.02.2027' },
  grace: { a: 'G', b: 'D', n1: 'Grace',  n2: 'Daniel', date: '04.17.2027' },
  chloe: { a: 'C', b: 'E', n1: 'Chloe',  n2: 'Ethan',  date: '08.07.2027' },
  isla:  { a: 'I', b: 'H', n1: 'Isla',   n2: 'Henry',  date: '07.24.2027' },
  maya:  { a: 'M', b: 'L', n1: 'Maya',   n2: 'Leo',    date: '06.05.2027', place: 'Amalfi Coast · Italy' },
  rose:  { a: 'R', b: 'T', n1: 'Rose',   n2: 'Thomas', date: '12.31.2027' },
};
const E = C.emma;

const FOIL_DEFS = `<defs><linearGradient id="foil" gradientUnits="userSpaceOnUse" x1="150" y1="100" x2="850" y2="900">
  <stop offset="0" stop-color="#9A7438"/><stop offset=".28" stop-color="#F0D898"/><stop offset=".48" stop-color="#B08A47"/>
  <stop offset=".7" stop-color="#F6E3AA"/><stop offset="1" stop-color="#94703A"/></linearGradient></defs>`;
const withFoil = (svg) => svg.replace(/(<svg[^>]*>)/, '$1' + FOIL_DEFS);

const L = (style, d, p, css, extra = '') => `<div class="abs lg" style="${css}${extra}">${logoSVG(style, d, p)}</div>`;
const S = (name, html, style = '', cls = '') => `<section data-name="${name}" class="${cls}" style="${style}">${html}</section>`;
const head = (k, h, sub, color) => `<div class="head" ${color ? `style="color:${color}"` : ''}><div class="kicker" ${color ? `style="color:${color};opacity:.85"` : ''}>${k}</div><div class="h1" ${color ? `style="color:${color}"` : ''}>${h}</div>${sub ? `<div class="sub" ${color ? `style="color:${color};opacity:.85"` : ''}>${sub}</div>` : ''}</div>`;
const pill = (n, t) => `<div class="pill"><div><b>Example use</b>${t}</div><div class="ps">Mockup only · you receive the digital logo file</div></div>`;

// Decorative eucalyptus / olive sprig (nearly straight leafy stem).
const sprig = (css, col, n = 9, L_ = 150, W_ = 52) =>
  `<div class="abs" style="${css}"><svg viewBox="0 0 1000 1000" style="width:100%;height:100%;overflow:visible">${branch(-1500, 500, 2000, 14, -14, n, L_, W_, col, 6)}</svg></div>`;

const slides = [];

/* 01 — THUMBNAIL ------------------------------------------------------- */
slides.push(S('01-thumbnail', `
  <div class="abs" style="inset:0;background:radial-gradient(circle at 50% 52%, #46594B 0, #2E3D33 58%, #24312A 100%)"></div>
  <div class="abs" style="inset:0;background:var(--noise)"></div>
  ${sprig('left:-260px;top:1180px;width:760px;height:980px;transform:rotate(-35deg);opacity:.5', '#8FA07E')}
  ${sprig('right:-260px;top:-180px;width:760px;height:980px;transform:rotate(145deg);opacity:.5', '#8FA07E')}
  <div class="abs center" style="left:0;right:0;top:300px;font:600 40px Montserrat;letter-spacing:.32em;color:#D8BF8A">PERSONALIZED FOR YOU</div>
  <div class="abs center" style="left:0;right:0;top:350px;font:600 168px/1 'Cormorant Garamond';color:#FBF6EC;white-space:nowrap">Custom Wedding Logo</div>
  <div class="abs paper" style="left:550px;top:590px;width:900px;height:900px;border-radius:10px">
    ${L('laurel', E, { ink: '#22382D', accent: '#B08D57', paper: '#FBF8F1' }, 'left:50px;top:20px;width:800px;height:800px')}
    <div class="abs center" style="left:0;right:0;bottom:40px;font:600 26px Montserrat;letter-spacing:.3em;color:#8C7346">YOUR NAMES · YOUR STYLE</div>
  </div>
  <div class="abs" style="left:1320px;top:640px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#F1DCA4,#C9A45E 55%,#A9833F);
    box-shadow:0 18px 34px rgba(0,0,0,.35);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#2A2416;transform:rotate(10deg)">
    <div style="font:700 110px/1 'Cormorant Garamond';margin-top:-10px">9</div>
    <div style="font:700 34px Montserrat;letter-spacing:.14em">STYLES</div>
    <div style="font:600 20px Montserrat;letter-spacing:.14em;margin-top:4px">TO CHOOSE</div></div>
  <div class="abs" style="left:250px;top:1535px;width:1500px;display:flex;justify-content:center;gap:22px">
    ${['Proof Before Final', 'Any Colors', 'PNG · PDF · SVG'].map((t) => `<div style="background:#FBF6EC;color:#22382D;font:700 36px Montserrat;letter-spacing:.04em;padding:28px 38px;border-radius:70px;white-space:nowrap;box-shadow:0 12px 30px rgba(0,0,0,.25)">✓ ${t}</div>`).join('')}
  </div>
  <div class="abs center" style="left:0;right:0;top:1672px;font:600 38px Montserrat;letter-spacing:.24em;color:#D8BF8A">⬇ DIGITAL FILE · NOTHING SHIPPED</div>
`));

/* 01b — ALTERNATIVE THUMBNAIL (variety grid) — rendered separately for A/B testing */
const altThumb = S('01-thumbnail-alt', `
  <div class="abs" style="inset:0;background:radial-gradient(circle at 50% 50%, #FBF7F0 0, #EFE6D8 80%)"></div>
  <div class="abs center" style="left:0;right:0;top:250px;font:600 40px Montserrat;letter-spacing:.32em;color:#4F5E48">DIGITAL FILE · PERSONALIZED</div>
  <div class="abs center" style="left:0;right:0;top:300px;font:600 168px/1 'Cormorant Garamond';color:#22382D;white-space:nowrap">Custom Wedding Logo</div>
  <div class="abs" style="left:300px;top:520px;width:1400px;display:grid;grid-template-columns:1fr 1fr;gap:30px">
    ${[['laurel', E, PAL.sage, '#FFFDF8'], ['seal', C.sofia, CHAMP, '#1F2A44'], ['script', C.olivia, PAL.burgundy, '#F3E4DF'], ['deco', C.rose, PAL.gold, '#FFFDF8']].map(([s, d, p, bg]) =>
      `<div class="paper" style="position:relative;height:500px;background:${bg};border-radius:10px">${L(s, d, p, 'left:200px;top:20px;width:460px;height:460px')}</div>`).join('')}
  </div>
  <div class="abs center" style="left:250px;width:1500px;top:1600px">
    <span style="display:inline-block;background:#22382D;color:#FBF6EC;font:700 40px Montserrat;letter-spacing:.06em;padding:30px 56px;border-radius:70px;box-shadow:0 12px 30px rgba(0,0,0,.2)">9 Styles · Any Colors · Proof Before Final</span></div>
`);

/* 02 — STYLE MENU ------------------------------------------------------ */
const styleList = [
  ['laurel', C.grace, PAL.sage], ['arch', C.sofia, PAL.rose], ['minimal', C.ava, PAL.gold],
  ['seal', C.chloe, PAL.navy], ['deco', C.rose, PAL.gold], ['script', C.olivia, PAL.burgundy],
  ['crest', C.isla, PAL.forest], ['wreath', E, PAL.terracotta], ['coastal', C.maya, PAL.blue],
];
slides.push(S('02-logo-styles', `
  ${head('9 signature styles — or fully custom', 'Choose Your Style')}
  <div class="abs" style="left:70px;right:70px;top:430px;display:grid;grid-template-columns:repeat(3,1fr);gap:30px">
    ${styleList.map(([s, d, p], i) => `<div class="card" style="height:492px;position:relative;background:${p.bg}">
      ${L(s, d, p, 'left:105px;top:14px;width:400px;height:400px')}
      <div class="abs center" style="left:0;right:0;bottom:26px;font:600 28px Montserrat;letter-spacing:.16em;text-transform:uppercase">
        <span style="color:${p.accent}">${String(i + 1).padStart(2, '0')}</span>&nbsp; ${STYLES[s].name}</div></div>`).join('')}
  </div>
`));

/* 03 — HOW IT WORKS ---------------------------------------------------- */
const steps = [
  ['Order & Personalize', 'Add your names, initials, date, style and colors in the personalization boxes.'],
  ['Receive Your Proof', `Your first design proof arrives in Etsy Messages within ${CFG.proof}.`],
  ['Refine Together', `Ask for any tweaks — ${CFG.revisions} revision rounds are included.`],
  ['Download Your Files', 'Approve your design and download your digital files — ready to print.'],
];
slides.push(S('03-how-it-works', `
  ${head('Simple · Personal · Stress-free', 'How It Works')}
  <div class="abs" style="left:110px;top:470px;width:1000px">
    ${steps.map(([t, x], i) => `<div style="display:flex;gap:44px;align-items:flex-start;margin-bottom:58px">
      <div style="flex:none;width:150px;height:150px;border-radius:50%;border:3px solid #8FA07E;display:flex;align-items:center;justify-content:center;font:500 80px 'Cormorant Garamond';color:#3F4E3A;background:#FFFDF8">${i + 1}</div>
      <div><div class="serif" style="font-size:72px;font-weight:600;line-height:1.1">${t}</div>
      <div style="font:400 36px/1.5 Montserrat;color:#6E6A62;margin-top:12px">${x}</div></div></div>`).join('')}
  </div>
  <div class="abs paper" style="left:1170px;top:560px;width:720px;height:960px;transform:rotate(3deg);border-radius:6px">
    ${L('arch', E, PAL.rose, 'left:40px;top:120px;width:640px;height:640px')}
    <div class="abs center" style="left:0;right:0;bottom:80px;font:500 28px Montserrat;letter-spacing:.3em;color:#C49A93">YOUR PROOF · ROUND 1</div>
  </div>
  <div class="abs center" style="left:0;right:0;bottom:90px;font:italic 500 54px 'Cormorant Garamond';color:#4F5E48">Fast, friendly & 100% personalized — no templates, no guesswork.</div>
`));

/* 04 — WHAT YOU RECEIVE ------------------------------------------------ */
const files = [
  ['PNG', 'Transparent background · high resolution'], ['JPG', 'White background · easy to share'],
  ['PDF', 'Print-ready for any printer or stationer'], ['SVG', 'Vector · scales to any size, perfect for signs'],
  ['3 Colorways', 'Full color, black & white versions'], ['Social Sizes', 'For your wedding website & socials'],
];
slides.push(S('04-what-you-receive', `
  ${head('Your file package', 'What You’ll Receive')}
  <div class="abs" style="left:90px;right:90px;top:450px;display:grid;grid-template-columns:repeat(3,1fr);gap:28px">
    ${files.map(([f, t]) => `<div class="card" style="height:330px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px">
      <div class="serif" style="font-size:${f.length > 4 ? 84 : 120}px;font-weight:600;color:#3F4E3A;line-height:1">${f}</div>
      <div style="font:400 32px/1.4 Montserrat;color:#6E6A62;margin-top:22px;max-width:480px">${t}</div></div>`).join('')}
  </div>
  <div class="abs" style="left:90px;right:90px;top:1180px;display:grid;grid-template-columns:repeat(3,1fr);gap:28px">
    ${[['repeating-conic-gradient(#E9E5DD 0 25%,#fff 0 50%) 0 0/48px 48px', PAL.sage, 'Transparent PNG'],
       ['#FFFFFF', PAL.gold, 'Black & Gold'], ['#1C1C1C', WHITE, 'White / Reversed']].map(([bg, p, t]) =>
      `<div><div style="height:560px;border-radius:24px;background:${bg};position:relative;box-shadow:0 18px 40px rgba(40,30,20,.12)">
        ${L('laurel', E, p, 'left:60px;top:40px;width:480px;height:480px')}</div>
        <div class="center" style="font:600 30px Montserrat;letter-spacing:.2em;text-transform:uppercase;margin-top:28px">${t}</div></div>`).join('')}
  </div>
  <div class="abs center" style="left:0;right:0;bottom:70px;font:500 30px Montserrat;letter-spacing:.12em;color:#6E6A62">DIGITAL DESIGN · NO PHYSICAL ITEM WILL BE SHIPPED</div>
`));

/* 05 — PALETTES -------------------------------------------------------- */
slides.push(S('05-color-palettes', `
  ${head('Made in your wedding colors', 'Pick Your Palette')}
  <div class="abs" style="left:90px;right:90px;top:450px;display:grid;grid-template-columns:repeat(4,1fr);gap:30px">
    ${Object.values(PAL).map((p) => `<div class="card" style="height:620px;background:${p.bg};position:relative">
      ${L('laurelMark', E, p, 'left:45px;top:30px;width:340px;height:340px')}
      <div class="abs" style="left:0;right:0;top:405px;display:flex;justify-content:center;gap:18px">
        ${[p.ink, p.accent, p.paper].map((c) => `<div style="width:62px;height:62px;border-radius:50%;background:${c};border:2px solid rgba(0,0,0,.12)"></div>`).join('')}</div>
      <div class="abs center serif" style="left:0;right:0;top:500px;font-size:50px;font-weight:600;color:${p.ink}">${p.name}</div></div>`).join('')}
  </div>
  <div class="abs center" style="left:120px;right:120px;top:1810px;font:400 36px/1.5 Montserrat;color:#6E6A62">Want another shade? Send your HEX codes or an invitation photo — we’ll match it perfectly.</div>
`));

/* 06 — INVITATIONS ----------------------------------------------------- */
slides.push(S('06-mockup-invitations', `
  ${sprig('left:-260px;top:900px;width:900px;height:1200px;transform:rotate(-30deg)', '#7F9170')}
  <div class="abs" style="left:70px;top:150px;width:1180px;height:820px;transform:rotate(-9deg);filter:drop-shadow(0 30px 40px rgba(40,30,20,.25))">
    <div style="position:absolute;inset:0;background:#EFE7DA var(--noise)"></div>
    <div style="position:absolute;inset:0;background:#E4D9C6 var(--noise);clip-path:polygon(0 0,100% 0,50% 58%)"></div>
  </div>
  <div class="abs paper" style="left:640px;top:250px;width:900px;height:1290px;transform:rotate(4deg)">
    ${L('laurel', E, PAL.sage, 'left:170px;top:60px;width:560px;height:560px')}
    <div class="abs center" style="left:0;right:0;top:650px">
      <div style="font:500 26px Montserrat;letter-spacing:.32em;color:#3F4E3A">TOGETHER WITH THEIR FAMILIES</div>
      <div class="serif" style="font-size:52px;font-style:italic;margin-top:34px;line-height:1.35;color:#5d5a52">request the pleasure of your company<br>at the celebration of their marriage</div>
      <div style="font:500 28px Montserrat;letter-spacing:.26em;margin-top:46px;color:#3F4E3A">SATURDAY · JUNE 12 · 2027</div>
      <div class="serif" style="font-size:46px;margin-top:22px;color:#3F4E3A">Villa del Balbianello · Lake Como</div>
      <div style="width:120px;height:2px;background:#8FA07E;margin:44px auto 0"></div>
      <div class="serif" style="font-size:38px;font-style:italic;margin-top:30px;color:#6E6A62">Dinner & dancing to follow</div>
    </div>
  </div>
  <div class="abs paper" style="left:1180px;top:1380px;width:700px;height:480px;transform:rotate(-5deg)">
    <div class="abs center" style="left:0;right:0;top:60px;font:500 26px Montserrat;letter-spacing:.35em;color:#3F4E3A">R · S · V · P</div>
    <div class="abs center script" style="left:0;right:0;top:120px;font-size:72px;white-space:nowrap;color:#3F4E3A">Kindly reply by May 1st</div>
    <div class="abs" style="left:90px;top:280px;font:400 30px/2.1 Montserrat;color:#5d5a52">○&nbsp; Joyfully accepts<br>○&nbsp; Regretfully declines</div>
  </div>
  ${pill('01', 'Invitations & Stationery')}
`, '', 'linen'));

/* 07 — WAX SEAL -------------------------------------------------------- */
const blob = (() => { let d = ''; for (let i = 0; i <= 96; i++) { const a = (i / 96) * Math.PI * 2; const r = 462 + 14 * Math.sin(5 * a) + 9 * Math.sin(9 * a + 1) + 6 * Math.sin(14 * a + 2); d += (i ? 'L' : 'M') + (500 + r * Math.cos(a)).toFixed(1) + ',' + (500 + r * Math.sin(a)).toFixed(1); } return d + 'Z'; })();
const sealInner = (p) => `<g transform="translate(160,160) scale(.68)">${STYLES.laurelMark.draw(E, p)}</g>`;
const waxSeal = `<svg viewBox="0 0 1000 1000" style="width:100%;height:100%;overflow:visible"><defs>
  <radialGradient id="wax" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#9C3546"/><stop offset=".6" stop-color="#76202F"/><stop offset="1" stop-color="#4E1220"/></radialGradient>
  <radialGradient id="wax2" cx=".6" cy=".65" r=".7"><stop offset="0" stop-color="#6A1B29"/><stop offset="1" stop-color="#84283A"/></radialGradient></defs>
  <path d="${blob}" fill="url(#wax)" style="filter:drop-shadow(0 18px 18px rgba(50,10,20,.45))"/>
  <circle cx="500" cy="500" r="370" fill="url(#wax2)" stroke="#5A1624" stroke-width="10"/>
  <circle cx="500" cy="500" r="378" fill="none" stroke="#B24A5B" stroke-width="4" opacity=".6"/>
  <g transform="translate(-4,-4)">${sealInner({ ink: '#B8566A', accent: '#B8566A', paper: '#B8566A' })}</g>
  <g transform="translate(4,4)">${sealInner({ ink: '#3E0C17', accent: '#3E0C17', paper: '#3E0C17' })}</g>
  ${sealInner({ ink: '#7A2434', accent: '#7A2434', paper: '#7A2434' })}
  <ellipse cx="360" cy="300" rx="90" ry="40" fill="#fff" opacity=".12" transform="rotate(-35 360 300)"/></svg>`;
slides.push(S('07-mockup-wax-seal', `
  ${sprig('right:-150px;top:-120px;width:760px;height:1000px;transform:rotate(150deg);opacity:.9', '#8C7F6A', 8, 120, 40)}
  <div class="abs" style="left:180px;top:420px;width:1640px;height:1120px;transform:rotate(-4deg);filter:drop-shadow(0 40px 50px rgba(60,30,30,.28))">
    <div style="position:absolute;inset:0;background:#F6EFE4 var(--noise)"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,#EDE3D3,#E6DAC6) ;clip-path:polygon(0 0,100% 0,50% 62%)"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(160deg,rgba(0,0,0,.05),transparent 40%);clip-path:polygon(0 100%,50% 50%,100% 100%)"></div>
    <div class="abs" style="left:540px;top:420px;width:560px;height:560px">${waxSeal}</div>
  </div>
  <div class="abs center" style="left:0;right:0;top:120px"><div class="kicker" style="color:#6E4446">Your monogram, sealed with love</div>
    <div class="h1" style="color:#5E1F2C;font-size:140px">Use It On Wax Seals</div></div>
  ${pill('02', 'Wax Seals & Envelopes')}
`, 'background-color:#DCC7BE'));

/* 08 — WELCOME SIGN ---------------------------------------------------- */
const wood = 'linear-gradient(90deg,#8A6440,#B48A5E 45%,#8F6843)';
slides.push(S('08-mockup-welcome-sign', `
  <div class="abs" style="inset:0;background:linear-gradient(180deg,#F1EBE1 0,#E8DFD2 78%,#CDBFAA 78%,#C2B39C 100%)"></div>
  <div class="abs" style="left:976px;top:120px;width:48px;height:1700px;background:${wood};border-radius:8px"></div>
  <div class="abs" style="left:640px;top:1480px;width:50px;height:520px;background:${wood};transform:rotate(14deg);transform-origin:top;border-radius:8px"></div>
  <div class="abs" style="left:1310px;top:1480px;width:50px;height:520px;background:${wood};transform:rotate(-14deg);transform-origin:top;border-radius:8px"></div>
  <div class="abs paper" style="left:450px;top:170px;width:1100px;height:1480px;border-radius:550px 550px 16px 16px"></div>
  <div class="abs" style="left:400px;top:1630px;width:1200px;height:56px;background:${wood};border-radius:10px;box-shadow:0 14px 24px rgba(0,0,0,.22)"></div>
  <div class="abs center script" style="left:450px;width:1100px;top:330px;font-size:200px;color:#3F4E3A;line-height:1">Welcome</div>
  <div class="abs center" style="left:450px;width:1100px;top:600px;font:500 34px Montserrat;letter-spacing:.38em;color:#3F4E3A">TO THE WEDDING OF</div>
  ${L('wreath', E, PAL.sage, 'left:640px;top:660px;width:720px;height:720px')}
  <div class="abs center serif" style="left:450px;width:1100px;top:1420px;font-size:54px;font-style:italic;color:#6E6A62">Please find your seat</div>
  ${sprig('left:180px;top:1180px;width:620px;height:820px;transform:rotate(-58deg)', '#7F9170')}
  ${sprig('left:1200px;top:1180px;width:620px;height:820px;transform:rotate(58deg) scaleX(-1)', '#7F9170')}
  ${pill('03', 'Welcome Signs & Decor')}
`));

/* 09 — NAPKINS --------------------------------------------------------- */
const napkin = (css, logo = '') => `<div class="abs" style="${css};width:820px;height:820px;background:#FBF8F1 var(--noise);box-shadow:0 30px 50px rgba(0,0,0,.35);
  background-image:var(--noise),linear-gradient(135deg,transparent 49.8%,rgba(0,0,0,.05) 50%,transparent 50.2%)">${logo}</div>`;
slides.push(S('09-mockup-napkins', `
  <div class="abs center" style="left:0;right:0;top:110px"><div class="kicker" style="color:#C9B98F">Cheers to forever</div>
    <div class="h1" style="color:#F3E7CF;font-size:140px">Print It On Napkins</div></div>
  ${napkin('left:420px;top:620px;transform:rotate(-12deg)')}
  ${napkin('left:470px;top:580px;transform:rotate(5deg)')}
  ${napkin('left:450px;top:600px;transform:rotate(-3deg)', `<div class="abs lg" style="left:150px;top:150px;width:520px;height:520px">${withFoil(logoSVG('seal', E, FOIL))}</div>`)}
  ${sprig('right:-160px;top:-60px;width:700px;height:900px;transform:rotate(140deg)', '#9AA98A')}
  ${sprig('left:-120px;top:1250px;width:700px;height:900px;transform:rotate(-40deg)', '#9AA98A')}
  ${pill('04', 'Napkins & Bar Details')}
`, 'background-color:#2F3E34', 'linen'));

/* 10 — DANCE FLOOR ----------------------------------------------------- */
slides.push(S('10-mockup-dance-floor', `
  <div class="abs" style="left:-700px;top:330px;width:3400px;height:2600px;transform:perspective(2200px) rotateX(52deg);transform-origin:50% 0;
    background-image:var(--noise),repeating-linear-gradient(90deg,transparent 0 167px,rgba(30,15,5,.55) 167px 170px),
      repeating-linear-gradient(0deg,transparent 0 897px,rgba(30,15,5,.45) 897px 900px),
      repeating-linear-gradient(90deg,#9A6A44 0 170px,#85593A 170px 340px,#A57650 340px 510px,#8F6240 510px 680px);">
    <div class="abs lg" style="left:1150px;top:250px;width:1100px;height:1100px;opacity:.94">${logoSVG('seal', E, { ink: '#FFFFFF', accent: '#FFFFFF', paper: '#000' })}</div>
  </div>
  <div class="abs" style="inset:0;background:radial-gradient(ellipse at 50% 70%,transparent 30%,rgba(10,5,0,.55) 100%)"></div>
  <div class="abs" style="left:0;right:0;top:0;height:560px;background:linear-gradient(180deg,#1C1712 55%,transparent)"></div>
  <div class="abs center" style="left:0;right:0;top:110px"><div class="kicker" style="color:#C9B98F">Make your first dance unforgettable</div>
    <div class="h1" style="color:#F3E7CF;font-size:140px">Light Up The Dance Floor</div></div>
  ${pill('05', 'Floor Decals & Gobo Lights')}
`, 'background:#1C1712'));

/* 11 — WEBSITE & SOCIAL ------------------------------------------------ */
slides.push(S('11-mockup-website-social', `
  ${head('Share it everywhere', 'Website & Socials')}
  <div class="abs" style="left:110px;top:520px;width:1380px;height:900px;background:#1D1D1F;border-radius:34px;padding:30px;box-shadow:0 40px 60px rgba(0,0,0,.25)">
    <div style="width:100%;height:100%;background:#F7F2EA;border-radius:8px;overflow:hidden;position:relative">
      <div style="height:150px;display:flex;align-items:center;justify-content:space-between;padding:0 50px;border-bottom:1px solid #E2DACB">
        <div class="lg" style="width:330px;height:144px">${horizontalLogo(E, PAL.sage)}</div>
        <div style="font:500 22px Montserrat;letter-spacing:.22em;color:#3F4E3A">OUR STORY &nbsp;·&nbsp; DETAILS &nbsp;·&nbsp; TRAVEL &nbsp;·&nbsp; RSVP</div></div>
      <div style="position:absolute;left:0;right:0;top:150px;bottom:0;background:linear-gradient(135deg,#5C6E54,#3F4E3A)">
        <div class="abs lg" style="left:455px;top:40px;width:420px;height:420px">${logoSVG('laurelMark', E, WHITE)}</div>
        <div class="abs center script" style="left:0;right:0;top:450px;font-size:96px;color:#fff">We’re getting married!</div>
        <div class="abs center" style="left:0;right:0;top:600px;font:500 24px Montserrat;letter-spacing:.35em;color:#E6D9BF">JUNE 12, 2027 · LAKE COMO, ITALY</div>
      </div></div></div>
  <div class="abs" style="left:10px;top:1420px;width:1580px;height:56px;background:linear-gradient(#E3E3E3,#A9A9A9);border-radius:0 0 50px 50px;box-shadow:0 30px 40px rgba(0,0,0,.2)"></div>
  <div class="abs" style="left:1390px;top:700px;width:520px;height:1060px;background:#141414;border-radius:76px;padding:22px;box-shadow:0 40px 60px rgba(0,0,0,.3)">
    <div style="width:100%;height:100%;border-radius:56px;background:#F1E1DB;position:relative;overflow:hidden">
      <div class="abs center" style="left:0;right:0;top:110px;font:500 22px Montserrat;letter-spacing:.35em;color:#5E1F2C">SAVE THE DATE</div>
      <div class="abs lg" style="left:20px;top:200px;width:436px;height:436px">${logoSVG('arch', E, PAL.burgundy)}</div>
      <div class="abs center script" style="left:0;right:0;top:700px;font-size:64px;color:#5E1F2C">Lake Como, Italy</div>
      <div class="abs center" style="left:0;right:0;top:820px;font:500 20px Montserrat;letter-spacing:.3em;color:#5E1F2C">INVITATION TO FOLLOW</div>
    </div></div>
  ${pill('06', 'Wedding Website & Social')}
`, 'background-color:#DCE1D5'));

/* 12 — STICKERS & TAGS ------------------------------------------------- */
const sticker = (x, y, rot = 0) => `<div class="abs" style="left:${x}px;top:${y}px;width:270px;height:270px;border-radius:50%;background:#fff;transform:rotate(${rot}deg);box-shadow:0 3px 6px rgba(0,0,0,.12)">
  ${L('seal', E, PAL.navy, 'left:15px;top:15px;width:240px;height:240px')}</div>`;
let stickerGrid = '';
for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) if (!(r === 3 && c === 2)) stickerGrid += sticker(55 + c * 305, 60 + r * 300);
slides.push(S('12-mockup-stickers-tags', `
  <div class="abs paper" style="left:120px;top:440px;width:1000px;height:1320px;transform:rotate(-4deg);background:#F4F2EE">${stickerGrid}</div>
  <div class="abs" style="left:880px;top:1520px;width:300px;height:300px;transform:rotate(14deg);filter:drop-shadow(0 14px 14px rgba(0,0,0,.25))">${sticker(0, 0)}</div>
  <div class="abs" style="left:1260px;top:560px;width:600px;height:1000px;transform:rotate(6deg);filter:drop-shadow(0 30px 30px rgba(60,40,20,.3))">
    <div style="position:absolute;inset:0;background:#FBF8F1 var(--noise);clip-path:polygon(22% 0,78% 0,100% 13%,100% 100%,0 100%,0 13%)"></div>
    <div class="abs" style="left:270px;top:60px;width:60px;height:60px;border-radius:50%;background:#C8A47A;box-shadow:inset 0 3px 6px rgba(0,0,0,.3)"></div>
    ${L('arch', E, PAL.navy, 'left:40px;top:150px;width:520px;height:520px')}
    <div class="abs center script" style="left:0;right:0;top:700px;font-size:76px;color:#1F2A44">Thank you</div>
    <div class="abs center" style="left:0;right:0;top:830px;font:500 22px Montserrat;letter-spacing:.3em;color:#1F2A44">FOR CELEBRATING WITH US</div>
  </div>
  <svg class="abs" style="left:1300px;top:-20px;width:600px;height:700px" viewBox="0 0 600 700"><path d="M300,640 C260,420 420,300 360,0" fill="none" stroke="#EDE3D0" stroke-width="10" stroke-dasharray="22 6" stroke-linecap="round"/></svg>
  <div class="abs center" style="left:0;right:0;top:110px"><div class="kicker" style="color:#5A3F22">Little details, big impact</div>
    <div class="h1" style="color:#2E2014;font-size:140px">Make Stickers & Tags</div></div>
  ${pill('07', 'Favor Stickers & Gift Tags')}
`, 'background-color:#C7A47B'));

/* 13 — TABLE SETTING --------------------------------------------------- */
const silver = 'linear-gradient(90deg,#9A9A9A,#F2F2F2 45%,#B5B5B5)';
slides.push(S('13-mockup-table-setting', `
  ${head('Set the table in style', 'Add It To Your Menus')}
  <div class="abs" style="left:1500px;top:440px;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.2) 0 60%,rgba(255,255,255,.9) 63% 66%,rgba(200,200,200,.3) 70%);box-shadow:0 20px 30px rgba(0,0,0,.12)"></div>
  <div class="abs" style="left:400px;top:600px;width:1200px;height:1200px;border-radius:50%;background:radial-gradient(circle,#F7F4EE 0 70%,#D9C49A 71%,#C3A46C 80%,#E2CFA3 92%,#B8975E 100%);box-shadow:0 40px 60px rgba(0,0,0,.2)"></div>
  <div class="abs" style="left:500px;top:700px;width:1000px;height:1000px;border-radius:50%;background:radial-gradient(circle,#FFFFFF 0 74%,#F1EEE8 82%,#FFFFFF 100%);box-shadow:0 6px 16px rgba(0,0,0,.12)"></div>
  <div class="abs" style="left:640px;top:690px;width:440px;height:960px;background:#8FA07E var(--noise);transform:rotate(-14deg);box-shadow:0 10px 20px rgba(0,0,0,.18)"></div>
  <div class="abs paper" style="left:720px;top:760px;width:560px;height:900px">
    ${L('minimal', E, PAL.sage, 'left:80px;top:20px;width:400px;height:400px')}
    <div class="abs center" style="left:0;right:0;top:420px;font:600 26px Montserrat;letter-spacing:.4em;color:#3F4E3A">DINNER MENU</div>
    <div class="abs center serif" style="left:40px;right:40px;top:480px;font-size:38px;line-height:1.5;color:#5d5a52">
      Burrata, heirloom tomato & basil<br><span style="color:#8FA07E">·</span><br>Lemon risotto, wild herbs<br><span style="color:#8FA07E">·</span><br>Tiramisu & wedding cake</div>
  </div>
  <div class="abs" style="left:250px;top:850px;width:46px;height:800px;background:${silver};border-radius:23px;box-shadow:0 10px 16px rgba(0,0,0,.18)"></div>
  <div class="abs" style="left:1700px;top:850px;width:46px;height:800px;background:${silver};border-radius:23px;box-shadow:0 10px 16px rgba(0,0,0,.18)"></div>
  <div class="abs" style="left:1790px;top:900px;width:40px;height:700px;background:${silver};border-radius:20px;box-shadow:0 10px 16px rgba(0,0,0,.18)"></div>
  <div class="abs paper" style="left:160px;top:470px;width:460px;height:210px;transform:rotate(-6deg)">
    <div class="abs center script" style="left:0;right:0;top:40px;font-size:96px;color:#3F4E3A">Olivia</div></div>
  ${pill('08', 'Menus & Place Settings')}
`, 'background-color:#EEEAE3', 'linen'));

/* 14 — FOIL & LETTERPRESS --------------------------------------------- */
const blind = { ink: '#F4F0E9', accent: '#F4F0E9', paper: '#E8E2D8' };
slides.push(S('14-mockup-foil-letterpress', `
  ${head('Print, foil & engrave ready', 'Luxury Print Finishes', 'Vector files work for gold foil, letterpress, embossing,<br>engraving & laser cutting')}
  <div class="abs paper" style="left:110px;top:640px;width:880px;height:1180px;transform:rotate(-3deg);background:#1F2A44 var(--noise)">
    <div class="abs lg" style="left:60px;top:150px;width:760px;height:760px">${withFoil(logoSVG('deco', E, FOIL))}</div>
    <div class="abs center" style="left:0;right:0;bottom:90px;font:500 26px Montserrat;letter-spacing:.35em;color:#C9AE7C">GOLD FOIL</div></div>
  <div class="abs paper" style="left:1060px;top:700px;width:820px;height:1120px;transform:rotate(3deg);background:#F4F0E9 var(--noise)">
    ${L('crest', E, blind, 'left:60px;top:150px;width:700px;height:700px', ';filter:drop-shadow(-3px -3px 2px rgba(255,255,255,1)) drop-shadow(4px 5px 4px rgba(90,70,40,.30))')}
    <div class="abs center" style="left:0;right:0;bottom:90px;font:500 26px Montserrat;letter-spacing:.35em;color:#9C8E78">BLIND EMBOSS</div></div>
  ${pill('09', 'Foil & Letterpress Printing')}
`, 'background-color:#D9D0C3', 'linen'));

/* 15 — FOUR LAYOUTS ---------------------------------------------------- */
const tile = (label, inner) => `<div class="card" style="height:700px;position:relative">${inner}
  <div class="abs center" style="left:0;right:0;bottom:36px;font:600 30px Montserrat;letter-spacing:.22em;text-transform:uppercase;color:#3F4E3A">${label}</div></div>`;
slides.push(S('15-logo-layouts', `
  ${head('Included with every design', 'One Logo, Four Layouts')}
  <div class="abs" style="left:90px;right:90px;top:440px;display:grid;grid-template-columns:1fr 1fr;gap:30px">
    ${tile('Primary Logo', L('laurel', E, PAL.navy, 'left:167px;top:30px;width:560px;height:560px'))}
    ${tile('Monogram Mark', L('laurelMark', E, PAL.navy, 'left:187px;top:50px;width:520px;height:520px'))}
    ${tile('Horizontal Logo', `<div class="abs lg" style="left:47px;top:150px;width:800px;height:350px">${horizontalLogo(E, PAL.navy)}</div>`)}
    ${tile('Round Badge', L('seal', E, PAL.navy, 'left:182px;top:40px;width:530px;height:530px'))}
  </div>
  <div class="abs center" style="left:0;right:0;bottom:60px;font:italic 500 50px 'Cormorant Garamond';color:#6E6A62">Perfect for invitations, signage, favors, websites & more</div>
`));

/* 16 — ANY BACKGROUND -------------------------------------------------- */
const quad = (x, y, bg, p, label, tc) => `<div class="abs" style="left:${x}px;top:${y}px;width:1000px;height:1000px;background:${bg}">
  ${L('laurel', E, p, 'left:170px;top:120px;width:660px;height:660px')}
  <div class="abs" style="${x ? 'right' : 'left'}:60px;${y ? 'bottom' : 'top'}:60px;font:600 28px Montserrat;letter-spacing:.3em;color:${tc}">${label}</div></div>`;
slides.push(S('16-any-background', `
  ${quad(0, 0, '#F7F2EA', PAL.sage, 'LIGHT', '#3F4E3A')}
  ${quad(1000, 0, '#1A1A1A', WHITE, 'DARK', '#E6D9BF')}
  ${quad(0, 1000, '#7F8F72', { ink: '#FBF8F1', accent: '#E6E0CC', paper: '#7F8F72' }, 'COLOR', '#FBF8F1')}
  ${quad(1000, 1000, '#C7A47B', { ink: '#3B2716', accent: '#6E4C2C', paper: '#C7A47B' }, 'KRAFT', '#3B2716')}
  <div class="abs paper center" style="left:440px;top:850px;width:1120px;height:300px;border-radius:150px;padding-top:50px">
    <div class="kicker" style="font-size:30px">Every colorway included</div>
    <div class="h1" style="font-size:118px;margin-top:6px">Works Everywhere</div></div>
`));

/* 17 — HOW TO PERSONALIZE ---------------------------------------------- */
const fields = [
  ['Couple names', 'Emma & James'], ['Initials & wedding date', 'E & J · 06.12.2027'],
  ['Logo style', '01 Classic Laurel', true], ['Color palette', 'Sage & Ivory', true],
  ['Extra details (optional)', 'Lake Como, Italy · match our invite'],
];
slides.push(S('17-how-to-personalize', `
  ${head('Fill in at checkout', 'How To Personalize')}
  <div class="abs" style="left:100px;top:450px;width:1000px">
    ${fields.map(([l, v, dd], i) => `<div style="margin-bottom:40px">
      <div style="font:600 32px Montserrat;color:#3F4E3A;margin-bottom:14px"><span style="color:#8FA07E">${i + 1}.</span> ${l}</div>
      <div style="height:116px;background:#fff;border:2px solid #8C8579;border-radius:18px;display:flex;align-items:center;justify-content:space-between;padding:0 36px;font:400 40px Montserrat;color:#222">
        <span>${v}</span>${dd ? '<span style="font-size:34px">▾</span>' : ''}</div></div>`).join('')}
  </div>
  <div class="abs" style="left:1110px;top:960px;font:300 120px Montserrat;color:#8FA07E">→</div>
  <div class="abs paper" style="left:1240px;top:600px;width:680px;height:880px;border-radius:6px">
    ${L('laurel', E, PAL.sage, 'left:40px;top:110px;width:600px;height:600px')}
    <div class="abs center" style="left:0;right:0;bottom:70px;font:500 24px Montserrat;letter-spacing:.3em;color:#8FA07E">YOUR CUSTOM LOGO</div></div>
  <div class="abs center" style="left:100px;right:100px;top:1720px;background:#3F4E3A;color:#F7F2EA;border-radius:24px;padding:42px 60px;font:400 36px/1.5 Montserrat">
    Please double-check spelling — we design exactly what you type.<br>Have inspiration? Send it to us in Etsy Messages after ordering.</div>
`));

/* 18 — PROOF & REVISIONS ----------------------------------------------- */
const note = (css, txt) => `<div class="abs" style="${css};width:380px;padding:34px 30px;background:#F6E8A9;box-shadow:0 14px 22px rgba(0,0,0,.18);font:italic 500 46px/1.2 'Cormorant Garamond';color:#4A4232">${txt}</div>`;
slides.push(S('18-proof-revisions', `
  ${head('We refine until you love it', `${CFG.revisions} Revision Rounds Included`)}
  <div class="abs paper" style="left:100px;top:560px;width:800px;height:1060px;transform:rotate(-3deg)">
    <div class="abs" style="left:50px;top:44px;font:600 28px Montserrat;letter-spacing:.3em;color:#9B958A">PROOF 1</div>
    ${L('crest', E, PAL.navy, 'left:80px;top:170px;width:640px;height:640px')}</div>
  ${note('left:560px;top:560px;transform:rotate(6deg)', 'Could the date be a little bigger?')}
  ${note('left:60px;top:1420px;transform:rotate(-7deg)', 'Love it! Try it in our sage green?')}
  <div class="abs" style="left:925px;top:1000px;font:300 120px Montserrat;color:#8FA07E">→</div>
  <div class="abs paper" style="left:1100px;top:560px;width:800px;height:1060px;transform:rotate(2deg)">
    <div class="abs" style="left:50px;top:44px;font:600 28px Montserrat;letter-spacing:.3em;color:#3F4E3A">FINAL</div>
    ${L('crest', { ...E, date: '06 · 12 · 2027' }, PAL.sage, 'left:80px;top:170px;width:640px;height:640px')}
    <div class="abs center" style="right:40px;bottom:50px;width:300px;height:300px;border-radius:50%;border:6px solid #4F5E48;color:#4F5E48;transform:rotate(-14deg);display:flex;flex-direction:column;align-items:center;justify-content:center;font:700 40px Montserrat;letter-spacing:.12em;opacity:.85">APPROVED<span style="font-size:70px;line-height:1">✓</span></div></div>
  <div class="abs center" style="left:0;right:0;bottom:90px;font:italic 500 56px 'Cormorant Garamond';color:#4F5E48">Every proof is sent through Etsy Messages — easy and safe.</div>
`));

/* 19 — FAQ ------------------------------------------------------------- */
const faq = [
  ['When do I get my proof?', `Within ${CFG.proof} of ordering, sent to you through Etsy Messages.`],
  ['Can I print it myself?', 'Yes! Files are print-ready for home printers, print shops and online printers.'],
  ['Can you match my invitations?', 'Absolutely. Send a photo and we’ll match the fonts and colors.'],
  ['What files will I receive?', 'PNG (transparent), JPG, PDF and SVG vector — in color, black and white.'],
  ['Need it in a rush?', 'Message us before ordering and we’ll do our best to meet your deadline.'],
  ['Will anything be shipped?', 'No — this is a digital design. Nothing physical will be mailed to you.'],
];
slides.push(S('19-faq', `
  ${head('Good to know', 'Questions & Answers')}
  <div class="abs" style="left:90px;right:90px;top:450px;display:grid;grid-template-columns:1fr 1fr;gap:30px">
    ${faq.map(([q, a]) => `<div class="card" style="height:400px;padding:56px 54px">
      <div class="serif" style="font-size:58px;font-weight:600;line-height:1.1;color:#3F4E3A">${q}</div>
      <div style="font:400 34px/1.55 Montserrat;color:#6E6A62;margin-top:26px">${a}</div></div>`).join('')}
  </div>
  <div class="abs center" style="left:0;right:0;bottom:80px;font:italic 500 54px 'Cormorant Garamond';color:#4F5E48">Still unsure? Message us — we’re always happy to help.</div>
`));

/* 20 — CLOSING --------------------------------------------------------- */
slides.push(S('20-closing', `
  ${sprig('left:-200px;top:1250px;width:760px;height:1000px;transform:rotate(-38deg);opacity:.35', '#C9D2BC')}
  ${sprig('right:-220px;top:-200px;width:760px;height:1000px;transform:rotate(142deg);opacity:.35', '#C9D2BC')}
  ${head('Thank you for visiting', 'Your Love Story,<br>Beautifully Designed', '', '#F7F2EA')}
  ${L('laurel', E, { ink: '#F7F2EA', accent: '#C9B98F', paper: '#3F4E3A' }, 'left:600px;top:560px;width:800px;height:800px')}
  <div class="abs" style="left:120px;right:120px;top:1400px;display:grid;grid-template-columns:repeat(3,1fr);gap:30px">
    ${[[`Proof in`, CFG.proof], [`${CFG.revisions} Rounds`, 'of revisions'], ['Digital File', 'nothing shipped']].map(([a, b]) =>
      `<div class="center" style="border:2px solid rgba(247,242,234,.4);border-radius:24px;padding:36px 20px;color:#F7F2EA">
        <div class="serif" style="font-size:64px;font-weight:600;line-height:1.1">${a}</div>
        <div style="font:500 30px Montserrat;letter-spacing:.12em;margin-top:12px;color:#C9B98F;text-transform:uppercase">${b}</div></div>`).join('')}
  </div>
  <div class="abs center" style="left:0;right:0;top:1720px;color:#F7F2EA">
    <div class="script" style="font-size:96px;line-height:1.1">Add to cart & personalize</div>
    <div style="font:500 30px Montserrat;letter-spacing:.2em;margin-top:22px;color:#C9B98F">QUESTIONS? MESSAGE US ANYTIME</div></div>
`, 'background-color:#3F4E3A'));

document.getElementById('root').innerHTML = slides.join('') + altThumb;
