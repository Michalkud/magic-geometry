import React from 'react';

export type SymbolIconProps = {
  name: string;
  className?: string;
  size?: number;
  color?: string;
  title?: string;
};

// SVG path definitions for Tarot and mystical symbols
const symbolPaths: Record<string, { viewBox: string; path: string; fill?: string }> = {
  // Celestial
  sun: {
    viewBox: '0 0 24 24',
    path: 'M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 6a6 6 0 100 12 6 6 0 000-12z',
  },
  moon: {
    viewBox: '0 0 24 24',
    path: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z',
  },
  star: {
    viewBox: '0 0 24 24',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  },
  
  // Alchemical & Mystical
  caduceus: {
    viewBox: '0 0 24 24',
    path: 'M12 2v20m-2-18c-1.5 0-3 1-3 2.5S8.5 9 10 9s2.5 1 2.5 2.5S13.5 14 15 14s3 1 3 2.5-1.5 2.5-3 2.5m-6-15c1.5 0 3 1 3 2.5S13.5 9 12 9s-2.5 1-2.5 2.5S8.5 14 7 14s-3 1-3 2.5S5.5 19 7 19m2.5-17h5m-5 2h5',
  },
  ankh: {
    viewBox: '0 0 24 24',
    path: 'M12 2a4 4 0 00-4 4c0 2.21 1.79 4 4 4s4-1.79 4-4a4 4 0 00-4-4zm0 10v10m-4-6h8',
  },
  pentagram: {
    viewBox: '0 0 24 24',
    path: 'M12 2.5l2.09 6.43h6.76l-5.47 3.97 2.09 6.43L12 15.36l-5.47 3.97 2.09-6.43L3.15 8.93h6.76L12 2.5z',
  },
  hexagram: {
    viewBox: '0 0 24 24',
    path: 'M12 2l3.46 6L22 12l-3.46 6L12 22l-3.46-6L2 12l3.46-6z',
  },
  
  // Tarot Suits
  wand: {
    viewBox: '0 0 24 24',
    path: 'M7 3l10 18M9 5l8 14m-6-2l4-7m-2 1l2 3.5',
  },
  cup: {
    viewBox: '0 0 24 24',
    path: 'M5 12c0-3.87 3.13-7 7-7s7 3.13 7 7v5c0 1.66-1.34 3-3 3H8c-1.66 0-3-1.34-3-3v-5zm7 9v1m-2 2h4',
  },
  sword: {
    viewBox: '0 0 24 24',
    path: 'M12 2l.707.707L19.5 9.5l-.707.707L12 17l-6.793-6.793L4.5 9.5l6.793-6.793zm0 4l-4 4 4 4 4-4zm-1 11h2v5h-2zm-2 3h6v1h-6z',
  },
  disk: {
    viewBox: '0 0 24 24',
    path: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12zm0 2a4 4 0 100 8 4 4 0 000-8z',
  },
  
  // Animals
  lion: {
    viewBox: '0 0 24 24',
    path: 'M12 2c-3 0-5 2-5 4 0 1 .5 2 1 2.5-2 1-3 3-3 5.5 0 3 2 5 5 5h4c3 0 5-2 5-5 0-2.5-1-4.5-3-5.5.5-.5 1-1.5 1-2.5 0-2-2-4-5-4zm-2 5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm4 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z',
  },
  eagle: {
    viewBox: '0 0 24 24',
    path: 'M12 3L4 7v4c0 5 3.5 9.5 8 10.5 4.5-1 8-5.5 8-10.5V7l-8-4zm0 2l6 3v3.5c0 3.5-2.5 6.8-6 7.5-3.5-.7-6-4-6-7.5V8l6-3z',
  },
  serpent: {
    viewBox: '0 0 24 24',
    path: 'M12 2c-2 0-3 1-3 2s1 2 2 2c3 0 5 2 5 5s-2 5-5 5-5-2-5-5c0-1-1-2-2-2s-2 1-2 2c0 5 4 9 9 9s9-4 9-9-4-9-9-9z',
  },
  butterfly: {
    viewBox: '0 0 24 24',
    path: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm-5.5 5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm7 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z',
  },
  dove: {
    viewBox: '0 0 24 24',
    path: 'M12 2c-3 0-5 2-5 4 0 1 .5 2 1 2l1 1c0 2-1 3-2 4s-2 2-2 4c0 1 1 2 2 2s2-1 3-2c2-2 4-4 4-7v-2c0-1 1-2 2-2s2 1 2 2c0 2-1 3-2 4l2 2c2-2 3-4 3-6 0-3-3-6-7-6z',
  },
  
  // Elemental
  fire: {
    viewBox: '0 0 24 24',
    path: 'M12 2c-1 3-2 4-3 5s-2 2-2 4c0 3 2 5 5 5s5-2 5-5c0-2-1-3-2-4s-2-2-3-5zm0 7c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z',
  },
  water: {
    viewBox: '0 0 24 24',
    path: 'M12 2L5 13c0 4 3 7 7 7s7-3 7-7L12 2zm0 5l4 6c0 2-2 4-4 4s-4-2-4-4l4-6z',
  },
  air: {
    viewBox: '0 0 24 24',
    path: 'M3 8h6c2 0 3-1 3-3s-1-3-3-3m0 10h8c2 0 3 1 3 3s-1 3-3 3m-8-6h10c1 0 2-1 2-2s-1-2-2-2',
  },
  earth: {
    viewBox: '0 0 24 24',
    path: 'M12 2L2 7v10c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7L12 2zm0 2.2l8 4v8.8c0 4.5-3 8.7-8 9.8-5-.9-8-5.3-8-9.8V8.2l8-4z',
  },
  
  // Mystical Objects
  grail: {
    viewBox: '0 0 24 24',
    path: 'M5 5c0 3.5 2.5 6.5 6 7.4V19h-1c-1 0-2 1-2 2h8c0-1-1-2-2-2h-1v-6.6c3.5-.9 6-3.9 6-7.4H5zm2 2h10c-.5 2-2 3.5-4 4h-2c-2-.5-3.5-2-4-4z',
  },
  crown: {
    viewBox: '0 0 24 24',
    path: 'M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2.3-2h9.4l.9-5.4-3.1 2.7L12 8l-2.5 3.3-3.1-2.7L7.3 14z',
  },
  key: {
    viewBox: '0 0 24 24',
    path: 'M7 14a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6zm5 3h10v2h-2v2h-2v-2h-2v2h-2v-2h-2V9z',
  },
  scales: {
    viewBox: '0 0 24 24',
    path: 'M12 3v18m-7-3l-2-8h8l-2 8m8 0l-2-8h8l-2 8M5 6h14',
  },
  wheel: {
    viewBox: '0 0 24 24',
    path: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 110 16 8 8 0 010-16zm0 2a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8z',
  },
  eye: {
    viewBox: '0 0 24 24',
    path: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
  },
  
  // Geometric
  triangle: {
    viewBox: '0 0 24 24',
    path: 'M12 2L2 20h20L12 2zm0 4l7.5 12h-15L12 6z',
  },
  square: {
    viewBox: '0 0 24 24',
    path: 'M4 4h16v16H4V4zm2 2v12h12V6H6z',
  },
  circle: {
    viewBox: '0 0 24 24',
    path: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 110 16 8 8 0 010-16z',
  },
  spiral: {
    viewBox: '0 0 24 24',
    path: 'M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10c0-4.4 2.9-8.2 6.9-9.5C10.5 2 12 2.7 12 4c0 1-.7 2-1.7 2.3C9 6.9 8 8.3 8 10c0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4',
  },
  
  // Astrological
  aries: {
    viewBox: '0 0 24 24',
    path: 'M12 2C9 2 7 4 7 7v10h2V7c0-2 1-3 3-3s3 1 3 3v10h2V7c0-3-2-5-5-5z',
  },
  taurus: {
    viewBox: '0 0 24 24',
    path: 'M12 8a6 6 0 100 12 6 6 0 000-12zm-5-4C5 4 3 6 3 8h2c0-1 1-2 2-2h10c1 0 2 1 2 2h2c0-2-2-4-4-4H7z',
  },
  gemini: {
    viewBox: '0 0 24 24',
    path: 'M4 4h16v2H4zm4 4v8m8-8v8M4 18h16v2H4z',
  },
  // Add more zodiac signs as needed
  
  // Default fallback
  default: {
    viewBox: '0 0 24 24',
    path: 'M12 2L9 9l-7 2 7 2 3 7 3-7 7-2-7-2z',
  },
};

