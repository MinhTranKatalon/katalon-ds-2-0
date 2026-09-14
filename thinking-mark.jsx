/* Katalon AI thinking mark — dot cloud that assembles into the Katalon mark.
   Baked artwork, no rasteriser at runtime. Engine kept as generated;
   TypeScript annotations and the ES import removed so it runs unbundled. */

function lerp(a, b, f) { return a + (b - a) * f; }

/** Deterministic hash in [0, 1). */
function hashD(a, b) {
  const h = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return h - Math.floor(h);
}

/** Value noise on a 2D lattice — smooth, deterministic, cheap. */
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  let fx = x - xi, fy = y - yi;
  fx = fx * fx * (3 - 2 * fx);
  fy = fy * fy * (3 - 2 * fy);
  const a = hashD(xi, yi), b = hashD(xi + 1, yi), c = hashD(xi, yi + 1), d = hashD(xi + 1, yi + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

/** Stable directions on a unit sphere (Fibonacci lattice). */
function fibDir(i, n) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (2 * (i + 0.5)) / n;
  const rad = Math.sqrt(1 - y * y);
  const a = i * golden;
  return [rad * Math.cos(a), y, rad * Math.sin(a)];
}

/** Shortest signed angular distance, wrapped to (-π, π]. */
function angleDelta(a, b) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

/** Shared spin + tilt + orthographic projection. */
function makeProj(yaw, tilt, cx, cy, scale) {
  const st = Math.sin(tilt), ct = Math.cos(tilt);
  const sy = Math.sin(yaw), cyw = Math.cos(yaw);
  return (x, y, z) => {
    const x1 = x * cyw + z * sy;
    const z1 = -x * sy + z * cyw;
    const y1 = y * ct - z1 * st;
    const z2 = y * st + z1 * ct;
    return [cx + x1 * scale, cy - y1 * scale, z2];
  };
}

/**
 * Painter: matte dots. On dark substrates the ink value is mirrored so near
 * dots read bright — the same depth language, inverted.
 *
 * With a `tint`, ink drives alpha against that one hue instead of a grey
 * level: near dots carry the brand colour at full strength, far dots fade
 * toward the surface. The mark stays one colour — it is never recoloured
 * per dot — so it reads as the brand mark in motion rather than a
 * multicoloured cloud.
 */
function paint(ctx, dots, dark, tint) {
  for (const d of dots) {
    const alpha = d.a == null ? 1 : d.a;
    const w = Math.min(1, Math.max(0, d.white));
    if (tint) {
      const near = dark ? w : 1 - w;
      ctx.fillStyle = 'rgba(' + tint[0] + ',' + tint[1] + ',' + tint[2] + ',' + (alpha * (0.22 + 0.78 * near)) + ')';
    } else {
      const g = Math.round((dark ? 1 - w : w) * 255);
      ctx.fillStyle = 'rgba(' + g + ',' + g + ',' + g + ',' + alpha + ')';
    }
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function paintLines(ctx, lines, dark) {
  for (const l of lines) {
    const alpha = l.a == null ? 1 : l.a;
    const w = Math.min(1, Math.max(0, l.white));
    const g = Math.round((dark ? 1 - w : w) * 255);
    ctx.strokeStyle = 'rgba(' + g + ',' + g + ',' + g + ',' + alpha + ')';
    ctx.lineWidth = l.w;
    ctx.beginPath();
    ctx.moveTo(l.x1, l.y1);
    ctx.lineTo(l.x2, l.y2);
    ctx.stroke();
  }
}

/** Drop invisible marks, clamp radii, z-sort far→near into draw order, so a
    frame is a complete set of draw instructions needing no interpretation. */
/** Level of detail. Below ~48px the full 839-dot cloud turns to grey mush:
    the dots land sub-pixel, the silhouette stops reading and the motion is
    lost. So small marks get FEWER, BIGGER dots — the count drops, the radius
    and the floor go up, and the same form survives at 20px in a chat row.
    Decimation is by source index, which is stable frame to frame, so nothing
    flickers. */
let LOD = { step: 1, boost: 1, floor: 0.3 };
function lodFor(size) {
  if (size >= 48) return { step: 1, boost: 1, floor: 0.3 };
  if (size >= 40) return { step: 2, boost: 1.3, floor: 0.42 };
  if (size >= 32) return { step: 3, boost: 1.55, floor: 0.5 };
  if (size >= 24) return { step: 4, boost: 1.85, floor: 0.58 };
  return { step: 6, boost: 2.2, floor: 0.66 };
}

function finalizeFrame(dots, lines, rMin) {
  const floor = Math.max(rMin == null ? 0.3 : rMin, LOD.floor);
  const visible = [];
  for (let i = 0; i < dots.length; i++) {
    if (LOD.step > 1 && i % LOD.step) continue;
    const d = dots[i];
    if ((d.a == null ? 1 : d.a) < 0.02) continue;
    d.r = Math.max(floor, d.r * LOD.boost);
    visible.push(d);
  }
  visible.sort((a, b) => a.z - b.z);
  return { dots: visible, lines: lines.filter((l) => (l.a == null ? 1 : l.a) >= 0.02) };
}

function paintFrame(ctx, frame, dark, tint) {
  if (frame.lines.length) paintLines(ctx, frame.lines, dark);
  paint(ctx, frame.dots, dark, tint);
}

/** '#0f8461' → [15, 132, 97]. Returns null for anything unparseable, which
    falls the painter back to greyscale. */
function parseTint(hex) {
  if (typeof hex !== 'string') return null;
  const h = hex.trim().replace('#', '');
  if (h.length !== 6) return null;
  const n = parseInt(h, 16);
  if (isNaN(n)) return null;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Radii were tuned for a 300pt frame; sub-linear scaling keeps small
    spinners legible. */
function radiusScale(size, pow) { return Math.pow(size / 300, pow); }

const TURN = Math.PI * 2;

function smoothE(x) { return x * x * (3 - 2 * x); }
function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
function empty() { return { dots: [], lines: [] }; }

/** Ink for one projected dot. `edge` is the baked distance from the
    silhouette, which gives the mark internal structure when viewed
    face-on, where projected depth alone is nearly constant. */
function inkOf(o, zx, edge) {
  const far = o.inkFar == null ? 0.6 : o.inkFar;
  const span = o.inkSpan == null ? 0.5 : o.inkSpan;
  const rim = o.inkRim == null ? 0.16 : o.inkRim;
  return far - span * zx - rim * (1 - edge);
}

/** easeInOutExpo — near-still at both ends, very fast through the middle. */
function expoInOut(x) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

/** Smootherstep with a measured amount of expo mixed in: expo's deliberate
    ease-in and confident middle, without its dead tails. */
function morphEase(x, expo) {
  const smooth = x * x * x * (x * (x * 6 - 15) + 10);
  return smooth + (expoInOut(x) - smooth) * expo;
}

/** Rotation that cruises: shaped ramps, linear middle, integrates to 1. */
function cruise(x, edge) {
  const a = Math.min(0.49, Math.max(0.001, edge));
  const v = 1 / (1 - a);
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  if (x < a) {
    const u = x / a;
    return v * a * (u * u * u - (u * u * u * u) / 2);
  }
  if (x > 1 - a) {
    const u = (1 - x) / a;
    return 1 - v * a * (u * u * u - (u * u * u * u) / 2);
  }
  return v * (a * 0.5 + (x - a));
}

/** The cycle: dwell in the dispersed form, morph to the mark, morph back.
    Rotation belongs to the dispersed form and eases out partway through the
    morph in. Because the turn count is whole, the mark is always shown
    face-on and the cycle closes seamlessly with no accumulator. */
function beatAt(t, dwell, morph, turns, settle, expo) {
  const cycle = dwell + morph * 2;
  const local = t % cycle;
  const spinSpan = dwell + morph * settle;
  const spun = turns * cruise(Math.min(1, local / spinSpan), 0.22);
  if (local < dwell) return { m: 0, turns: spun, workT: local, local, cycle };
  const intoMorph = local - dwell;
  if (intoMorph < morph) return { m: morphEase(intoMorph / morph, expo), turns: spun, workT: -1, local, cycle };
  return { m: morphEase(1 - (intoMorph - morph) / morph, expo), turns: spun, workT: -1, local, cycle };
}

/** Per-dot assembly, hashed rather than indexed: an index-ordered stagger
    sweeps across the mark like a progress bar. */
function dotAssembly(i, m, stagger) {
  return smoothE(clamp01(m * (1 + stagger) - hashD(i, 3.1) * stagger));
}

const frameLogoAssemble = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n;
  const seats = logo.seats;
  const cx = size / 2;
  const R = (size / 2) * 0.82;
  const rs = radiusScale(size, o.rsPow == null ? 0.6 : o.rsPow);

  const b = beatAt(t, o.dwell == null ? 5.5 : o.dwell, o.morph == null ? 1.9 : o.morph,
    o.turns == null ? 1 : o.turns, o.settle == null ? 0.45 : o.settle, o.expo == null ? 0.3 : o.expo);
  const m = b.m;
  const pt = makeProj(TURN * b.turns, (o.tiltAmp == null ? 0.34 : o.tiltAmp) * (1 - m), cx, cx, R);

  const stagger = o.stagger == null ? 0 : o.stagger;
  const arc = o.arc == null ? 0 : o.arc;
  const churn = o.churn == null ? 0.09 : o.churn;
  const sphereR = o.sphereR == null ? 0.92 : o.sphereR;
  const share = o.haloShare == null ? 0.12 : o.haloShare;

  const dots = [];
  for (let i = 0; i < n; i++) {
    const mi = stagger > 0 ? dotAssembly(i, m, stagger) : m;
    const seat = seats[i];
    const fd = fibDir(seat, n);
    const fx = fd[0], fy = fd[1], fz = fd[2];
    // Sphere seats breathe on their own, so the dispersed state is alive
    // rather than a frozen ball waiting for its cue.
    const wob = sphereR * (1 + churn * (vnoise(fx * 2 + t * 0.7, fz * 2) - 0.5) * 2);

    let lx = p[i * 3], ly = p[i * 3 + 1], lz = p[i * 3 + 2];

    let halo = 0;
    if (hashD(i, 6.7) < share) {
      halo = m;
      const osc = Math.sin(t * (o.haloRate == null ? 0.9 : o.haloRate) + hashD(i, 8.3) * TURN);
      const out = 1 + (o.haloOut == null ? 0.18 : o.haloOut) * (0.5 + 0.5 * osc) * halo;
      lx *= out; ly *= out;
      lz += (o.haloZ == null ? 0.8 : o.haloZ) * osc * halo;
    }

    let x = fx * wob + (lx - fx * wob) * mi;
    let y = fy * wob + (ly - fy * wob) * mi;
    let z3 = fz * wob + (lz - fz * wob) * mi;
    if (arc > 0) {
      const bow = 1 + arc * Math.sin(Math.PI * mi);
      x *= bow; y *= bow; z3 *= bow;
    }

    const proj = pt(x, y, z3);
    const px = proj[0], py = proj[1], z = proj[2];
    const zx = clamp01((z + 1) / 2);
    const travel = Math.sin(Math.PI * mi);
    dots.push({
      x: px, y: py, z,
      r: ((o.rBase == null ? 0.55 : o.rBase) + (o.rDepth == null ? 1.5 : o.rDepth) * zx
        + (o.haloR == null ? 0.22 : o.haloR) * halo) * rs,
      white: inkOf(o, zx, e[i] * mi + (1 - mi)),
      a: 1 - (o.flightFade == null ? 0.25 : o.flightFade) * travel
    });
  }
  return finalizeFrame(dots, [], o.rMin);
};

// --- Solving: the mark → a cube scrambled and solved → the mark ---------

/** A point on the surface of a cube, from a Fibonacci index. Pushing the
    sphere direction out to the face bunches slightly toward the corners,
    which makes the edges read. */
function cubeSeat(i, n, half) {
  const d = fibDir(i, n);
  const m = Math.max(Math.abs(d[0]), Math.abs(d[1]), Math.abs(d[2])) || 1;
  return [(d[0] / m) * half, (d[1] / m) * half, (d[2] / m) * half];
}

/** Quarter-turn slabs sized to the cube, three bands per axis. */
function makeCubeMoves(count, half) {
  const moves = [];
  const band = (2 * half) / 3;
  for (let i = 0; i < count; i++) {
    const axis = Math.min(2, Math.floor(hashD(i, 2.3) * 3));
    const lo = -half + band * Math.min(2, Math.floor(hashD(i, 5.9) * 3));
    const dir = hashD(i, 7.7) < 0.5 ? 1 : -1;
    moves.push({ axis, lo, hi: lo + band, ang: (dir * Math.PI) / 2 });
  }
  return moves;
}

/** Where the palindrome is: how far each move has turned, and which one is
    under the wrench right now. */
function solveCycle(time, count, slotDur, rest) {
  const cyc = 2 * count * slotDur + rest;
  const tc = time % cyc;
  const amount = new Array(count).fill(0);
  let active = -1;
  if (tc < 2 * count * slotDur) {
    const slot = Math.floor(tc / slotDur);
    const p = (tc - slot * slotDur) / slotDur;
    const cl = Math.min(1, p / 0.7);
    const ep = 1 - Math.pow(1 - cl, 3); // machine ease-out
    if (slot < count) {
      for (let i = 0; i < slot; i++) amount[i] = 1;
      amount[slot] = ep;
      active = slot;
    } else {
      const u = 2 * count - 1 - slot;
      for (let i = 0; i < u; i++) amount[i] = 1;
      amount[u] = 1 - ep;
      active = u;
    }
  }
  return { amount, active };
}

/**
 * Run the move list over one point.
 *
 * Each move owns a slab: a point inside it rotates about that move's axis by
 * the move's angle times how far the move has turned. Membership is tested
 * against the point's CURRENT position, not its original one, so successive
 * slabs compose the way a real cube does. Returns the moved point plus
 * whether it sits in the slab currently turning.
 */
function applyMoves(pt3, moves, sc) {
  let x = pt3[0], y = pt3[1], z = pt3[2];
  let inActive = false;
  for (let k = 0; k < moves.length; k++) {
    const mv = moves[k];
    const amt = sc.amount[k] || 0;
    const coord = mv.axis === 0 ? x : mv.axis === 1 ? y : z;
    const inside = coord >= mv.lo && coord <= mv.hi;
    if (inside && k === sc.active) inActive = true;
    if (!inside || amt <= 0) continue;
    const a = mv.ang * amt;
    const ca = Math.cos(a), sa = Math.sin(a);
    if (mv.axis === 0) {
      const ny = y * ca - z * sa;
      z = y * sa + z * ca;
      y = ny;
    } else if (mv.axis === 1) {
      const nx = x * ca + z * sa;
      z = -x * sa + z * ca;
      x = nx;
    } else {
      const nx = x * ca - y * sa;
      y = x * sa + y * ca;
      x = nx;
    }
  }
  return [x, y, z, inActive];
}

/**
 * The mark is never the thing being scrambled — the cube is.
 *
 * Slicing the logo directly leaves debris within two moves: a sphere is
 * equally thick on every axis, but a logo is a thin plate with one correct
 * silhouette. The solve runs across the dwell and the palindrome is mapped
 * onto it exactly, so the cube is back to solved, with nothing caught
 * mid-rotation, at the moment the mark arrives.
 */
const frameLogoSolve = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n;
  const seats = logo.seats;
  const cx = size / 2;
  const R = (size / 2) * 0.82;
  const rs = radiusScale(size, o.rsPow == null ? 0.6 : o.rsPow);
  const half = o.cubeHalf == null ? 0.62 : o.cubeHalf;

  const dwell = o.dwell == null ? 5.5 : o.dwell;
  const b = beatAt(t, dwell, o.morph == null ? 1.9 : o.morph, o.turns == null ? 1 : o.turns,
    o.settle == null ? 0.45 : o.settle, o.expo == null ? 0.3 : o.expo);
  const m = b.m;
  const c = 1 - m;
  const pt = makeProj(TURN * b.turns, (o.tiltAmp == null ? 0.36 : o.tiltAmp) * c, cx, cx, R);

  const moveCount = o.moveCount == null ? 6 : o.moveCount;
  const solveProgress = clamp01(b.workT < 0 ? 1 : b.workT / dwell);
  const sc = solveCycle(solveProgress * 2 * moveCount, moveCount, 1, 0);
  const moves = makeCubeMoves(moveCount, half);

  const dots = [];
  for (let i = 0; i < n; i++) {
    const q = cubeSeat(seats[i], n, half);
    const tp = applyMoves(q, moves, sc);
    const lx = p[i * 3], ly = p[i * 3 + 1], lz = p[i * 3 + 2];
    const x = lx + (tp[0] - lx) * c;
    const y = ly + (tp[1] - ly) * c;
    const z3 = lz + (tp[2] - lz) * c;

    const proj = pt(x, y, z3);
    const zx = clamp01((proj[2] + 1) / 2);
    dots.push({
      x: proj[0], y: proj[1], z: proj[2],
      // The slab under the wrench brightens, so the eye can follow which
      // face is turning instead of watching the whole solid shimmer.
      r: ((o.rBase == null ? 0.55 : o.rBase) + (o.rDepth == null ? 1.4 : o.rDepth) * zx
        + (tp[3] ? (o.rActive == null ? 0.3 : o.rActive) : 0) * c) * rs,
      white: inkOf(o, zx, e[i] * m + (1 - m))
    });
  }
  return finalizeFrame(dots, [], o.rMin);
};

// --- Searching: an evenly packed sphere, swept by a meridian -------------

/**
 * The dots spread by the Fibonacci lattice — the closest thing to equal
 * spacing on a sphere: no seams, no poles, no borrowed globe iconography.
 * What reads as searching is the SWEEP: a meridian of longitude travelling
 * the surface with everything behind it held back. An even field lit by a
 * moving line reads as something being scanned; a drawn grid reads as a
 * picture of a globe.
 */
const frameLogoScan = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n;
  const seats = logo.seats;
  const cx = size / 2;
  const R = (size / 2) * 0.82;
  const rs = radiusScale(size, o.rsPow == null ? 0.6 : o.rsPow);

  const b = beatAt(t, o.dwell == null ? 5.5 : o.dwell, o.morph == null ? 1.9 : o.morph,
    o.turns == null ? 1 : o.turns, o.settle == null ? 0.1 : o.settle, o.expo == null ? 0.3 : o.expo);
  const m = b.m;
  const g = 1 - m;

  const yaw = TURN * b.turns;
  const pt = makeProj(yaw, (o.tiltAmp == null ? 0.34 : o.tiltAmp) * g, cx, cx, R);

  const sphereR = o.sphereR == null ? 0.94 : o.sphereR;
  const width = o.scanWidth == null ? 0.22 : o.scanWidth;
  // Anchored to the CAMERA: `yaw + π/2` is whichever longitude faces the
  // viewer, and the band oscillates about it. Bounded below π/2 it can never
  // reach the silhouette, so it is always on the near side however far the
  // sphere has turned — an accumulating longitude spends half of every pass
  // hidden round the back.
  const scan = yaw + Math.PI / 2 + (o.scanSwing == null ? 1.05 : o.scanSwing) * Math.sin(t * (o.scanRate == null ? 0.85 : o.scanRate));
  const dimBase = o.dimBase == null ? 0.4 : o.dimBase;
  const ease = o.poleEase == null ? 1.4 : o.poleEase;
  const arms = Math.max(3, Math.round(o.arms == null ? 13 : o.arms));
  const armDepth = o.armDepth == null ? 0.55 : o.armDepth;

  const dots = [];
  for (let i = 0; i < n; i++) {
    const a3 = fibDir(seats[i], n);
    const ax = a3[0], ay = a3[1], az = a3[2];

    // Loosen the poles. The lattice is equal-area, but a sphere presents its
    // caps almost edge-on, so equal area there reads as a pile-up.
    // Compressing latitude and recomputing the ring radius redistributes
    // density without reshaping the silhouette.
    const lat = (ay < 0 ? -1 : 1) * Math.pow(Math.abs(ay), ease);
    const ring0 = Math.sqrt(Math.max(1e-9, 1 - ay * ay));
    const ring = Math.sqrt(Math.max(0, 1 - lat * lat)) / ring0;
    const fx = ax * ring, fy = lat, fz = az * ring;

    // Points whose indices differ by a Fibonacci number are neighbours along
    // one arm, so weighting `seat mod arms` in a repeating cycle surfaces the
    // lattice's own spirals as threads. Nothing moves; only the ink differs.
    const tier = (seats[i] % arms) % 3;
    const arm = 1 - armDepth * (tier === 0 ? 0 : tier === 1 ? 0.5 : 1);

    const gx = fx * sphereR, gy = fy * sphereR, gz = fz * sphereR;
    const x = p[i * 3] + (gx - p[i * 3]) * g;
    const y = p[i * 3 + 1] + (gy - p[i * 3 + 1]) * g;
    const z3 = p[i * 3 + 2] + (gz - p[i * 3 + 2]) * g;

    // Distance measured in longitude alone, so the lit band runs pole to pole
    // and the whole sphere is swept rather than a patch of it.
    const d = angleDelta(Math.atan2(fz, fx), scan);
    const boost = Math.exp(-(d * d) / width) * g;

    const proj = pt(x, y, z3);
    const zx = clamp01((proj[2] + 1) / 2);
    dots.push({
      x: proj[0], y: proj[1], z: proj[2],
      r: ((o.rBase == null ? 0.5 : o.rBase) + (o.rDepth == null ? 1.4 : o.rDepth) * zx * arm
        + (o.rBoost == null ? 1.3 : o.rBoost) * boost) * rs,
      white: inkOf(o, zx, e[i] * m + (1 - m)) + (o.armInk == null ? 0.16 : o.armInk) * (1 - arm) * g
        - (o.scanInk == null ? 0.3 : o.scanInk) * boost,
      // Un-swept dots dim only once the sphere has formed, so the mark itself
      // is never shown at partial opacity.
      a: 1 - (1 - dimBase) * g * (1 - Math.min(1, boost))
    });
  }
  return finalizeFrame(dots, [], o.rMin);
};

