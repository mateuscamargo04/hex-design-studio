import { useEffect, useState } from "react";

// Detect low-power / mobile / reduced-motion clients.
export function useLightMode() {
  const [light, setLight] = useState(true); // default light until measured
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setLight(reduce || narrow || coarse);
  }, []);
  return light;
}

export function useHydrated() {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}
