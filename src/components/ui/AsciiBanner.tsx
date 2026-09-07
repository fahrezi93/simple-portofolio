import React, { useEffect, useRef, useState } from "react";

interface AsciiBannerProps {
  src?: string;
  alt?: string;
  className?: string;
  cellWidth?: number;
  cellHeight?: number;
  speed?: number;
  scanlines?: boolean;
  shiftX?: number;
}

const ASCII_CHARS = [
  "·",
  ":",
  "0",
  "1",
  "3",
  "5",
  "8",
  "9",
  "X",
  "B",
  "#",
  "0x",
  "88",
  "00",
  "8888",
];

export const AsciiBanner: React.FC<AsciiBannerProps> = ({
  src = "/banner.webp",
  alt = "Banner God Rays",
  className = "",
  cellWidth = 7,
  cellHeight = 10,
  speed = 0.45,
  scanlines = true,
  shiftX = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const img = new window.Image();
    img.src = src;

    let isDestroyed = false;
    let animId = 0;
    let lastTime = performance.now();
    let timeOffset = 0;
    let isIntersecting = true;
    let cols = 0;
    let rows = 0;
    let clientW = 0;
    let clientH = 0;
    let dpr = 1;
    let pixelData: Uint8ClampedArray | null = null;

    const sampleCanvas = document.createElement("canvas");
    const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });

    const updateSample = () => {
      if (!sampleCtx || clientW <= 0 || clientH <= 0 || !img.naturalWidth) return;
      try {
        sampleCanvas.width = clientW;
        sampleCanvas.height = clientH;

        // Exact match to CSS object-fit: cover and object-position: center 40%
        const scale = Math.max(clientW / img.naturalWidth, clientH / img.naturalHeight);
        const drawW = img.naturalWidth * scale;
        const drawH = img.naturalHeight * scale;
        const offsetX = (clientW - drawW) * 0.5;
        const offsetY = (clientH - drawH) * 0.4;

        sampleCtx.clearRect(0, 0, clientW, clientH);
        sampleCtx.drawImage(img, offsetX, offsetY, drawW, drawH);
        pixelData = sampleCtx.getImageData(0, 0, clientW, clientH).data;
        setIsLoaded(true);
      } catch {
        pixelData = null;
      }
    };

    const TARGET_FPS = 30; // 30 FPS ensures silky-smooth animation while cutting CPU & battery by 50-70% on mobile & laptops
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    let lastFrameTime = 0;

    const handleResize = () => {
      if (!container || !canvas) return;
      clientW = container.clientWidth || 720;
      clientH = container.clientHeight || 224;
      // Cap DPR at 1.25 to prevent massive 4x-9x canvas overhead on high-DPI screens and mobile Retina displays
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);

      canvas.width = Math.floor(clientW * dpr);
      canvas.height = Math.floor(clientH * dpr);
      canvas.style.width = `${clientW}px`;
      canvas.style.height = `${clientH}px`;

      // Optimized cell density on mobile to maintain buttery performance
      const isMobile = clientW < 640;
      const effectiveCellW = isMobile ? 8 : cellWidth;
      const effectiveCellH = isMobile ? 12 : cellHeight;

      cols = Math.ceil(clientW / effectiveCellW);
      rows = Math.ceil(clientH / effectiveCellH);

      if (img.complete && img.naturalWidth > 0) {
        updateSample();
      }
    };

    const render = (now: number) => {
      if (!ctx || !pixelData || cols <= 0 || rows <= 0) return;

      const delta = Math.min(now - lastTime, 50) / 1000;
      lastTime = now;
      timeOffset += delta * speed;

      const isMobile = clientW < 640;
      const effectiveCellW = isMobile ? 8 : cellWidth;
      const effectiveCellH = isMobile ? 12 : cellHeight;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, clientW, clientH);
      ctx.font = isMobile
        ? '600 7px "Geist Mono", "GeistMono", monospace'
        : '600 7.5px "Geist Mono", "GeistMono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const time = timeOffset;
      const dataLen = pixelData.length;

      for (let r = 0; r < rows; r++) {
        const posY = Math.round(r * effectiveCellH + effectiveCellH / 2);
        const sampleY = Math.min(clientH - 1, Math.max(0, posY));
        const normY = sampleY / clientH;

        for (let c = 0; c < cols; c++) {
          const posX = Math.round(c * effectiveCellW + effectiveCellW / 2);
          const sampleX = Math.min(clientW - 1, Math.max(0, posX));

          // Clean natural boundary: exclude deep mountain shadows on extreme flanks
          if (sampleX < clientW * 0.12 && normY < 0.65) continue;
          if (sampleX > clientW * 0.88 && normY < 0.65) continue;
          // Exclude extreme dark corners at top sky
          if (normY < 0.20 && (sampleX < clientW * 0.22 || sampleX > clientW * 0.84)) continue;

          const idx = (sampleY * clientW + sampleX) * 4;
          if (idx + 3 >= dataLen) continue;

          const red = pixelData[idx] ?? 0;
          const green = pixelData[idx + 1] ?? 0;
          const blue = pixelData[idx + 2] ?? 0;
          const alpha = pixelData[idx + 3] ?? 0;
          if (alpha === 0) continue;

          // Perceived luminance
          const lum = 0.299 * red + 0.587 * green + 0.114 * blue;
          // Natural sunlight threshold: covers all radiating beams, mist, and lit meadow evenly
          if (lum < 98) continue;

          const intensity = Math.min(1, Math.max(0, (lum - 98) / 145));
          if (intensity < 0.04) continue;

          // Wave motion flowing across all beams
          const wave =
            1.5 * Math.sin(0.14 * c + 1.6 * time) +
            1.5 * Math.cos(0.24 * r - 1.3 * time);

          const charIdx =
            Math.abs(Math.floor(3 * c + 7 * r + wave + 4 * time)) %
            (Math.min(ASCII_CHARS.length - 1, Math.floor(intensity * ASCII_CHARS.length)) + 1);

          const char = ASCII_CHARS[charIdx] ?? "0";

          const isGold = red > 165 && green > 145 && blue < 185;
          const isWarm = red > 125 && green > 115;
          const isBlue = blue > red + 10;
          const boost = Math.min(1.25, lum / 160 + 0.2);

          const finalR = Math.min(255, Math.floor(red * boost + (isGold ? 35 : isWarm ? 20 : isBlue ? 0 : 15)));
          const finalG = Math.min(255, Math.floor(green * boost + (isGold ? 28 : isWarm || isBlue ? 20 : 15)));
          const finalB = Math.min(255, Math.floor(blue * boost + (isGold ? -10 : isWarm ? 0 : isBlue ? 35 : 15)));
          const finalA = Math.min(0.92, 0.7 * intensity + 0.2);

          ctx.fillStyle = `rgba(${finalR}, ${finalG}, ${finalB}, ${finalA})`;
          ctx.fillText(char, posX, posY);
        }
      }

      ctx.restore();
    };

    const loop = (now: number) => {
      animId = 0;
      if (!isIntersecting || document.hidden) return;

      const elapsed = now - lastFrameTime;
      if (elapsed >= FRAME_INTERVAL) {
        lastFrameTime = now - (elapsed % FRAME_INTERVAL);
        render(now);
      }
      animId = requestAnimationFrame(loop);
    };

    const startAnim = () => {
      if (!animId && isIntersecting && !document.hidden) {
        lastTime = performance.now();
        lastFrameTime = performance.now();
        animId = requestAnimationFrame(loop);
      }
    };

    const stopAnim = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    };

    const onImageLoaded = () => {
      if (isDestroyed) return;
      handleResize();
      updateSample();
      startAnim();
    };

    img.onload = onImageLoaded;
    if (img.complete && img.naturalWidth > 0) {
      onImageLoaded();
    }

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isIntersecting = entry?.isIntersecting ?? false;
      if (isIntersecting) {
        startAnim();
      } else {
        stopAnim();
      }
    });
    intersectionObserver.observe(container);

    const handleVisibility = () => {
      if (document.hidden) {
        stopAnim();
      } else {
        startAnim();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      isDestroyed = true;
      stopAnim();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [src, cellWidth, cellHeight, speed, shiftX]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-44 sm:h-56 overflow-hidden bg-black select-none ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-[center_40%]"
        loading="eager"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 w-full h-full transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {scanlines && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_51%)] bg-[length:100%_3px] opacity-30 mix-blend-overlay"
        />
      )}
    </div>
  );
};
