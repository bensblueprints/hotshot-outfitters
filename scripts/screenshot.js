const { chromium, devices } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");

async function shoot() {
  const browser = await chromium.launch();
  const outDir = path.join(__dirname, "..", "..", "screenshots");
  fs.mkdirSync(outDir, { recursive: true });

  const targets = [
    { name: "home-desktop", viewport: { width: 1440, height: 900 }, url: "https://hotshot-outfitters.netlify.app/" },
    { name: "home-mobile", viewport: { width: 390, height: 844 }, url: "https://hotshot-outfitters.netlify.app/" },
    { name: "whitetail-desktop", viewport: { width: 1440, height: 900 }, url: "https://hotshot-outfitters.netlify.app/hunts/whitetail-deer" },
    { name: "whitetail-mobile", viewport: { width: 390, height: 844 }, url: "https://hotshot-outfitters.netlify.app/hunts/whitetail-deer" },
  ];

  for (const t of targets) {
    const ctx = await browser.newContext({ viewport: t.viewport, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    console.log(`Opening ${t.url} @ ${t.viewport.width}x${t.viewport.height}…`);
    await page.goto(t.url, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
    // give widget script time
    await page.waitForTimeout(3000);
    const file = path.join(outDir, `${t.name}.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`saved ${file}`);
    await ctx.close();
  }
  await browser.close();
}

shoot().catch((e) => { console.error(e); process.exit(1); });
