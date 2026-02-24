import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Users, Eye, Clock, ChevronDown, Play, Headphones, FileText } from 'lucide-react';
import { PageType } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VideoCarousel } from './VideoCarousel';
import { NewsTicker } from './NewsTicker';
import { ContentOptions } from './ContentOptions';
import { SocialLinks } from './SocialLinks';
import { PhotoOfTheDaySection } from './PhotoOfTheDaySection';
import { MediaCard } from './MediaCard';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [loadedVideos, setLoadedVideos] = useState(0);

  const latestNews = [
    {
      title: "Nouvelle réforme de l'éducation : ce qui va changer",
      excerpt: "Le gouvernement annonce une refonte complète du système éducatif. Des mesures controversées qui divisent...",
      category: "Politique",
      image: "https://picsum.photos/400/300?random=201",
      readTime: "5 min",
      date: "15 fév 2026"
    },
    {
      title: "Les citoyens se mobilisent pour le climat",
      excerpt: "Des milliers de manifestants ont défilé ce weekend pour exiger des actions concrètes face à l'urgence climatique...",
      category: "Société",
      image: "https://picsum.photos/400/300?random=202",
      readTime: "7 min",
      date: "14 fév 2026"
    },
    {
      title: "Culture : le retour du cinéma indépendant",
      excerpt: "Les salles alternatives connaissent un regain d'intérêt. Rencontre avec les acteurs de ce renouveau culturel...",
      category: "Culture",
      image: "https://picsum.photos/400/300?random=203",
      readTime: "4 min",
      date: "13 fév 2026"
    },
    {
      title: "Élections locales : les enjeux de la campagne",
      excerpt: "À trois mois du scrutin, les candidats multiplient les promesses. Décryptage des programmes et des stratégies...",
      category: "Politique",
      image: "https://picsum.photos/400/300?random=204",
      readTime: "6 min",
      date: "12 fév 2026"
    }
  ];

  return (
    <div>
      {/* News Ticker - Actualisé en direct */}
      <NewsTicker />

      {/* Photo of the Day - Main Featured Section */}
      <PhotoOfTheDaySection onNavigate={onNavigate} />

      {/* Séparateur élégant */}
      <div className="h-0.5 bg-gradient-to-r from-slate-950 via-yellow-500 to-slate-950"></div>

      {/* Contenus à la une - Premium section with better styling */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-600 text-sm font-bold tracking-widest">À NE PAS MANQUER</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-950 mb-3">Contenus en vedette</h2>
            <p className="text-slate-600 text-lg max-w-2xl">Découvrez nos meilleures productions : vidéos, articles et podcasts qui font l'actualité</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MediaCard 
              type="video"
              title="Changement climatique : Les solutions qui fonctionnent"
              description="Découvrez les technologies et initiatives innovantes qui luttent concrètement contre le réchauffement climatique."
              thumbnail="https://picsum.photos/600/400?random=301"
              category="Environnement"
              date="14 fév 2026"
              duration="18:42"
              onClick={() => onNavigate('video')}
            />
            <MediaCard 
              type="article"
              title="Économie : Les défis de 2026"
              description="Analyse économique profonde des enjeux majeurs qui attendent les gouvernements et entreprises cette année."
              thumbnail="https://picsum.photos/600/400?random=302"
              category="Économie"
              date="14 fév 2026"
              onClick={() => onNavigate('article')}
            />
            <MediaCard 
              type="audio"
              title="Podcast : Les secrets des grands journalistes"
              description="Série de discussions avec des correspondants de guerre et enquêteurs d'investigation célèbres."
              thumbnail="https://picsum.photos/600/400?random=303"
              category="Podcast"
              date="13 fév 2026"
              duration="42:15"
              onClick={() => onNavigate('analysis')}
            />
          </div>
        </div>
      </section>

      {/* Content Options - 3 colonnes avec Lire, Voir, Écouter */}
      <ContentOptions onNavigate={onNavigate} />

      {/* Featured Videos Carousel - Priority Section 1 */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-yellow-600 text-sm font-bold">🎬 VIDÉOTHÈQUE</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-950">Nos meilleures vidéos</h2>
          </div>
          <VideoCarousel 
            title="" 
            onVideoClick={(video) => onNavigate('video')}
          />
        </div>
      </section>

      {/* Documentary & Reports Carousel - Priority Section 2 */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-yellow-600 text-sm font-bold">📺 DOCUMENTAIRES</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-950">Reportages et enquêtes</h2>
          </div>
          <VideoCarousel 
            title="" 
            onVideoClick={(video) => onNavigate('documentary')}
          />
        </div>
      </section>

      {/* Latest News Grid - Secondary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-yellow-600 text-sm font-bold">📰 ACTUALITÉS</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-950">Dernières nouvelles</h2>
          </div>
          <button 
            onClick={() => onNavigate('news')}
            className="text-yellow-600 hover:text-yellow-500 font-bold flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-yellow-50 transition-colors"
          >
            Voir tout
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestNews.map((article, index) => (
            <button
              key={index}
              onClick={() => onNavigate('article')}
              className="group text-left"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-yellow-500 text-slate-950 text-xs font-bold rounded">
                    {article.category}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
                <span>{article.date}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Investigation & Deep Dives Carousel - Priority Section 3 */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-yellow-600 text-sm font-bold">🔍 ENQUÊTES</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-950">Investigations approfondies</h2>
          </div>
          <VideoCarousel 
            title="" 
            onVideoClick={(video) => onNavigate('investigation')}
          />
        </div>
      </section>

      {/* Featured Dossier */}
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-yellow-500 text-slate-950 text-sm font-bold rounded mb-4">
                DOSSIER SPÉCIAL
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Les oubliés de la transition écologique
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                Alors que les politiques vertes se multiplient, des milliers de travailleurs se retrouvent sans solution. Notre dossier complet sur les sacrifiés du changement climatique.
              </p>
              <button 
                onClick={() => onNavigate('investigation')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-100 transition-colors"
              >
                Découvrir le dossier
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://picsum.photos/800/600?random=350"
                alt="Dossier"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Citizen Participation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 md:p-12 text-center">
          <Users className="w-16 h-16 text-slate-950 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-slate-950 mb-4">
            Votre opinion compte
          </h2>
          <p className="text-lg text-slate-900 mb-6 max-w-2xl mx-auto">
            Vous êtes témoin d'un événement important ? Vous avez une information à partager ? Rejoignez notre communauté et participez au journalisme citoyen.
          </p>
          <button 
            onClick={() => onNavigate('participation')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-950 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Contribuer maintenant
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Social Media & Newsletter Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Newsletter */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <Eye className="w-12 h-12 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Restez informé
              </h2>
              <p className="text-slate-300 mb-6">
                Recevez chaque semaine notre sélection des meilleures enquêtes et analyses.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="px-4 py-3 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button className="px-6 py-3 bg-yellow-500 text-slate-950 font-bold rounded-lg hover:bg-yellow-400 transition-colors">
                  S'abonner
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Pas de spam. Désabonnement possible à tout moment.
              </p>
            </div>

            {/* Social Media */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <TrendingUp className="w-12 h-12 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Suivez-nous en direct
              </h2>
              <p className="text-slate-300 mb-6">
                Retrouvez-nous sur les réseaux sociaux pour les dernières actualités et contenus exclusifs.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-slate-300">Nous contacter :</span>
              </div>
              <SocialLinks layout="horizontal" size="lg" className="justify-start" />
              <p className="text-xs text-slate-500 mt-6">
                Partages, commentaires et interactions bienvenus !
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
