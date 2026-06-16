"use client";

import { useEffect, useState } from "react";

export function HomeLoader() {
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showFavicon, setShowFavicon] = useState(false);
  const [expandReveal, setExpandReveal] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const minDelay = new Promise<void>((resolve) =>
      setTimeout(resolve, 1200)
    );

    const fontsReady = new Promise<void>((resolve) => {
      if (typeof document !== "undefined" && document.fonts) {
        // Add timeout to prevent fonts.ready from hanging indefinitely
        const fontTimeout = setTimeout(() => resolve(), 2000);
        document.fonts.ready
          .then(() => {
            clearTimeout(fontTimeout);
            resolve();
          })
          .catch(() => resolve());
      } else {
        resolve();
      }
    });

    const windowLoad = new Promise<void>((resolve) => {
      if (typeof window === "undefined") {
        resolve();
        return;
      }
      
      // Check if already loaded
      if (document.readyState === "complete" || document.readyState === "interactive") {
        resolve();
      } else {
        const loadHandler = () => resolve();
        window.addEventListener("load", loadHandler, { once: true });
        
        // Timeout after 3s just in case
        const timeout = setTimeout(() => {
          window.removeEventListener("load", loadHandler);
          resolve();
        }, 3000);
        
        // Clean up timeout if load fires first
        window.addEventListener("load", () => clearTimeout(timeout), { once: true });
      }
    });

    let currentProgress = 0;

    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 4 + 1;

      if (currentProgress >= 92) {
        currentProgress = 92;
      }

      setProgress(Math.floor(currentProgress));
    }, 60);

    Promise.all([minDelay, fontsReady, windowLoad]).then(() => {
      if (cancelled) return;

      clearInterval(progressInterval);

      let finalValue = Math.floor(currentProgress);

      const finishInterval = setInterval(() => {
        finalValue += 1;

        setProgress(finalValue);

        if (finalValue >= 100) {
          clearInterval(finishInterval);

          setTimeout(() => {
            if (!cancelled) {
              setShowFavicon(true);
            }
          }, 250);

          setTimeout(() => {
            if (!cancelled) {
              setExpandReveal(true);
            }
          }, 850);

          setTimeout(() => {
            if (!cancelled) {
              setMounted(false);
            }
          }, 1800);
        }
      }, 20);
    });

    const hardTimeout = window.setTimeout(() => {
      if (cancelled) return;

      clearInterval(progressInterval);

      setProgress(100);
      setShowFavicon(true);

      setTimeout(() => {
        if (!cancelled) {
          setExpandReveal(true);
        }
      }, 600);

      setTimeout(() => {
        if (!cancelled) {
          setMounted(false);
        }
      }, 1400);
    }, 6000);

    return () => {
      cancelled = true;
      clearInterval(progressInterval);
      clearTimeout(hardTimeout);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#FAF8F3" }}
      role="status"
      aria-label="Loading Threadly"
    >
      {/* Expanding Color Reveal */}
      <div
        className={`absolute left-1/2 top-1/2 rounded-full transition-all duration-[1100ms] ease-out ${
          expandReveal
            ? "w-[250vmax] h-[250vmax]"
            : "w-0 h-0"
        }`}
        style={{
          backgroundColor: "#111111", // CHANGE THIS LATER
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Loader Content */}
      <div
        className={`relative z-10 flex flex-col items-center gap-7 transition-all duration-500 ${
          expandReveal
            ? "scale-110 opacity-0"
            : "scale-100 opacity-100"
        }`}
      >
        {/* Brand Logo */}
        <img
          src="/brand/logobg.png"
          alt="Threadly"
          className="h-10 md:h-12 w-auto select-none"
          draggable={false}
        />

        {/* Ring + Percentage/Favicon */}
        <div className="relative h-20 w-20 flex items-center justify-center">
          {/* Base Ring */}
          <div
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: "rgba(0,0,0,0.10)",
            }}
          />

          {/* Spinner Ring */}
          {!showFavicon && (
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
              style={{
                borderTopColor: "rgba(0,0,0,0.75)",
                borderRightColor: "rgba(0,0,0,0.25)",
                animationDuration: "900ms",
              }}
            />
          )}

          {/* Center Content */}
          <div className="relative z-10 flex items-center justify-center">
            {!showFavicon ? (
              <span className="font-mono text-sm font-medium text-black">
                {progress}%
              </span>
            ) : (
              <img
                src="brand/faviconc.png"
                alt="Threadly"
                className="h-10 w-10 animate-[faviconReveal_400ms_ease-out_forwards]"
                draggable={false}
              />
            )}
          </div>
        </div>

        {/* Loading Text */}
        {!showFavicon && (
          <div
            className="font-mono text-[10px] uppercase tracking-widest text-black/40"
            aria-hidden
          >
            Launching...
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes faviconReveal {
          0% {
            opacity: 0;
            transform: scale(0.4) rotate(-90deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}