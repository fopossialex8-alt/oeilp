import React, { useState } from 'react';
import { Eye, Search, Menu, X } from 'lucide-react';
import { PageType } from '../App';

interface HeaderProps {
  onNavigate: (page: PageType) => void;
  currentPage: PageType;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const menuItems = [
    { label: 'Accueil', page: 'home' as PageType },
    { label: 'Actualités', page: 'news' as PageType },
    { label: 'Vidéos', page: 'video' as PageType },
    { label: 'Enquêtes', page: 'investigation' as PageType },
    { label: 'Analyses', page: 'analysis' as PageType },
    { label: 'À propos', page: 'about' as PageType },
  ];

  return (
    <>
      {/* Top Bar with Search */}
      {searchOpen && (
        <div className="sticky top-0 z-40 bg-slate-950 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3">
          <div className="max-w-7xl mx-auto">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-slate-950 text-white shadow-lg border-b-2 border-yellow-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-8">
            
            {/* Logo - Left, fixed */}
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <div className="relative p-1 bg-yellow-500 rounded-lg">
                <Eye className="w-6 h-6 text-slate-950 group-hover:scale-110 transition-transform" strokeWidth={3} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold tracking-tight leading-tight">Œil du Public</h1>
                <p className="text-xs text-slate-400 leading-tight">Médium</p>
              </div>
            </button>

            {/* Spacer - grows to push navigation right */}
            <div className="flex-1 hidden md:block" />

            {/* Desktop Navigation - Right aligned */}
            <nav className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                    currentPage === item.page 
                      ? 'bg-yellow-500 text-slate-950' 
                      : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions - Right */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                title="Rechercher"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 animate-in slide-in-from-top-2">
            <nav className="px-4 py-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentPage === item.page
                      ? 'bg-yellow-500 text-slate-950'
                      : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}