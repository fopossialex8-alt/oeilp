import React from 'react';
import { Facebook, Instagram, Music4, Youtube } from 'lucide-react';

interface SocialLinksProps {
  layout?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

const socialLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    url: 'https://www.facebook.com/share/A5jYXrGEPzWZPu4x/',
    color: 'bg-blue-600 hover:bg-blue-700 text-white',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/',
    color: 'bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white',
  },
  {
    name: 'TikTok',
    icon: Music4,
    url: 'https://www.tiktok.com/',
    color: 'bg-slate-800 hover:bg-slate-700 text-white',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://www.youtube.com/',
    color: 'bg-red-600 hover:bg-red-700 text-white',
  },
];

export function SocialLinks({
  layout = 'horizontal',
  size = 'md',
  showLabels = false,
  className = '',
}: SocialLinksProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const containerClass = layout === 'vertical' ? 'flex flex-col gap-3' : 'flex gap-3';

  return (
    <div className={`${containerClass} ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          title={social.name}
          className={`${sizeClasses[size]} flex items-center justify-center rounded-lg transition-all duration-300 transform hover:scale-110 ${social.color} group shadow-md hover:shadow-lg`}
        >
          <social.icon className={iconSizes[size]} />
          {showLabels && (
            <span className="ml-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {social.name}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
