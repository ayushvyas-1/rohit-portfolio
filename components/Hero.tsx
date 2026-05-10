'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const DOTS = 90;
    const MAX_DIST = 140;
    const SPEED = 0.8;
    const CYAN: [number, number, number] = [34, 211, 238];
    const PURPLE: [number, number, number] = [168, 85, 247];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const dots = Array.from({ length: DOTS }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 1.5 + 1.2,
    }));

    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const t = dist / MAX_DIST;
            const alpha = (1 - t) * 0.55;
            const r = Math.round(lerp(CYAN[0], PURPLE[0], t));
            const g = Math.round(lerp(CYAN[1], PURPLE[1], t));
            const b = Math.round(lerp(CYAN[2], PURPLE[2], t));
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots with glow
      for (const d of dots) {
        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 2.5);
        grad.addColorStop(0, 'rgba(34,211,238,0.95)');
        grad.addColorStop(1, 'rgba(168,85,247,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Subtle dark vignette overlay */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-black/40 to-black/80 pointer-events-none" />
    </>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center">

      {/* Network Animation Background */}
      <NetworkBackground />

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <h1 className="font-display font-bold leading-none text-white mb-8 relative group">
            <span className="block text-6xl md:text-8xl lg:text-9xl tracking-tighter hover:scale-105 transition-transform duration-500 cursor-default">
              ROHIT
            </span>
            <span className="block text-6xl md:text-8xl lg:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-300% animate-gradient hover:scale-105 transition-transform duration-500 cursor-default mt-2">
              IPPAKAYAL
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-[100px] -z-10 rounded-full opacity-50" />
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-light">
            Digital artisan crafting immersive <span className="text-white font-medium">3D worlds</span>
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <SocialButton
              href="https://www.artstation.com/rohitippakayal01"
              imageSrc="/ArtStation-logomark-white.svg"
              label="ArtStation"
              iconClassName="scale-150"
            />
            <SocialButton
              href="https://www.linkedin.com/in/rohit-ippakayal-900a89281"
              imageSrc="/linkedin.png"
              label="LinkedIn"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface SocialButtonProps {
  href: string;
  icon?: React.ComponentType<any>;
  imageSrc?: string;
  label: string;
  iconClassName?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ href, icon: Icon, imageSrc, label, iconClassName }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 group backdrop-blur-sm flex items-center justify-center w-14 h-14"
  >
    {imageSrc ? (
      <div className={`relative w-8 h-8 flex-shrink-0 group-hover:scale-110 transition-transform ${iconClassName || ''}`}>
        <Image src={imageSrc} alt={label} fill className="object-contain" />
      </div>
    ) : (
      Icon && <Icon size={28} className={`group-hover:scale-110 transition-transform ${iconClassName || ''}`} />
    )}
  </a>
);

export default Hero;