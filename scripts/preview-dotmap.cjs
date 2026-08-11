const sharp = require("sharp");
const d = require("../lib/data/world-dots.json");
const W = 1200;
const H = 600;
const ocean = [];
for (let y = 20; y < H; y += 20) {
  for (let x = 20; x < W; x += 20) ocean.push([x, y]);
}
const parts = [];
parts.push('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600">');
for (const [x, y] of ocean) {
  parts.push(`<circle cx="${x}" cy="${y}" r="1.2" fill="#F1D3DA"/>`);
}
for (const c of d) {
  for (const [x, y] of c.dots) {
    parts.push(`<circle cx="${x}" cy="${y}" r="2" fill="#8C5563"/>`);
  }
}
parts.push("</svg>");
sharp(Buffer.from(parts.join("")), { density: 72 })
  .png()
  .toFile("C:/Users/deniz/AppData/Local/Temp/opencode/world-preview.png")
  .then(() => console.log("ok"));