// --- Working: the mark → an angular plate → the mark ---------------------

/** The Katalon plate, in viewBox units: a square with two corners sheared
    off, so the silhouette is unmistakably angular against the five curved
    forms in the set. */
const PLATE_POLY = [
  [67.1904, 0], [0, 67.1904], [0, 134.072],
  [66.8971, 134.072], [134.087, 66.8817], [134.087, 0]
];

/** Even-odd point-in-polygon. */
function inPoly(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/**
 * Fill the plate with n dots, once, at module load.
 *
 * Rejection sampling on a deterministic hash rather than a scanline grid: a
 * grid leaves visible rows and columns, which on a shape this angular reads
 * as a halftone screen instead of a solid. A shallow z spread keeps the
 * plate a body, so the same depth-as-ink language still applies — a truly
 * flat plate would project to one tone and lose all structure face-on.
 */
function bakePlate(n) {
  const S = 0.86;
  const H = 67.04;
  const poly = PLATE_POLY.map((q) => [((q[0] - H) / H) * S, ((H - q[1]) / H) * S]);
  const p = new Float32Array(n * 3);
  let k = 0;
  for (let i = 0; k < n && i < n * 60; i++) {
    const rx = (hashD(i, 11.3) * 2 - 1) * S;
    const ry = (hashD(i, 17.9) * 2 - 1) * S;
    if (!inPoly(rx, ry, poly)) continue;
    p[k * 3] = rx;
    p[k * 3 + 1] = ry;
    p[k * 3 + 2] = (hashD(k, 23.1) - 0.5) * 0.26;
    k++;
  }
  return p;
}

/**
 * The mark becomes the angular plate and returns.
 *
 * The knot this replaces was a one-dot-wide thread, which put it in a
 * different medium from every other form here — five dotted volumes and one
 * drawn line. The plate is a volume, so the family holds.
 *
 * What carries the labour is a bright band travelling across the plate: the
 * same "a head is working over the form" idea as the knot, but expressed by
 * ink on a body instead of by a line growing. Nothing is ever absent — the
 * whole cloud is present the entire cycle.
 */
const frameLogoWork = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n;
  const cx = size / 2;
  const R = (size / 2) * 0.82;
  const rs = radiusScale(size, o.rsPow == null ? 0.6 : o.rsPow);

  const b = beatAt(t, o.dwell == null ? 5.5 : o.dwell, o.morph == null ? 1.9 : o.morph,
    o.turns == null ? 1 : o.turns, o.settle == null ? 0.1 : o.settle, o.expo == null ? 0.3 : o.expo);
  const m = b.m;
  const c = 1 - m;

  const pt = makeProj(TURN * b.turns, (o.tiltAmp == null ? 0.3 : o.tiltAmp) * c, cx, cx, R);

  // The band oscillates in the plate's own x, so it crosses the shape rather
  // than crossing the screen — it stays light on an object under any turn.
  const bandX = (o.bandSpan == null ? 0.86 : o.bandSpan) * Math.sin(t * (o.bandRate == null ? 0.7 : o.bandRate));
  const bandW = o.bandWidth == null ? 0.045 : o.bandWidth;

  const dots = [];
  for (let i = 0; i < n; i++) {
    const tx = PLATE[i * 3], ty = PLATE[i * 3 + 1], tz = PLATE[i * 3 + 2];
    const lx = p[i * 3], ly = p[i * 3 + 1], lz = p[i * 3 + 2];
    const x = lx + (tx - lx) * c;
    const y = ly + (ty - ly) * c;
    const z3 = lz + (tz - lz) * c;

    const d = tx - bandX;
    const boost = Math.exp(-(d * d) / bandW) * c;

    const proj = pt(x, y, z3);
    const zx = clamp01((proj[2] + 1) / 2);
    dots.push({
      x: proj[0], y: proj[1], z: proj[2],
      r: ((o.rBase == null ? 0.55 : o.rBase) + (o.rDepth == null ? 1.4 : o.rDepth) * zx
        + (o.bandR == null ? 1.1 : o.bandR) * boost) * rs,
      white: inkOf(o, zx, e[i] * m + (1 - m)) - (o.bandInk == null ? 0.34 : o.bandInk) * boost
    });
  }
  return finalizeFrame(dots, [], o.rMin);
};

// --- Listening: one soft body whose vertical extent carries a waveform ---

/**
 * One body, not fifteen bars. A wide, slightly irregular ellipsoid, lit and
 * z-sorted like every other form here, whose vertical extent swells and
 * contracts along its width as a travelling wave passes through. The
 * waveform is legible in the silhouette, but it is the silhouette OF
 * something. Displacing points in depth instead ghosts the mark across the
 * frame, because a depth offset projects to a screen offset under any tilt.
 */
