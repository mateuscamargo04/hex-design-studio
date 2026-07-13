import { Component, Suspense, lazy, type ReactNode } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
  fallback?: ReactNode;
}

class SplineErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown) {
    // Swallow: normalmente WebGL indisponível. Cai no fallback 2D.
    console.warn("[SplineScene] falha ao inicializar, usando fallback:", error);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const Loader = (
  <div className="flex h-full w-full items-center justify-center">
    <div
      className="h-6 w-6 animate-spin rounded-full border-2 border-ink/20 border-t-ink"
      aria-hidden
    />
  </div>
);

export function SplineScene({ scene, className, fallback }: SplineSceneProps) {
  return (
    <SplineErrorBoundary fallback={fallback ?? null}>
      <Suspense fallback={Loader}>
        <Spline scene={scene} className={className} />
      </Suspense>
    </SplineErrorBoundary>
  );
}
