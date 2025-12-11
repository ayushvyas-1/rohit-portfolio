import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  images: string[];
  description: string;
  software: string[];
  date: string;
  likes: number;
  views: number;
  videoUrl?: string; // Optional video
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ElementType;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Software' | 'Technical';
}