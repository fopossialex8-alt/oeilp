import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Try to load video when URL changes
  useEffect(() => {
    if (videoRef.current && videoUrl) {
      setIsLoading(true);
      setError(null);
      console.log('Attempting to load video:', videoUrl);
      
      // Reset video source
      videoRef.current.src = videoUrl;
      videoRef.current.load();
      
      // Try autoplay
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video autoplay successful');
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('Autoplay failed:', error);
            setIsPlaying(false);
          });
      }
    }
  }, [videoUrl]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Play successful');
              setIsPlaying(true);
            })
            .catch((err) => {
              console.error('Play error:', err);
              setError('Impossible de lire la vidéo: ' + err.message);
            });
        }
      }
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
      videoRef.current.requestFullscreen().catch((err) => {
        console.error('Fullscreen error:', err);
      });
    }
  };

  const handleCanPlay = () => {
    console.log('Video can play');
    setIsLoading(false);
    setError(null);
  };

  const handleLoadedMetadata = () => {
    console.log('Metadata loaded, duration:', videoRef.current?.duration);
    setIsLoading(false);
  };

  const handleError = (e: any) => {
    const errorMsg = videoRef.current?.error?.message || 'Erreur inconnue';
    console.error('Video error:', errorMsg);
    setError('Erreur vidéo: ' + errorMsg);
    setIsLoading(false);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:text-yellow-500 hover:scale-110 transition-all z-10"
          title="Fermer (ESC)"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white pr-12">{title}</h2>
          
          {/* Video Container - SIMPLIFIED */}
          <div className="relative w-full bg-black rounded-xl overflow-hidden">
            {/* Loading Spinner */}
            {isLoading && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
                <div className="text-white text-center">
                  <div className="animate-spin inline-block mb-4">
                    <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
                  </div>
                  <p className="mt-4">Chargement de la vidéo...</p>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-20">
                <div className="text-white text-center p-6">
                  <p className="text-red-400 mb-2 text-lg font-bold">⚠️ Erreur vidéo</p>
                  <p className="text-sm mb-4">{error}</p>
                  <p className="text-xs text-slate-400">URL: {videoUrl}</p>
                  <button
                    onClick={handlePlayPause}
                    className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-lg transition-colors"
                  >
                    Réessayer
                  </button>
                </div>
              </div>
            )}

            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-auto bg-black max-h-[70vh]"
              crossOrigin="anonymous"
              preload="metadata"
              controls={true}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onCanPlay={handleCanPlay}
              onLoadedMetadata={handleLoadedMetadata}
              onError={handleError}
              onLoadStart={() => {
                console.log('Video load start');
                setIsLoading(true);
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture de vidéos HTML5.
            </video>
          </div>

          {/* Info Footer */}
          <div className="text-center">
            <p className="text-slate-400 text-sm">Appuyez sur ESC pour fermer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
