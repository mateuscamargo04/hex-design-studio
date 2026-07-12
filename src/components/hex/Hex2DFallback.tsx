import { useEffect, useRef } from "react";

// Fundo 2D leve, não-hexagonal: campo de pontos que reage ao cursor.
// Usado como fallback quando o Spline não carrega ou o dispositivo é fraco.
export function Hex2DFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0,
      h = 0,
      dpr = 1;
    const mouse = { x: 0.5, y: 0.5 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
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
      const t = e.touches[0];
      if (!t) return;
      const r = canvas.getBoundingClientRect();
      mouse.x = (t.clientX - r.left) / r.width;
      mouse.y = (t.clientY - r.top) / r.height;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const step = Math.max(28, Math.min(w, h) / 24);
      const mx = mouse.x * w;
      const my = mouse.y * h;
      for (let y = step / 2; y < h; y += step) {
        for (let x = step / 2; x < w; x += step) {
          const d = Math.hypot(x - mx, y - my);
          const near = Math.max(0, 1 - d / 260);
          const wave = reduce ? 0 : Math.sin(t * 0.001 - d * 0.02) * 0.5 + 0.5;
          const r = 0.6 + near * 2.2 + wave * 0.4;
          ctx.fillStyle = `rgba(29,29,31,${0.08 + near * 0.55})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
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
