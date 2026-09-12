"use client";

import React, { useEffect, useRef } from "react";

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Accessibility: Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "#050b14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 16;
    const spacingX = 26; // ~60% horizontal density
    const spacingY = 26; // ~60% vertical density
    let columns = Math.floor(width / spacingX) + 1;
    let rows = Math.floor(height / spacingY) + 1;

    let grid = new Float32Array(columns * rows);
    let charGrid = new Uint8Array(columns * rows); 

    let dxGrid = new Float32Array(columns * rows);
    let dyGrid = new Float32Array(columns * rows);
    let vxGrid = new Float32Array(columns * rows);
    let vyGrid = new Float32Array(columns * rows);

    let drops = new Float32Array(columns);
    let speeds = new Float32Array(columns);
    let opacities = new Float32Array(columns);

    const initColumn = (x: number) => {
      drops[x] = (Math.random() * height) / spacingY;
      speeds[x] = 0.08 + Math.random() * 0.15; 
      opacities[x] = 0.15 + Math.random() * 0.4;
    };

    for (let x = 0; x < columns; x++) {
      initColumn(x);
    }
    
    for (let i = 0; i < grid.length; i++) {
      charGrid[i] = Math.random() > 0.5 ? 1 : 0;
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let isRightMouseDown = false;

    interface Shockwave {
      x: number;
      y: number;
      radius: number;
    }
    const shockwaves: Shockwave[] = [];

    interface GravityWell {
      x: number;
      y: number;
      life: number;
    }
    const gravityWells: GravityWell[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        // Left click - Explosion ripple
        shockwaves.push({ x: e.clientX, y: e.clientY, radius: 0 });
      } else if (e.button === 2) {
        // Right click - Hold to attract
        isRightMouseDown = true;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 2) {
        isRightMouseDown = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        shockwaves.push({ x: e.touches[0].clientX, y: e.touches[0].clientY, radius: 0 });
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      // Prevent context menu on the background so right click hold works
      // Only allow it if they clicked on a link or button
      const target = e.target as HTMLElement;
      if (!target.closest('a, button, input, textarea')) {
        e.preventDefault();
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const newColumns = Math.floor(width / spacingX) + 1;
      const newRows = Math.floor(height / spacingY) + 1;

      const newGrid = new Float32Array(newColumns * newRows);
      const newCharGrid = new Uint8Array(newColumns * newRows);
      const newDxGrid = new Float32Array(newColumns * newRows);
      const newDyGrid = new Float32Array(newColumns * newRows);
      const newVxGrid = new Float32Array(newColumns * newRows);
      const newVyGrid = new Float32Array(newColumns * newRows);
      
      for (let i = 0; i < newCharGrid.length; i++) {
        newCharGrid[i] = Math.random() > 0.5 ? 1 : 0;
      }
      
      const newDrops = new Float32Array(newColumns);
      const newSpeeds = new Float32Array(newColumns);
      const newOpacities = new Float32Array(newColumns);

      for (let x = 0; x < newColumns; x++) {
        if (x < columns) {
          newDrops[x] = drops[x];
          newSpeeds[x] = speeds[x];
          newOpacities[x] = opacities[x];
        } else {
          newDrops[x] = (Math.random() * height) / spacingY;
          newSpeeds[x] = 0.08 + Math.random() * 0.15;
          newOpacities[x] = 0.15 + Math.random() * 0.4;
        }
      }

      grid = newGrid;
      charGrid = newCharGrid;
      dxGrid = newDxGrid;
      dyGrid = newDyGrid;
      vxGrid = newVxGrid;
      vyGrid = newVyGrid;
      columns = newColumns;
      rows = newRows;
      drops = newDrops;
      speeds = newSpeeds;
      opacities = newOpacities;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("contextmenu", handleContextMenu, { passive: false });
    window.addEventListener("resize", handleResize, { passive: true });

    // Pre-render glyph sprites onto mini offscreen canvases for blazing GPU hardware blitting
    const createSprite = (char: string, color: string) => {
      const off = document.createElement("canvas");
      off.width = fontSize * 1.6;
      off.height = fontSize * 1.6;
      const offCtx = off.getContext("2d");
      if (offCtx) {
        offCtx.font = `600 ${fontSize}px monospace`;
        offCtx.fillStyle = color;
        offCtx.textBaseline = "top";
        offCtx.fillText(char, 0, 0);
      }
      return off;
    };

    const sprites = {
      white: [createSprite("0", "#ffffff"), createSprite("1", "#ffffff")],
      cyan: [createSprite("0", "#22d3ee"), createSprite("1", "#22d3ee")],
      amber: [createSprite("0", "#fbbf24"), createSprite("1", "#fbbf24")],
      purple: [createSprite("0", "#a78bfa"), createSprite("1", "#a78bfa")],
    };

    let lastFrameTime = 0;
    const targetInterval = 1000 / 60; // Smooth 60 FPS cap to avoid wasting GPU cycles on 144Hz+ monitors

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);

      if (document.hidden) return;

      const elapsed = now - lastFrameTime;
      if (elapsed < targetInterval) return;
      lastFrameTime = now - (elapsed % targetInterval);

      // Solid background fill
      ctx.fillStyle = "#050b14";
      ctx.fillRect(0, 0, width, height);

      // Advance shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        shockwaves[i].radius += 20;
        if (shockwaves[i].radius > 1200) {
          shockwaves.splice(i, 1);
        }
      }

      // Handle persistent gravity well on right click
      if (isRightMouseDown) {
        const well = gravityWells.find((w) => w.life > 0);
        if (well) {
          well.x = mouseX;
          well.y = mouseY;
          well.life = 1.0;
        } else {
          gravityWells.push({ x: mouseX, y: mouseY, life: 1.0 });
        }
      } else {
        for (let i = gravityWells.length - 1; i >= 0; i--) {
          gravityWells[i].life -= 0.05;
          if (gravityWells[i].life <= 0) {
            gravityWells.splice(i, 1);
          }
        }
      }

      // 1. Advance drops and light up grid
      for (let x = 0; x < columns; x++) {
        const headY = Math.floor(drops[x]);

        if (headY >= 0 && headY < rows) {
          const idx = headY * columns + x;
          grid[idx] = 1.0;
          charGrid[idx] = Math.random() > 0.5 ? 1 : 0;
        }

        drops[x] += speeds[x];
        if (drops[x] > rows + 20 && Math.random() > 0.95) {
          drops[x] = -2;
        }
      }

      const hasActiveInteraction =
        (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) ||
        shockwaves.length > 0 ||
        gravityWells.length > 0;

      // 2. Draw grid and apply physics only when interacting
      const k = 0.08;
      const damp = 0.85;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const idx = y * columns + x;

          if (grid[idx] > 0.02) {
            grid[idx] *= 0.92;

            const baseX = x * spacingX;
            const baseY = y * spacingY;

            let fx = 0;
            let fy = 0;
            let currentOpacity = grid[idx] * opacities[x];
            let isAmber = false;
            let isPurple = false;

            if (hasActiveInteraction) {
              // Hover Repulsion
              const hdx = baseX - mouseX;
              const hdy = baseY - mouseY;
              const hDist = Math.hypot(hdx, hdy);
              const hMaxDist = 120;
              if (hDist < hMaxDist && hDist > 0) {
                const force = (hMaxDist - hDist) / hMaxDist;
                fx += (hdx / hDist) * force * 4.0;
                fy += (hdy / hDist) * force * 4.0;
                currentOpacity = Math.min(1, currentOpacity + force * 0.5);
              }

              // Shockwaves
              for (let w = 0; w < shockwaves.length; w++) {
                const wave = shockwaves[w];
                const wdx = baseX - wave.x;
                const wdy = baseY - wave.y;
                const wDist = Math.hypot(wdx, wdy);
                const thickness = 60;

                if (wDist > wave.radius - thickness && wDist < wave.radius + thickness) {
                  const force = 1 - Math.abs(wDist - wave.radius) / thickness;
                  fx += (wdx / (wDist || 1)) * force * 15.0;
                  fy += (wdy / (wDist || 1)) * force * 15.0;
                  currentOpacity = Math.min(1, currentOpacity + force * 1.5);
                  isAmber = true;
                }
              }

              // Gravity Wells
              for (let g = 0; g < gravityWells.length; g++) {
                const well = gravityWells[g];
                const gdx = baseX - well.x;
                const gdy = baseY - well.y;
                const gDist = Math.hypot(gdx, gdy);
                const gRadius = 450;

                if (gDist < gRadius && gDist > 0) {
                  const force = Math.pow((gRadius - gDist) / gRadius, 1.5) * well.life;
                  const pull = Math.min(gDist, force * 15.0);
                  fx -= (gdx / gDist) * pull;
                  fy -= (gdy / gDist) * pull;
                  currentOpacity = Math.min(1, currentOpacity + force * 2.0);
                  isPurple = true;
                }
              }

              fx -= dxGrid[idx] * k;
              fy -= dyGrid[idx] * k;

              vxGrid[idx] = (vxGrid[idx] + fx) * damp;
              vyGrid[idx] = (vyGrid[idx] + fy) * damp;

              dxGrid[idx] += vxGrid[idx];
              dyGrid[idx] += vyGrid[idx];
            } else if (dxGrid[idx] !== 0 || dyGrid[idx] !== 0) {
              // Smooth return to rest
              dxGrid[idx] *= 0.85;
              dyGrid[idx] *= 0.85;
              if (Math.abs(dxGrid[idx]) < 0.01) dxGrid[idx] = 0;
              if (Math.abs(dyGrid[idx]) < 0.01) dyGrid[idx] = 0;
            }

            const drawX = baseX + dxGrid[idx];
            const drawY = baseY + dyGrid[idx];
            const charBit = charGrid[idx] === 1 ? 1 : 0;

            let sprite = sprites.cyan[charBit];
            if (grid[idx] > 0.9) {
              sprite = sprites.white[charBit];
              currentOpacity = Math.min(1, currentOpacity + 0.3);
            } else if (isAmber) {
              sprite = sprites.amber[charBit];
            } else if (isPurple) {
              sprite = sprites.purple[charBit];
            }

            ctx.globalAlpha = Math.min(1, Math.max(0, currentOpacity));
            ctx.drawImage(sprite, drawX, drawY);
          }
        }
      }

      ctx.globalAlpha = 1.0;
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none w-full h-full -z-50 transform-gpu will-change-transform"
      style={{ touchAction: "none" }}
    />
  );
}
