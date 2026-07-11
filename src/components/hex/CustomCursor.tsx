import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      if (dot.current) dot.current.style.transform = `translate3d(${cx - 4}px, ${cy - 4}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a,button,[data-magnet]");
      if (dot.current) dot.current.style.transform = dot.current.style.transform + (el ? "" : "");
      if (dot.current) {
        dot.current.style.width = el ? "36px" : "8px";
        dot.current.style.height = el ? "36px" : "8px";
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);
  return <div ref={dot} className="hex-cursor" aria-hidden />;
}