const frameLogoWave = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n;
  const seats = logo.seats;
  const cx = size / 2;
  const R = (size / 2) * 0.82;
  const rs = radiusScale(size, o.rsPow == null ? 0.6 : o.rsPow);

  const b = beatAt(t, o.dwell == null ? 5.5 : o.dwell, o.morph == null ? 1.9 : o.morph, 0,
    o.settle == null ? 0.45 : o.settle, o.expo == null ? 0.3 : o.expo);
  const m = b.m;
  const c = 1 - m;

  // Yaw oscillates rather than accumulating and is scaled by the body
  // amount, so it is exactly zero whenever the mark is showing — enough
  // parallax to read as 3D, not enough to turn the waveform away.
  const pt = makeProj(
    (o.yawAmp == null ? 0.42 : o.yawAmp) * Math.sin(t * (o.yawRate == null ? 0.55 : o.yawRate)) * c,
    (o.tiltAmp == null ? 0.26 : o.tiltAmp) * c, cx, cx, R);

  const wide = o.wide == null ? 1.12 : o.wide;
  const tall = o.tall == null ? 0.5 : o.tall;
  const k1 = o.waveK == null ? 3.1 : o.waveK;
  const k2 = o.waveK2 == null ? 6.7 : o.waveK2;
  const rate = o.waveRate == null ? 1.9 : o.waveRate;
  const swing = o.swing == null ? 0.52 : o.swing;

  const dots = [];
  for (let i = 0; i < n; i++) {
    const f = fibDir(seats[i], n);
    const fx = f[0], fy = f[1], fz = f[2];

    // Two harmonics, so the profile never resolves into a clean sine — real
    // audio does not, and one frequency reads as a decorative ripple.
    const w = Math.sin(fx * k1 - t * rate) * 0.62 + Math.sin(fx * k2 + t * rate * 0.55) * 0.38;
    const amp = 1 + swing * w;
    const lumpy = 1 + (o.lumps == null ? 0.12 : o.lumps) * (vnoise(fx * 2 + t * 0.35, fz * 2) - 0.5) * 2;

    const bx = fx * wide * lumpy;
    const by = fy * tall * lumpy * amp;
    const bz = fz * wide * lumpy;

    const lx = p[i * 3], ly = p[i * 3 + 1], lz = p[i * 3 + 2];
    const x = lx + (bx - lx) * c;
    const y = ly + (by - ly) * c;
    const z3 = lz + (bz - lz) * c;

    const proj = pt(x, y, z3);
    const zx = clamp01((proj[2] + 1) / 2);
    const loud = clamp01(w * 0.5 + 0.5);
    dots.push({
      x: proj[0], y: proj[1], z: proj[2],
      r: ((o.rBase == null ? 0.55 : o.rBase) + (o.rDepth == null ? 1.5 : o.rDepth) * zx
        + (o.loudR == null ? 0.3 : o.loudR) * loud * c) * rs,
      white: inkOf(o, zx, e[i] * m + (1 - m)) - (o.loudInk == null ? 0.14 : o.loudInk) * loud * c
    });
  }
  return finalizeFrame(dots, [], o.rMin);
};

// --- Shared scaffolding for the state forms ----------------------------

/** Beat + projection + dot scale. Every state form runs the same cycle, so a
    surface can switch state mid-animation without the timing jumping. */
function rig(size, t, o, tiltDef, yawDef) {
  const cx = size / 2, R = (size / 2) * 0.82;
  const b = beatAt(t, o.dwell == null ? 3 : o.dwell, o.morph == null ? 1.8 : o.morph,
    o.turns == null ? 0 : o.turns, o.settle == null ? 0.1 : o.settle, o.expo == null ? 0.3 : o.expo);
  const c = 1 - b.m;
  const yaw = (o.yawAmp == null ? yawDef : o.yawAmp) * Math.sin(t * (o.yawRate == null ? 0.3 : o.yawRate)) * c
    + b.turns * TURN;
  return { m: b.m, c, pt: makeProj(yaw, (o.tilt == null ? tiltDef : o.tilt) * c, cx, cx, R),
    rs: radiusScale(size, o.rsPow == null ? 0.6 : o.rsPow), b };
}

/** Project one dot: body position lerped against its seat in the mark, so
    every form condenses back into the logo on the shared beat. */
function emit(dots, g, o, p, e, i, bx, by, bz, lit, alpha) {
  const c = g.c, m = g.m;
  const lx = p[i * 3], ly = p[i * 3 + 1], lz = p[i * 3 + 2];
  const proj = g.pt(lx + (bx - lx) * c, ly + (by - ly) * c, lz + (bz - lz) * c);
  const zx = clamp01((proj[2] + 1) / 2);
  const l = lit || 0;
  dots.push({
    x: proj[0], y: proj[1], z: proj[2], a: alpha == null ? 1 : alpha,
    r: ((o.rBase == null ? 0.55 : o.rBase) + (o.rDepth == null ? 1.4 : o.rDepth) * zx
      + (o.loudR == null ? 0.3 : o.loudR) * l * c) * g.rs,
    white: inkOf(o, zx, e[i] * m + (1 - m)) - (o.loudInk == null ? 0.16 : o.loudInk) * l * c
  });
}

/** Thinking: a brain. The sphere form now belongs to Searching alone —
    two states cannot share a silhouette. Folds are wavy lines stacked inside
    an ellipse, and a band of activity sweeps across them, which is the part
    that says "thinking" rather than "loading". */
/** Thinking: a torus turned over slowly. A closed loop with no start and no
    end — the one form here that is going nowhere on purpose, which is what
    thinking looks like from outside. A pulse runs round the major circle so
    the loop has a direction; the tumble is what makes it read as a solid.
    Deliberately unlike Searching's sphere: a hole in the middle is visible at
    20px, a scanned sphere is not. */
const frameLogoTorus = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n, seats = logo.seats;
  const g = rig(size, t, o, 0.5, 0.2);
  const Rm = o.major == null ? 0.66 : o.major;
  const rm = o.minor == null ? 0.3 : o.minor;
  const pulse = t * (o.pulse == null ? 0.9 : o.pulse);
  const dots = [];
  for (let i = 0; i < n; i++) {
    const seat = seats[i];
    // Volume, not surface: cube-rooted radius keeps the tube evenly packed.
    const a = hashD(seat, 2.9) * TURN;
    const b = hashD(seat, 6.3) * TURN;
    const rr = rm * Math.cbrt(hashD(seat, 9.7));
    const ring = Rm + Math.cos(b) * rr;
    const bx = Math.cos(a) * ring;
    const bz = Math.sin(a) * ring;
    const by = Math.sin(b) * rr;
    const d = Math.abs(Math.atan2(Math.sin(a - pulse), Math.cos(a - pulse)));
    emit(dots, g, o, p, e, i, bx, by, bz, Math.exp(-Math.pow(d / 0.5, 2)));
  }
  return finalizeFrame(dots, [], o.rMin);
};

/** Debugging: a bug, seen from above — two elytra with a seam, a head, six
    legs walking and two antennae. Literal on purpose: "debug" is the one
    place in the product where the metaphor IS the word. */
const frameLogoBug = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n, seats = logo.seats;
  const g = rig(size, t, o, 0.12, 0.16);
  const walk = t * (o.gait == null ? 2.1 : o.gait);
  const dots = [];
  for (let i = 0; i < n; i++) {
    const seat = seats[i];
    const q = seat / n, ha = hashD(seat, 3.3), hb = hashD(seat, 7.1);
    let bx, by, bz, lit = 0;
    if (q < 0.56) {
      const r = Math.sqrt(ha), th = hb * TURN;
      const side = Math.cos(th) >= 0 ? 1 : -1;
      bx = Math.cos(th) * r * 0.44 + side * 0.035;
      by = -0.08 + Math.sin(th) * r * 0.58;
      bz = 0.3 * Math.sqrt(Math.max(0, 1 - r * r));
    } else if (q < 0.66) {
      const r = Math.sqrt(ha), th = hb * TURN;
      bx = Math.cos(th) * r * 0.21;
      by = 0.62 + Math.sin(th) * r * 0.17;
      bz = 0.2 * Math.sqrt(Math.max(0, 1 - r * r));
    } else if (q < 0.94) {
      const li = seat % 6;
      const side = li < 3 ? -1 : 1;
      const pair = li % 3;
      const ph = Math.sin(walk + li * 2.1 + (side > 0 ? Math.PI : 0));
      const x0 = side * 0.4, y0 = 0.3 - pair * 0.32;
      const kx = x0 + side * 0.3, ky = y0 + 0.14 + 0.07 * ph;
      const fx = kx + side * 0.24, fy = y0 - 0.2 + 0.14 * ph;
      const u = ha;
      if (u < 0.5) { const w = u * 2; bx = lerp(x0, kx, w); by = lerp(y0, ky, w); }
      else { const w = (u - 0.5) * 2; bx = lerp(kx, fx, w); by = lerp(ky, fy, w); }
      bz = (hb - 0.5) * 0.12;
      lit = 0.55 * Math.abs(ph);
    } else {
      const side = seat % 2 ? 1 : -1;
      const u = ha;
      const wig = 0.06 * Math.sin(t * 3 + side);
      bx = side * (0.08 + 0.28 * u) + wig * u;
      by = 0.74 + 0.3 * u;
      bz = (hb - 0.5) * 0.1;
      lit = 0.3;
    }
    emit(dots, g, o, p, e, i, bx, by, bz, lit);
  }
  return finalizeFrame(dots, [], o.rMin);
};

/** Reasoning: an octahedron — a diamond in three dimensions. Edges carry a
    travelling light in sequence, so the form is a chain of decisions you can
    follow round, and the silhouette stays an unmistakable rhombus at 20px
    where a cluster of cubes turned to mush. */
const OCT_V = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
const OCT_E = [[0,2],[2,1],[1,3],[3,0],[0,4],[2,4],[1,4],[3,4],[0,5],[2,5],[1,5],[3,5]];
const OCT_F = [[0,2,4],[2,1,4],[1,3,4],[3,0,4],[0,2,5],[2,1,5],[1,3,5],[3,0,5]];
const frameLogoDiamond = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n, seats = logo.seats;
  const g = rig(size, t, o, 0.26, 0.3);
  const R = o.radius == null ? 0.95 : o.radius;
  const edgeShare = o.edgeShare == null ? 0.46 : o.edgeShare;
  const live = Math.floor(t * (o.step == null ? 1.1 : o.step)) % OCT_E.length;
  const dots = [];
  for (let i = 0; i < n; i++) {
    const seat = seats[i];
    const u = hashD(seat, 4.4), v = hashD(seat, 8.1);
    let bx, by, bz, lit = 0;
    if (seat / n < edgeShare) {
      const ei = seat % OCT_E.length;
      const A = OCT_V[OCT_E[ei][0]], B = OCT_V[OCT_E[ei][1]];
      bx = lerp(A[0], B[0], u) * R; by = lerp(A[1], B[1], u) * R; bz = lerp(A[2], B[2], u) * R;
      lit = ei === live ? 1 : 0.08;
    } else {
      // Faces, sampled barycentrically and pulled in slightly so the edges
      // keep the outline.
      const f = OCT_F[seat % OCT_F.length];
      let a = u, b = v;
      if (a + b > 1) { a = 1 - a; b = 1 - b; }
      const c = 1 - a - b, k = 0.9 * R;
      const A = OCT_V[f[0]], B = OCT_V[f[1]], C = OCT_V[f[2]];
      bx = (A[0] * a + B[0] * b + C[0] * c) * k;
      by = (A[1] * a + B[1] * b + C[1] * c) * k;
      bz = (A[2] * a + B[2] * b + C[2] * c) * k;
    }
    emit(dots, g, o, p, e, i, bx, by, bz, lit);
  }
  return finalizeFrame(dots, [], o.rMin);
};


// --- Analyzing: a slice plane reading the body -------------------------

/** A cut sweeps the sphere and the dots it touches flatten onto it and
    spread — the body being read one layer at a time, not searched. */
const frameLogoSlice = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n, seats = logo.seats;
  const g = rig(size, t, o, 0.3, 0.34);
  const rad = o.sphereR == null ? 0.92 : o.sphereR;
  const w = o.band == null ? 0.22 : o.band;
  const py = Math.sin(t * (o.sweep == null ? 0.85 : o.sweep)) * 0.84;
  const dots = [];
  for (let i = 0; i < n; i++) {
    const f = fibDir(seats[i], n);
    const s = smoothE(clamp01(1 - Math.abs(f[1] * rad - py) / w));
    const k = 1 + (o.spread == null ? 0.22 : o.spread) * s;
    const by = f[1] * rad + (py - f[1] * rad) * 0.6 * s;
    emit(dots, g, o, p, e, i, f[0] * rad * k, by, f[2] * rad * k, s);
  }
  return finalizeFrame(dots, [], o.rMin);
};

// --- Fixing: two halves knitting back together -------------------------

/** The body parts along a seam and registers back exactly, the seam lighting
    as it closes. A repair reads as something coming back together — never as
    something breaking, so the open state is brief and the close is the beat. */
const frameLogoKnit = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n, seats = logo.seats;
  const g = rig(size, t, o, 0.28, 0.3);
  const rad = o.sphereR == null ? 0.9 : o.sphereR;
  const open = Math.pow(0.5 - 0.5 * Math.cos(t * (o.rate == null ? 1.15 : o.rate)), 1.6);
  const gap = (o.gap == null ? 0.28 : o.gap) * open;
  const tw = (o.twist == null ? 0.5 : o.twist) * open;
  const dots = [];
  for (let i = 0; i < n; i++) {
    const f = fibDir(seats[i], n);
    const side = f[0] >= 0 ? 1 : -1;
    const ca = Math.cos(side * tw), sa = Math.sin(side * tw);
    const y0 = f[1] * rad, z0 = f[2] * rad;
    const seam = smoothE(clamp01(1 - Math.abs(f[0]) / (o.seamW == null ? 0.36 : o.seamW)));
    emit(dots, g, o, p, e, i, f[0] * rad + side * gap, y0 * ca - z0 * sa, y0 * sa + z0 * ca,
      seam * (1 - open));
  }
  return finalizeFrame(dots, [], o.rMin);
};

// --- Generating: lines written out of a nib ----------------------------

/** Output being laid down: dots leave a travelling nib and settle into ragged
    lines behind it. Unwritten dots wait AT the nib, so the budget is honest —
    what you see is what has been produced. */
const frameLogoWrite = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n, seats = logo.seats;
  const g = rig(size, t, o, 0.1, 0.16);
  const rows = Math.max(3, Math.round(o.rows == null ? 5 : o.rows));
  const lens = [0.98, 0.78, 1, 0.62, 0.9, 0.84];
  const prog = ((t * (o.rate == null ? 0.14 : o.rate)) % 1) * rows;
  const cur = Math.min(rows - 1, Math.floor(prog));
  const frac = prog - cur;
  const perRow = Math.ceil(n / rows);
  const rowY = (r) => 0.62 - r * (1.24 / (rows - 1));
  const xAt = (r, q) => -0.92 + 1.84 * lens[r % lens.length] * q;
  const dots = [];
  for (let i = 0; i < n; i++) {
    const seat = seats[i];
    const row = seat % rows;
    const q = clamp01((Math.floor(seat / rows) % perRow) / perRow);
    const done = row !== cur || q <= frac;
    let bx, by, bz, lit;
    if (done) {
      bx = xAt(row, q); by = rowY(row); bz = (hashD(seat, 5.5) - 0.5) * 0.18;
      lit = row === cur ? clamp01(1 - (frac - q) * 6) : 0;
    } else if (row === cur) {
      // Only the current line's remaining dots wait at the nib; later lines
      // are simply not there yet, because they have not been produced.
      bx = xAt(cur, frac) + (hashD(seat, 9.1) - 0.5) * 0.1;
      by = rowY(cur) + (hashD(seat, 2.7) - 0.5) * 0.1;
      bz = (hashD(seat, 5.5) - 0.5) * 0.1;
      lit = 0.9;
    } else {
      continue;
    }
    emit(dots, g, o, p, e, i, bx, by, bz, lit);
  }
  return finalizeFrame(dots, [], o.rMin);
};

