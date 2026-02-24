import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface FeaturedVideoProps {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  duration: string;
  category: string;
}

export function FeaturedVideoPlayer({ 
  videoUrl, 
  thumbnailUrl, 
  title, 
  description, 
  duration, 
  category 
}: FeaturedVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative w-full bg-slate-900 rounded-xl overflow-hidden group">
      <div className="relative aspect-[16/9] bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={thumbnailUrl}
          crossOrigin="anonymous"
          controls={false}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={videoUrl} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>

        {/* Overlay controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
          {/* Top info */}
          <div className="flex items-start justify-between">
            <div>
              <span className="px-3 py-1 bg-yellow-500 text-slate-950 text-xs font-bold rounded">
                {category}
              </span>
            </div>
            <span className="px-3 py-1 bg-black/60 text-white text-xs font-bold rounded">
              {duration}
            </span>
          </div>

          {/* Bottom controls */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-200 line-clamp-2">{description}</p>
            </div>

            {/* Control buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayPause}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-lg transition-colors"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    Lire
                  </>
                )}
              </button>

              <button
                onClick={handleMute}
                className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                title={isMuted ? 'Activer le son' : 'Désactiver le son'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={handleFullscreen}
                className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors ml-auto"
                title="Plein écran"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Play button center - shown when not playing */}
        {!isPlaying && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group/play"
          >
            <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-all transform hover:scale-110">
              <Play className="w-12 h-12 text-slate-950 fill-current ml-1" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
