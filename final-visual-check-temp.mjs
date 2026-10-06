import { chromium } from 'playwright';

async function takeAndVerifyScreenshots() {
  console.log('='.repeat(70));
  console.log('FINAL VISUAL VERIFICATION - commit 870a1b7');
  console.log('='.repeat(70));
  
  const browser = await chromium.launch({ headless: true });
  
  // ====== DESKTOP 1280x800 ======
  console.log('\n📸 DESKTOP (1280x800) ?halloween=1');
  console.log('-'.repeat(70));
  
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const dPage = await desktop.newPage();
  await dPage.goto('http://localhost:3000/?halloween=1', { waitUntil: 'networkidle' });
  await dPage.waitForTimeout(3000);
  
  // Issue 1: Check overlap
  console.log('\n1️⃣ OVERLAP CHECK:');
  const h1Box = await dPage.$eval('.halloween-headline', el => el.getBoundingClientRect());
  console.log(`   H1 bounds: x=${h1Box.x.toFixed(0)}, right=${h1Box.right.toFixed(0)}, width=${h1Box.width.toFixed(0)}`);
  
  // Get all art elements
  const artContainer = await dPage.$('.halloween-pumpkin-row').then(el => el?.evaluate(node => node.parentElement));
  const allArtElements = await dPage.$$eval('.halloween-pumpkin-row > *, .halloween-ghost, .halloween-bat', 
    els => els.map(el => {
      const rect = el.getBoundingClientRect();
      return { 
        className: el.className, 
        x: rect.x, 
        right: rect.right,
        width: rect.width 
      };
    })
  );
  
  console.log('   Art elements:');
  let anyOverlap = false;
  allArtElements.forEach((el, i) => {
    const overlaps = el.x < h1Box.right;
    if (overlaps) anyOverlap = true;
    console.log(`     ${i+1}. x=${el.x.toFixed(0)}, right=${el.right.toFixed(0)} ${overlaps ? '❌ OVERLAPS H1' : '✓'}`);
  });
  console.log(`   ✓ No overlap: ${!anyOverlap ? 'PASS' : 'FAIL'}`);
  
  // Issue 2: Pumpkin row position
  console.log('\n2️⃣ PUMPKIN POSITION:');
  const moonBox = await dPage.$eval('.halloween-moon', el => el.getBoundingClientRect());
  const pumpkinRowBox = await dPage.$eval('.halloween-pumpkin-row', el => el.getBoundingClientRect());
  
  const moonHeight = moonBox.bottom - moonBox.top;
  const pumpkinBottomFromMoonBottom = moonBox.bottom - pumpkinRowBox.bottom;
  const lowerThirdPercent = (pumpkinBottomFromMoonBottom / moonHeight) * 100;
  
  console.log(`   Moon: top=${moonBox.top.toFixed(0)}, bottom=${moonBox.bottom.toFixed(0)}, height=${moonHeight.toFixed(0)}`);
  console.log(`   Pumpkins: top=${pumpkinRowBox.top.toFixed(0)}, bottom=${pumpkinRowBox.bottom.toFixed(0)}`);
  console.log(`   Pumpkin bottom offset from moon bottom: ${pumpkinBottomFromMoonBottom.toFixed(0)}px (${lowerThirdPercent.toFixed(0)}%)`);
  console.log(`   ✓ In lower third (85-95%): ${lowerThirdPercent >= 3 && lowerThirdPercent <= 15 ? 'PASS' : 'FAIL'}`);
  
  // Issue 3: Moon rim
  console.log('\n3️⃣ MOON RIM:');
  const moonStyles = await dPage.$eval('.halloween-moon', el => {
    const style = window.getComputedStyle(el);
    return {
      border: style.border,
      borderRadius: style.borderRadius,
      backgroundSize: style.backgroundSize,
      boxShadow: style.boxShadow
    };
  });
  console.log(`   Border: ${moonStyles.border}`);
  console.log(`   Background-size: ${moonStyles.backgroundSize}`);
  console.log(`   Box-shadow: ${moonStyles.boxShadow.slice(0, 60)}...`);
  console.log(`   ✓ No border: ${moonStyles.border.includes('0px') || moonStyles.border === 'none' ? 'PASS' : 'FAIL'}`);
  console.log(`   ✓ Uses contain: ${moonStyles.backgroundSize === 'contain' ? 'PASS' : 'FAIL'}`);
  
  // Issue 4: Bats
  console.log('\n4️⃣ BATS:');
  const bats = await dPage.$$('.halloween-bat');
  console.log(`   Found ${bats.length} bats`);
  
  if (bats.length > 0) {
    const bat1 = await bats[0].boundingBox();
    const bat2 = await bats[1]?.boundingBox();
    const bat3 = await bats[2]?.boundingBox();
    console.log(`   Bat 1: ${bat1?.width.toFixed(0)}x${bat1?.height.toFixed(0)}px`);
    if (bat2) console.log(`   Bat 2: ${bat2.width.toFixed(0)}x${bat2.height.toFixed(0)}px`);
    if (bat3) console.log(`   Bat 3: ${bat3.width.toFixed(0)}x${bat3.height.toFixed(0)}px`);
    console.log(`   ✓ Bats are 64-72px wide: ${bat1 && bat1.width >= 60 && bat1.width <= 75 ? 'PASS' : 'FAIL'}`);
  }
  
  // Take screenshot
  await dPage.screenshot({ path: '/tmp/final-desktop-870a1b7.png', fullPage: false });
  console.log('\n   📸 Screenshot saved: /tmp/final-desktop-870a1b7.png');
  
  await desktop.close();
  
  // ====== MOBILE 390x844 ======
  console.log('\n\n📱 MOBILE (390x844) ?halloween=1');
  console.log('-'.repeat(70));
  
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mPage = await mobile.newPage();
  await mPage.goto('http://localhost:3000/?halloween=1', { waitUntil: 'networkidle' });
  await mPage.waitForTimeout(3000);
  
  // Issue 5: Sound button and pumpkin clipping
  console.log('\n5️⃣ MOBILE LAYOUT:');
  
  const soundButton = await mPage.$('button[aria-pressed]');
  console.log(`   Sound button visible: ${soundButton ? 'YES ❌' : 'NO ✓'}`);
  
  const mPumpkinRow = await mPage.$eval('.halloween-pumpkin-row', el => el.getBoundingClientRect());
  console.log(`   Pumpkin row: x=${mPumpkinRow.x.toFixed(0)}, right=${mPumpkinRow.right.toFixed(0)}, width=${mPumpkinRow.width.toFixed(0)}`);
  console.log(`   ✓ Row fits in 390px with margin: ${mPumpkinRow.x >= 5 && mPumpkinRow.right <= 385 ? 'PASS' : 'FAIL'}`);
  
  const mScrollWidth = await mPage.evaluate(() => document.documentElement.scrollWidth);
  console.log(`   ScrollWidth: ${mScrollWidth}px`);
  console.log(`   ✓ No horizontal overflow: ${mScrollWidth === 390 ? 'PASS' : 'FAIL'}`);
  
  const mBats = await mPage.$$('.halloween-bat');
  if (mBats.length > 0) {
    const mBat = await mBats[0].boundingBox();
    console.log(`   Mobile bat size: ${mBat?.width.toFixed(0)}px`);
    console.log(`   ✓ Bat is 40-48px: ${mBat && mBat.width >= 38 && mBat.width <= 50 ? 'PASS' : 'FAIL'}`);
  }
  
  // Take screenshot
  await mPage.screenshot({ path: '/tmp/final-mobile-870a1b7.png', fullPage: false });
  console.log('\n   📸 Screenshot saved: /tmp/final-mobile-870a1b7.png');
  
  await mobile.close();
  await browser.close();
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ VERIFICATION COMPLETE - Review screenshots visually');
  console.log('='.repeat(70));
}

takeAndVerifyScreenshots().catch(console.error);
