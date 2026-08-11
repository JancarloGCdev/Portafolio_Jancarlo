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

    const fontSize = 14;
    const columns = Math.floor(width / fontSize) + 1;

    // Arrays to hold properties for each column
    const drops: number[] = [];
    const speeds: number[] = [];
    const parallaxFactors: number[] = [];
    const opacities: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = (Math.random() * height) / fontSize; 
      speeds[x] = 0.08 + Math.random() * 0.15; // Base falling speed (slower)
      parallaxFactors[x] = 0.1 + Math.random() * 0.5; // How much scroll affects it
      opacities[x] = 0.05 + Math.random() * 0.15; // Base opacity
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let lastScrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const deltaScroll = currentScroll - lastScrollY;
      lastScrollY = currentScroll;

      // Apply scroll displacement to create parallax depth
      // Moving down (positive delta) makes the drops move up relative to the screen
      for (let i = 0; i < drops.length; i++) {
        drops[i] -= (deltaScroll * parallaxFactors[i]) / fontSize;
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const newColumns = Math.floor(width / fontSize) + 1;
      if (newColumns > drops.length) {
        for (let i = drops.length; i < newColumns; i++) {
          drops.push((Math.random() * height) / fontSize);
          speeds.push(0.08 + Math.random() * 0.15); // Base falling speed (slower)
          parallaxFactors.push(0.1 + Math.random() * 0.5);
          opacities.push(0.05 + Math.random() * 0.15);
        }
      }
      // Re-fill background to prevent artifacts
      ctx.fillStyle = "#050b14";
      ctx.fillRect(0, 0, width, height);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Initial fill
    ctx.fillStyle = "#050b14";
    ctx.fillRect(0, 0, width, height);
    ctx.font = `600 ${fontSize}px monospace`;

    const render = () => {
      // Trail effect: Fade previous frames slightly
      ctx.fillStyle = "rgba(5, 11, 20, 0.12)";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? "1" : "0";

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Interactive mouse repulsion
        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxDist = 120;
        let drawX = x;
        let drawY = y;
        
        let currentOpacity = opacities[i];
        let charColor = `rgba(34, 211, 238, ${currentOpacity})`; // Default Cyan

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          // Repulsion: push character away from mouse center
          drawX += (dx / dist) * force * 20;
          drawY += (dy / dist) * force * 20;
          
          // Glow effect: increase opacity and change color to emerald
          currentOpacity = Math.min(1, currentOpacity + force * 0.8);
          charColor = `rgba(52, 211, 153, ${currentOpacity})`; 
        }

        ctx.fillStyle = charColor;
        
        // Randomly draw a bright "head" to the falling column
        if (Math.random() > 0.95 && dist >= maxDist) {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity + 0.4})`;
        }
        
        ctx.fillText(text, drawX, drawY);

        // Advance drop
        drops[i] += speeds[i];

        // Reset drop to top if it falls off screen
        // Add random variance so they don't all reset at once
        if (drops[i] * fontSize > height + 100 && Math.random() > 0.98) {
          drops[i] = -2;
        } else if (drops[i] * fontSize < -200) {
          // If scrolled way too far up, wrap around to bottom
          drops[i] = (height + 50) / fontSize;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none w-full h-full -z-50"
      style={{ touchAction: "none" }}
    />
  );
}
