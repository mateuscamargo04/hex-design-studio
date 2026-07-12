import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="h-6 w-6 animate-spin rounded-full border-2 border-ink/20 border-t-ink"
            aria-hidden
          />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
