'use client';

import { useEffect, useRef } from 'react';

// ── Tuning ────────────────────────────────────────────────────────────────
const STAR_LAYERS = [
  { count: 40, speed: 6, size: 0.7, twinkle: 0.4 },
  { count: 26, speed: 14, size: 1.1, twinkle: 0.7 },
  { count: 12, speed: 26, size: 1.7, twinkle: 1.0 },
];
const ASTEROID_COUNT = 12;
const ASTEROID_MIN_SPEED = 18;
const ASTEROID_MAX_SPEED = 46;
const ASTEROID_MIN_R = 7;
const ASTEROID_MAX_R = 20;
const SHIP_X_RATIO = 0.26; // horizontal position of the ship
const SHIP_BOB_AMP = 7; // px the ship bobs up/down
const SHIP_BOB_SPEED = 1.6; // bob cycles speed
const SHIP_SCALE = 1.35;
const MAX_PARTICLES = 90;
const EMIT_PER_SEC = 120;

type Theme = 'dark' | 'light';

const palette = (theme: Theme) =>
  theme === 'dark'
    ? {
        star: '255, 255, 255',
        asteroidFill: '#3f3f46', // zinc-700
        asteroidStroke: '#52525b', // zinc-600
        hull: '#e4e4e7', // zinc-200
        hullDark: '#a1a1aa', // zinc-400
        accent: '#fb923c', // orange-400
        window: '#7dd3fc', // sky-300
        glow: '253, 186, 116', // orange-300
        flameCore: '255, 255, 255',
        flameMid: '253, 224, 71', // amber-300
        flameEdge: '249, 115, 22', // orange-500
      }
    : {
        star: '113, 113, 122', // zinc-500
        asteroidFill: '#d4d4d8', // zinc-300
        asteroidStroke: '#a1a1aa', // zinc-400
        hull: '#52525b', // zinc-600
        hullDark: '#3f3f46', // zinc-700
        accent: '#ea580c', // orange-600
        window: '#0ea5e9', // sky-500
        glow: '251, 146, 60', // orange-400
        flameCore: '255, 247, 237', // orange-50
        flameMid: '251, 146, 60', // orange-400
        flameEdge: '234, 88, 12', // orange-600
      };

interface Star {
  x: number;
  y: number;
  r: number;
  speed: number;
  phase: number;
  twinkle: number;
}

interface Asteroid {
  x: number;
  y: number;
  r: number;
  speed: number;
  rot: number;
  spin: number;
  verts: number[]; // jagged radius multipliers
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

const makeAsteroidVerts = () => {
  const n = Math.floor(rand(7, 11));
  return Array.from({ length: n }, () => rand(0.62, 1.0));
};

const SpaceScene = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;

    let theme: Theme = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
    let colors = palette(theme);

    let stars: Star[] = [];
    let asteroids: Asteroid[] = [];
    const particles: Particle[] = [];

    const seedAsteroid = (a: Asteroid, fromRight: boolean) => {
      a.r = rand(ASTEROID_MIN_R, ASTEROID_MAX_R);
      a.x = fromRight ? w + a.r + rand(0, w * 0.6) : rand(0, w);
      a.y = rand(a.r, h - a.r);
      a.speed = rand(ASTEROID_MIN_SPEED, ASTEROID_MAX_SPEED) * (a.r / 14);
      a.rot = rand(0, Math.PI * 2);
      a.spin = rand(-0.6, 0.6);
      a.verts = makeAsteroidVerts();
    };

