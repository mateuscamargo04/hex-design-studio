import { useEffect, useState } from "react";

// Detect low-power / mobile / reduced-motion clients.
export function useLightMode() {
  const [light, setLight] = useState(true); // default light until measured
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const shouldLight = reduce || narrow || coarse || cores <= 4;
    setLight(shouldLight);
  }, []);
  return light;
}

export function useHydrated() {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}
