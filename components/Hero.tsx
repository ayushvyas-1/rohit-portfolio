'use client';

import React from 'react';
import { Instagram, Linkedin, Twitter, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import Scene3D from './Scene3D';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050505]">

      {/* Full Screen 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full min-h-screen flex items-center pointer-events-none">
        <div className="w-full lg:w-1/2 px-6 lg:pl-24 flex flex-col justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-cyan-400 font-mono tracking-wider text-sm mb-4 block">PORTFOLIO 2025</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight text-white mb-6">
              ROHIT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                IPPAKAYAL
              </span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-md leading-relaxed mb-8">
              Digital artisan crafting immersive 3D worlds, high-fidelity characters, and interactive experiences.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-6">
              <SocialButton href="https://www.instagram.com/rohiitttt__17" icon={Instagram} label="Instagram" />
              <SocialButton href="#" icon={Box} label="ArtStation" />
              <SocialButton href="https://www.linkedin.com/in/rohit-ippakayal-900a89281" icon={Linkedin} label="LinkedIn" />
              <SocialButton href="#" icon={Twitter} label="Twitter" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background ambient glow */}
      {/* <div className="absolute top-1/2 left-1/4 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-cyan-500/10 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-screen" /> */}
    </section>
  );
};

const SocialButton: React.FC<{ href: string; icon: React.ComponentType<any>; label: string }> = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 group"
  >
    <Icon size={20} className="group-hover:scale-110 transition-transform" />
  </a>
);

export default Hero;