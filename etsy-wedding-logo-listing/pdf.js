const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.resolve('src/order-info.html')); await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: 'Order-Info-Digital-Delivery.pdf', format: 'Letter', printBackground: true }); await b.close(); })();
