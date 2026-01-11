
import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -2000, y: -2000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Performance Tuning Parameters
    const getSettings = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const area = width * height;
      
      // Dynamic density: 1 particle per ~9000 pixels, with bounds
      const count = Math.min(Math.max(Math.floor(area / 9000), 40), 160);
      
      // Scale connection distance and interaction based on screen size
      const isMobile = width < 768;
      return {
        count,
        connectDist: isMobile ? 110 : 160,
        mouseRadius: isMobile ? 150 : 220,
        disperseStrength: 2.2,
        friction: 0.95
      };
    };

    let settings = getSettings();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;
      size: number;
      color: string;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.baseVx = (Math.random() - 0.5) * 0.35;
        this.baseVy = (Math.random() - 0.5) * 0.35;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.size = Math.random() * 1.5 + 0.5;
        this.color = Math.random() > 0.92 ? '#38bdf8' : '#1e293b';
      }

      update(w: number, h: number, mouse: { x: number; y: number }) {
        this.vx *= settings.friction;
        this.vy *= settings.friction;
        this.vx += this.baseVx * 0.08;
        this.vy += this.baseVy * 0.08;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < settings.mouseRadius) {
          const angle = Math.atan2(dy, dx);
          const force = Math.pow((settings.mouseRadius - distance) / settings.mouseRadius, 1.5);
          const push = force * 12 * settings.disperseStrength;
          this.vx -= Math.cos(angle) * push;
          this.vy -= Math.sin(angle) * push;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap around logic
        if (this.x < -20) this.x = w + 20;
        if (this.x > w + 20) this.x = -20;
        if (this.y < -20) this.y = h + 20;
        if (this.y > h + 20) this.y = -20;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Only glow the highlight particles to save performance
        if (this.color === '#38bdf8') {
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#38bdf8';
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      settings = getSettings();
      particles = [];
      for (let i = 0; i < settings.count; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0;

      const pLength = particles.length;
      const mouse = mouseRef.current;

      for (let i = 0; i < pLength; i++) {
        const p = particles[i];
        p.update(canvas.width, canvas.height, mouse);
        p.draw();

        // Optimized connection logic
        for (let j = i + 1; j < pLength; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          
          // Use squared distance for early exit (faster than Math.sqrt/hypot)
          const distSq = dx * dx + dy * dy;
          const connectDistSq = settings.connectDist * settings.connectDist;

          if (distSq < connectDistSq) {
            const dist = Math.sqrt(distSq);
            const distFactor = 1 - dist / settings.connectDist;
            
            // Calculate proximity to mouse for the line to fade it out near the cursor
            // This prevents "clutter" around the mouse interaction point
            const midX = (p.x + p2.x) * 0.5;
            const midY = (p.y + p2.y) * 0.5;
            const mDx = mouse.x - midX;
            const mDy = mouse.y - midY;
            const mDistSq = mDx * mDx + mDy * mDy;
            
            let opacity = distFactor * 0.22;
            
            // Fade lines near mouse to keep it clean on touch/smaller screens
            if (mDistSq < settings.mouseRadius * settings.mouseRadius) {
              const mDist = Math.sqrt(mDistSq);
              opacity *= (mDist / settings.mouseRadius);
            }

            if (opacity > 0.015) {
              ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
              ctx.lineWidth = 0.5 + opacity;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -2000, y: -2000 };
    };

    init();
    animate();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" style={{ touchAction: 'none' }} />;
};

export default ParticleBackground;