// --- Fetching: material arriving from outside --------------------------

/** A core that is being fed: most dots hold a small sphere, the rest spiral
    in from beyond the frame and brighten as they land. Direction is the whole
    message — inward means retrieval, outward would mean upload. */
const frameLogoDraw = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n, seats = logo.seats;
  const g = rig(size, t, o, 0.3, 0.34);
  const core = o.core == null ? 0.56 : o.core;
  const cr = o.coreR == null ? 0.5 : o.coreR;
  const dots = [];
  for (let i = 0; i < n; i++) {
    const seat = seats[i];
    const f = fibDir(seat, n);
    if (seat / n < core) {
      const pulse = 1 + 0.05 * Math.sin(t * 1.6 + seat * 0.02);
      emit(dots, g, o, p, e, i, f[0] * cr * pulse, f[1] * cr * pulse, f[2] * cr * pulse, 0);
    } else {
      const ph = (t * (o.rate == null ? 0.55 : o.rate) + hashD(seat, 4.2)) % 1;
      const r = 1.22 - (1.22 - cr) * smoothE(ph);
      const a = hashD(seat, 8.8) * TURN + ph * (o.curl == null ? 2.1 : o.curl);
      const yy = f[1] * (1 - 0.6 * ph);
      const rr = Math.sqrt(Math.max(0.02, 1 - yy * yy)) * r;
      emit(dots, g, o, p, e, i, Math.cos(a) * rr, yy * r, Math.sin(a) * rr, ph, clamp01(ph * 3.5));
    }
  }
  return finalizeFrame(dots, [], o.rMin);
};

/** Debugging: a staircase with a marker that moves ONE hard step at a time —
    no easing, because stepping is discrete and a smooth glide would read as
    scrubbing. Treads and risers are drawn, so the shape says "step over". */
const frameLogoSteps = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n, seats = logo.seats;
  const g = rig(size, t, o, 0.26, 0.2);
  const steps = Math.max(3, Math.round(o.steps == null ? 4 : o.steps));
  const w = 1.8 / steps, h = 1.5 / steps;
  const active = Math.floor(t * (o.rate == null ? 1.1 : o.rate)) % steps;
  const dots = [];
  for (let i = 0; i < n; i++) {
    const seat = seats[i];
    const st = seat % steps;
    const riser = Math.floor(seat / steps) % 3 === 0;
    const u = hashD(seat, 6.3);
    const x0 = -0.9 + st * w;
    const y0 = 0.75 - st * h;
    const on = st === active ? 1 : 0;
    const bz = (hashD(seat, 1.9) - 0.5) * 0.44;
    if (riser) emit(dots, g, o, p, e, i, x0 + w, y0 - u * h, bz, on);
    else emit(dots, g, o, p, e, i, x0 + u * w, y0 + on * 0.07, bz, on);
  }
  return finalizeFrame(dots, [], o.rMin);
};

/** Executing: a stream pushed through a gate. The pinch at the middle is the
    point — work is passing through something, at a rate you can watch. */
const frameLogoFlow = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n, seats = logo.seats;
  const g = rig(size, t, o, 0.22, 0.26);
  const ring = o.ring == null ? 0.22 : o.ring;
  const speed = o.speed == null ? 0.75 : o.speed;
  const dots = [];
  for (let i = 0; i < n; i++) {
    const seat = seats[i];
    const a = hashD(seat, 3.7) * TURN;
    if (seat / n < ring) {
      const rr = (o.gateR == null ? 0.62 : o.gateR) * (1 + 0.03 * Math.sin(t * 2));
      emit(dots, g, o, p, e, i, 0, Math.cos(a) * rr, Math.sin(a) * rr, 0);
    } else {
      const x = ((hashD(seat, 5.1) * 2 + t * speed + 1) % 2) - 1;
      const pinch = 0.24 + 0.76 * smoothE(clamp01(Math.abs(x) / 0.7));
      const rr = (o.tube == null ? 0.36 : o.tube) * pinch * (0.45 + 0.55 * hashD(seat, 7.3));
      emit(dots, g, o, p, e, i, x * 0.95, Math.cos(a) * rr, Math.sin(a) * rr,
        clamp01(1 - Math.abs(x) / 0.4));
    }
  }
  return finalizeFrame(dots, [], o.rMin);
};

/** Reasoning: nodes with traffic between them. Deliberately slower and more
    even than the other states — thinking that is following a chain, not
    scanning. One edge is live at a time, so there is a path to follow. */
const RNODES = [[0, 0.8, 0.08], [-0.74, 0.14, 0.3], [0.72, 0.08, -0.26], [-0.12, -0.78, -0.1], [0.2, -0.22, 0.74]];
const REDGES = [[0, 1], [1, 3], [0, 2], [2, 4], [3, 4], [1, 4]];
const frameLogoGraph = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n, seats = logo.seats;
  const g = rig(size, t, o, 0.3, 0.38);
  const share = o.nodeShare == null ? 0.6 : o.nodeShare;
  const live = Math.floor(t * (o.step == null ? 0.7 : o.step)) % REDGES.length;
  const dots = [];
  for (let i = 0; i < n; i++) {
    const seat = seats[i];
    const f = fibDir(seat, n);
    if (seat / n < share) {
      const nd = RNODES[seat % RNODES.length];
      const s = (o.nodeR == null ? 0.3 : o.nodeR) * Math.cbrt(hashD(seat, 2.2));
      emit(dots, g, o, p, e, i, nd[0] + f[0] * s, nd[1] + f[1] * s, nd[2] + f[2] * s, 0);
    } else {
      const ei = seat % REDGES.length;
      const A = RNODES[REDGES[ei][0]], B = RNODES[REDGES[ei][1]];
      const ph = (t * (o.rate == null ? 0.4 : o.rate) + hashD(seat, 6.6)) % 1;
      const bow = 1 + (o.bow == null ? 0.2 : o.bow) * Math.sin(ph * Math.PI);
      emit(dots, g, o, p, e, i, lerp(A[0], B[0], ph) * bow, lerp(A[1], B[1], ph) * bow,
        lerp(A[2], B[2], ph) * bow, ei === live ? 1 : 0.15);
    }
  }
  return finalizeFrame(dots, [], o.rMin);
};

/** Reviewing: a checklist being ticked. Rows already checked keep their tick
    and dim; the row under review is the lit one. Reviewing is not more
    thinking — it is going back over a finished thing, item by item. */
const frameLogoCheck = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n, seats = logo.seats;
  const g = rig(size, t, o, 0.12, 0.14);
  const R = Math.max(3, Math.round(o.rows == null ? 3 : o.rows));
  const lens = [0.95, 0.72, 0.88, 0.6, 0.8];
  const cur = Math.floor(t * (o.rate == null ? 0.7 : o.rate)) % R;
  const dots = [];
  for (let i = 0; i < n; i++) {
    const seat = seats[i];
    const row = seat % R;
    const y = 0.6 - row * (1.2 / (R - 1));
    const done = row < cur;
    const u = hashD(seat, 3.9);
    let bx, by, bz = (hashD(seat, 6.1) - 0.5) * 0.16;
    if (seat / n < 0.28) {
      if (done) {
        // Tick: two strokes, drawn in the box.
        if (u < 0.38) { const w = u / 0.38; bx = -0.86 + w * 0.07; by = y + 0.02 - w * 0.07; }
        else { const w = (u - 0.38) / 0.62; bx = -0.79 + w * 0.14; by = y - 0.05 + w * 0.14; }
      } else {
        const q = u * 4, side = Math.floor(q), w = q - side;
        const bxs = [-0.88, -0.72, -0.72, -0.88], bys = [-0.08, -0.08, 0.08, 0.08];
        bx = -0.8 + (side % 2 ? 0 : (w - 0.5) * 0.16) + (side === 1 ? 0.08 : side === 3 ? -0.08 : 0);
        by = y + (side % 2 ? (w - 0.5) * 0.16 : (side === 0 ? -0.08 : 0.08));
      }
    } else {
      const len = lens[row % lens.length];
      bx = -0.6 + u * 1.5 * len;
      by = y + (hashD(seat, 8.3) - 0.5) * 0.05;
    }
    emit(dots, g, o, p, e, i, bx, by, bz, row === cur ? 1 : done ? 0.06 : 0.2);
  }
  return finalizeFrame(dots, [], o.rMin);
};

/** Processing: three rings on three axes, turning at different rates. A
    machine doing work — no metaphor of reading, writing or searching, which
    is exactly what "processing" should mean: the general case. */
const frameLogoGyro = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n, seats = logo.seats;
  const g = rig(size, t, o, 0.3, 0.3);
  const rates = [1, -0.72, 0.46];
  const radii = [0.92, 0.7, 0.48];
  const dots = [];
  for (let i = 0; i < n; i++) {
    const seat = seats[i];
    let bx, by, bz, lit = 0;
    if (seat / n < 0.82) {
      const r = seat % 3;
      const a = hashD(seat, 4.7) * TURN + t * (o.spin == null ? 0.8 : o.spin) * rates[r];
      const rr = radii[r] * (1 + 0.02 * Math.sin(t * 2 + r));
      const c = Math.cos(a) * rr, sn = Math.sin(a) * rr;
      if (r === 0) { bx = c; by = sn; bz = 0; }
      else if (r === 1) { bx = c; by = 0; bz = sn; }
      else { bx = 0; by = c; bz = sn; }
      lit = 0.5 * clamp01(Math.cos(a * 2 - t * 2));
    } else {
      const f = fibDir(seat, n);
      const cr = (o.coreR == null ? 0.2 : o.coreR) * (1 + 0.08 * Math.sin(t * 2.4));
      bx = f[0] * cr; by = f[1] * cr; bz = f[2] * cr;
      lit = 0.4;
    }
    emit(dots, g, o, p, e, i, bx, by, bz, lit);
  }
  return finalizeFrame(dots, [], o.rMin);
};

/** Scanning a document: a page with a bar travelling down it. The dots the bar
    crosses lift toward the viewer — the line is reading them off the page. */
const frameLogoPage = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n, seats = logo.seats;
  const g = rig(size, t, o, 0.2, 0.18);
  const W = o.pageW == null ? 0.6 : o.pageW, H = o.pageH == null ? 0.88 : o.pageH;
  const bar = H - ((t * (o.rate == null ? 0.35 : o.rate)) % 1) * 2 * H;
  const lens = [0.92, 0.7, 0.86, 0.55, 0.8, 0.66];
  const dots = [];
  for (let i = 0; i < n; i++) {
    const seat = seats[i];
    const u = hashD(seat, 3.9);
    let bx, by;
    if (seat / n < 0.3) {
      // Page edge: one closed rectangle, walked by perimeter.
      const per = u * (2 * W + 2 * H) * 2;
      const wSpan = 2 * W, hSpan = 2 * H;
      if (per < wSpan) { bx = -W + per; by = H; }
      else if (per < wSpan + hSpan) { bx = W; by = H - (per - wSpan); }
      else if (per < 2 * wSpan + hSpan) { bx = W - (per - wSpan - hSpan); by = -H; }
      else { bx = -W; by = -H + (per - 2 * wSpan - hSpan); }
    } else {
      const line = seat % 6;
      by = H * 0.68 - line * (H * 1.34 / 5);
      bx = -W * 0.82 + u * 1.64 * W * lens[line];
    }
    const near = Math.exp(-Math.pow((by - bar) / 0.1, 2));
    emit(dots, g, o, p, e, i, bx, by, 0.05 + near * 0.4, near);
  }
  return finalizeFrame(dots, [], o.rMin);
};

/** Drafting: a shape being sketched. The outline wobbles under slow noise and
    a pen runs round it — everything behind the pen is drawn, everything ahead
    of it is not there yet. A draft looks unfinished on purpose. */
const frameLogoSketch = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n, seats = logo.seats;
  const g = rig(size, t, o, 0.14, 0.16);
  const W = o.w == null ? 0.82 : o.w, H = o.h == null ? 0.72 : o.h;
  const pen = (t * (o.rate == null ? 0.3 : o.rate)) % 1;
  const dots = [];
  for (let i = 0; i < n; i++) {
    const seat = seats[i];
    const u = hashD(seat, 3.9);
    let bx, by, ahead;
    if (seat / n < 0.52) {
      const per = u * 4;
      const side = Math.floor(per), w = per - side;
      if (side === 0) { bx = -W + w * 2 * W; by = H; }
      else if (side === 1) { bx = W; by = H - w * 2 * H; }
      else if (side === 2) { bx = W - w * 2 * W; by = -H; }
      else { bx = -W; by = -H + w * 2 * H; }
      ahead = u > pen;
    } else {
      // Hatch strokes inside, drawn after the frame closes.
      const st = seat % 3;
      const w = hashD(seat, 7.7);
      bx = -W * 0.62 + st * (W * 0.62) + w * W * 0.5;
      by = -H * 0.42 + w * H * 0.84 - st * 0.06;
      ahead = pen < 0.55 + st * 0.14;
    }
    const jx = (vnoise(bx * 3 + t * 0.4, by * 3) - 0.5) * 0.09;
    const jy = (vnoise(by * 3 - t * 0.4, bx * 3) - 0.5) * 0.09;
    if (ahead) continue;
    emit(dots, g, o, p, e, i, bx + jx, by + jy, (hashD(seat, 6.1) - 0.5) * 0.2,
      Math.exp(-Math.pow((u - pen) / 0.06, 2)));
  }
  return finalizeFrame(dots, [], o.rMin);
};

