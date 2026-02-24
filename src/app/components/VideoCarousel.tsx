import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VideoModal } from './VideoModal';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  views: string;
  videoUrl?: string;
}

interface VideoCarouselProps {
  title: string;
  onVideoClick?: (video: Video) => void;
  autoScroll?: boolean;
}

export function VideoCarousel({ title, onVideoClick, autoScroll = true }: VideoCarouselProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMouseOverRef = useRef(false);

  // Générer des vidéos sample
  useEffect(() => {
    const sampleVideos: Video[] = [
      {
        id: '1',
        title: 'Enquête : Les coulisses du pouvoir',
        thumbnail: 'https://picsum.photos/400/300?random=101',
        duration: '24:35',
        category: 'Politique',
        views: '125K',
        videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
      },
      {
        id: '2',
        title: 'Climat : Les solutions innovantes',
        thumbnail: 'https://picsum.photos/400/300?random=102',
        duration: '18:42',
        category: 'Environnement',
        views: '89K',
        videoUrl: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
      },
      {
        id: '3',
        title: 'Culture : Renaissance du cinéma indépendant',
        thumbnail: 'https://picsum.photos/400/300?random=103',
        duration: '21:15',
        category: 'Culture',
        views: '156K',
        videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
      },
      {
        id: '4',
        title: 'Économie : La monnaie numérique expliquée',
        thumbnail: 'https://picsum.photos/400/300?random=104',
        duration: '15:28',
        category: 'Économie',
        views: '234K',
        videoUrl: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
      },
      {
        id: '5',
        title: 'Santé : Les nouveaux traitements',
        thumbnail: 'https://picsum.photos/400/300?random=105',
        duration: '19:50',
        category: 'Santé',
        views: '98K',
        videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
      },
      {
        id: '6',
        title: 'Tech : L\'IA transforme les métiers',
        thumbnail: 'https://picsum.photos/400/300?random=106',
        duration: '22:10',
        category: 'Technologie',
        views: '312K',
        videoUrl: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
      }
    ];
    setVideos(sampleVideos);
  }, []);

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  }, []);

  // Check scroll on mount and when content changes
  useEffect(() => {
    checkScroll();
  }, [videos, checkScroll]);

  // Handle scroll event via scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      checkScroll();
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [checkScroll]);

  // Auto-scroll functionality - completely rewritten
  useEffect(() => {
    if (!autoScroll) return;

    const startAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }

      autoScrollIntervalRef.current = setInterval(() => {
        if (isMouseOverRef.current || !scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;
        const scrollAmount = 420; // Largeur d'une vidéo + gap

        // Si on est à la fin, retourner au début
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }, 4000); // Auto-scroll toutes les 4 secondes
    };

    const container = scrollContainerRef.current;
    if (!container) return;

    // Démarrer le scroll auto
    startAutoScroll();

    // Pause au survol
    const handleMouseEnter = () => {
      isMouseOverRef.current = true;
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };

    // Reprendre après le survol
    const handleMouseLeave = () => {
      isMouseOverRef.current = false;
      startAutoScroll();
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [autoScroll]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-950">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-2 bg-slate-200 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-slate-950" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-2 bg-slate-200 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-slate-950" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedVideo(video);
              }}
              className="flex-shrink-0 w-96 group cursor-pointer"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 mb-3">
                <ImageWithFallback
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <Play className="w-16 h-16 text-white/80 group-hover:text-white transition-colors" fill="currentColor" />
                </div>
                <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-bold">
                  {video.duration}
                </div>
                <div className="absolute top-3 left-3 bg-yellow-500 text-slate-950 px-2 py-1 rounded text-xs font-bold">
                  {video.category}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-1 group-hover:text-yellow-600 transition-colors line-clamp-2">
                {video.title}
              </h3>
              <p className="text-sm text-slate-500">
                {video.views} vues
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.videoUrl || ''}
          title={selectedVideo.title}
        />
      )}

      {/* Scroll indicator */}
      <style>{`
        div[style*="scroll-smooth"]::-webkit-scrollbar {
          height: 8px;
        }
        div[style*="scroll-smooth"]::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        div[style*="scroll-smooth"]::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        div[style*="scroll-smooth"]::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </section>
  );
}
