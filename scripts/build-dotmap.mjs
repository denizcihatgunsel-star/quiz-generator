import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { feature } from "topojson-client";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 600;
const STEP = 15;

const topo = JSON.parse(readFileSync(join(ROOT, "scripts/data/countries-110m.json"), "utf8"));
const collection = feature(topo, topo.objects.countries);

const lon2x = (lon) => ((lon + 180) / 360) * W;
const lat2y = (lat) => ((90 - lat) / 180) * H;

function pointInRings(rings, x, y) {
  let inside = false;
  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = lon2x(ring[i][0]);
      const yi = lat2y(ring[i][1]);
      const xj = lon2x(ring[j][0]);
      const yj = lat2y(ring[j][1]);
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
  }
  return inside;
}

const countries = [];

for (const f of collection.features) {
  const props = f.properties;
  if (props.name === "Antarctica") continue;

  const polygons = f.geometry.type === "Polygon"
    ? [f.geometry.coordinates]
    : f.geometry.coordinates;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const rings of polygons) {
    for (const ring of rings) {
      for (const [lon, lat] of ring) {
        const x = lon2x(lon);
        const y = lat2y(lat);
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      }
    }
  }

  const dots = [];
  for (let y = minY + STEP / 2; y < maxY; y += STEP) {
    for (let x = minX + STEP / 2; x < maxX; x += STEP) {
      if (pointInRings(polygons.flat(), x, y)) {
        dots.push([Math.round(x), Math.round(y)]);
      }
    }
  }

  if (dots.length >= 1) {
    countries.push({ name: props.name, dots });
  }
}

countries.sort((a, b) => b.dots.length - a.dots.length);

const total = countries.reduce((n, c) => n + c.dots.length, 0);
console.log(`countries: ${countries.length}, dots: ${total}`);

mkdirSync(join(ROOT, "lib/data"), { recursive: true });
writeFileSync(join(ROOT, "lib/data/world-dots.json"), JSON.stringify(countries));