// --- Waiting: an hourglass running down -------------------------------

/**
 * The one object everybody already reads as "wait": a glass that empties,
 * grain by grain, and then turns over. The shell is a bow-tie of rings, the
 * sand is a real budget of dots that leaves the upper cone and piles into a
 * mound below, and the flip is a 180 deg roll — so the animation states its own
 * progress instead of just idling. Structurally unlike every other mode
 * here: two cones and a falling thread, not a deformed sphere.
 */
const frameLogoWait = (size, t, o, logo) => {
  if (!logo) return empty();
  const p = logo.points.p, e = logo.points.e, n = logo.points.n;
  const seats = logo.seats;
  const cx = size / 2;
  const R = (size / 2) * 0.82;
  const rs = radiusScale(size, o.rsPow == null ? 0.6 : o.rsPow);

  const b = beatAt(t, o.dwell == null ? 5.5 : o.dwell, o.morph == null ? 1.9 : o.morph,
    o.turns == null ? 0 : o.turns, o.settle == null ? 0.1 : o.settle, o.expo == null ? 0.3 : o.expo);
  const m = b.m;
  const c = 1 - m;

  // Small held yaw only. An hourglass read head-on is unmistakable; spin it
  // and the two cones start reading as a diamond.
  const pt = makeProj(
    (o.yawAmp == null ? 0.26 : o.yawAmp) * Math.sin(t * (o.yawRate == null ? 0.26 : o.yawRate)) * c,
    (o.tilt == null ? 0.14 : o.tilt) * c, cx, cx, R);

  const H = o.height == null ? 1.02 : o.height;
  const Rw = o.wide == null ? 0.72 : o.wide;
  const neck = o.neck == null ? 0.07 : o.neck;

  const pour = o.pour == null ? 7 : o.pour;
  const flipDur = o.flipDur == null ? 1.15 : o.flipDur;
  const tc = t % (pour + flipDur);
  const pouring = tc < pour;
  const fill = pouring ? clamp01(tc / pour) : 1;
  const fk = pouring ? 0 : clamp01((tc - pour) / flipDur);
  // Roll the whole body half a turn; the sand simultaneously lerps to the
  // full-upper-cone state, so it lands already re-poured rather than snapping.
  const k = fk < 0.5 ? 2 * fk * fk : 1 - Math.pow(-2 * fk + 2, 2) / 2;
  const ra = Math.PI * k, rc = Math.cos(ra), rsn = Math.sin(ra);

  const rings = Math.max(5, Math.round(o.rings == null ? 15 : o.rings)) | 1;
  const shellShare = o.shellShare == null ? 0.56 : o.shellShare;
  const streamShare = o.streamShare == null ? 0.05 : o.streamShare;
  const sandShare = 1 - shellShare - streamShare;

  const heapH = H * 0.6;
  const heapR = Rw * 0.9;

  // Upper cone, packed uniformly: y = H * cbrt(volume fraction remaining).
  const topAt = (rho, f, ha, hb) => {
    const y = H * 0.97 * Math.cbrt(Math.max(0, rho - f) / Math.max(1e-4, 1 - f) * (1 - f));
    const lr = (neck + (Rw - neck) * (y / H)) * 0.84 * Math.sqrt(ha);
    return [Math.cos(hb * TURN) * lr, y, Math.sin(hb * TURN) * lr];
  };
  // Mound below: radius falls off with height, so it silhouettes as a heap.
  const heapAt = (w, f, ha, hb) => {
    const g = Math.cbrt(Math.max(1e-4, f));
    const v = 1 - Math.cbrt(1 - clamp01(w));
    const lr = heapR * g * (1 - v) * Math.sqrt(ha);
    return [Math.cos(hb * TURN) * lr, -H * 0.97 + heapH * g * v, Math.sin(hb * TURN) * lr];
  };

  const dots = [];
  for (let i = 0; i < n; i++) {
    const seat = seats[i];
    const q = seat / n;
    const ha = hashD(seat, 3.1), hb = hashD(seat, 7.7), hc = hashD(seat, 11.3);
    let bx, by, bz, lit = 0;

    if (q < shellShare) {
      // Bow-tie shell: rings stacked along y, radius growing away from the
      // neck, the two end rings spread into caps so the glass reads closed.
      const ring = seat % rings;
      const u = (ring / (rings - 1)) * 2 - 1;
      const cap = ring === 0 || ring === rings - 1;
      const ang = Math.floor(seat / rings) * 2.39996 + t * (o.spin == null ? 0.1 : o.spin);
      const rad = cap
        ? Rw * Math.sqrt(hc)
        : neck + (Rw - neck) * Math.pow(Math.abs(u), o.curve == null ? 0.88 : 0.88);
      bx = Math.cos(ang) * rad; by = u * H; bz = Math.sin(ang) * rad;
    } else if (q < shellShare + streamShare) {
      // The thread through the neck. It only runs while there is sand left.
      const live = pouring && fill < 0.995;
      if (live) {
        const ph = (t * (o.streamRate == null ? 1.5 : o.streamRate) + hc) % 1;
        const yTop = H * 0.1, yBot = -H * 0.97 + heapH * Math.cbrt(Math.max(1e-4, fill));
        bx = (ha - 0.5) * neck * 0.9;
        by = yTop + (yBot - yTop) * ph;
        bz = (hb - 0.5) * neck * 0.9;
        lit = 1;
      } else {
        const h = heapAt(hc, 1, ha, hb);
        bx = h[0]; by = h[1]; bz = h[2];
      }
    } else {
      const rho = (q - shellShare - streamShare) / sandShare;
      let a;
      if (rho < fill) a = heapAt(rho / Math.max(1e-4, fill), fill, ha, hb);
      else a = topAt(rho, fill, ha, hb);
      if (k > 0) {
        // Target state after the turn: full upper cone, pre-rotated so the
        // body roll puts it the right way up.
        const g = topAt(rho * 0.999, 0, ha, hb);
        a = [lerp(a[0], -g[0], k), lerp(a[1], -g[1], k), lerp(a[2], g[2], k)];
      }
      bx = a[0]; by = a[1]; bz = a[2];
      lit = 0.5;
    }

    // Half-turn roll in the picture plane — the flip.
    if (k > 0) { const nx = bx * rc - by * rsn; by = bx * rsn + by * rc; bx = nx; }

    const lx = p[i * 3], ly = p[i * 3 + 1], lz = p[i * 3 + 2];
    const x = lx + (bx - lx) * c;
    const y = ly + (by - ly) * c;
    const z3 = lz + (bz - lz) * c;

    const proj = pt(x, y, z3);
    const zx = clamp01((proj[2] + 1) / 2);
    dots.push({
      x: proj[0], y: proj[1], z: proj[2],
      r: ((o.rBase == null ? 0.55 : o.rBase) + (o.rDepth == null ? 1.4 : o.rDepth) * zx
        + (o.loudR == null ? 0.25 : o.loudR) * lit * c) * rs,
      white: inkOf(o, zx, e[i] * m + (1 - m)) - (o.loudInk == null ? 0.12 : o.loudInk) * lit * c
    });
  }
  return finalizeFrame(dots, [], o.rMin);
};

