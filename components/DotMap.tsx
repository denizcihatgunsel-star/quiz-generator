// Dot-matrix world map: faint gray grid dots with clusters of variable-size
// solid black dots marking activity hubs. No outlines, no landmasses.
// Animates: grid fades in, cluster dots pop outward from the map center,
// and three hubs emit a slow live-activity ping ring.

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1200;
const H = 600;
const SPACING = 20;
const CX = W / 2;
const CY = H / 2;

interface Hub {
  x: number;
  y: number;
  r: number;
  n: number;
  spread: number;
}

const HUBS: Hub[] = [
  { x: 335, y: 205, r: 26, n: 88, spread: 64 }, // New York / US East
  { x: 185, y: 245, r: 14, n: 40, spread: 46 }, // West Coast
  { x: 255, y: 292, r: 10, n: 24, spread: 38 }, // Mexico City
  { x: 605, y: 150, r: 24, n: 76, spread: 60 }, // UK / Western Europe
  { x: 555, y: 202, r: 9, n: 20, spread: 34 }, // Iberia
  { x: 640, y: 330, r: 12, n: 30, spread: 42 }, // West Africa
  { x: 762, y: 285, r: 20, n: 64, spread: 56 }, // India
  { x: 885, y: 335, r: 14, n: 40, spread: 48 }, // Southeast Asia
  { x: 930, y: 440, r: 10, n: 26, spread: 40 }, // Australia
  { x: 395, y: 402, r: 16, n: 46, spread: 50 }, // Brazil
  { x: 720, y: 248, r: 7, n: 14, spread: 30 }, // Middle East
];

const PINGS = [
  { x: 335, y: 205, r: 30, delay: 1.2 }, // New York
  { x: 605, y: 150, r: 28, delay: 1.9 }, // Europe
  { x: 762, y: 285, r: 24, delay: 2.6 }, // India
];

function buildGrid() {
  const dots: { x: number; y: number }[] = [];
  for (let y = SPACING; y < H; y += SPACING) {
    for (let x = SPACING; x < W; x += SPACING) {
      dots.push({ x, y });
    }
  }
  return dots;
}

function buildClusters() {
  const rand = mulberry32(20260806);
  const dots: { x: number; y: number; r: number; delay: number }[] = [];
  for (const hub of HUBS) {
    for (let i = 0; i < hub.n; i++) {
      const angle = rand() * Math.PI * 2;
      const dist = hub.spread * Math.sqrt(rand());
      const x = hub.x + Math.cos(angle) * dist;
      const y = hub.y + Math.sin(angle) * dist;
      const r = rand() < 0.12 ? 1.5 : 2 + rand() * 4.5;
      const fromCenter = Math.hypot(x - CX, y - CY);
      const delay = 0.5 + fromCenter * 0.0022 + ((i * 7919) % 100) / 700;
      dots.push({
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
        r: Math.round(r * 10) / 10,
        delay: Math.round(delay * 1000) / 1000,
      });
    }
  }
  return dots;
}

const GRID_DOTS = buildGrid();
const CLUSTER_DOTS = buildClusters();

export default function DotMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      aria-hidden="true"
      className={className}
      role="img"
    >
      <title>Live study activity across the globe</title>
      <g fill="#F1D3DA" className="dot-grid-fade" style={{ animationDelay: "0.5s" }}>
        {GRID_DOTS.map((d, i) => (
          <circle key={`g${i}`} cx={d.x} cy={d.y} r={1.2} />
        ))}
      </g>
      <g fill="#8C5563">
        {CLUSTER_DOTS.map((d, i) => (
          <circle
            key={`c${i}`}
            cx={d.x}
            cy={d.y}
            r={d.r}
            className="dot-pop"
            style={{ animationDelay: `${d.delay}s` }}
          />
        ))}
      </g>
      <g fill="none" stroke="#B0607A" strokeWidth={1.5}>
        {PINGS.map((p, i) => (
          <circle
            key={`p${i}`}
            cx={p.x}
            cy={p.y}
            r={p.r}
            className="ping-ring"
            style={{ animationDelay: `${p.delay}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
