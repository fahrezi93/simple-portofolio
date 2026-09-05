import React, { useEffect, useRef } from "react";

interface PixelBlastProps {
  className?: string;
  pixelSize?: number;
  patternScale?: number;
  patternDensity?: number;
  speed?: number;
  opacity?: number;
  color?: string;
}

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uResolution;
uniform vec3 uColor;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uOpacity;
uniform float uDotSize;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  vec2 cell = floor(gl_FragCoord.xy / uPixelSize);
  vec2 cellUv = fract(gl_FragCoord.xy / uPixelSize);
  vec2 uv = cell * uPixelSize / uResolution;

  // Organic simplex-like noise field drift
  float field = noise(uv * uScale * 10.0 + vec2(uTime * 0.06, -uTime * 0.04));
  
  // Creates organic cloud clusters with empty spaces around them
  float density = smoothstep(0.34, 0.72, field) * uDensity;
  float visible = step(1.0 - density, hash(cell));

  // Clean, delicate dot shape matching zickrian.dev
  float dot = step(max(abs(cellUv.x - 0.5), abs(cellUv.y - 0.5)), uDotSize);

  // Smooth fade-out transition towards outer screen edges ("transisi ke ga ada")
  float edgeX = smoothstep(0.0, 0.22, uv.x) * smoothstep(0.0, 0.22, 1.0 - uv.x);
  float edgeY = smoothstep(0.0, 0.12, uv.y) * smoothstep(0.0, 0.12, 1.0 - uv.y);
  float edge = edgeX * edgeY;

  gl_FragColor = vec4(uColor, visible * dot * edge * uOpacity);
}
`;

export const PixelBlast: React.FC<PixelBlastProps> = ({
  className = "",
  pixelSize = 7,
  patternScale = 2.0,
  patternDensity = 0.78,
  speed = 0.35,
  opacity,
  color,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Completely disable on mobile / small screens to save GPU, battery, and memory
    if (window.innerWidth < 640) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const gl =
      canvas.getContext("webgl2", {
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      }) ||
      canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });

    if (!gl) return;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uColor = gl.getUniformLocation(program, "uColor");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uPixelSize = gl.getUniformLocation(program, "uPixelSize");
    const uScale = gl.getUniformLocation(program, "uScale");
    const uDensity = gl.getUniformLocation(program, "uDensity");
    const uOpacity = gl.getUniformLocation(program, "uOpacity");
    const uDotSize = gl.getUniformLocation(program, "uDotSize");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const isDarkMode = () =>
      document.documentElement.classList.contains("dark");

    const getColors = (): [number, number, number] => {
      if (color) {
        let hex = color.trim();
        if (hex.startsWith("#")) {
          hex = hex.slice(1);
          if (hex.length === 3) {
            hex = hex.split("").map((c) => c + c).join("");
          }
          if (hex.length >= 6) {
            const num = parseInt(hex.slice(0, 6), 16);
            return [
              ((num >> 16) & 255) / 255,
              ((num >> 8) & 255) / 255,
              (num & 255) / 255,
            ];
          }
        }
      }
      return isDarkMode() ? [0.65, 0.65, 0.70] : [0.12, 0.15, 0.20];
    };

    const getOpacity = () => {
      if (opacity !== undefined) return opacity;
      return isDarkMode() ? 0.38 : 0.48;
    };

    const getDotSize = () => (isDarkMode() ? 0.18 : 0.22);

    let curColor = getColors();
    let curOpacity = getOpacity();
    let curDotSize = getDotSize();

    let animId = 0;
    let isVisible = true;
    let lastTime = 0;
    let elapsedTime = 0;

    const render = (time: number) => {
      if (!isVisible || document.hidden) return;

      if (lastTime) {
        const delta = Math.min((time - lastTime) / 1000, 0.05);
        elapsedTime += delta;
      }
      lastTime = time;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform3f(uColor, curColor[0], curColor[1], curColor[2]);
      gl.uniform1f(uTime, elapsedTime * speed);
      gl.uniform1f(uPixelSize, pixelSize);
      gl.uniform1f(uScale, patternScale);
      gl.uniform1f(uDensity, patternDensity);
      gl.uniform1f(uOpacity, curOpacity);
      gl.uniform1f(uDotSize, curDotSize);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      if (window.innerWidth < 640) {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = 0;
        }
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const width = container.clientWidth || window.innerWidth || 300;
      const height = container.clientHeight || window.innerHeight || 150;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      render(performance.now());
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? false;
      if (isVisible && !prefersReducedMotion && !animId) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      } else if (!isVisible && animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    });
    intersectionObserver.observe(container);

    const themeObserver = new MutationObserver(() => {
      curColor = getColors();
      curOpacity = getOpacity();
      curDotSize = getDotSize();
      render(performance.now());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    handleResize();
    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(render);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, [pixelSize, patternScale, patternDensity, speed, opacity, color]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
};
