import React from 'react';
import { Heart, Share2, MessageCircle, Eye, Clock, Flame } from 'lucide-react';

interface PhotoOfTheDayProps {
  onNavigate?: (page: string) => void;
}

export function PhotoOfTheDaySection({ onNavigate }: PhotoOfTheDayProps) {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 to-slate-950 py-12 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-500 text-sm font-bold tracking-widest">TENDANCES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              Photo du jour
            </h2>
            <p className="text-slate-400">Une capture exclusive de nos photojournalistes</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Featured Photo - Large */}
          <div className="lg:col-span-2">
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
              {/* Image */}
              <img
                src="https://picsum.photos/900/600?random=1"
                alt="Photo du jour"
                className="w-full h-auto aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Badge Overlay - Top Right */}
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">EXCLUSIF</span>
                <span className="px-3 py-1 bg-yellow-500 text-slate-950 text-xs font-bold rounded-full">TRENDING</span>
              </div>

              {/* Info Overlay - Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-bold mb-2">Manifestation pour le climat à Paris</h3>
                <p className="text-sm text-slate-200 line-clamp-2">
                  Des milliers de citoyens se mobilisent pour exiger des actions concrètes face à l'urgence climatique.
                </p>
              </div>
            </div>

            {/* Photo Details */}
            <div className="mt-6 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-3">
                Manifestation pour le climat à Paris
              </h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Dans un contexte d'urgence climatique, des milliers de manifestants se sont rassemblés pour exiger des mesures concrètes de la part des autorités. Cette photo capture l'énergie et la détermination d'une génération engagée pour l'avenir de notre planète.
              </p>

              {/* Meta Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 py-4 border-t border-b border-slate-700">
                <div>
                  <div className="text-slate-400 text-xs font-semibold mb-1">PHOTOGRAPHE</div>
                  <div className="text-white font-bold">Marie Dupont</div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-semibold mb-1">LIEU</div>
                  <div className="text-white font-bold">Paris, France</div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-semibold mb-1">DATE</div>
                  <div className="text-white font-bold">24 fév 2026</div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-semibold mb-1">CATÉGORIE</div>
                  <div className="text-white font-bold">Événement</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105">
                  <Heart className="w-5 h-5" />
                  <span>2.4K</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors border border-white/20">
                  <Share2 className="w-5 h-5" />
                  Partager
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors border border-white/20">
                  <MessageCircle className="w-5 h-5" />
                  <span>342</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Trending Articles */}
          <div className="space-y-4">
            {/* Trending Header */}
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-yellow-500" />
              <h4 className="text-lg font-bold text-white">Tendances du moment</h4>
            </div>

            {/* Trending Items */}
            {[
              {
                title: 'Sommet climatique : les négociations s\'intensifient',
                views: '45.2K',
                icon: '🌍'
              },
              {
                title: 'Économie : nouvelle baisse du chômage',
                views: '38.9K',
                icon: '📊'
              },
              {
                title: 'Tech : révolution de l\'IA en 2026',
                views: '52.1K',
                icon: '🤖'
              },
              {
                title: 'Culture : festival du cinéma en direct',
                views: '29.5K',
                icon: '🎬'
              }
            ].map((item, idx) => (
              <button
                key={idx}
                className="w-full p-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg border border-slate-700 hover:border-yellow-500 transition-all text-left group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-bold text-white group-hover:text-yellow-500 transition-colors line-clamp-2 mb-1">
                      {item.title}
                    </h5>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Eye className="w-3 h-3" />
                      {item.views}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
