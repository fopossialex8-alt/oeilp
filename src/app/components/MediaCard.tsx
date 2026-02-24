import React from 'react';
import { Video, FileText, Headphones } from 'lucide-react';
import { PageType } from '../App';

interface MediaCardProps {
  type: 'video' | 'article' | 'audio';
  title: string;
  description: string;
  thumbnail?: string;
  duration?: string;
  category: string;
  date: string;
  onClick?: () => void;
}

const typeConfig = {
  video: {
    icon: Video,
    color: 'from-blue-500 to-blue-600',
    label: '🎬 Vidéo',
  },
  article: {
    icon: FileText,
    color: 'from-purple-500 to-purple-600',
    label: '📰 Article',
  },
  audio: {
    icon: Headphones,
    color: 'from-pink-500 to-pink-600',
    label: '🎧 Audio',
  },
};

export function MediaCard({ 
  type, 
  title, 
  description, 
  thumbnail, 
  duration, 
  category, 
  date,
  onClick 
}: MediaCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className="group text-left h-full transition-all duration-300"
    >
      <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
        {/* Thumbnail or gradient background */}
        <div className={`relative aspect-video bg-gradient-to-br ${config.color} overflow-hidden`}>
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon className="w-16 h-16 text-white/50" />
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

          {/* Badge */}
          <div className="absolute top-3 right-3 flex gap-2">
            <span className="px-3 py-1 bg-yellow-500 text-slate-950 text-xs font-bold rounded-full">
              {category}
            </span>
            {duration && (
              <span className="px-2 py-1 bg-black/70 text-white text-xs font-bold rounded">
                {duration}
              </span>
            )}
          </div>

          {/* Type badge */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 text-slate-950 text-xs font-bold rounded-full flex items-center gap-1">
            {config.label}
          </div>

          {/* Play button for videos */}
          {type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                <Video className="w-8 h-8 text-slate-950" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <h3 className="text-lg font-bold text-slate-950 mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1">
            {description}
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span>📅</span>
                {date}
              </span>
              {duration && (
                <span className="flex items-center gap-1">
                  <span>⏱️</span>
                  {duration}
                </span>
              )}
            </div>
            <button
              onClick={onClick}
              className="mt-auto w-full py-2 px-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 group/btn"
            >
              Lire plus
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </button>
  );
}
