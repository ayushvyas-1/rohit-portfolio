'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-24 px-6 md:px-12 border-t border-white/5 bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                        Let's Create Something Extraordinary
                    </h2>
                    <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
                        Whether you have a game project, a film production, or just want to say hi,
                        I'm always open to discussing new opportunities and collaborations.
                    </p>

                    <a
                        href="mailto:contact@rohit.com"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-medium transition-all hover:scale-105 shadow-lg shadow-cyan-900/20"
                    >
                        <Mail size={20} />
                        <span>Get in Touch</span>
                        <ArrowRight size={18} />
                    </a>
                </motion.div>

                <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm">
                    <p>© 2025 Rohit Ippakayal. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">ArtStation</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
