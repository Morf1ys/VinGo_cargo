"use client";

import { useEffect } from "react";

/**
 * When the page is opened with a "#section" in the URL (from another page's
 * nav link, a shared link, a refresh), jump to that section once the client
 * has settled — the App Router's own initial scroll handling otherwise leaves
 * the page at the top. Re-applied after load in case late layout (fonts,
 * hydration) or the router moved it, and abandoned as soon as the visitor
 * scrolls on their own.
 */
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
