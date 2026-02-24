import React from 'react';
import { Newspaper, Calendar, Headphones, ArrowRight } from 'lucide-react';
import { PageType } from '../App';

interface ContentOptionsProps {
  onNavigate: (page: PageType) => void;
}

export function ContentOptions({ onNavigate }: ContentOptionsProps) {
  const options = [
    {
      icon: Newspaper,
      title: 'Lire les articles',
      description: 'Découvrez nos enquêtes et analyses approfondies',
      color: 'from-blue-500 to-blue-600',
      action: () => onNavigate('news'),
    },
    {
      icon: Calendar,
      title: "Voir l'info du jour",
      description: 'Les actualités les plus importantes de la journée',
      color: 'from-amber-500 to-amber-600',
      action: () => onNavigate('photo'),
    },
    {
      icon: Headphones,
      title: 'Écouter l\'audio',
      description: 'Nos podcasts et chroniques audio',
      color: 'from-purple-500 to-purple-600',
      action: () => onNavigate('interview'),
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-950 mb-12 text-center">
          Choisissez votre format de contenu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="group relative text-left"
            >
              <div className={`bg-gradient-to-br ${option.color} p-8 rounded-2xl text-white shadow-lg hover:shadow-2xl transition-all duration-300 h-full`}>
                <div className="flex items-start justify-between mb-4">
                  <option.icon className="w-12 h-12 text-white/90" />
                  <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {option.title}
                </h3>
                <p className="text-white/80 text-sm">
                  {option.description}
                </p>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/50 transition-all duration-300"></div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