    const build = () => {
      stars = [];
      for (const layer of STAR_LAYERS) {
        for (let i = 0; i < layer.count; i++) {
          stars.push({
            x: rand(0, w),
            y: rand(0, h),
            r: layer.size * rand(0.6, 1.2),
            speed: layer.speed,
            phase: rand(0, Math.PI * 2),
            twinkle: layer.twinkle,
          });
        }
      }
      asteroids = [];
      for (let i = 0; i < ASTEROID_COUNT; i++) {
        const a = {} as Asteroid;
        seedAsteroid(a, false);
        asteroids.push(a);
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    // ── Drawing ───────────────────────────────────────────────────────────
    const drawBackground = () => {
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createLinearGradient(0, 0, 0, h);
      if (theme === 'dark') {
        g.addColorStop(0, 'rgba(24, 24, 27, 0)');
        g.addColorStop(1, 'rgba(63, 63, 70, 0.18)');
      } else {
        g.addColorStop(0, 'rgba(244, 244, 245, 0)');
        g.addColorStop(1, 'rgba(212, 212, 216, 0.25)');
      }
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const drawStars = (t: number) => {
      for (const s of stars) {
        const tw =
          0.55 + 0.45 * Math.sin(t * 2 + s.phase) * s.twinkle;
        ctx.fillStyle = `rgba(${colors.star}, ${Math.max(0.1, tw)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawAsteroid = (a: Asteroid) => {
      ctx.save();
      ctx.translate(a.x, a.y);
      ctx.rotate(a.rot);
      ctx.beginPath();
      const n = a.verts.length;
      for (let i = 0; i < n; i++) {
        const ang = (i / n) * Math.PI * 2;
        const rr = a.r * a.verts[i];
        const px = Math.cos(ang) * rr;
        const py = Math.sin(ang) * rr;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = colors.asteroidFill;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.asteroidStroke;
      ctx.stroke();
      // a couple of craters for depth
      ctx.fillStyle = colors.asteroidStroke;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(-a.r * 0.25, -a.r * 0.1, a.r * 0.18, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(a.r * 0.2, a.r * 0.25, a.r * 0.12, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const drawShip = (cx: number, cy: number) => {
      const s = SHIP_SCALE;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);

      // hull (nose points right)
      ctx.beginPath();
      ctx.moveTo(26, 0); // nose
      ctx.quadraticCurveTo(10, -11, -18, -9);
      ctx.lineTo(-18, 9);
      ctx.quadraticCurveTo(10, 11, 26, 0);
      ctx.closePath();
      ctx.fillStyle = colors.hull;
      ctx.fill();

      // belly shading
      ctx.beginPath();
      ctx.moveTo(26, 0);
      ctx.quadraticCurveTo(10, 11, -18, 9);
      ctx.lineTo(-18, 3);
      ctx.quadraticCurveTo(8, 4, 26, 0);
      ctx.closePath();
      ctx.fillStyle = colors.hullDark;
      ctx.fill();

      // fins
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.moveTo(-8, -8);
      ctx.lineTo(-20, -19);
      ctx.lineTo(-15, -7);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-8, 8);
      ctx.lineTo(-20, 19);
      ctx.lineTo(-15, 7);
      ctx.closePath();
      ctx.fill();

      // hull decal: 1337 :)
      ctx.fillStyle = colors.accent;
      ctx.font = 'bold 7px ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('1337', -6, 0.5);

      // cockpit window
      ctx.beginPath();
      ctx.arc(8, -1, 4.4, 0, Math.PI * 2);
      ctx.fillStyle = colors.window;
      ctx.fill();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = colors.accent;
      ctx.stroke();

      ctx.restore();
    };

    const emitParticles = (x: number, y: number, dt: number) => {
      const n = EMIT_PER_SEC * dt;
      const count = Math.floor(n) + (Math.random() < n % 1 ? 1 : 0);
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) break;
        const maxLife = rand(0.25, 0.6);
        particles.push({
          x: x + rand(-1, 1),
          y: y + rand(-3, 3),
          vx: rand(-130, -70),
          vy: rand(-18, 18),
          life: maxLife,
          maxLife,
          size: rand(1.5, 3.5),
        });
      }
    };

    const drawBurstGlow = (x: number, y: number, t: number) => {
      const pulse = 0.7 + 0.3 * Math.sin(t * 18);
      const radius = 22 * pulse;
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, `rgba(${colors.glow}, ${0.5 * pulse})`);
      g.addColorStop(1, `rgba(${colors.glow}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawParticles = () => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particles) {
        const f = p.life / p.maxLife; // 1 → 0
        let color: string;
        if (f > 0.66) color = colors.flameCore;
        else if (f > 0.33) color = colors.flameMid;
        else color = colors.flameEdge;
        ctx.fillStyle = `rgba(${color}, ${f})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.4 + f * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    // ── Loop ────────────────────────────────────────────────────────────
    let raf = 0;
    let last = performance.now();
    let running = true;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;

      drawBackground();
      drawStars(t);

      for (const s of stars) {
        s.x -= s.speed * dt;
        if (s.x < -2) {
          s.x = w + 2;
          s.y = rand(0, h);
        }
      }

      for (const a of asteroids) {
        a.x -= a.speed * dt;
        a.rot += a.spin * dt;
        if (a.x + a.r < -4) seedAsteroid(a, true);
        drawAsteroid(a);
      }

      const shipX = w * SHIP_X_RATIO;
      const shipY = h / 2 + Math.sin(t * SHIP_BOB_SPEED) * SHIP_BOB_AMP;
      const exhaustX = shipX - 19 * SHIP_SCALE;

      drawBurstGlow(exhaustX, shipY, t);
      emitParticles(exhaustX, shipY, dt);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }
      drawParticles();
      drawShip(shipX, shipY);

      if (running) raf = requestAnimationFrame(frame);
    };

    const renderStatic = () => {
      const t = 0;
      drawBackground();
      drawStars(t);
      for (const a of asteroids) drawAsteroid(a);
      const shipX = w * SHIP_X_RATIO;
      const shipY = h / 2;
      const exhaustX = shipX - 19 * SHIP_SCALE;
      drawBurstGlow(exhaustX, shipY, 0);
      // a small static flame
      const g = ctx.createLinearGradient(exhaustX - 16, 0, exhaustX, 0);
      g.addColorStop(0, `rgba(${colors.flameEdge}, 0)`);
      g.addColorStop(1, `rgba(${colors.flameMid}, 0.9)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(exhaustX, shipY - 5);
      ctx.quadraticCurveTo(exhaustX - 18, shipY, exhaustX, shipY + 5);
      ctx.closePath();
      ctx.fill();
      drawShip(shipX, shipY);
    };

    // ── Observers ─────────────────────────────────────────────────────────
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) renderStatic();
    });
    resizeObserver.observe(wrap);

    const themeObserver = new MutationObserver(() => {
      const next: Theme = document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
      if (next !== theme) {
        theme = next;
        colors = palette(theme);
        if (reduceMotion) renderStatic();
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    resize();

    let visObserver: IntersectionObserver | null = null;
    if (reduceMotion) {
      renderStatic();
    } else {
      visObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !running) {
            running = true;
            last = performance.now();
            raf = requestAnimationFrame(frame);
          } else if (!entry.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(raf);
          }
        },
        { threshold: 0 }
      );
      visObserver.observe(wrap);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      visObserver?.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="relative h-36 w-full overflow-hidden md:h-44"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default SpaceScene;
