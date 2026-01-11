
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
    
    const COUNT = 160; 
    const CONNECT_DIST = 170;
    const MOUSE_RADIUS = 220;
    const DISPERSE_STRENGTH = 2.5;
    const FRICTION = 0.94;

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
        this.baseVx = (Math.random() - 0.5) * 0.4;
        this.baseVy = (Math.random() - 0.5) * 0.4;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.size = Math.random() * 2 + 0.5;
        this.color = Math.random() > 0.9 ? '#38bdf8' : '#1e293b';
      }

      update(w: number, h: number, mouse: { x: number; y: number }) {
        this.vx *= FRICTION;
        this.vy *= FRICTION;
        this.vx += this.baseVx * 0.1;
        this.vy += this.baseVy * 0.1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS) {
          const angle = Math.atan2(dy, dx);
          const force = Math.pow((MOUSE_RADIUS - distance) / MOUSE_RADIUS, 1.5);
          const push = force * 15 * DISPERSE_STRENGTH;
          this.vx -= Math.cos(angle) * push;
          this.vy -= Math.sin(angle) * push;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -10) this.x = w + 10;
        if (this.x > w + 10) this.x = -10;
        if (this.y < -10) this.y = h + 10;
        if (this.y > h + 10) this.y = -10;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        if (this.color === '#38bdf8') {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#38bdf8';
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < COUNT; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0;

      particles.forEach((p, i) => {
        p.update(canvas.width, canvas.height, mouseRef.current);
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < CONNECT_DIST) {
            const distFactor = 1 - dist / CONNECT_DIST;
            const midX = (p.x + p2.x) / 2;
            const midY = (p.y + p2.y) / 2;
            const mDx = mouseRef.current.x - midX;
            const mDy = mouseRef.current.y - midY;
            const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
            let opacity = distFactor * 0.25;
            if (mDist < MOUSE_RADIUS) opacity *= (mDist / MOUSE_RADIUS);
            if (opacity > 0.01) {
              ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
              ctx.lineWidth = 0.5 + opacity;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -2000, y: -2000 };
    };

    init();
    animate();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};

export default ParticleBackground;
