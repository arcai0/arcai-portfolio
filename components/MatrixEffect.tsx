"use client";

import { useEffect, useRef, useState } from "react";

export default function MatrixEffect() {
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const chars =
      "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+-=<>[]{}()@?!:;".split("");
    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * -canvas.height)
      );
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const draw = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.12)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "#22c55e";
      context.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i += 1) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        context.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] += 1;
        }
      }
    };

    const intervalId = window.setInterval(draw, 45);
    const timeoutId = window.setTimeout(() => setIsVisible(false), 5000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <canvas ref={canvasRef} className="h-full w-full" />
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-4 rounded-md border border-emerald-400/40 bg-black/80 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-black"
        aria-label="Close matrix effect"
      >
        Close
      </button>
    </div>
  );
}

