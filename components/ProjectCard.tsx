'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '../types';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<Props> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/project/${project.id}`} className="group block relative overflow-hidden rounded-xl bg-zinc-900">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-cyan-400 text-xs font-mono mb-1 block">{project.category}</span>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
            </div>
            <div className="bg-white text-black p-2 rounded-full transform rotate-45 group-hover:rotate-0 transition-transform">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;