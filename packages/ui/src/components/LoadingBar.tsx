import { useEffect, useState } from "react";

export function LoadingBar({ duration = 1500 }: { duration?: number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const start = Date.now();
    const tick = () => {
      if (cancelled) return;
      const elapsed = Date.now() - start;
      const pct = Math.min(95, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 95) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      setProgress(100);
    };
  }, [duration]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent pointer-events-none">
      <div
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
