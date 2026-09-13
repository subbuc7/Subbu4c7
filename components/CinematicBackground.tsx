"use client";

import { useEffect, useRef } from "react";

export default function CinematicBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const durationRef = useRef(10);
  const readyRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const pointerX = useRef(0.5);
  const pointerY = useRef(0.5);
  const scrollRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
    };

    const updatePointer = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointerX.current = e.clientX / window.innerWidth;
      pointerY.current = e.clientY / window.innerHeight;
      document.documentElement.style.setProperty("--mx", `${pointerX.current * 100}%`);
      document.documentElement.style.setProperty("--my", `${pointerY.current * 100}%`);
    };

    const updateTarget = () => {
      const duration = Math.max(0.1, durationRef.current - 0.02);
      const scrollTime = scrollRef.current * duration;
      // Cursor provides a subtle local "scrub" around the scroll position,
      // while scroll remains the authoritative timeline.
      const cursorOffset = (pointerX.current - 0.5) * Math.min(1.25, duration * 0.12);
      targetRef.current = clamp(scrollTime + cursorOffset, 0, duration);
    };

    const onMetadata = () => {
      durationRef.current = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 10;
      readyRef.current = true;
      video.pause();
      try { video.currentTime = 0; } catch {}
      updateScroll();
      updateTarget();
    };

    const seekLoop = () => {
      updateTarget();
      currentRef.current += (targetRef.current - currentRef.current) * 0.12;
      if (readyRef.current && Math.abs(currentRef.current - video.currentTime) > 0.003) {
        try { video.currentTime = currentRef.current; } catch {}
      }
      rafRef.current = requestAnimationFrame(seekLoop);
    };

    const onScroll = () => updateScroll();
    const onResize = () => updateScroll();

    video.addEventListener("loadedmetadata", onMetadata);
    video.addEventListener("loadeddata", onMetadata);
    video.addEventListener("canplay", onMetadata);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", updatePointer, { passive: true });

    updateScroll();
    updateTarget();
    rafRef.current = requestAnimationFrame(seekLoop);

    return () => {
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("loadeddata", onMetadata);
      video.removeEventListener("canplay", onMetadata);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", updatePointer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div className="cinematic-bg" aria-hidden="true">
        <video
          ref={videoRef}
          className="cinematic-video"
          src="/Subbu4c7/video/portfolio-background.mp4"
          playsInline
          muted
          preload="auto"
          controls={false}
        />
        <div className="cine-color" />
      </div>
      <div className="cine-vignette" aria-hidden="true" />
      <div className="cine-grain" aria-hidden="true" />
      <div className="cine-scan" aria-hidden="true" />
    </>
  );
}
