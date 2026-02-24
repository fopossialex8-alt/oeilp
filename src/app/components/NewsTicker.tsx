import React, { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  timestamp: string;
}

interface NewsTickerProps {
  items?: NewsItem[];
}

export function NewsTicker({ items }: NewsTickerProps) {
  const [displayItems, setDisplayItems] = useState<NewsItem[]>([]);

  const defaultItems: NewsItem[] = [
    { id: '1', title: 'Réforme de l\'éducation : nouvelles mesures annoncées', timestamp: '14h23' },
    { id: '2', title: 'Marché : l\'inflation ralentit au mois de février', timestamp: '13h45' },
    { id: '3', title: 'Climat : accord majeur entre 120 pays', timestamp: '12:30' },
    { id: '4', title: 'Technologie : nouvelle découverte en intelligence artificielle', timestamp: '11:15' },
    { id: '5', title: 'Sport : victoire historique de l\'équipe nationale', timestamp: '10:00' },
    { id: '6', title: 'Culture : exposition record au musée d\'art moderne', timestamp: '09:30' },
  ];

  useEffect(() => {
    setDisplayItems(items || defaultItems);
  }, [items]);

  // Doubler les éléments pour créer un défilement infini
  const repeatedItems = [...displayItems, ...displayItems];

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white py-4 overflow-hidden border-y-2 border-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-yellow-500 animate-pulse" />
          <span className="font-bold text-yellow-500 uppercase tracking-wider">EN DIRECT</span>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>

            <div className="animate-scroll flex gap-6">
              {repeatedItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 flex items-center gap-3 px-4 py-2"
                >
                  <span className="text-yellow-500 font-bold text-sm flex-shrink-0">{item.timestamp}</span>
                  <span className="text-slate-300 text-sm whitespace-nowrap">{item.title}</span>
                  <span className="text-slate-500">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 60s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
