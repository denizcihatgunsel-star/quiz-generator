#!/usr/bin/env node
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

async function optimizeAssets() {
  console.log('Converting and optimizing Halloween assets...');
  
  // Convert pumpkin PNG to WebP
  await sharp('/tmp/pumpkin.png')
    .resize(120, 120, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85, alphaQuality: 100 })
    .toFile('/workspace/public/seasonal/halloween/pumpkin.webp');
  console.log('✓ Pumpkin converted');
  
  // Convert candle PNG to WebP
  await sharp('/tmp/candle.png')
    .resize(80, 80, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85, alphaQuality: 100 })
    .toFile('/workspace/public/seasonal/halloween/candle.webp');
  console.log('✓ Candle converted');
  
  // Convert ghost PNG to WebP
  await sharp('/tmp/ghost.png')
    .resize(100, 100, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85, alphaQuality: 100 })
    .toFile('/workspace/public/seasonal/halloween/ghost.webp');
  console.log('✓ Ghost converted');
  
  // Convert cobweb PNG to WebP
  await sharp('/tmp/cobweb.png')
    .resize(200, 200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 80, alphaQuality: 90 })
    .toFile('/workspace/public/seasonal/halloween/cobweb.webp');
  console.log('✓ Cobweb converted');
  
  // Convert and tint moon to teal
  await sharp('/tmp/moon.jpg')
    .resize(400, 400, { fit: 'cover' })
    .modulate({ brightness: 1.1, saturation: 0.6 })
    .tint({ r: 216, g: 255, b: 246 })
    .webp({ quality: 80 })
    .toFile('/workspace/public/seasonal/halloween/moon-teal.webp');
  console.log('✓ Moon converted and tinted teal');
  
  // Copy SVGs directly
  const pumpkinFlatSvg = readFileSync('/tmp/pumpkin-flat.svg', 'utf8');
  writeFileSync('/workspace/public/seasonal/halloween/pumpkin-flat.svg', pumpkinFlatSvg);
  console.log('✓ Pumpkin flat SVG copied');
  
  const batSvg = readFileSync('/tmp/bat.svg', 'utf8');
  writeFileSync('/workspace/public/seasonal/halloween/bat.svg', batSvg);
  console.log('✓ Bat SVG copied');
  
  console.log('\n✅ All assets optimized and saved to public/seasonal/halloween/');
}

optimizeAssets().catch(err => {
  console.error('Error optimizing assets:', err);
  process.exit(1);
});
