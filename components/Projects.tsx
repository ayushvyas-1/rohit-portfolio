'use client';

import React from 'react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
    return (
        <section id="work" className="py-24 px-6 md:px-12 max-w-[1920px] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Selected Works</h2>
                <div className="h-1 w-20 bg-cyan-500 rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
