'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { projects } from '../../../data/projects';
import { ArrowLeft, ThumbsUp, Eye, Share2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Page() {
  const params = useParams();
  const id = params?.id as string;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
          <Link href="/" className="text-cyan-400 hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex(p => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-12">
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 w-full h-20 bg-[#050505]/80 backdrop-blur-md z-40 flex items-center justify-between px-6 lg:px-12 border-b border-white/5">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href={`/project/${prevProject.id}`}
            className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            Previous
          </Link>
          <div className="h-4 w-[1px] bg-white/10" />
          <Link
            href={`/project/${nextProject.id}`}
            className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            Next
          </Link>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

        {/* Left: Media Column */}
        <div className="flex flex-col gap-4">
          {project.images.map((img, idx) => {
            const isVideo = img.endsWith('.mp4') || img.endsWith('.mov') || img.endsWith('.webm');
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="w-full bg-zinc-900 rounded-lg overflow-hidden border border-white/5 shadow-2xl"
              >
                {isVideo ? (
                  <video
                    src={img}
                    controls
                    className="w-full h-auto block"
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={img}
                    alt={`${project.title} view ${idx + 1}`}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                )}
              </motion.div>
            );
          })}

          {/* Mobile Bottom Info (Visible only on small screens) */}
          <div className="lg:hidden mt-8 p-6 bg-zinc-900 rounded-lg border border-white/5">
            <h1 className="text-2xl font-bold text-white mb-2">{project.title}</h1>
            <p className="text-zinc-400 text-sm mb-4">{project.description}</p>
          </div>

          {/* Bottom Navigation (Mobile/Desktop) */}
          <div className="mt-12 flex justify-between items-center py-8 border-t border-white/5">
            <Link href={`/project/${prevProject.id}`} className="group flex flex-col items-start gap-1">
              <span className="text-xs text-zinc-500 uppercase tracking-wider group-hover:text-cyan-500 transition-colors">Previous Project</span>
              <span className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{prevProject.title}</span>
            </Link>
            <Link href={`/project/${nextProject.id}`} className="group flex flex-col items-end gap-1">
              <span className="text-xs text-zinc-500 uppercase tracking-wider group-hover:text-cyan-500 transition-colors">Next Project</span>
              <span className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{nextProject.title}</span>
            </Link>
          </div>
        </div>

        {/* Right: Floating Sidebar (ArtStation Style) */}
        <aside className="relative hidden lg:block">
          <div className="sticky top-28 space-y-6">

            {/* Project Header Card */}
            <div className="p-6 bg-[#111] rounded-xl border border-white/5 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white leading-tight mb-1">{project.title}</h1>
                  <span className="text-cyan-500 text-sm font-mono">{project.category}</span>
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              {/* <div className="flex items-center gap-4 text-zinc-500 text-sm mb-6 border-y border-white/5 py-4">
                <div className="flex items-center gap-1.5">
                  <ThumbsUp size={16} className="text-zinc-400" />
                  <span>{project.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye size={16} className="text-zinc-400" />
                  <span>{project.views.toLocaleString()}</span>
                </div>
              </div> */}

              <div className="space-y-3">
                {/* <button className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <ThumbsUp size={18} /> Like
                </button> */}
                <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Share2 size={18} /> Share
                </button>
              </div>
            </div>

            {/* Software Used */}
            <div className="p-6 bg-[#111] rounded-xl border border-white/5 shadow-lg">
              <h3 className="text-zinc-200 font-bold mb-4 flex items-center gap-2">
                <Layers size={18} className="text-cyan-500" /> Software Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.software.map(soft => (
                  <span key={soft} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-md border border-white/5">
                    {soft}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags/Metadata */}
            <div className="p-6">
              <div className="text-xs text-zinc-500">
                <p className="mb-1">Posted <span className="text-zinc-300">{project.date}</span></p>
                <p>Category <span className="text-zinc-300">{project.category}</span></p>
              </div>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}