// 839 dots, baked from the artwork.
const POINTS = {
  n: 839,
  p: Float32Array.from([0.434,0.777,0.052,0.425,0.735,0.074,0.449,0.706,0.1,0.456,0.745,0.06,0.475,0.713,0.052,0.397,0.715,0.06,0.493,0.683,0.052,0.486,0.654,0.095,0.419,0.694,0.116,0.458,0.679,0.112,0.393,0.66,0.104,0.448,0.651,0.147,0.513,0.619,0.085,0.414,0.613,0.167,0.374,0.589,0.153,0.476,0.62,0.134,0.442,0.617,0.165,0.435,0.588,0.188,0.377,0.616,0.131,0.479,0.592,0.147,0.423,0.662,0.134,0.525,0.57,0.12,0.451,0.547,0.197,0.516,0.533,0.159,0.482,0.546,0.175,0.411,0.57,0.19,0.511,0.646,0.06,0.379,0.693,0,0.542,0.611,0.06,0.57,0.582,0,0.358,0.645,0.08,0.337,0.551,0.144,0.528,0.507,0.167,0.481,0.518,0.19,0.564,0.53,0.12,0.38,0.563,0.17,0.402,0.533,0.199,0.454,0.482,0.225,0.364,0.504,0.197,0.334,0.62,0.08,0.34,0.521,0.17,0.55,0.488,0.167,0.319,0.577,0.104,0.43,0.523,0.223,0.587,0.558,0.06,0.58,0.463,0.175,0.545,0.424,0.19,0.397,0.493,0.223,0.489,0.475,0.208,0.424,0.477,0.24,0.387,0.457,0.233,0.441,0.442,0.253,0.573,0.502,0.147,0.343,0.458,0.212,0.345,0.587,0.12,0.365,0.538,0.178,0.494,0.435,0.225,0.556,0.451,0.19,0.325,0.494,0.18,0.307,0.539,0.131,0.619,0.519,0.085,0.524,0.403,0.19,0.457,0.412,0.231,0.606,0.492,0.127,0.294,0.442,0.197,0.518,0.473,0.199,0.355,0.412,0.208,0.585,0.419,0.17,0.592,0.529,0.095,0.516,0.366,0.17,0.653,0.487,0.1,0.331,0.428,0.206,0.47,0.454,0.233,0.262,0.431,0.175,0.626,0.473,0.131,0.662,0.455,0.131,0.48,0.393,0.208,0.35,0.386,0.19,0.466,0.37,0.199,0.564,0.402,0.165,0.438,0.387,0.225,0.711,0.437,0.12,0.555,0.355,0.131,0.759,0.447,0.052,0.543,0.38,0.167,0.613,0.408,0.141,0.302,0.397,0.17,0.31,0.47,0.19,0.283,0.569,0.06,0.231,0.469,0.144,0.48,0.345,0.18,0.614,0.444,0.167,0.263,0.477,0.156,0.3,0.6,0,0.748,0.401,0.131,0.288,0.494,0.159,0.494,0.318,0.156,0.415,0.414,0.24,0.381,0.428,0.233,0.728,0.46,0.074,0.208,0.512,0.074,0.786,0.37,0.12,0.738,0.371,0.074,0.787,0.331,0.08,0.762,0.342,0.06,0.634,0.383,0.1,0.255,0.543,0.074,0.393,0.395,0.223,0.606,0.377,0.104,0.311,0.351,0.144,0.831,0.376,0.052,0.785,0.427,0,0.256,0.394,0.134,0.696,0.397,0.116,0.804,0.402,0.06,0.808,0.35,0.116,0.237,0.349,0.06,0.372,0.369,0.197,0.346,0.343,0.159,0.674,0.426,0.147,0.246,0.507,0.116,0.586,0.332,0.06,0.367,0.297,0.144,0.232,0.436,0.159,0.417,0.353,0.208,0.661,0.387,0.09,0.71,0.374,0.074,0.579,0.371,0.12,0.208,0.483,0.104,0.208,0.392,0.1,0.284,0.524,0.127,0.416,0.307,0.188,0.272,0.364,0.12,0.635,0.424,0.153,0.225,0.532,0.052,0.383,0.32,0.17,0.174,0.407,0.074,0.801,0.297,0.074,0.232,0.379,0.104,0.775,0.401,0.104,0.263,0.334,0.08,0.303,0.32,0.104,0.694,0.475,0.074,0.345,0.314,0.134,0.635,0.356,0.052,0.314,0.285,0.06,0.389,0.251,0.131,0.324,0.375,0.167,0.449,0.338,0.197,0.515,0.288,0.112,0.831,0.322,0.112,0.413,0.441,0.253,0.854,0.281,0.09,0.533,0.326,0.131,0.475,0.288,0.147,0.45,0.271,0.159,0.825,0.244,0.09,0.606,0.35,0.074,0.737,0.425,0.116,0.548,0.281,0.052,0.651,0.517,0.052,0.395,0.289,0.167,0.343,0.272,0.1,0.414,0.264,0.159,0.516,0.243,0.052,0.68,0.368,0.052,0.396,0.222,0.112,0.195,0.424,0.116,0.145,0.441,0.1,0.286,0.299,0.052,0.444,0.311,0.188,0.481,0.245,0.104,0.165,0.48,0.06,0.821,0.211,0.074,0.355,0.229,0.06,0.19,0.462,0.116,0.848,0.344,0.052,0.433,0.235,0.156,0.373,0.199,0.052,0.864,0.234,0.074,0.494,0.2,0.052,0.811,0.272,0.074,0.131,0.467,0,0.472,0.164,0.052,0.847,0.201,0.1,0.099,0.444,0.052,0.564,0.314,0.08,0.402,0.177,0.074,0.833,0.17,0.085,0.45,0.198,0.112,0.421,0.208,0.131,0.433,0.13,0.074,0.438,0.157,0.104,0.523,0.439,0.212,0.474,0.219,0.1,0.411,0.15,0.06,0.826,0.139,0.074,0.816,0.114,0.06,0.772,0.099,0.052,0.762,0.062,0.052,0.789,0.124,0.052,0.724,0.046,0.052,0.696,0.031,0.052,-0.48,0.59,0.052,-0.52,0.578,0.052,-0.545,0.565,0.06,-0.574,0.546,0.06,-0.607,0.537,0.06,-0.634,0.536,0,-0.66,0.514,0.06,-0.631,0.496,0,-0.696,0.486,0.074,-0.683,0.456,0.052,-0.659,0.483,0.06,-0.711,0.454,0.1,-0.735,0.426,0.104,-0.76,0.4,0.104,-0.746,0.369,0.052,-0.801,0.38,0.074,-0.762,0.439,0.052,-0.782,0.336,0.104,-0.707,0.419,0.06,-0.728,0.393,0.052,-0.816,0.333,0.095,-0.783,0.309,0.095,-0.834,0.311,0.074,-0.773,0.375,0.116,-0.808,0.3,0.127,-0.786,0.41,0.052,-0.834,0.259,0.112,-0.751,0.34,0.052,-0.771,0.285,0.074,-0.828,0.228,0.138,-0.859,0.227,0.09,-0.797,0.226,0.104,-0.867,0.183,0.09,-0.776,0.25,0.052,-0.86,0.284,0.052,-0.833,0.18,0.138,-0.798,0.273,0.108,-0.87,0.253,0.052,-0.771,0.194,0.052,-0.884,0.161,0.052,-0.802,0.168,0.127,-0.856,0.144,0.104,-0.816,0.136,0.147,-0.804,0.111,0.147,-0.845,0.118,0.116,-0.877,0.107,0.052,-0.881,0.206,0.052,-0.853,0.092,0.095,-0.789,0.138,0.112,-0.858,0.064,0.06,-0.767,0.12,0.085,-0.783,0.09,0.124,-0.819,0.088,0.138,-0.769,0.222,0,-0.804,0.196,0.116,-0.749,0.089,0.08,-0.776,0.165,0.074,-0.747,0.061,0.1,-0.829,0.047,0.104,-0.779,0.046,0.147,-0.808,0.01,0.112,-0.727,0.021,0.104,-0.813,-0.018,0.08,-0.759,0.005,0.147,-0.679,-0.001,0.074,-0.801,0.063,0.144,-0.778,-0.044,0.1,-0.728,-0.007,0.131,-0.837,0.009,0.06,-0.652,-0.034,0.095,-0.75,-0.052,0.127,-0.734,-0.086,0.116,-0.752,-0.021,0.147,-0.717,-0.063,0.147,-0.811,-0.046,0,-0.769,-0.091,0.06,-0.755,0.033,0.134,-0.748,-0.122,0,-0.669,-0.057,0.141,-0.702,-0.02,0.127,-0.728,-0.035,0.147,-0.781,-0.011,0.131,-0.702,-0.095,0.134,-0.599,-0.042,0.074,-0.711,0.047,0.052,-0.654,-0.116,0.153,-0.68,-0.135,0.12,-0.619,-0.129,0.167,-0.632,-0.09,0.156,-0.652,-0.143,0.134,-0.788,-0.073,0.052,-0.669,-0.091,0.159,-0.593,-0.094,0.153,-0.639,-0.061,0.131,-0.603,-0.152,0.159,-0.674,-0.162,0.085,-0.648,-0.178,0.095,-0.615,-0.178,0.12,-0.577,-0.069,0.116,-0.55,-0.042,0.052,-0.541,-0.084,0.138,-0.71,-0.137,0.085,-0.57,-0.159,0.17,-0.577,-0.127,0.18,-0.548,-0.11,0.165,-0.594,-0.205,0.112,-0.538,-0.151,0.195,-0.531,-0.185,0.167,-0.508,-0.048,0.074,-0.488,-0.141,0.199,-0.551,-0.229,0.112,-0.522,-0.244,0.112,-0.509,-0.081,0.127,-0.511,-0.271,0.08,-0.505,-0.217,0.147,-0.474,-0.266,0.116,-0.581,-0.247,0.052,-0.511,-0.123,0.18,-0.608,-0.068,0.127,-0.5,-0.183,0.188,-0.478,-0.1,0.165,-0.483,-0.064,0.112,-0.485,-0.24,0.134,-0.547,-0.259,0.06,-0.612,-0.228,0.052,-0.561,-0.197,0.141,-0.487,-0.028,0.052,-0.642,-0.207,0.06,-0.468,-0.178,0.199,-0.455,-0.067,0.138,-0.423,-0.091,0.175,-0.444,-0.134,0.204,-0.446,-0.016,0.052,-0.46,-0.219,0.17,-0.454,-0.291,0.104,-0.409,-0.052,0.144,-0.443,-0.25,0.156,-0.407,-0.298,0.134,-0.375,-0.335,0.12,-0.435,-0.197,0.199,-0.415,-0.005,0.08,-0.434,-0.162,0.223,-0.365,0.013,0.104,-0.349,-0.36,0.116,-0.404,-0.158,0.233,-0.412,-0.131,0.212,-0.437,-0.044,0.116,-0.427,-0.322,0.085,-0.377,-0.115,0.212,-0.417,-0.237,0.185,-0.336,-0.122,0.231,-0.408,-0.268,0.165,-0.381,-0.012,0.12,-0.369,-0.146,0.237,-0.36,-0.195,0.233,-0.395,-0.192,0.217,-0.335,-0.159,0.251,-0.291,-0.149,0.262,-0.367,0.041,0.06,-0.393,-0.081,0.175,-0.337,-0.329,0.159,-0.329,-0.203,0.24,-0.381,-0.044,0.153,-0.378,-0.26,0.188,-0.331,0.035,0.12,-0.363,-0.064,0.178,-0.338,-0.258,0.206,-0.347,-0.041,0.17,-0.356,-0.227,0.215,-0.328,-0.231,0.225,-0.298,-0.101,0.233,-0.34,0.005,0.134,-0.293,-0.196,0.262,-0.289,-0.265,0.225,-0.379,-0.291,0.165,-0.309,-0.027,0.178,-0.324,-0.072,0.206,-0.449,-0.103,0.173,-0.391,-0.226,0.199,-0.258,-0.201,0.269,-0.397,0.015,0.06,-0.343,-0.293,0.18,-0.293,-0.072,0.223,-0.307,-0.293,0.206,-0.317,-0.179,0.259,-0.248,-0.172,0.287,-0.274,0.005,0.18,-0.301,0.001,0.167,-0.263,-0.026,0.206,-0.309,-0.364,0.144,-0.269,-0.101,0.248,-0.356,-0.099,0.206,-0.3,0.029,0.147,-0.295,-0.237,0.239,-0.209,-0.163,0.299,-0.301,-0.324,0.18,-0.274,-0.31,0.206,-0.225,-0.189,0.288,-0.196,-0.202,0.293,-0.257,0.037,0.17,-0.275,-0.051,0.215,-0.172,-0.241,0.287,-0.236,-0.041,0.231,-0.183,-0.178,0.309,-0.145,-0.205,0.311,-0.119,-0.217,0.317,-0.219,-0.216,0.279,-0.207,-0.272,0.255,-0.183,-0.137,0.294,-0.137,-0.27,0.287,-0.172,-0.283,0.269,-0.255,-0.261,0.244,-0.23,0.02,0.199,-0.215,-0.019,0.225,-0.281,0.049,0.147,-0.316,0.074,0.085,-0.291,0.089,0.104,-0.344,0.066,0.06,-0.406,-0.35,0.06,-0.265,-0.235,0.253,-0.192,-0.063,0.26,-0.226,-0.294,0.239,-0.268,-0.34,0.19,-0.315,0.104,0.052,-0.238,-0.093,0.255,-0.239,-0.143,0.275,-0.2,-0.244,0.274,-0.225,-0.327,0.223,-0.194,-0.368,0.223,-0.163,-0.085,0.282,-0.145,-0.042,0.272,-0.211,-0.114,0.275,-0.223,0.05,0.19,-0.196,0.011,0.229,-0.166,-0.392,0.229,-0.181,-0.309,0.253,-0.307,-0.401,0.12,-0.378,-0.372,0.074,-0.148,-0.129,0.306,-0.254,0.064,0.156,-0.142,-0.309,0.274,-0.282,-0.373,0.159,-0.173,-0.043,0.262,-0.149,0.03,0.244,-0.154,-0.174,0.318,-0.265,0.098,0.131,-0.215,0.092,0.167,-0.31,-0.127,0.24,-0.15,-0.355,0.253,-0.099,-0.045,0.294,-0.274,0.132,0.08,-0.19,-0.094,0.275,-0.344,-0.4,0.08,-0.219,-0.065,0.248,-0.264,0.157,0.06,-0.17,-0.337,0.248,-0.241,0.116,0.131,-0.188,0.075,0.199,-0.139,-0.432,0.225,-0.194,-0.411,0.197,-0.093,-0.193,0.333,-0.125,-0.084,0.299,-0.072,-0.24,0.306,-0.236,-0.356,0.199,-0.126,-0.397,0.248,-0.148,-0.005,0.26,-0.223,0.155,0.116,-0.196,0.154,0.147,-0.13,-0.156,0.322,-0.26,-0.075,0.239,-0.1,-0.141,0.328,-0.22,-0.378,0.206,-0.119,-0.115,0.312,-0.239,0.183,0.074,-0.068,-0.154,0.329,-0.194,0.181,0.134,-0.12,-0.246,0.306,-0.179,0.038,0.223,-0.253,-0.381,0.178,-0.079,-0.11,0.317,-0.186,-0.015,0.24,-0.068,-0.181,0.329,-0.105,0.008,0.275,-0.2,-0.339,0.231,-0.054,-0.032,0.275,-0.199,0.234,0.095,-0.273,-0.425,0.134,-0.095,-0.072,0.306,-0.124,-0.341,0.267,-0.182,0.109,0.188,-0.045,-0.212,0.311,-0.036,-0.263,0.287,-0.116,-0.021,0.28,-0.172,-0.461,0.19,-0.12,0.05,0.253,-0.03,-0.182,0.317,-0.072,-0.058,0.293,-0.095,-0.427,0.246,-0.162,0.151,0.18,-0.145,-0.235,0.299,-0.209,0.119,0.159,-0.079,-0.019,0.28,-0.244,-0.406,0.17,-0.264,-0.127,0.26,-0.038,-0.134,0.311,-0.096,0.034,0.269,-0.119,-0.294,0.288,-0.058,-0.088,0.299,-0.094,-0.276,0.305,-0.246,-0.449,0.144,-0.041,-0.057,0.28,-0.001,-0.154,0.305,-0.171,-0.498,0.17,-0.196,-0.445,0.18,-0.028,-0.084,0.288,-0.171,-0.425,0.208,-0.137,-0.495,0.199,-0.093,-0.315,0.288,-0.145,-0.537,0.17,-0.065,0.064,0.24,-0.005,-0.064,0.269,-0.095,-0.382,0.262,-0.092,-0.22,0.324,-0.039,-0.002,0.255,-0.029,0.064,0.223,-0.109,0.094,0.24,-0.079,-0.348,0.267,-0.112,-0.564,0.19,-0.153,0.111,0.206,-0.06,-0.372,0.251,-0.117,-0.447,0.233,0.015,-0.182,0.299,-0.016,-0.204,0.301,-0.226,-0.429,0.167,-0.117,0.129,0.223,-0.156,0.078,0.217,-0.067,-0.275,0.294,-0.115,-0.605,0.167,-0.034,0.09,0.208,-0.198,-0.528,0.131,-0.064,-0.313,0.275,-0.014,-0.107,0.293,-0.008,-0.017,0.248,-0.055,-0.404,0.233,-0.069,0.016,0.262,-0.089,-0.592,0.159,-0.098,-0.533,0.199,-0.022,0.023,0.239,-0.21,-0.475,0.153,-0.286,-0.473,0.052,0.041,-0.045,0.24,-0.109,-0.494,0.221,0.02,-0.106,0.275,-0.066,0.103,0.223,-0.013,-0.43,0.199,-0.026,-0.288,0.269,0.055,-0.135,0.274,-0.235,-0.506,0.104,-0.005,0.084,0.197,-0.061,-0.479,0.206,-0.232,0.214,0.052,-0.035,-0.358,0.24,0.023,0.117,0.156,-0.307,-0.456,0.06,-0.078,-0.508,0.199,-0.088,0.124,0.225,-0.201,-0.564,0.1,-0.152,-0.576,0.147,0.038,-0.072,0.253,-0.097,0.068,0.253,0.005,-0.245,0.275,-0.159,0.26,0.127,0.032,0.001,0.223,0.01,-0.038,0.253,0.042,0.085,0.167,-0.08,-0.559,0.17,-0.171,-0.529,0.156,-0.029,0.125,0.19,-0.094,-0.473,0.229,-0.001,-0.277,0.267,-0.149,0.175,0.18,-0.318,-0.428,0.06,-0.014,-0.396,0.215,-0.191,0.266,0.074,-0.168,0.194,0.147,-0.026,0.155,0.17,-0.049,0.041,0.24,0.087,-0.053,0.223,-0.155,0.234,0.141,-0.053,0.145,0.197,0.011,0.043,0.208,-0.175,-0.556,0.141,-0.056,-0.6,0.127,-0.062,-0.432,0.229,0.055,-0.1,0.26,-0.043,-0.568,0.141,0.017,-0.219,0.282,-0.257,-0.48,0.1,0.1,-0.127,0.253,0.048,-0.176,0.288,-0.176,-0.587,0.104,0.013,-0.407,0.19,-0.034,-0.457,0.195,0.001,0.14,0.159,0.015,0.163,0.131,-0.046,-0.522,0.17,-0.123,0.255,0.159,0.081,-0.185,0.274,0.047,-0.205,0.279,-0.022,-0.234,0.293,-0.227,-0.552,0.06,0.053,-0.391,0.178,0.018,-0.435,0.17,-0.092,0.225,0.185,0.065,-0.231,0.255,0.035,-0.458,0.144,-0.067,0.18,0.19,-0.201,-0.602,0.052,0.105,-0.2,0.255,0.081,-0.47,0.085,0.039,-0.368,0.199,-0.186,-0.628,0.052,0.059,-0.266,0.246,0.001,0.187,0.131,0.118,-0.162,0.262,0.053,-0.5,0.085,-0.008,-0.476,0.167,-0.032,-0.33,0.255,0.132,-0.193,0.248,0.012,-0.361,0.223,-0.022,-0.592,0.095,0.146,-0.148,0.244,-0.007,-0.509,0.147,-0.021,0.203,0.134,-0.123,-0.521,0.197,-0.003,-0.547,0.104,0.053,0.032,0.19,0.142,-0.106,0.225,0.023,0.229,0.052,-0.127,0.219,0.178,0.048,-0.435,0.147,0.076,-0.025,0.208,-0.058,0.26,0.131,-0.058,-0.631,0.1,0.03,-0.536,0.08,-0.261,-0.511,0.06,0.032,-0.15,0.288,0.104,-0.249,0.233,-0.001,-0.311,0.248,0.063,0.06,0.167,0.154,-0.21,0.231,-0.036,-0.651,0.052,0.178,-0.173,0.24,0.197,-0.13,0.215,-0.11,0.19,0.204,-0.046,0.233,0.134,0.188,-0.087,0.188,-0.006,-0.34,0.239,-0.016,0.235,0.104,0.065,0.148,0.085,0.053,0.175,0.08,0.081,-0.433,0.131,-0.092,0.268,0.165,0.027,0.192,0.095,-0.089,-0.64,0.131,0.108,-0.035,0.197,-0.027,-0.62,0.06,-0.141,-0.629,0.131,0.08,0.014,0.188,0.008,0.015,0.225,-0.009,0.265,0.052,0.038,-0.332,0.223,-0.157,-0.606,0.12,0.038,-0.294,0.239,-0.045,0.297,0.085,0.109,-0.276,0.215,0.111,-0.459,0.052,0.099,-0.077,0.225,-0.143,-0.461,0.212,0.022,-0.488,0.134,0.098,-0.313,0.197,0.089,0.074,0.144,-0.089,-0.668,0.116,0.22,-0.147,0.215,-0.073,0.298,0.12,0.076,-0.286,0.223,0.073,0.106,0.12,-0.11,0.292,0.159,0.025,-0.268,0.26,0.145,-0.239,0.215,-0.128,-0.664,0.12,-0.102,0.319,0.134,0.073,-0.158,0.28,0.066,-0.351,0.197,-0.066,0.341,0.06,0.109,0.05,0.144,0.149,-0.305,0.175,-0.129,0.335,0.1,0.063,-0.317,0.215,0.146,0.067,0.08,0.151,-0.272,0.197,0.101,0.114,0.08,0.023,-0.564,0.052,0.008,-0.588,0.052,0.11,0.011,0.17,0.132,0.093,0.06,-0.058,-0.678,0.052,-0.103,0.159,0.223,0.183,-0.254,0.197,0.127,-0.076,0.217,-0.061,0.207,0.167,0.096,-0.385,0.156,-0.167,-0.648,0.08,-0.105,0.356,0.112,0.247,-0.164,0.208,0.182,-0.284,0.17,0.169,-0.133,0.225,0.238,-0.097,0.167,0.111,-0.431,0.1,0.118,-0.365,0.147,0.126,-0.405,0.104,-0.136,0.382,0.052,-0.1,-0.704,0.104,-0.137,-0.716,0.052,0.187,-0.037,0.156,0.222,-0.28,0.147,0.281,-0.176,0.19,0.135,0.036,0.131,-0.151,-0.678,0.074,0.176,-0.328,0.134,0.18,0.042,0.08,-0.108,0.399,0.085,-0.149,0.31,0.1,0.153,-0.062,0.19,-0.003,0.111,0.18,0.066,-0.072,0.24,-0.034,-0.487,0.18,0.096,-0.34,0.18,0.039,0.142,0.127,0.143,-0.384,0.116,0.179,-0.378,0.08,0.218,-0.321,0.104,0.181,-0.227,0.208,0.143,-0.031,0.178,0.266,-0.311,0.06,0.138,-0.331,0.159,0.207,-0.178,0.223,0.187,-0.005,0.127,0.203,-0.346,0.1,0.221,-0.202,0.206,0.139,-0.003,0.156,0.245,-0.133,0.19,0.276,-0.066,0.104,0.159,-0.359,0.12,0.207,-0.238,0.188,0.276,-0.139,0.18,-0.115,0.426,0,-0.107,-0.758,0.06,0.254,-0.191,0.197,0.036,0.055,0.188,0.305,-0.136,0.156,0.215,-0.057,0.144,0.27,-0.276,0.116,0.219,0,0.085,0.295,-0.098,0.12,0.27,-0.215,0.17,-0.114,-0.732,0.08,0.229,-0.254,0.159,-0.078,0.367,0.06,-0.182,0.298,0.052,0.154,-0.419,0,-0.072,-0.705,0.052,0.268,-0.242,0.147,0.297,-0.2,0.167,0.321,-0.172,0.178,0.214,0.028,0,0.331,-0.146,0.156,0.337,-0.194,0.147,0.326,-0.103,0.104,0.301,-0.045,0.052,0.313,-0.264,0.085,0.356,-0.172,0.156,0.232,-0.029,0.104,0.298,-0.233,0.134,0.364,-0.238,0.06,0.247,-0.003,0,0.164,0.02,0.116,0.234,-0.344,0.052,0.347,-0.12,0.116,0.245,-0.068,0.144,0.264,-0.028,0.074,0.33,-0.231,0.116,0.327,-0.074,0.074,-0.083,-0.73,0.052,0.263,-0.111,0.159,0.379,-0.116,0.085,0.376,-0.196,0.12,0.366,-0.144,0.127,0.392,-0.172,0.141,-0.14,0.283,0.131,0.307,-0.29,0.052,0.41,-0.214,0.074,0.112,-0.102,0.239,0.342,-0.263,0.052,0.411,-0.153,0.112,0.356,-0.095,0.06,0.423,-0.122,0.052,-0.161,0.337,0.052,0.423,-0.187,0.1,0.454,-0.154,0.074,0.469,-0.186,0.052,0.491,-0.166,0.052,0.243,-0.22,0.18,0.551,0.559,0.104,-0.738,0.457,0.074,0.121,0.426,0.052,0.145,0.41,0,-0.824,0.363,0.052,-0.043,0.324,0.052,0.863,0.316,0,0.801,0.152,0.052,0.801,0.09,0,-0.855,0.035,0.052,-0.699,0.02,0.06,-0.246,-0.004,0.208,0.059,-0.004,0.208,-0.629,-0.02,0.052,0.082,-0.098,0.246,-0.105,-0.168,0.339,-0.129,-0.184,0.324,0.184,-0.199,0.221,0.121,-0.223,0.233,-0.23,-0.246,0.26,-0.488,-0.293,0.06,-0.463,-0.321,0.052,0.238,-0.301,0.104]),
  e: Float32Array.from([0.023,0.047,0.086,0.031,0.023,0.031,0.023,0.078,0.117,0.109,0.094,0.188,0.063,0.242,0.203,0.156,0.234,0.305,0.148,0.188,0.156,0.125,0.336,0.219,0.266,0.312,0.031,0,0.031,0,0.055,0.18,0.242,0.312,0.125,0.25,0.344,0.437,0.336,0.055,0.25,0.242,0.094,0.43,0.031,0.266,0.312,0.43,0.375,0.5,0.469,0.555,0.188,0.391,0.125,0.273,0.437,0.312,0.281,0.148,0.063,0.312,0.461,0.141,0.336,0.344,0.375,0.25,0.078,0.25,0.086,0.367,0.469,0.266,0.148,0.148,0.375,0.312,0.344,0.234,0.437,0.125,0.148,0.023,0.242,0.172,0.25,0.312,0.031,0.18,0.281,0.242,0.211,0,0.148,0.219,0.211,0.5,0.469,0.047,0.047,0.125,0.047,0.055,0.031,0.086,0.047,0.43,0.094,0.18,0.023,0,0.156,0.117,0.031,0.117,0.031,0.336,0.219,0.188,0.117,0.031,0.18,0.219,0.375,0.07,0.047,0.125,0.094,0.086,0.141,0.305,0.125,0.203,0.023,0.25,0.047,0.047,0.094,0.094,0.055,0.094,0.047,0.156,0.023,0.031,0.148,0.242,0.336,0.109,0.109,0.555,0.07,0.148,0.188,0.219,0.07,0.047,0.117,0.023,0.023,0.242,0.086,0.219,0.023,0.023,0.109,0.117,0.086,0.023,0.305,0.094,0.031,0.047,0.031,0.117,0.023,0.211,0.023,0.047,0.023,0.047,0,0.023,0.086,0.023,0.055,0.047,0.063,0.109,0.148,0.047,0.094,0.391,0.086,0.031,0.047,0.031,0.023,0.023,0.023,0.023,0.023,0.023,0.023,0.031,0.031,0.031,0,0.031,0,0.047,0.023,0.031,0.086,0.094,0.094,0.023,0.047,0.023,0.094,0.031,0.023,0.078,0.078,0.047,0.117,0.141,0.023,0.109,0.023,0.047,0.164,0.07,0.094,0.07,0.023,0.023,0.164,0.102,0.023,0.023,0.023,0.141,0.094,0.188,0.188,0.117,0.023,0.023,0.078,0.109,0.031,0.063,0.133,0.164,0,0.117,0.055,0.047,0.086,0.094,0.188,0.109,0.094,0.055,0.188,0.047,0.18,0.086,0.148,0.031,0.078,0.141,0.117,0.188,0.188,0,0.031,0.156,0,0.172,0.141,0.188,0.148,0.156,0.047,0.023,0.203,0.125,0.242,0.211,0.156,0.023,0.219,0.203,0.148,0.219,0.063,0.078,0.125,0.117,0.023,0.164,0.063,0.25,0.281,0.234,0.109,0.328,0.242,0.047,0.344,0.109,0.109,0.141,0.055,0.188,0.117,0.023,0.281,0.141,0.305,0.234,0.109,0.156,0.031,0.023,0.172,0.023,0.031,0.344,0.164,0.266,0.359,0.023,0.25,0.094,0.18,0.211,0.156,0.125,0.344,0.055,0.43,0.094,0.117,0.469,0.391,0.117,0.063,0.391,0.297,0.461,0.234,0.125,0.484,0.469,0.406,0.547,0.594,0.031,0.266,0.219,0.5,0.203,0.305,0.125,0.273,0.367,0.25,0.398,0.437,0.469,0.156,0.594,0.437,0.234,0.273,0.367,0.258,0.344,0.625,0.031,0.281,0.43,0.367,0.578,0.711,0.281,0.242,0.367,0.18,0.531,0.367,0.188,0.492,0.773,0.281,0.367,0.719,0.742,0.25,0.398,0.711,0.461,0.828,0.836,0.867,0.672,0.563,0.75,0.711,0.625,0.516,0.344,0.437,0.188,0.063,0.094,0.031,0.031,0.555,0.586,0.492,0.312,0.023,0.563,0.656,0.648,0.43,0.43,0.688,0.641,0.656,0.312,0.453,0.453,0.555,0.125,0.047,0.813,0.211,0.648,0.219,0.594,0.516,0.875,0.148,0.242,0.5,0.555,0.75,0.055,0.656,0.055,0.531,0.031,0.531,0.148,0.344,0.437,0.336,0.961,0.773,0.813,0.344,0.531,0.586,0.117,0.188,0.898,0.492,0.93,0.367,0.844,0.047,0.938,0.156,0.813,0.43,0.273,0.867,0.5,0.938,0.656,0.461,0.656,0.078,0.156,0.813,0.617,0.305,0.836,0.711,0.68,0.312,0.555,0.867,0.742,0.523,0.281,0.773,0.219,0.68,0.25,0.586,0.836,0.625,0.719,0.773,0.805,0.18,0.68,0.805,0.25,0.281,0.719,0.375,0.344,0.719,0.25,0.5,0.625,0.594,0.906,0.563,0.43,0.5,0.617,0.312,0.367,0.547,0.469,0.773,0.781,0.242,0.43,0.406,0.75,0.242,0.375,0.148,0.656,0.742,0.531,0.469,0.594,0.219,0.344,0.492,0.203,0.023,0.5,0.422,0.656,0.43,0.344,0.625,0.648,0.094,0.336,0.367,0.023,0.5,0.211,0.031,0.344,0.437,0.086,0.188,0.555,0.555,0.656,0.141,0.43,0.555,0.242,0.25,0.211,0.312,0.453,0.617,0.281,0.031,0.398,0.047,0.188,0.25,0.5,0.43,0.172,0.336,0.375,0.172,0.141,0.453,0.586,0.172,0.688,0.086,0.555,0.719,0.094,0.312,0.328,0.219,0.148,0.25,0.219,0.648,0.672,0.742,0.031,0.273,0.25,0.297,0.563,0.18,0.312,0.023,0.563,0.063,0.344,0.023,0.523,0.148,0.594,0.063,0.242,0.563,0.531,0.43,0.078,0.516,0.188,0.156,0.336,0.094,0.312,0.437,0.023,0.273,0.188,0.375,0.148,0.086,0.055,0.031,0.719,0.469,0.531,0.242,0.461,0.023,0.5,0.398,0.359,0.156,0.305,0.492,0.094,0.063,0.055,0.148,0.234,0.078,0.148,0.336,0.031,0.148,0.305,0.437,0.023,0.43,0.125,0.492,0.063,0.398,0.023,0.437,0.391,0.156,0.336,0.18,0.117,0.398,0.125,0.43,0.125,0.219,0.586,0.398,0.125,0.156,0.68,0.336,0.031,0.18,0.266,0.086,0.398,0.055,0.336,0.055,0.023,0.023,0.25,0.031,0.023,0.43,0.336,0.406,0.242,0.211,0.055,0.109,0.375,0.25,0.437,0.242,0.086,0.188,0.094,0.023,0.094,0.023,0.211,0.188,0.312,0.148,0.047,0.156,0.055,0.063,0.086,0.312,0.281,0.5,0.281,0.281,0.141,0.117,0.055,0.094,0.375,0.273,0.031,0.219,0.43,0.141,0.086,0.367,0.211,0.312,0.094,0.125,0.305,0.281,0,0.031,0.336,0.305,0.211,0.18,0.117,0.063,0.125,0.25,0.055,0.219,0.031,0.023,0,0.023,0.188,0.242,0.273,0,0.211,0.188,0.094,0.023,0.063,0.211,0.094,0.156,0.031,0,0.117,0.023,0.117,0.18,0.047,0.117,0.047,0.023,0.219,0.063,0.125,0.141,0.172,0.148,0.023,0.047,0.492,0.023,0.109,0.031,0.023,0.023,0.086,0.047,0.023,0.023,0.281,0.094,0.047,0.023,0,0.023,0.023,0,0.023,0,0.023,0.031,0.375,0.375,0.023,0.523,0.992,0.906,0.422,0.469,0.586,0.031,0.023,0.094])
};

