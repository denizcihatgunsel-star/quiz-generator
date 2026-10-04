import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  
  const page = await context.newPage();
  
  console.log('📸 Taking desktop screenshots (1440x900)...');
  
  // Navigate with Halloween enabled
  await page.goto('http://localhost:3000/?halloween=1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // Let animations settle
  
  // 1. Hero screenshot
  console.log('  - Hero with pumpkins');
  await page.screenshot({ 
    path: join(__dirname, 'screenshot-desktop-hero.png'),
    fullPage: false,
  });
  
  // 2. Scroll to cauldron
  console.log('  - Scrolling to cauldron...');
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(1000);
  
  console.log('  - Cauldron section');
  await page.screenshot({ 
    path: join(__dirname, 'screenshot-desktop-cauldron.png'),
    fullPage: false,
  });
  
  // 3. Hover on button for glow effect
  console.log('  - Scrolling to Start generating button...');
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(500);
  
  const startButton = page.locator('a[href="#generate"]').first();
  await startButton.hover();
  await page.waitForTimeout(800); // Wait for bat animation
  
  console.log('  - Button hover with glow + bats');
  await page.screenshot({ 
    path: join(__dirname, 'screenshot-desktop-hover.png'),
    fullPage: false,
  });
  
  // Mobile screenshots
  console.log('\n📱 Taking mobile screenshots (390x844)...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/?halloween=1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Mobile hero
  console.log('  - Mobile hero');
  await page.screenshot({ 
    path: join(__dirname, 'screenshot-mobile-hero.png'),
    fullPage: false,
  });
  
  // Mobile cauldron
  console.log('  - Scrolling to cauldron...');
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(1000);
  
  console.log('  - Mobile cauldron');
  await page.screenshot({ 
    path: join(__dirname, 'screenshot-mobile-cauldron.png'),
    fullPage: false,
  });
  
  await browser.close();
  console.log('\n✅ All screenshots saved!');
  console.log('   - screenshot-desktop-hero.png');
  console.log('   - screenshot-desktop-cauldron.png');
  console.log('   - screenshot-desktop-hover.png');
  console.log('   - screenshot-mobile-hero.png');
  console.log('   - screenshot-mobile-cauldron.png');
})();
