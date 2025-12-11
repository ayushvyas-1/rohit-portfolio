'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download } from 'lucide-react';

const software = [
  { name: 'Maya', icon: '/Autodesk_23627.png' },
  { name: 'Substance Painter', icon: '/substance-3d-painter.png' },
  { name: 'Zbrush', icon: '/zbrush_icon-icons.com_50712.png' },
  { name: 'Marmoset Toolbag', icon: '/marmoset.png' },
  { name: 'Marvelous Designer', icon: '/marvelous.png' },
];

const technicalSkills = [
  'Hard Surface',
  'Asset Design',
  'Texturing',
  'Lighting',
  '3D Cloth Design',
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* Bio */}
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
            About Me
          </h2>
          <div className="prose prose-invert text-zinc-400 leading-relaxed">
            <p className="mb-6">
              Creative and detail-oriented 3D Modeler and Texture Artist with expertise in high-quality
              3D modeling, UV unwrapping, and realistic texturing. Skilled in shading, materials, and
              surface detailing, with a strong artistic eye and technical proficiency.
            </p>
            <p>
              Proficient in industry-standard tools including Maya, ZBrush, Substance Painter, Substance Designer,
              Photoshop, Marvelous Designer, and Marmoset Toolbag. Experienced in creating
              immersive assets for games, films, and digital media, with a passion for innovation, learning
              new tools, and continuous growth in 3D art.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="px-6 py-4 bg-zinc-900 rounded-2xl border border-zinc-800">
              <span className="block text-3xl font-bold text-white mb-1">1.5+</span>
              <span className="text-sm text-zinc-500 uppercase tracking-wider">Years Exp</span>
            </div>
            <div className="px-6 py-4 bg-zinc-900 rounded-2xl border border-zinc-800">
              <span className="block text-3xl font-bold text-white mb-1">40+</span>
              <span className="text-sm text-zinc-500 uppercase tracking-wider">Projects</span>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="/ROHIT IPPAKAYAL.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all font-medium"
            >
              <Download size={18} />
              <span>Download Resume</span>
            </a>
          </div>
        </div>

        {/* Skills & Software */}
        <div>
          <h3 className="text-2xl font-display font-bold text-white mb-8">Technical Arsenal</h3>

          <div className="space-y-8">
            {/* Software Section */}
            <div>
              <h4 className="text-lg font-medium text-cyan-400 mb-4 font-mono uppercase tracking-wider">Software</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {software.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="p-2 bg-zinc-800 rounded-lg flex items-center justify-center w-10 h-10">
                      <Image
                        src={tool.icon}
                        alt={tool.name}
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-zinc-300 font-medium">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h4 className="text-lg font-medium text-purple-400 mb-4 font-mono uppercase tracking-wider">Skills</h4>
              <div className="flex flex-wrap gap-3">
                {technicalSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300 text-sm font-medium hover:border-purple-500/50 hover:text-white transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;