const PLATE = bakePlate(POINTS.n);

/* Every mode runs the same 3.0s dwell + 1.8s morph beat, so a surface can
   switch between them mid-cycle without the timing jumping. */
const INK = { inkFar: 0.6, inkSpan: 0.5, inkRim: 0.16, rsPow: 0.6, rMin: 0.3 };
const BEAT = { dwell: 3, morph: 1.8, expo: 0.3, settle: 0.1 };

const MODES = {
  thinking: {
    frame: frameLogoTorus,
    opts: { ...BEAT, ...INK, turns: 1, yawAmp: 0.5, yawRate: 0.16, tilt: 0.42, major: 0.66,
      minor: 0.3, pulse: 0.9, loudR: 0.3, loudInk: 0.2, rBase: 0.55, rDepth: 1.45 }
  },
  searching: {
    frame: frameLogoScan,
    opts: { ...BEAT, ...INK, turns: 1, tiltAmp: 0.34, sphereR: 0.94, poleEase: 1.4,
      arms: 13, armDepth: 0.72, armInk: 0.24, scanRate: 0.85, scanSwing: 1.05,
      scanWidth: 0.22, dimBase: 0.4, rBoost: 1.3, scanInk: 0.3, rBase: 0.5, rDepth: 1.4 }
  },
  working: {
    frame: frameLogoWork,
    opts: { ...BEAT, ...INK, turns: 1, tiltAmp: 0.3, bandSpan: 0.86, bandRate: 0.7,
      bandWidth: 0.045, bandR: 1.1, bandInk: 0.34, rBase: 0.55, rDepth: 1.4 }
  },
  solving: {
    frame: frameLogoSolve,
    opts: { ...BEAT, ...INK, turns: 1, tiltAmp: 0.36, cubeHalf: 0.62, moveCount: 6,
      rActive: 0.3, rBase: 0.55, rDepth: 1.4 }
  },
  listening: {
    frame: frameLogoWave,
    opts: { ...BEAT, ...INK, yawAmp: 0.42, yawRate: 0.55, tiltAmp: 0.26, wide: 0.92,
      tall: 0.3, waveK: 3.1, waveK2: 6.7, waveRate: 1.9, swing: 0.52, lumps: 0.12,
      loudR: 0.3, loudInk: 0.14, rBase: 0.55, rDepth: 1.5 }
  },
  analyzing: {
    frame: frameLogoSlice,
    opts: { ...BEAT, ...INK, turns: 0, yawAmp: 0.34, yawRate: 0.24, tilt: 0.3, sphereR: 0.92,
      band: 0.22, sweep: 0.85, spread: 0.22, loudR: 0.34, loudInk: 0.2, rBase: 0.55, rDepth: 1.4 }
  },
  fixing: {
    frame: frameLogoKnit,
    opts: { ...BEAT, ...INK, turns: 0, yawAmp: 0.3, yawRate: 0.22, tilt: 0.28, sphereR: 0.9,
      rate: 1.15, gap: 0.28, twist: 0.5, seamW: 0.36, loudR: 0.34, loudInk: 0.22, rBase: 0.55, rDepth: 1.4 }
  },
  generating: {
    frame: frameLogoWrite,
    opts: { ...BEAT, ...INK, turns: 0, yawAmp: 0.16, yawRate: 0.2, tilt: 0.1, rows: 5,
      rate: 0.14, loudR: 0.3, loudInk: 0.2, rBase: 0.55, rDepth: 1.3 }
  },
  fetching: {
    frame: frameLogoDraw,
    opts: { ...BEAT, ...INK, turns: 0, yawAmp: 0.34, yawRate: 0.26, tilt: 0.3, core: 0.56,
      coreR: 0.5, rate: 0.55, curl: 2.1, loudR: 0.3, loudInk: 0.18, rBase: 0.55, rDepth: 1.4 }
  },
  debugging: {
    frame: frameLogoBug,
    opts: { ...BEAT, ...INK, turns: 0, yawAmp: 0.16, yawRate: 0.2, tilt: 0.12, gait: 2.1,
      loudR: 0.3, loudInk: 0.2, rBase: 0.55, rDepth: 1.4 }
  },
  executing: {
    frame: frameLogoFlow,
    opts: { ...BEAT, ...INK, turns: 0, yawAmp: 0.26, yawRate: 0.24, tilt: 0.22, ring: 0.2,
      gateR: 0.62, tube: 0.36, speed: 0.75, loudR: 0.32, loudInk: 0.2, rBase: 0.55, rDepth: 1.4 }
  },
  reasoning: {
    frame: frameLogoDiamond,
    opts: { ...BEAT, ...INK, turns: 1, yawAmp: 0.26, yawRate: 0.16, tilt: 0.3, radius: 0.95,
      edgeShare: 0.46, step: 1.1, loudR: 0.32, loudInk: 0.22, rBase: 0.55, rDepth: 1.4 }
  },
  reviewing: {
    frame: frameLogoCheck,
    opts: { ...BEAT, ...INK, turns: 0, yawAmp: 0.14, yawRate: 0.2, tilt: 0.12, rows: 3,
      rate: 0.6, loudR: 0.3, loudInk: 0.2, rBase: 0.55, rDepth: 1.4 }
  },
  processing: {
    frame: frameLogoGyro,
    opts: { ...BEAT, ...INK, turns: 0, yawAmp: 0.3, yawRate: 0.22, tilt: 0.3, spin: 0.8,
      coreR: 0.2, loudR: 0.28, loudInk: 0.18, rBase: 0.55, rDepth: 1.4 }
  },
  scanning: {
    frame: frameLogoPage,
    opts: { ...BEAT, ...INK, turns: 0, yawAmp: 0.18, yawRate: 0.2, tilt: 0.2, pageW: 0.6,
      pageH: 0.88, rate: 0.35, loudR: 0.34, loudInk: 0.22, rBase: 0.55, rDepth: 1.4 }
  },
  drafting: {
    frame: frameLogoSketch,
    opts: { ...BEAT, ...INK, turns: 0, yawAmp: 0.16, yawRate: 0.2, tilt: 0.14, w: 0.82,
      h: 0.72, rate: 0.3, loudR: 0.34, loudInk: 0.22, rBase: 0.55, rDepth: 1.4 }
  },
  waiting: {
    frame: frameLogoWait,
    opts: { ...BEAT, ...INK, turns: 0, yawAmp: 0.26, yawRate: 0.26, tilt: 0.14, rings: 15,
      height: 1.02, wide: 0.72, neck: 0.07, pour: 7, flipDur: 1.15, streamRate: 1.5,
      shellShare: 0.56, streamShare: 0.05, spin: 0.1,
      loudR: 0.25, loudInk: 0.12, rBase: 0.55, rDepth: 1.4 }
  }
};

