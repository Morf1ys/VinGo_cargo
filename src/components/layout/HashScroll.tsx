"use client";

import { useEffect } from "react";

// Scrolls to #section after load — the App Router otherwise keeps the page at the top.
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    let cancelled = false;
    const jump = () => {
      if (!cancelled) target.scrollIntoView({ block: "start", behavior: "instant" });
    };
    const stop = () => {
      cancelled = true;
    };

    const timers = [0, 150, 400, 900].map((ms) => window.setTimeout(jump, ms));
    window.addEventListener("wheel", stop, { once: true, passive: true });
    window.addEventListener("touchstart", stop, { once: true, passive: true });
    window.addEventListener("keydown", stop, { once: true });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, []);

  return null;
}