export function SymbolIcon({ name, className = '', size = 24, color = 'currentColor', title }: SymbolIconProps) {
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const symbol = symbolPaths[normalizedName] || symbolPaths.default;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox={symbol.viewBox}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={title || name}
    >
      {title && <title>{title}</title>}
      <path d={symbol.path} fill={symbol.fill || 'none'} />
    </svg>
  );
}

// Helper function to get symbol icon by name with fallback
export function getSymbolForName(symbolName: string): string {
  const s = symbolName.toLowerCase();
  
  // Map common symbol names to our icon library
  const mappings: Array<[string, string]> = [
    // Celestial
    ['sun', 'sun'],
    ['moon', 'moon'],
    ['star', 'star'],
    ['comet', 'star'],
    
    // Mystical
    ['caduceus', 'caduceus'],
    ['ankh', 'ankh'],
    ['pentagram', 'pentagram'],
    ['hexagram', 'hexagram'],
    
    // Suits
    ['wand', 'wand'],
    ['rod', 'wand'],
    ['staff', 'wand'],
    ['cup', 'cup'],
    ['chalice', 'cup'],
    ['grail', 'grail'],
    ['sword', 'sword'],
    ['blade', 'sword'],
    ['disk', 'disk'],
    ['coin', 'disk'],
    ['pentacle', 'disk'],
    
    // Animals
    ['lion', 'lion'],
    ['eagle', 'eagle'],
    ['hawk', 'eagle'],
    ['vulture', 'eagle'],
    ['serpent', 'serpent'],
    ['snake', 'serpent'],
    ['butterfly', 'butterfly'],
    ['dove', 'dove'],
    ['tiger', 'lion'],
    ['ram', 'aries'],
    ['bull', 'taurus'],
    ['twins', 'gemini'],
    ['crab', 'circle'],
    ['scorpion', 'serpent'],
    ['goat', 'triangle'],
    ['fish', 'water'],
    
    // Elements
    ['fire', 'fire'],
    ['flame', 'fire'],
    ['water', 'water'],
    ['ocean', 'water'],
    ['air', 'air'],
    ['wind', 'air'],
    ['earth', 'earth'],
    ['ground', 'earth'],
    
    // Objects
    ['crown', 'crown'],
    ['key', 'key'],
    ['scales', 'scales'],
    ['balance', 'scales'],
    ['wheel', 'wheel'],
    ['eye', 'eye'],
    ['lamp', 'fire'],
    ['shield', 'square'],
    ['bow', 'triangle'],
    ['arrow', 'triangle'],
    ['rainbow', 'air'],
    ['lightning', 'fire'],
    ['feather', 'air'],
    ['rose', 'pentagram'],
    ['lotus', 'pentagram'],
    ['tree', 'earth'],
    ['child', 'circle'],
    ['infant', 'circle'],
    ['sphinx', 'lion'],
    ['pyramid', 'triangle'],
    ['tower', 'square'],
    ['cross', 'ankh'],
    ['grapes', 'circle'],
    ['crocodile', 'serpent'],
    ['ibis', 'eagle'],
    ['ape', 'circle'],
    ['bee', 'hexagram'],
    ['camel', 'earth'],
  ];
  
  for (const [searchTerm, iconName] of mappings) {
    if (s.includes(searchTerm)) {
      return iconName;
    }
  }
  
  return 'default';
}