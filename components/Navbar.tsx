'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, MessageCircle, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/project/')) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 z-50 w-[90%] max-w-3xl"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex items-center justify-between shadow-2xl relative">
          <Link href="/" className="text-lg font-display font-bold tracking-tight text-white hover:text-cyan-400 transition-colors shrink-0">
            ROHIT
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <li><Link href="/#work" className="hover:text-white transition-colors">Work</Link></li>
            <li><Link href="/#about" className="hover:text-white transition-colors">About</Link></li>
            <li className="relative">
              <button
                onClick={() => setShowContact(!showContact)}
                className="flex items-center gap-2 hover:text-white transition-colors px-4 py-2 bg-white/5 rounded-full border border-white/5 hover:bg-white/10 hover:border-cyan-500/30"
              >
                <span>Hire me</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${showContact ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showContact && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-3 w-48 bg-[#09090b] border border-white/10 rounded-xl shadow-xl overflow-hidden p-1"
                  >
                    <a
                      href="mailto:contact@rohit.com"
                      className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      onClick={() => setShowContact(false)}
                    >
                      <Mail size={16} className="text-cyan-400" />
                      <span>Email</span>
                    </a>
                    <a
                      href="https://wa.me/1234567890" // Replace with actual number
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      onClick={() => setShowContact(false)}
                    >
                      <MessageCircle size={16} className="text-green-400" />
                      <span>WhatsApp</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-6 -translate-x-1/2 w-[90%] max-w-3xl z-40 md:hidden"
          >
            <div className="bg-[#09090b]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
              <ul className="flex flex-col gap-2 text-center text-zinc-400 font-medium">
                <li><Link href="/#work" onClick={() => setIsOpen(false)} className="block py-3 hover:text-white hover:bg-white/5 rounded-xl transition-colors">Work</Link></li>
                <li><Link href="/#about" onClick={() => setIsOpen(false)} className="block py-3 hover:text-white hover:bg-white/5 rounded-xl transition-colors">About</Link></li>

                <li className="border-t border-white/10 pt-2 mt-2">
                  <div className="text-sm text-zinc-500 mb-2 font-mono uppercase tracking-wider">Get in touch</div>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="mailto:contact@rohit.com"
                      onClick={() => setIsOpen(false)}
                      className="flex flex-col items-center justify-center gap-2 py-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-white"
                    >
                      <Mail size={20} className="text-cyan-400" />
                      <span className="text-xs">Email</span>
                    </a>
                    <a
                      href="https://wa.me/1234567890"
                      onClick={() => setIsOpen(false)}
                      className="flex flex-col items-center justify-center gap-2 py-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-white"
                    >
                      <MessageCircle size={20} className="text-green-400" />
                      <span className="text-xs">WhatsApp</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;