const MODE_NAMES = Object.keys(MODES);

/** Which sphere seat each dot flies home from. Pairing by angle means each
    dot travels roughly radially and the silhouette is legible early. */
function seatMap(points) {
  const n = points.n;
  const byLogo = new Uint32Array(n);
  const bySeat = new Uint32Array(n);
  const logoAng = new Float32Array(n);
  const seatAng = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    byLogo[i] = i;
    bySeat[i] = i;
    logoAng[i] = Math.atan2(points.p[i * 3 + 1], points.p[i * 3]);
    const sd = fibDir(i, n);
    seatAng[i] = Math.atan2(sd[1], sd[0]);
  }
  byLogo.sort((a, b) => logoAng[a] - logoAng[b]);
  bySeat.sort((a, b) => seatAng[a] - seatAng[b]);
  const seats = new Uint32Array(n);
  for (let k = 0; k < n; k++) seats[byLogo[k]] = bySeat[k];
  return seats;
}

const BINDING = { points: POINTS, seats: seatMap(POINTS) };

/** The Katalon AI mark itself. The dots are a state of the mark, not a
    substitute for it: at the top of every beat the cloud hands over to the
    real two-tone artwork, so what the user finally sees is the brand asset —
    green leaf, near-black spark — and never a dotted impression of it. */
const MARK_LEAF = 'M21.0892 40.1862C24.4307 34.1228 29.4541 29.1436 35.5839 25.8464L36.6903 25.2489L35.5839 24.6514C29.4762 21.332 24.4307 16.3529 21.0892 10.3117L20.4696 9.20519L17.9026 13.8523C16.3535 16.6627 14.207 19.1191 11.6179 21.0222C8.87384 22.5934 6.35108 21.2878 5.13397 20.1813C3.82835 18.588 3.05385 16.707 3.05385 14.6932C3.05385 10.1567 6.88221 6.32838 12.2154 4.91211C5.31104 5.68663 0 10.5993 0 16.5521C0 20.978 4.02751 25.4923 9.07298 27.9044C12.7907 29.9624 15.8446 32.9942 17.8805 36.6897L20.4474 41.3369L21.0671 40.2304L21.0892 40.1862Z';
const MARK_SPARK = 'M34.8726 0.0221171C32.7482 3.87261 29.5616 7.01497 25.689 9.11725C29.5616 11.2195 32.7482 14.384 34.8726 18.2124L36.3331 15.579C37.2183 13.9857 38.4354 12.5916 39.896 11.5072C41.445 10.622 42.9055 11.3523 43.5694 11.9941C44.2997 12.9014 44.7423 13.9636 44.7423 15.0921C44.7423 17.6591 42.5736 19.8278 39.5419 20.6245C43.4588 20.1819 46.4683 17.3936 46.4683 14.03C46.4683 11.5072 44.1669 8.94021 41.2901 7.59033C39.1878 6.4396 37.4839 4.71354 36.3331 2.63339L34.8726 0V0.0221171Z';
// The baked cloud spans these bounds, so the artwork lands exactly where the
// dots resolve rather than jumping scale at the handover.
const MARK_BOX = { w: 0.717, h: 0.629 };

/**
 * Resolve the substrate.
 *
 * An explicit `force` wins: a component mounted inside a design-system theme
 * scope must follow that scope, not the OS. Otherwise walk for an explicit
 * marker, treat a `.ksds` scope with no `.dark` on it as light, and only ask
 * the OS when the component is outside any scope at all.
 */
function useDark(host, force) {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    if (typeof force === 'boolean') { setDark(force); return; }
    const resolve = () => {
      let node = host.current;
      let scoped = false;
      while (node) {
        const attr = node.getAttribute && node.getAttribute('data-theme');
        if (attr === 'dark') return setDark(true);
        if (attr === 'light') return setDark(false);
        if (node.classList) {
          if (node.classList.contains('dark')) return setDark(true);
          if (node.classList.contains('light')) return setDark(false);
          if (node.classList.contains('ksds')) scoped = true;
        }
        node = node.parentElement;
      }
      setDark(scoped ? false : matchMedia('(prefers-color-scheme: dark)').matches);
    };
    resolve();
    const mq = matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', resolve);
    const mo = new MutationObserver(resolve);
    mo.observe(document.documentElement, { attributes: true, subtree: true });
    return () => {
      mq.removeEventListener('change', resolve);
      mo.disconnect();
    };
  }, [host, force]);
  return dark;
}

function ThinkingMark({ mode = 'thinking', size = 64, paused = false, still = false, dark, tint }) {
  const ref = React.useRef(null);
  // Markup hands attributes over as strings, so accept "true"/"false" as an
  // explicit substrate too — otherwise a literal falls through to detection.
  const forced = typeof dark === 'boolean' ? dark
    : dark === 'true' ? true
    : dark === 'false' ? false
    : undefined;
  const isDark = useDark(ref, forced);
  // Attributes arrive as strings from markup; a unitless string is dropped
  // by React's style handling, which would leave the canvas at its
  // backing-store size.
  const px = Number(size) || 64;
  const key = MODES[mode] ? mode : 'thinking';

  const solid = React.useRef(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = Math.round(px * dpr);
    canvas.height = Math.round(px * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const m = MODES[key];
    const rgb = parseTint(tint);
    const o = m.opts;
    const render = (t) => {
      LOD = lodFor(px);
      // Hand over to the artwork across the last fifth of the morph: the dots
      // fade out exactly as the solid mark fades in, on the same curve.
      const b = beatAt(t, o.dwell == null ? 3 : o.dwell, o.morph == null ? 1.8 : o.morph, 0,
        o.settle == null ? 0.1 : o.settle, o.expo == null ? 0.3 : o.expo);
      const k = smoothE(clamp01((b.m - 0.78) / 0.22));
      if (solid.current) solid.current.style.opacity = String(k);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, px, px);
      ctx.globalAlpha = 1 - k;
      paintFrame(ctx, m.frame(px, t, m.opts, BINDING), isDark, rgb);
      ctx.globalAlpha = 1;
    };

    // Reduced motion — and the explicit static fallback — get one frame,
    // taken at the instant the mark is fully assembled.
    if (still || paused || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      render(m.opts.dwell + m.opts.morph);
      return;
    }

    let raf = 0;
    let running = false;
    const loop = () => {
      render(performance.now() / 1000);
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => { if (running) return; running = true; raf = requestAnimationFrame(loop); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    render(performance.now() / 1000);

    // Free while offscreen or on a hidden tab.
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && document.visibilityState !== 'hidden') start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => {
      if (document.visibilityState === 'hidden') stop();
      else if (visible) start();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [px, key, isDark, tint, paused, still]);

  const leaf = isDark ? '#ffffff' : '#0F8461';
  const spark = isDark ? '#ffffff' : '#032118';
  return React.createElement('span', {
    role: 'img',
    'aria-label': 'Katalon AI ' + key,
    style: { position: 'relative', display: 'inline-block', width: px, height: px, lineHeight: 0 }
  },
    React.createElement('canvas', { ref, key: 'c', style: { width: px, height: px, display: 'block' } }),
    React.createElement('svg', {
      key: 's', ref: solid, viewBox: '0 0 47 42', fill: 'none', 'aria-hidden': 'true',
      style: {
        position: 'absolute', left: '50%', top: '50%',
        width: px * MARK_BOX.w, height: px * MARK_BOX.h,
        transform: 'translate(-50%,-50%)', opacity: 0, pointerEvents: 'none'
      }
    },
      React.createElement('path', { key: 'l', d: MARK_LEAF, fill: leaf }),
      React.createElement('path', { key: 'p', d: MARK_SPARK, fill: spark })
    )
  );
}

module.exports = { ThinkingMark, MODE_NAMES };
