'use client';

import React from 'react';
import { Instagram, Linkedin, Twitter, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center">

      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/IMG_1010.PNG"
          alt="Background"
          fill
          className="object-cover opacity-60 blur-sm"
          priority
        />
        {/* Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

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

            {/* Decorative glow behind the name */}
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
        <Image
          src={imageSrc}
          alt={label}
          fill
          className="object-contain"
        />
      </div>
    ) : (
      Icon && <Icon size={28} className={`group-hover:scale-110 transition-transform ${iconClassName || ''}`} />
    )}
  </a>
);

export default Hero;