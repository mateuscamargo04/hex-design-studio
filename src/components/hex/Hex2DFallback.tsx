import { useEffect, useRef } from "react";

// Lightweight 2D fallback: canvas grid of hexagons that ripple with mouse position.
export function Hex2DFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0, dpr = 1;
    const mouse = { x: 0.5, y: 0.5 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]; if (!t) return;
      const r = canvas.getBoundingClientRect();
      mouse.x = (t.clientX - r.left) / r.width;
      mouse.y = (t.clientY - r.top) / r.height;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    const hex = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i + Math.PI / 6;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const size = Math.max(18, Math.min(w, h) / 22);
      const dx = size * Math.sqrt(3);
      const dy = size * 1.5;
      const mx = mouse.x * w;
      const my = mouse.y * h;
      for (let y = -dy; y < h + dy; y += dy) {
        for (let x = -dx; x < w + dx; x += dx) {
          const ox = (Math.round(y / dy) % 2 === 0) ? 0 : dx / 2;
          const cx = x + ox;
          const cy = y;
          const d = Math.hypot(cx - mx, cy - my);
          const wave = reduce ? 0 : Math.sin(t * 0.001 - d * 0.02) * 0.5 + 0.5;
          const near = Math.max(0, 1 - d / 260);
          const alpha = 0.05 + near * 0.85;
          ctx.strokeStyle = `rgba(29,29,31,${0.08 + near * 0.35})`;
          ctx.lineWidth = 1;
          hex(cx, cy, size * (0.55 + wave * 0.05));
          ctx.stroke();
          if (near > 0.15) {
            ctx.fillStyle = `rgba(29,29,31,${alpha * 0.06})`;
            ctx.fill();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
